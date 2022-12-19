function onOpen(e) {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Update').addItem("Update", "Update").addToUi(); //Adds manual update button to the UI next to 'help'
  Update();
}
function Update() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var response = UrlFetchApp.fetch("https://api.torn.com/faction/[facIDhere]?selections=basic&key=[apiKeyHere"); //Replace [facID] and [apiKey] with faction you are warring and your own API to pull basic info.
  var json = response.getContentText();
  var data = JSON.parse(json);
  var range = sheet.getRange(2, 1, 52).getValues(); //Change 52 to however many members the enemy faction has, in this example, there are 52
  for (var i = 0; i < 52; i++) {
    sheet.getRange(i + 2, 10).setValue(data["members"][range[i]]["status"]["state"]); //'10' is where user status will be updated
    sheet.getRange(i + 2, 11).setValue(data["members"][range[i]]["last_action"]["status"]); //'11' is where user activity will be updated
  }
}
