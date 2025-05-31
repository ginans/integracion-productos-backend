# 💼 Sincronizador Jumpseller → Multivende

Este proyecto automatiza la sincronización de nuevos productos desde **Jumpseller** hacia **Multivende**. Su objetivo es facilitar la gestión de catálogos para tiendas en línea, eliminando procesos manuales.

## 🚀 Descripción del Proyecto

Cada día, el sistema:

* Obtiene los productos **creados en las últimas 24 horas** en Jumpseller.
* Filtra aquellos con **stock mayor a 0**.
* Los guarda en el mantenedor (con estado `PENDING`).
* Luego los procesa de uno en uno mediante un **job de Redis**, y los envía a Multivende.
* Una vez Multivende responde exitosamente, el estado del producto pasa a `COMPLETED`.

El proyecto está desarrollado en **Nest.js**, y usa:

* Cron jobs para ejecutar automáticamente el flujo una vez al día.
* Redis para manejar trabajos en segundo plano.

## 🛠️ Instalación

### 1. Clona el repositorio

```bash
git clone <URL-DEL-REPOSITORIO> 
cd <nombre-del-proyecto>
```

### 2. Instala dependencias

Recomiendo usar `pnpm`:

```bash
pnpm install
```

También puedes usar `yarn` o `npm` si lo prefieres:

```bash
yarn install
# o
npm install
```

### 3. Levanta el entorno de desarrollo

```bash
pnpm start:dev
```

Asegúrate de tener instalados previamente:

* Node.js
* Git

## 🔐 Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las variables necesarias. Puedes guiarte por el archivo `.env.example` incluido en el repositorio.

Además, asegúrate de tener en tu base de datos una colección llamada `multivendetokens` con el siguiente formato:

```json
{
  "accessToken": "string",
  "merchantId": "string",
  "urlMultivende": "https://app.multivende.com/api"
}
```

> ⚠️ Por ahora, este token debe insertarse **manualmente** en la base de datos. Se planea automatizar este proceso en futuras versiones.

## ▶️ Ejecutar el Proceso Manualmente

Una vez esté todo configurado, puedes iniciar el proceso de sincronización enviando una petición `POST` desde **Postman** o similar:

### Endpoint:

```
POST http://localhost:8000/backend/v1/process/products
```

### Body:

Selecciona el tipo **none** (sin body).

Esto disparará el flujo completo: petición a Jumpseller, almacenamiento en base de datos y envío de productos a Multivende.

---

## 📌 Notas Finales

Este proyecto está en constante mejora. ¡Se agradecen sugerencias, issues y pull requests!

---

Con cariño 💖,
**Gina** 🧶
