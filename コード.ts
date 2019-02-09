function doPost(e) {
    var json = JSON.parse(e.postData.getDataAsString());
    var SpreadSheet = SpreadsheetApp.getActiveSpreadsheet();

    Object.keys(json).forEach((tableName) => {
        var sheet = SpreadSheet.getSheetByName(tableName);
        sheet.clear();
        sheet.appendRow(Object.keys(json[tableName][0]));
        json[tableName].forEach((record: Array<String>) => {
            var row = new Array<String>();
            Object.keys(record).forEach((data) => {
                row.push(record[data]);
            });
            sheet.appendRow(row);
        });
    });

    var output = ContentService.createTextOutput();
    output.setMimeType(ContentService.MimeType.JSON);
    output.setContent(JSON.stringify({ message: "success!" }));

    return output;
}

function doGet(e) {
    var tableName = e.parameter.table;
    var json = new Array();
    var spreadSheet = SpreadsheetApp.getActiveSpreadsheet();

    var sheet = spreadSheet.getSheetByName(tableName);
    if(sheet){
        var datas = sheet.getDataRange().getValues();
        var top = datas.shift();
        var headlines = new Array<string>();
        top.forEach((data) => {
            headlines.push(data.toString())
        });
        datas.forEach((record) => {
            var row = new Object;
            record.forEach((value, idx) => {
                row[headlines[idx]] = value;
            });
            json.push(row);
        });
    }

    var output = ContentService.createTextOutput();
    output.setMimeType(ContentService.MimeType.JSON);
    output.setContent(JSON.stringify(json, null, '  '));

    return output;
}