// src/components/excelService.ts
import * as XLSX from "xlsx";

// Función para leer un archivo Excel y devolver los datos existentes
export async function readExcel(fileHandle: FileSystemFileHandle): Promise<any[]> {
  const file = await fileHandle.getFile();
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  return XLSX.utils.sheet_to_json(worksheet);
}

// Función para escribir datos en el Excel (sobrescribe con todos los datos)
export async function writeExcel(fileHandle: FileSystemFileHandle, data: any[]) {
  const writable = await fileHandle.createWritable();
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");
  const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  await writable.write(buffer);
  await writable.close();
}
