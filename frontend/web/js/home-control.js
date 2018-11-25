/* facebook logging in and out */
var serverAddress = "https://18.188.247.247:9000";
var currentFacebookId = "";

window.fbAsyncInit = function() 
{
    FB.init({
      appId      : '768723920131103',
      cookie     : true,
      xfbml      : true,
      version    : 'v3.2'
    });
      
    FB.AppEvents.logPageView();

	FB.getLoginStatus(function(response) {
	    statusChangeCallback(response);
	});

	FB.Event.subscribe('auth.login', function(response) {
        statusChangeCallback(response);
    });   
      
 };

function statusChangeCallback(r)
{
	 console.log(r);
	 if(r.status == "connected")
	 {
	 	onLoggedIn();
	 }
	 else
	 {
	 	onLoggedOut();
	 }
}


function onLoggedIn()
{
	console.log("onLoggedIn called");
	var welcomeParagraph = document.getElementById("welcome");
	FB.api('/me', function(response) 
	{
	    console.log(JSON.stringify(response));
	    welcomeParagraph.innerText = "Welcome " + response.name + "!";
	    currentFacebookId = response.id;
	    getCorrect();
		getTotal();
	});

	document.getElementById("logInDiv").style.display = "none";
	document.getElementById("loggedInDiv").style.display = "block";


}

function onLoggedOut()
{
	document.getElementById("logInDiv").style.display = "block";
	document.getElementById("loggedInDiv").style.display = "none";
	FB.logout();
}

function submit()
{
	print("test");
}
$(document).ready(function(){

    $("#logoutButton").click(function(){
    	onLoggedOut();
    });
});


(function(d, s, id)
{
 var js, fjs = d.getElementsByTagName(s)[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement(s); js.id = id;
 js.src = "https://connect.facebook.net/en_US/sdk.js";
 fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));



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
				success : function(result) {
					var scoreTxt=document.getElementById("correctText");
					scoreTxt.innerText = "Your have gotten " + result.correct + " answers correct.";
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
				success : function(result) {
					var scoreTxt=document.getElementById("totalText");
					scoreTxt.innerText = "Your have attempted " + result.total + " questions in total.";
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