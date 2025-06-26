// Global Variables
var ss = SpreadsheetApp.getActiveSpreadsheet();


// Make number of data rows required 
function initializePlan() {
  var status = ss.getRangeByName('Status');
  var sheet = ss.getSheetByName('Plan');
  var planTemplate = ss.getRangeByName('Plan_Template');
  var range = ss.getRangeByName('Plan_Details');
  var rowNum = sheet.getRange('Plan_Details').getRow();
  var startDate = sheet.getRange('Plan_Start').getValue();
  var endDate = sheet.getRange('Plan_End').getValue();
  var meals = ["Breakfast", "Lunch", "Supper", "Znack"];
  var mealValidation = ss.getRangeByName('Meal_Validation');
  
  status.setBackground('red').setValue("Running...");
   
  // Reset the planning sheet
  clearSheet('Plan','Plan_Details');
  
  // Create the rows for the days
  // Start with 3 for the first date
  for (var i = 1; i < 4; i++) {
    range = sheet.getRange(rowNum,1);
    planTemplate.copyTo(range);
    range.setValue(startDate);
    range = sheet.getRange(rowNum,2);
    range.setValue(meals[i]);
    range = sheet.getRange(rowNum,3);
    mealValidation.getCell(i+1,1).copyTo(range); // Insert the correct validation.
    rowNum++  
  }
  // Go to next day
  startDate = new Date(startDate.setDate(startDate.getDate()+1));
  var diff =  Math.floor(( startDate - endDate ) / 86400000);
  // For each day in between we need 4 records
  while ( startDate < endDate ) {
    for (i = 0; i < 4; i++) {
      range = sheet.getRange(rowNum,1);
      planTemplate.copyTo(range);
      range.setValue(startDate);
      range = sheet.getRange(rowNum,2);
      range.setValue(meals[i]);
      range = sheet.getRange(rowNum,3);
      mealValidation.getCell(i+1,1).copyTo(range); // Insert the correct validation.
      rowNum++
    }
    startDate = new Date(startDate.setDate(startDate.getDate()+1));
  }
  // On the last day we need only two records
  for (var i = 0; i < 2; i++) {
    range = sheet.getRange(rowNum,1);
    planTemplate.copyTo(range);
    range.setValue(startDate);
    range = sheet.getRange(rowNum,2);
    range.setValue(meals[i]);
    range = sheet.getRange(rowNum,3);
    mealValidation.getCell(i+1,1).copyTo(range); // Insert the correct validation.
    rowNum++  
  }
  status.setBackground('yellow').setValue("Done!");
  
//  // reset inventory items sheet
//  clearSheet('Inventory','Inventory_Details');
//  var inventoryTemplate = ss.getRangeByName('Inventory_Template');
//  var sheet = ss.getSheetByName('Inventory');
//  range = ss.getRangeByName('Inventory_Details');
//  inventoryTemplate.copyTo(range);
//  // Copy formulas for the second and thirdcolumns into the rest of the sheet
//  range = range.offset(0,1,1,2);
//  // Logger.log(range.getA1Notation());
//  // Create a target range to copy to based on the size of the sheet
//  var target = sheet.getRange(range.getRow()+1,range.getColumn(),sheet.getMaxRows()-range.getRow(),2);
//  // Logger.log(target.getA1Notation());
//  range.copyTo(target);
}


function clearSheet(sheetName,startRange) {
  var sheet = ss.getSheetByName(sheetName);
  var startRow = sheet.getRange(startRange).getRow();
  var clearRange = sheet.getRange(startRow,1,sheet.getLastRow(),sheet.getLastColumn());
  clearRange.clearContent();
}

function generateReport() {
  var startDate = ss.getRangeByName('Plan_Start').getValue();
  var endDate = ss.getRangeByName('Plan_End').getValue();
  var ssreport = ss.getSheetByName('Report');
  var ssadmin = ss.getSheetByName('Admin');
  var ssplan = ss.getSheetByName('Plan');
  var ssstuff = ss.getSheetByName('Components');
  var DailyHeader = ss.getRangeByName('ReportHeaderDaily');
  var itemCol = 0;
  var QtyCol = 1;
  
  
  // Reset the report spreadsheet
  ssreport.getRange(2,1,ssreport.getLastRow(),ssreport.getLastColumn()).clearContent().clearFormat();
  
  // Get all data from Planning sheet
  var lastRow = ssplan.getLastRow();
  var ArrPlan = ssplan.getRange('A4:D' + lastRow).getValues();
    
  // Get all components
  var lastRow = ssstuff.getLastRow();
  var ArrStuff = ssstuff.getRange('A2:D' + lastRow).getValues();
  
  // Loop over each day.
  
  while ( startDate <= endDate ) {
    // Copy in the header using the named range
    ss.getRangeByName('ReportHeaderDate').setValue(startDate);
    var HeaderRow = ssreport.getLastRow()+1;
    DailyHeader.copyTo(ssreport.getRange(HeaderRow,1));
    Logger.log(ArrPlan.length);
    // Things for each meal
    for (var i = 0; i < ArrPlan.length; i++) {
      Logger.log(ArrPlan[i][0].getDate() + " " + startDate.getDate());
      if (ArrPlan[i][0].getMonth() == startDate.getMonth() && ArrPlan[i][0].getDate() == startDate.getDate()) {
        var ArrMeal = [];
        var meal = ArrPlan[i][2];
        for (var j = 0; j < ArrStuff.length; j++) {
          if (ArrStuff[j][1] == meal) {
            Logger.log(ArrStuff[j][1] + " ========= " + meal)
            ArrMeal.push([ArrStuff[j][2],ArrStuff[j][3],ArrStuff[j][4]]);
            Logger.log(ArrMeal);
          }
        }
        
        var mealType = ArrPlan[i][1];
        
        // loop per meal item
        for (var k = 0; k < ArrMeal.length; k++) {
          Logger.log(ArrMeal[k][0], ArrMeal[k][1], ArrMeal[k][2]);
          if (mealType == "Breakfast") {
            itemCol = 2; QtyCol = 1;
          } else if (mealType == "Lunch") {
            itemCol = 4; QtyCol = 3;
          } else if (mealType == "Supper") {
            itemCol = 6; QtyCol = 5;
          } else if (mealType == "Znack") {
            itemCol = 8; QtyCol = 7;
          } else {
            // Error, not recognized.
            itemCol = 0; QtyCol = 0;
          }
          if (QtyCol > 0) {
            ssreport.getRange(HeaderRow + 2 + k, itemCol).setValue(ArrMeal[k][0]);
            ssreport.getRange(HeaderRow + 2 + k, QtyCol).setValue(ArrMeal[k][1]*ArrPlan[i][3]).setNumberFormat('0.0');
            
          }
        }
        ssreport.getRange(HeaderRow + 1, itemCol).setValue(meal); // Set the title to the meal title
        
      }
    }
    startDate = new Date(startDate.setDate(startDate.getDate()+1));
  }
}
