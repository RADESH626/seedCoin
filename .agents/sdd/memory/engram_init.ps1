# engram_init.ps1
# Initializes the SQLite Engram system for SeedCoin

$dbPath = "d:\Familia\Documents\emanuel\proyectos personales\seedCoin\.agents\sdd\memory\engram.db"
$jsonPath = "d:\Familia\Documents\emanuel\proyectos personales\seedCoin\.agents\sdd\memory\knowledge.json"

# 1. Create Schema
Write-Host "Creating SQLite Schema (using FTS4)..." -ForegroundColor Cyan

$schema = @"
CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    project_id TEXT,
    title TEXT,
    context TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS observations (
    id INTEGER PRIMARY KEY, -- Changed from TEXT to INTEGER for FTS4 docid compatibility
    session_id TEXT,
    type TEXT, -- bugfix, architecture, pattern, logic, instinct
    summary TEXT,
    content TEXT, -- The "What, Why, Learned" block
    tags TEXT,
    confidence INTEGER DEFAULT 1, -- Confidence score for instincts
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (session_id) REFERENCES sessions(id)
);

-- FTS4 Virtual Table (FTS5 is not supported in this environment)
CREATE VIRTUAL TABLE IF NOT EXISTS observations_fts USING fts4(
    summary,
    content,
    tags,
    content='observations'
);

-- Triggers to keep FTS in sync
CREATE TRIGGER IF NOT EXISTS observations_ai AFTER INSERT ON observations BEGIN
  INSERT INTO observations_fts(docid, summary, content, tags) VALUES (new.id, new.summary, new.content, new.tags);
END;

CREATE TRIGGER IF NOT EXISTS observations_ad AFTER DELETE ON observations BEGIN
  INSERT INTO observations_fts(observations_fts, docid, summary, content, tags) VALUES('delete', old.id, old.summary, old.content, old.tags);
END;

CREATE TRIGGER IF NOT EXISTS observations_au AFTER UPDATE ON observations BEGIN
  INSERT INTO observations_fts(observations_fts, docid, summary, content, tags) VALUES('delete', old.id, old.summary, old.content, old.tags);
  INSERT INTO observations_fts(docid, summary, content, tags) VALUES (new.id, new.summary, new.content, new.tags);
END;
"@

$schema | sqlite3 $dbPath

# 2. Migrate data from knowledge.json
if (Test-Path $jsonPath) {
    Write-Host "Migrating knowledge.json to engram.db..." -ForegroundColor Yellow
    try {
        $jsonString = Get-Content $jsonPath -Raw -Encoding UTF8
        $jsonData = $jsonString | ConvertFrom-Json
        
        $sqlFile = "$($PSScriptRoot)\migrate.sql"
        if (Test-Path $sqlFile) { Remove-Item $sqlFile }
        "BEGIN TRANSACTION;" | Out-File $sqlFile -Encoding ASCII
        
        foreach ($entry in $jsonData) {
            $id = $entry.id
            $type = $entry.type
            $summary = $entry.title
            
            $what = $entry.context.what
            $why = $entry.context.why
            $where = $entry.context.where
            $learned = $entry.context.learned
            
            $content = "What: $what`nWhy: $why`nWhere: $where`nLearned: $learned"
            $tags = ""
            if ($entry.tags) { $tags = $entry.tags -join "," }
            
            $escapedSummary = $summary -replace "'", "''"
            $escapedContent = $content -replace "'", "''"
            $escapedTags = $tags -replace "'", "''"
            
            "INSERT OR IGNORE INTO observations (id, type, summary, content, tags, confidence) VALUES ($id, '$type', '$escapedSummary', '$escapedContent', '$escapedTags', 1);" | Out-File $sqlFile -Append -Encoding ASCII
        }
        "COMMIT;" | Out-File $sqlFile -Append -Encoding ASCII
        
        # Run the SQL file
        Write-Host "Running SQL migration..." -ForegroundColor Yellow
        sqlite3 $dbPath ".read '$sqlFile'"
        # Remove-Item $sqlFile -- Keep for debugging
        
        Write-Host "Migration complete!" -ForegroundColor Green
    } catch {
        Write-Host "Migration failed: $($_.Exception.Message)" -ForegroundColor Red
    }
} else {
    Write-Host "No knowledge.json found, skipping migration." -ForegroundColor Gray
}
