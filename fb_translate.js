var callme = "";

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		callme = request.callme;
		if(callme == "call") {
			var InputElement = document.getElementsByName("xhpc_message_text")[0];
			if (typeof (InputElement) != undefined && typeof (InputElement) != null && typeof (InputElement) != 'undefined') {
				sendResponse({farewell: "goodbye"});
				InputElement.addEventListener("keyup", callFun, false);
			} else {
				sendResponse({farewell: "badbye"});
			}
		} else if (callme == "kill") {
			location.reload();
		}
	}
);

function callFun(e) {
	var code = e.keyCode;
	var InputElement = document.getElementsByName("xhpc_message_text")[0];
	if (typeof (InputElement) != undefined && typeof (InputElement) != null && typeof (InputElement) != 'undefined') {
		if ( code == 13	|| code == 32 || code == 188 || code == 190	|| code == 191 || code == 49) {
			vTransform(InputElement);
		}
	} else {
		alert("failed");
	}
}

function vTransform(InputElement) {
	var inputMethod = 0;  // RTS
	var outputMethod = 1; // unicode

	var input = "#" + InputElement.value + "#";
	var transformer = Transformer.createTransformer(inputMethod, outputMethod);
	var output = transformer.convert(input);

	// Delete the & in the output (kal&haara, bil&haNuDu)
	var vRegExp = new RegExp(/(\S)(&)(\S)/gm);
	if (vRegExp.test(output)){
		output = output.replace(vRegExp, "$1$3");
	}
	InputElement.value = output;
}
