export const getTableauSheetNames = () => {
    return new Promise((resolve, reject) => {
        tableau.extensions.initializeAsync().then(function () {
            const sheets = [];
            tableau.extensions.dashboardContent.dashboard.worksheets.map(function (worksheet, index) {
                sheets.push(worksheet.name)
            })
            resolve(sheets)
        })
    })
}

export const getTableauSheetData = (sheetName, type) => {
    return new Promise((resolve, reject) => {
        tableau.extensions.initializeAsync().then(() => {
            const dashboard = tableau.extensions.dashboardContent.dashboard
            for (const worksheet of dashboard.worksheets) {
                if (worksheet.name == sheetName) {
                    if (type == 'full') {
                        worksheet.getDataSourcesAsync().then(datasource => {
                            datasource[0].getLogicalTablesAsync().then(logicalTable => {
                                datasource[0].getLogicalTableDataAsync(logicalTable[0].id).then(data => {
                                    resolve(convertTableauTableToText(data))
                                    return
                                })
                            })
                        })
                    } else {
                        worksheet.getSummaryDataAsync().then(data => {
                            resolve(convertTableauTableToText(data))
                            return
                        })
                    }
                }
            }
        })
    })
}

const convertTableauTableToText = (tableData) => {
    const columns = tableData.columns.map(col => col.fieldName)
    const data = tableData.data.map(row => row.map(cell => cell.value))
    const totalData = [columns, ...data]
    const text = totalData.map(row => row.join('\t')).join('\n')
    return text
}
