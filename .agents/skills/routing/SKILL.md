---
name: routing
description: Expo Router v6 navigation structure and path management.
trigger: Working with navigation or routes
allowed-tools: [Read, Edit, Write]
---

# Routing Skill (Expo Router)

Este skill controla la correcta manipulación de la navegación y estructura de rutas para la aplicación móvil usando Expo Router v6.

## 1. Propósito
Centralizar cómo el agente debe agregar, modificar o navegar entre las diferentes pantallas de SeedCoin simulando una arquitectura moderna basada en sistemas de archivos.

## 2. Ubicación de Archivos Relevantes
- **Rutas Principales y Layouts:** `mobile/app/`
- **Pestañas (Tabs):** `mobile/app/(tabs)/`

## 3. Reglas del Proyecto (Estrictas)
1. **Navegación por Sistema de Archivos:** No crees configuradores como `react-navigation` `Stack.Navigator`. Expo Router utiliza la estructura de carpetas de `mobile/app/`. 
2. **Componentes Nativos del Router:**
   - Para enlazar visualmente, usa el componente `<Link href="/ruta">`.
   - Para navegación programática (ej. dentro de callbacks), usa `router.push('/ruta')` importado desde `expo-router`.
   - Para prevención de pantallas o Auth Guards, utiliza el componente `<Redirect href="/ruta" />`.
3. **Convención de Archivos:**
   - Pantalla individual: `nombre-pantalla.tsx`
   - Layout de carpeta: `_layout.tsx` (Nota el guion bajo).
   - Componentes no-ruta en la carpeta app deben llevar prefijo o evitarse (preferiblemente usar `components/`).

## 4. Flujo de Trabajo Estándar
1. Al recibir la orden de crear una nueva "Vista", crear el archivo `.tsx` correspondiente en el nivel adecuado de `mobile/app/`.
2. Incluir lógica de redirección con el layout superior si es que el acceso a esa ruta requiere datos previos de la DB (ej. que el Onboarding haya finalizado).
