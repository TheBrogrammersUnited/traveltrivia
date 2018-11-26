/* facebook logging in and out */
var serverAddress = "https://cors.io/?http://18.188.247.247:9000";
var currentFacebookId = "";
var currentName = "";

$(document).ready(function(){

    $("#acctButton").click(function(){
    	window.open ('https://www.traveltrivia.fun','_parent',false);
    });
    var decodedCookie = decodeURIComponent(document.cookie).split("=")[1];
    var jsonObj = JSON.parse(decodedCookie);
    currentName = jsonObj.name;
	currentFacebookId = jsonObj.id;
	getCorrect();
	getTotal();

});



/* travel trivia server communication */
function getCorrect() {
	var requestStr = "get-correct/" + currentFacebookId;
	var urlStr = serverAddress + "/" + requestStr;
	console.log("trying: " + urlStr);
	$.ajax(
			{
				type : "GET",
				url  : urlStr,
				data : {
				},
				dataType : 'json',
				success : function(result) {
					var scoreTxt=document.getElementById("correctText");
					//var resultObj = JSON.parse(result);
					scoreTxt.innerText = "You have gotten " + result.correct + " answers correct.";
					$('#errorMessage').text("");
					//
				},
				error: function (jqXHR, exception, err) {
					$('#errorMessage').text("Failed to access TravelTrivia server: " + exception +", " + err);
				}
			});
}
function getTotal() {
	var requestStr = "get-total/" + currentFacebookId;
	var urlStr = serverAddress + "/" + requestStr;
	console.log("trying: " + urlStr);
	$.ajax(
			{
				type : "GET",
				url  : urlStr,
				data : {
				},
				dataType : 'json',
				success : function(result) {
					var scoreTxt=document.getElementById("totalText");
					//var resultObj = JSON.parse(result);
					scoreTxt.innerText = "You have attempted " + result.total + " questions in total.";
					$('#errorMessage').text("");
					//
				},
				error: function (jqXHR, exception, err) {
					$('#errorMessage').text("Failed to access TravelTrivia server: " + exception +", " + err);
				}
			});
}

/*this is just an example POST request, unused */
function setXml(xmlStr) {
	if (xmlStr) {
		var str = "debug";
		if(live == 1) {
			str = "live";
		}
		$.ajax(
				{
					type : "POST",
					url  : "/dl_" + xmlType + "/newXml",
					data : {
						"newXml" : xmlStr,
						"live" : live
					},
					success : function(result) {
						location.reload();
					},
					error: function (jqXHR, exception) {
						alert("Failed to send xml file.");
					}
				});
	} else {
		alert("Invalid xml string");
	}
}