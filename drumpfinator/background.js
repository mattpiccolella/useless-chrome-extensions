// Called when the user clicks on the browser action icon.
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.sendMessage(tab.id, {}, function(response) {
    console.log("Your page has been trumpified!");
  });
});