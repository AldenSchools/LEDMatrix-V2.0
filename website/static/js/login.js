var currentUserName = "";
var sessionCookieCount =0;
sessionStorage.setItem("sessionCookieCount", String(sessionCookieCount));


//called from /var/www/cgi-bin/ directory
function login(userName){
	//sessionStorage.setItem("uname",userName);
	window.location.href = '../led-matrix/matrix.html';
			/*$.ajax({
			 	type: "GET",
			      	url: "/cgi-bin/login.py",
				data: {param: dataString},
			     context: document.body
			});	*/
}

function logout(userName){
	console.log(userName);
	//window.location.href = 'index.html';
}

function displayPass(userName, password) {
	document.getElementById("user-pass").innerHTML = 'Your password is: <span style="color: green; font-weight: normal"> '+password+'</span>';
}

function registerSuccess(userName, password) {
	document.getElementById("register-success").innerHTML = 'Congratulations <span style="font-weight: bold"> '+userName+'</span> has been registerd.';
	document.getElementById("new-pass").innerHTML = 'Your password is: <span style="font-weight: bold"> '+password+'</span>';
}

function registerFailed(userName) {
	window.onload = function () { document.getElementById("bad-username-register").innerHTML = 'Username "'+userName+'" is not available, please try another.';}
}

function badCreds(userName, formType){
	
	if(formType == "login"){
		document.getElementById("bad-credentials").innerHTML = "Incorrect username or password, please try again.";
	} else if (formType == "forgot-pass"){
		document.getElementById("bad-username-forgot").innerHTML = "Username is not valid or does not exists.";
	} else if (formType == "register-admin") {
		document.getElementById("bad-creds-admin").innerHTML = "Incorrect username or password, please try again.";
	}
}

function loadSession(){
	let sessionType = sessionStorage.getItem("session0");
	let sessionSuccess = sessionStorage.getItem("session1");
	let userName = sessionStorage.getItem("session2")
	//console.log("session-type " + sessionType);
	//console.log("session-success " + sessionSuccess);
	
	if(sessionType  == "login" &&  sessionSuccess == "true"){
		
	} else if (sessionType  == "login" &&  sessionSuccess == "false") {
		badCreds(userName, sessionType);
	} else if (sessionType  == "register"  &&  sessionSuccess == "true") {
		registerSuccess(userName);
	} else if (sessionType  == "register" &&  sessionSuccess == "false") {
		registerFailed(userName);
	} else if (sessionType  == "register-admin" &&  sessionSuccess == "true") {
		registerSuccess(userName, sessionStorage.getItem("session3"));
	} else if (sessionType  == "register-admin" &&  sessionSuccess == "false") {
		badCreds(userName, sessionType);
	} else if (sessionType  == "forgot-pass" &&  sessionSuccess == "true") {
		 displayPass(userName, sessionStorage.getItem("session3"));
	} else if (sessionType  == "forgot-pass" &&  sessionSuccess == "false") {
		badCreds(userName, sessionType);
	} 
}


function saveSessionVariable(sessionVar){
	
	
	//console.log("sessionCookieCnt " +sessionStorage.getItem("sessionCookieCount"))
	
	var sessionCnt = Number(sessionStorage.getItem("sessionCookieCount"));
	sessionStorage.setItem("session"+String(sessionCnt), String(sessionVar));
	//console.log("cnt before "+sessionCnt);
	sessionCnt++;
	//console.log("cnt after "+sessionCnt);
	sessionStorage.setItem("sessionCookieCount", String(sessionCnt));
	
	//console.log("sessionCookieCnt " +sessionStorage.getItem("sessionCookieCount"));
	
	//console.log("");
	//console.log("");
	
}

function updateSessionCookieCnt(){
	var sessionCnt = Number(sessionStorage.getItem("sessionCookieCount"));
	sessionCnt++;
	//console.log("cnt after "+sessionCnt);
	sessionStorage.setItem("sessionCookieCount", String(sessionCnt));
}

function getNextAvailableSessionNum(){
	return Number(sessionStorage.getItem("sessionCookieCount"))+1;
}

loadSession();
