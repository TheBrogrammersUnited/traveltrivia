/* facebook logging in and out */
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

$(document).ready(function(){

    $("#logoutbutton").click(function(){
    	onLoggedOut();
    });
    $("#statsbutton").click(function(){
    	window.open ('http://app.traveltrivia.fun','_parent',false);
    });

});

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
	    var baseDomain = '.traveltrivia.fun',
		expireAfter = new Date();
		//setting up  cookie expire date after a week
		expireAfter.setDate(expireAfter.getDate() + 7);
		//now setup cookie
		document.cookie="Data={\"name\":\"" + response.name + "\", \"id\":\"" + response.id + "\"}; domain=" + baseDomain + "; expires=" + expireAfter + "; path=/";

	    
	});

	document.getElementById("logInDiv").style.display = "none";
	document.getElementById("loggedInDiv").style.display = "block";


}
function onLoggedOut()
{
	var welcomeParagraph = document.getElementById("welcome");
	

	document.getElementById("logInDiv").style.display = "block";
	document.getElementById("loggedInDiv").style.display = "none";
	FB.logout();
	document.cookie="Data=";
}


(function(d, s, id)
{
 var js, fjs = d.getElementsByTagName(s)[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement(s); js.id = id;
 js.src = "https://connect.facebook.net/en_US/sdk.js";
 fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

