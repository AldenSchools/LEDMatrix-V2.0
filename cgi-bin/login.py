#!/usr/bin/env python
import sys
import dbhandler as db
import constants as consts
import cgi
import random
import string



#cgi.test()

formData = cgi.FieldStorage()



formType = formData.getvalue('form-type')
userName = formData.getvalue('user-name')
password = formData.getvalue('password')
passwordVerify = formData.getvalue('password-verify')
sessionVar = formType
loginSuccess = ""


#formType = "login"
#userName = "tmp"
html = consts.startHtml() + consts.clearSession();

def logUserIn():
	global html
	if db.userExists(userName) == 1 and db.getUserNameCount(userName) == 1 and db.getUserPass(userName) == password:
		db.logUserIn(userName)
		sketches = db.getSavedSketchNames(userName)
		sessionVar = "login"
		html +=  consts.addSession("login") + consts.addSession("true") + consts.addSession(userName) + consts.addSession(str(len(sketches)))
			
		for i in range(0, len(sketches)):
			sessionVar = sketches[i]
			html +=  consts.addSession(sketches[i])
		html +=  consts.mainSite(userName) + consts.endHtml()
		#print html
			
	else:	
		html += consts.addSession("login") + consts.addSession("false") + consts.addSession(userName)+ consts.wrongCreds(userName, formType) + consts.endHtml()
		#print html
			
def logAdminIn():
	print ""

 
def genPassword(numLetters):
	randomPass =''
	for x in range(0,numLetters):
		randomPass +=  random.choice(string.ascii_letters)
	#print randomPass.lower()
	return randomPass.lower()


if formType == 'login':
	#check for valid user name and pass by database
	if userName == 'tmp':
		html += consts.addSession("login") + consts.addSession("true") + consts.addSession(userName) + consts.addSession("0")+ consts.mainSite(userName) + consts.endHtml()
		#print html
	#elif db.getUserType(userName) == 'admin':  #check if user is administrator  
	else:
		logUserIn()
	
	print html
			
			
		
	
	
if formType == 'register':
	#compute password based on username and add them to database
	randomPass = genPassword(3)
	if db.userExists(userName) == 1:
		html += consts.addSession("register") + consts.addSession("false") +  consts.addSession(userName) +consts.registerFailed(userName) +consts.endHtml()
		#print html
	else:
		db.addUser(userName, "user", randomPass)
		html += consts.addSession("register") + consts.addSession("true") + consts.addSession(userName) + consts.addSession(randomPass)  + consts.registerSuccess(userName) + consts.endHtml()
	print html
		
		
		
			

if formType == 'register-admin':
	if db.userExists(userName) == 1 or passwordVerify != password:
		html += consts.addSession("register-admin") + consts.addSession("false") + consts.addSession(userName) + consts.registerAdmin(userName) + consts.endHtml()
		#print html
	else:
		if passwordVerify == password:
			db.addUser(userName, "admin",password)
			html += consts.addSession("register-admin") + consts.addSession("true") + consts.addSession(userName) + consts.registerAdmin(userName) + consts.endHtml()
	print html
			
			
			
			
			
if formType == 'forgot-pass':
	if db.userExists(userName) == 1 and db.getUserType(userName) == "admin" :
		html += consts.addSession("forgot-pass") + consts.addSession("true") + consts.addSession(userName) + consts.addSession(db.getUserPass(userName)) + consts.forgotPass(userName, password) + consts.endHtml()
		
	elif db.userExists(userName) == 1 and db.getUserType(userName) == "user":
		html += consts.addSession("forgot-pass") + consts.addSession("true") + consts.addSession(userName) + consts.addSession(db.getUserPass(userName)) + consts.forgotPass(userName, password) + consts.endHtml()
		
	else:
		html += consts.addSession("forgot-pass") + consts.addSession("false") + consts.addSession(userName) + consts.forgotPass(userName, password) + consts.endHtml()
	
	print html

if formType == 'logout':
	print ''
	
if formType == 'delete-ketch':
	print ''

if formType == 'save-sketch':
	print ''


#def main():
	

#if __name__ == "__main__":
#	main()
