# 📋 Formulario con React + Google Sheets

Este proyecto es un formulario hecho con React + TypeScript que guarda los datos directamente en una hoja de cálculo de Google Sheets usando Google Apps Script.

🔗 **Demo en línea**:  
👉 [https://formulario-tarea1.vercel.app](https://formulario-tarea1.vercel.app)

---

## 🚀 Cómo clonar y ejecutar el proyecto

1. Clona este repositorio:

```bash
git clone https://github.com/tu-usuario/formulario-tarea1.git
cd formulario-tarea1
```

2. Instala las dependencias:

```bash
npm install
```

3. Corre el servidor de desarrollo:

```bash
npm run dev
```

---

## 📊 Cómo conectar con Google Sheets

### Paso 1: Crear tu hoja de cálculo

1. Abre [Google Sheets](https://sheets.google.com).
2. Crea una nueva hoja y nómbrala como desees.
3. En la primera fila, pon los encabezados exactamente así:  
   `Nombre | Apellido | DeporteFavorito | Género | Residente | EsMayor | Ford | Toyota | Chrysler | Nissan`

---

### Paso 2: Crear un script en Google Apps Script

1. Ve a [Google Apps Script](https://script.google.com).
2. Crea un nuevo proyecto.
3. Pega el siguiente código:

```js
function doPost(e) {
  const hoja = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const datos = e.parameter;

  hoja.appendRow([
    datos.nombre || '',
    datos.apellido || '',
    datos.deportefavorito || '',
    datos.genero || '',
    datos.residente || '',
    datos.isOlder === "1" ? 1 : 0,
    datos.Ford === "1" ? 1 : 0,
    datos.Toyota === "1" ? 1 : 0,
    datos.Chrysler === "1" ? 1 : 0,
    datos.Nissan === "1" ? 1 : 0
  ]);

  return ContentService.createTextOutput("");
}
```

4. Guarda el script.
5. Haz clic en `Implementar > Nueva implementación`.
6. En tipo de implementación selecciona: **Aplicación web**
   - URL accesible a cualquiera
   - Permisos: "Cualquiera, incluso anónimo"
7. Copia la URL generada (la usarás en tu código frontend).

---

### Paso 3: Reemplaza la URL en tu código

Busca esta línea en tu archivo `Form.tsx`:

```ts
form.action = "https://script.google.com/macros/s/TU_URL/exec";
```

Y reemplaza `TU_URL` con la que copiaste del paso anterior.

---

## 💡 Tecnologías utilizadas

- React + TypeScript
- Vite
- Google Sheets + Apps Script
- SweetAlert2
- CSS personalizado

---

## 🧪 Resultado

Cuando un usuario completa el formulario:
- Se envían los datos en segundo plano (sin recargar).
- Se guarda automáticamente en tu Google Sheet.
- Se muestra un mensaje con `SweetAlert2`.
- El formulario se limpia automáticamente.

---

## 📦 Despliegue

Este proyecto fue desplegado en **Vercel**.  
Para desplegarlo tú también:

1. Crea una cuenta en [vercel.com](https://vercel.com).
2. Conecta tu repositorio desde GitHub.
3. Configura el framework como `Vite`.
4. ¡Publica!

---

## 👨‍💻 Autor

Desarrollado por Marvin Vásquez 
Estudiante de Ingeniería en Sistemas y apasionado por la programación.

