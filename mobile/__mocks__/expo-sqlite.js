const sqlite3 = require('sqlite3').verbose();

module.exports = {
  openDatabaseAsync: async (dbName) => {
    return new Promise((resolve, reject) => {
      // In-memory db per connection to keep tests fast and isolated
      const db = new sqlite3.Database(':memory:', (err) => {
        if (err) {
          reject(err);
          return;
        }
        
        resolve({
          execAsync: async (query) => {
            return new Promise((res, rej) => db.exec(query, (e) => e ? rej(e) : res()));
          },
          runAsync: async (query, params = []) => {
            return new Promise((res, rej) => db.run(query, params, function (e) {
              e ? rej(e) : res({ lastInsertRowId: this.lastID, changes: this.changes });
            }));
          },
          getFirstAsync: async (query, params = []) => {
            return new Promise((res, rej) => db.get(query, params, (e, row) => e ? rej(e) : res(row)));
          },
          getAllAsync: async (query, params = []) => {
            return new Promise((res, rej) => db.all(query, params, (e, rows) => e ? rej(e) : res(rows)));
          },
          prepareAsync: async (query) => {
            const stmt = db.prepare(query);
            return {
              executeAsync: async (params = []) => new Promise((res, rej) => stmt.run(params, function (e) {
                e ? rej(e) : res({ lastInsertRowId: this.lastID, changes: this.changes });
              })),
              finalizeAsync: async () => new Promise((res) => { stmt.finalize(); res(); })
            }
          }
        });
      });
    });
  }
};
