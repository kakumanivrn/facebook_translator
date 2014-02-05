var activate = false;
chrome.browserAction.onClicked.addListener(function(tab) {
	if(activate) {
		activate = false;
		alert("De-Activated");
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {callme: "kill"}, function(response) {
			});
		});
	} else {
    	clickHandler();
    }
});

function clickHandler(){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {callme: "call"}, function(response) {
		if (typeof (response) != undefined && typeof (response) != null && typeof (response) != 'undefined') {
				 if (response.farewell == "badbye") {
				 	activate = false;
					alert("Instructions:\n1) Open Facebook\n2) Click on Update Status or Status Bar\n3) Again click on the extension button to activate\n4) To De-Activate click again on extension icon or do refresh");
				 } else {
				 	alert("Activated!\nNow you can type your status in Telugu.");
				 	activate = true;
				 }
			 } else {
			 	activate = false;
			 	alert("Instructions:\n1) Open Facebook\n2) Click on Update Status or Status Bar\n3) Again click on the extension button to activate\n4) To De-Activate click again on extension icon or do refresh");
			 }
			 
		});
		
	});
}
