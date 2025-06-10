const ExcelJS = require('exceljs');
const path = require('path');

class ExcelUtils {
    constructor() {
        this.workbook = new ExcelJS.Workbook();
    }

    async readExcel(fileName) {
        const filePath = path.join(__dirname, '../testData/searchData', fileName);
        await this.workbook.xlsx.readFile(filePath);
        return this;
    }

    getWorksheet(sheetName) {
        return this.workbook.getWorksheet(sheetName);
    }

    getCellValue(worksheet, row, column) {
        return worksheet.getCell(`${column}${row}`).value;
    }

    async getAllValueBySheetNameAndColumn(sheetName = 'Search', headerName = 'Invalid Search') {
        try {
            const worksheet = this.getWorksheet(sheetName);
            if (!worksheet) {
                throw new Error(`Worksheet with name ${sheetName} not found`);
            }

            const values = [];
            const headerRow = worksheet.getRow(1);
            
            // Find column index by header name
            let targetColumnIndex = null;
            headerRow.eachCell((cell, colNumber) => {
                if (cell.value === headerName) {
                    targetColumnIndex = colNumber;
                }
            });

            if (!targetColumnIndex) {
                throw new Error(`Header '${headerName}' not found in sheet`);
            }

            // Get all values from the column
            worksheet.eachRow((row, rowNumber) => {
                if (rowNumber > 1) { // Skip header row
                    const value = row.getCell(targetColumnIndex).value;
                    if (value !== null && value !== undefined) {
                        values.push(value.toString().trim());
                        console.log(`Row ${rowNumber}: ${value.toString().trim()}`);
                    }
                    //console.log(`Found ${values.value}`);
                }
            });
            
            console.log(`Found ${values.length} values in column '${headerName}'`);
            return values;
        } catch (error) {
            console.error(`Error reading column data: ${error.message}`);
            throw error;
        }
    }

    async getRowData(sheetName, rowNumber) {
        const worksheet = this.getWorksheet(sheetName);
        const row = worksheet.getRow(rowNumber);
        const rowData = {};

        row.eachCell((cell, colNumber) => {
            const headerCell = worksheet.getCell(1, colNumber);
            rowData[headerCell.value] = cell.value;
        });

        return rowData;
    }
}

module.exports = { ExcelUtils };