import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import xlsx from 'xlsx';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

// Configuración middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

// Crear carpeta 'datos' si no existe
const dataDir = join(__dirname, '../datos');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

app.post('/save', async (req, res) => {
    try {
        const data = req.body;
        const filePath = join(dataDir, 'datostarea1.xlsx');
        
        // Preparar datos para Excel
        const excelData = {
            Nombre: data.nombre || '',
            Apellido: data.apellido || '',
            'Deporte Favorito': data.deportefavorito || '',
            Género: data.genero || '',
            Departamento: data.residente || '',
            'Mayor de 21': data.isOlder ? 'Sí' : 'No',
            'Autos Ford': data.carModels?.Ford ? 'Sí' : 'No',
            'Autos Chrysler': data.carModels?.Chrysler ? 'Sí' : 'No',
            'Autos Toyota': data.carModels?.Toyota ? 'Sí' : 'No',
            'Autos Nissan': data.carModels?.Nissan ? 'Sí' : 'No',
            'Fecha': new Date().toISOString()
        };

        // Leer archivo existente o crear nuevo
        let workbook;
        let sheetData = [];
        
        try {
            workbook = xlsx.readFile(filePath);
            sheetData = xlsx.utils.sheet_to_json(workbook.Sheets['Datos']);
        } catch (e) {
            workbook = xlsx.utils.book_new();
        }

        // Agregar nuevos datos
        sheetData.push(excelData);
        
        // Crear hoja de cálculo
        const worksheet = xlsx.utils.json_to_sheet(sheetData);
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Datos');
        
        // Guardar archivo
        xlsx.writeFile(workbook, filePath, { compression: true });
        
        res.status(200).json({ 
            success: true,
            message: 'Datos guardados exitosamente',
            path: filePath
        });
    } catch (error) {
        console.error('Error al guardar:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error al guardar los datos',
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor listo en http://localhost:${PORT}`);
    console.log(`Los datos se guardarán en: ${join(dataDir, 'datostarea1.xlsx')}`);
});
