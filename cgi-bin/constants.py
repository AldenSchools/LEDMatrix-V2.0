
import string
import sys



def mainSite(userName):
	return """<script type="text/javascript">  login('%s'); </script>""" % userName
		 		
def forgotPass(userName, password):
	return """	Redirecting...
				<script type="text/javascript">  window.location.href = '../led-matrix/forgot-pass.html'; </script>
		 		""" #% (userName,password)

def registerSuccess(userName):	 		
	return """LED Matrix Register
			  Redirecting...
			<script type="text/javascript">  window.location.href = '../led-matrix/register.html'; </script> """ #% userName
		 		
		 		
def registerFailed(userName):
	return """<script type="text/javascript">  window.location.href = '../led-matrix/register.html'; </script>	""" #% userName
	
def registerAdmin(userName):	 		
	return """LED Matrix Register
			  Redirecting...
			<script type="text/javascript">  window.location.href = '../led-matrix/register-admin.html'; </script> """ #% userName


def wrongCreds(userName,formType):	 		
	return """<script type="text/javascript"> window.location.href = '../led-matrix/index.html'; </script> """ #% (userName, formType)
	
	
def addSession(sessionVar):
	return """<script type="text/javascript"> saveSessionVariable('%s');</script>""" % sessionVar
	
	
	
def clearSession():
	return """<script type="text/javascript"> sessionStorage.clear();</script>"""
	
	
	

	
def startHtml():
	return """Content-type: text/html\n\n 
		 	<!doctype html>
			<html lang="en">
				<head>
					<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
					<meta name="viewport" content="width=device-width, initial-scale=1"> 
					<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
					<script type="text/javascript" charset="utf-8" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
					<!--<script type="text/javascript" src="src/main.js"></script>-->
					<script type="text/javascript" src="../led-matrix/src/login.js"></script>
					<link rel="stylesheet" type="text/css" href="../led-matrix/css/login.css">
					<title>LED Matrix</title>

				</head>
				<body>

		 		
		 		"""

	

def loginBodyHtml():
	return """
	<div class="login-box">
    <img src="../led-matrix/images/avatar3.png" class="avatar" />
        <h1> Welcome to Makerspace</h1>
        <h2>Login Here</h2>
        <form class="login-form" action="../cgi-bin/login.py" method="get">
			<p style="color: red; font-weight: normal" id="bad-credentials"></p>
			<p style="font-weight: normal; font-size: 12px">If you dont wish to save your work you can login with username 'tmp' and no password</p>
			<br/>
			
            <p>Student's Username</p>
            <input id="currentUserName" type="text" name="user-name" placeholder="Enter Username" required>
            
            <p>Password</p>
            <input type="password" name="password" placeholder="Enter Password"/>
            
            <input type="hidden" name="form-type" value="login"/>
            <input type="submit" onclick="getCurrentUser()" value="Login"/>
            <a href="forgot-pass.html">Forgot your password?</a><br>
            <a href="register.html">Don't have an account? Register here</a>
            
        </form>
	</div>
	"""		 		

def registerBodyHtml():
	return """
	<div class="register-box">
    <img src="../led-matrix/images/avatar3.png" class="avatar" />
        <h1> Welcome to Makerspace</h1>
        <h2>Register Here</h2>
        <form class="register-form" action="" method="get">
			<p style="color: red; font-weight: normal" id="bad-username-register"></p>
			<p style="color: green; font-weight: normal; font-size: 12px" id="register-success"></p>
			</br>
            <p>Enter New Username</p>
            <input type="text" name="user-name" placeholder="Enter Username" required>
            <p style="color: green; font-weight: normal" id="user-pass"></p>
            
            <input type="hidden" name="form-type" value="register">
            <input type="submit" onclick="goBackToRegisterPage()" value= "Register!">
            <a href="index.html">Login</a><br>
        </form>
	</div>
	"""	 	
	
def registerAdminBodyHtml():
	return """
	<div class="register-admin-box">
    <img src="../led-matrix/images/avatar3.png" class="avatar" />
        <!--<h1> Welcome to Makerspace</h1>-->
        <h2>Admin Registration</h2>
        <form class="admin-register-form" action="../cgi-bin/login.py" method="get">
			<p style="color: red; font-weight: normal" id="bad-username-admin"></p>
			<p style="color: red; font-weight: normal" id="password-mismatch-admin"></p>
			<br/>
			
            <p>Enter New Admin Username</p>
            <input type="text" name="user-name" placeholder="Enter Username" required>
            
            <p>Password</p>
            <input type="password" name="password" placeholder="Enter Password" required>
            
            <p>Re-enter Password</p>
            <input type="password" name="password-verify" placeholder="Enter Password" required>
            
            <input type="hidden" name="form-type" value="register-admin">
            <input type="submit" onclick="">Register!</button>
            <a href="index.html">Login</a><br>
        </form>
	</div>
	"""
	
def forgotPassBodyHtml():
	return """
	<div class="forgot-box">
    <img src="../led-matrix/images/avatar3.png" class="avatar" />
        <h1> Welcome to Makerspace</h1>
        <h2>Lost Your Password?</h2>
        <form class="forgot-pass-form" action="../cgi-bin/login.py" method="get">
			<p style="color: red; font-weight: normal" id="bad-username-forgot"></p>
			<p style="font-weight: normal" id="user-pass"></p>
			</br>
            <p>Enter Your Username</p>
            <input type="text" name="user-name" placeholder="Enter Username" required>
            
            
            
            <input type="hidden" name="form-type" value="forgot-pass">
            <button type="submit" onclick="">Login!</button>
            <a href="index.html">Login</a><br>
            
        </form>
	</div>
	"""
	
	
	
def endHtml():
	return """</body></html>"""
	
