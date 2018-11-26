/* facebook logging in and out */
var serverAddress = "https://cors.io/?http://18.188.247.247:9000";
var currentFacebookId = "";
var currentName = "";
var correct = -2;
var total = -2;
$(document).ready(function(){

    $("#acctButton").click(function(){
    	window.open ('https://www.traveltrivia.fun','_parent',false);
    });
    var decodedCookie = decodeURIComponent(document.cookie).split("=")[1];
    var jsonObj = JSON.parse(decodedCookie);
    currentName = jsonObj.name;
    document.getElementById("fbname").innerText = currentName;
	currentFacebookId = jsonObj.id;
	getCorrect();
	getTotal();
});

function onGetCorrectOrTotal()
{
	if(correct != -2 && total != -2)
	{
		document.getElementById("percent").innerText = ((correct/total)*100).toFixed(0);
		var doughnutData = [
	        {
	            value: parseInt(correct),
	            color:"#2ecc71"
	        },
	        {
	            value : parseInt(total),
	            color : "#CC2E89"
	        }
	    ];
		new Chart(document.getElementById("doughnut").getContext("2d")).Doughnut(doughnutData);
	}
}


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
					scoreTxt.innerText =  result.correct;
					$('#errorMessage').text("");
					
					correct = result.correct;
					onGetCorrectOrTotal();
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
					scoreTxt.innerText = result.total;
					$('#errorMessage').text("");
					
					total = result.total;
					onGetCorrectOrTotal();
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