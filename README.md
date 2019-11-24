# LEDMatrix-V2.0

[![python-version](https://img.shields.io/github/pipenv/locked/python-version/AldenSchools/LEDMatrix-V2.0)](https://www.python.org/) [![django-version](https://img.shields.io/github/pipenv/locked/dependency-version/AldenSchools/LEDMatrix-V2.0/django)](https://www.djangoproject.com/)  [![pytz-version](https://img.shields.io/github/pipenv/locked/dependency-version/AldenSchools/LEDMatrix-V2.0/pytz)](https://pypi.org/project/pytz/) [![sqlparse-version](https://img.shields.io/github/pipenv/locked/dependency-version/AldenSchools/LEDMatrix-V2.0/sqlparse)](https://pypi.org/project/sqlparse/) [![pillow-version](https://img.shields.io/github/pipenv/locked/dependency-version/AldenSchools/LEDMatrix-V2.0/pillow)](https://pypi.org/project/Pillow/) [![jquery-version](https://img.shields.io/badge/jQuery-v3.4.1-blue)](https://jquery.com/) [![bootstrap-version](https://img.shields.io/badge/bootstrap-v4.3.1-blue)](https://getbootstrap.com/) [![fontawsome-version](https://img.shields.io/badge/fontawsome-v5.10.0-blue)](https://fontawesome.com/) 
 [![licence-info](https://img.shields.io/badge/licence-MPL2.0-green)](https://www.mozilla.org/en-US/MPL/2.0/) 



![Home page](https://github.com/AldenSchools/pictures-and-media/blob/master/LEDMatrix/v2.0/home-page-demo.png)

![Creating a drawing](https://github.com/AldenSchools/pictures-and-media/blob/master/LEDMatrix/v2.0/create-page-demo.png)


![Admin dashboard](https://github.com/AldenSchools/pictures-and-media/blob/master/LEDMatrix/v2.0/admin-dash-demo.png)

![Components used](https://github.com/AldenSchools/pictures-and-media/blob/master/LEDMatrix/Components.jpg)

![Everything together](https://github.com/AldenSchools/pictures-and-media/blob/master/LEDMatrix/LEDMatrix-Demo.jpg)




LED Matrix lets users to draw on N x N grid that simulates a physical LED matrix of the same dimention N is how many leds per row and column.
after users draw what they want they can send it for review wehre an administrator with an administrator account can look at all submission and choose which 
one to send to the physical LED matrix for displaying. The Physical LED matrix will display exactly what the user drew.

## Motivation
This project was created for the students of Alden Schools to help them engage with technology and maybe inspire them as well as for fun.

 
## Folder Structure Conventions


    .
    ├── LEDMatrix               # Main project folder
    │   ├── 3dfiles             # Files for the 3d printer 
    │   │   └── ...
    │   ├── arduino             # Stores all Arduino code and libraries
    │   │   └── ...
    │   └── webapp              # The main website application, stores all of the components used on the webapp
    │       ├── data_handling   # A sub-component of the whole webapp, (more details below)
    │       │   └── ...
    │       ├── html_templates  # All of the HTML files used to build the website
    │       │   └── ...
    │       ├── manage.py       # A convinience script to run django commands
    │       ├── pages           # A sub-component of the whole webapp, (more details below)
    │       │   └── ...
    │       ├── site_config     # A sub-component of the whole webapp, (more details below)
    │       │   └── ...
    │       ├── static          # Stores static files used by the webapp such as CSS/JavaScript/Pictures
    │       │   └── ...
    │       └── users           # A sub-component of the whole webapp, (more details below)
    │           └── ...
    ├── LICENCE                 # This projects licence file
    ├── LICENSE.django          # Djangos licence file
    ├── Pipfile                 # Describes dependencies that pipenv needs to setup virtual env
    ├── Pipfile.lock            # Describes detail information for each dependency                
    └── README.md               # This file
    
    17 directories, 60 files

### 3dfiles folder

    .
    ├── ...
    │   ├── 3dfiles
    │   │   └── DiffuserFull.scad   # The design used for the 3d printer 
    └──  ...

This file stores scad design for you to be able to 3d print all the parts that we used for this project.

### Arduino folder

    .
    ├── ...
    │   ├── ...
    │   ├── arduino
    │   │   └── 453arduino.ino  # Code that is running in the arduino 
    └── ...

This folder stores all code and libraries used on the arduino.

### Webapp folder

    .
    ├── ...
    │   ├── ...
    │   ├── ...
    │   └── webapp
    │       ├── data_handling   # A component of the webapp, does everything assosiated with getting/sending/displaying data.
    │       │   └── ...
    │       ├── html_templates  # All of the HTML files used to build the webapp structure, used for django templates.
    │       │   └── ...
    │       ├── manage.py       # A convinience script to run django commands.
    │       ├── pages           # A component of the webapp, handles all pages in the webapp.
    │       │   └── ...
    │       ├── site_config     # The webapps main component, stores all of the webapps settings and initial url patterns.
    │       │   └── ...
    │       ├── static          # Stores static files used by the webapp such as CSS/JavaScript/Pictures.
    │       │   └── ...
    │       └── users           # A component of the webapp, handles all user related things such as login/logout/register ect...
    │           └── ...
    └── ...

#### Data handling folder

    .
    ├── ...
    │   ├── ...
    │   ├── ...
    │   └── webapp
    │       ├── data_handling
    │       │   ├── __init__.py           # Tells python to treat this folder as a python package.
    │       │   ├── apps.py               # Tell django that this is an application (or sub-component of the whole webapp).
    │       │   ├── data.py               # Custom file to handle all incomming and outgoing form data.
    │       │   ├── data_send_arduino.py  # Handles the sending of data from the raspberry pi to the arduino.   
    │       │   ├── migrations            # Folder contains all of the database tables that this sub-component used, Automatically populated. 
    │       │   │   └── __init__.py       # Tells python to treat this folder as a python package.
    │       │   ├── tasks.py              # Custom file that handles starting tasks that need to run every. X seconds.
    │       │   └── urls.py               # All of the url patterns for this sub-component/app.
    │       └── ...
    └── ...


#### Html templates folder
    .
    ├── ...
    │   ├── ...
    │   ├── ...
    │   └── webapp
    │       ├── ...
    │       ├── html_templates
    │       │   ├── about.html              # The HTML for an about page (never rendered or used).
    │       │   ├── admin-dashboard.html    # The HTML for the administrator dashboard.
    │       │   ├── auth                    # Stores all HTML files assosiated with user authentication. 
    │       │   │   ├── admin-login.html    # The HTML for an admin login page in this webapp.
    │       │   │   ├── logout.html         # The HTML for a logout out page (never rendered or used).
    │       │   │   ├── user-login.html     # The HTML for regular user login in this webapp.
    │       │   │   └── user-register.html  # The HTML for regular user registration in this webapp.
    │       │   ├── base.html               # This is the main template every other html file in this folder inherit from this file.
    │       │   ├── home.html               # The HTML for the main home/landing page in this webapp.
    │       │   └── matrix.html             # The HTML for the create page in this webapp.
    │       └── ...
    └── ...

#### Pages folder

    .
    ├── ...
    │   ├── ...
    │   ├── ...
    │   └── webapp
    │       ├── ...
    │       ├── ...
    │       ├── ...
    │       ├── pages
    │       |   ├── __init__.py     # Tells python to treat this folder as a python package.
    │       │   ├── admin.py        # Tells Django what to include in djangos default admin page. (localhost:8000/admin).
    │       │   ├── apps.py         # Tell django that this is an application (or sub-component of the whole webapp).
    │       │   ├── migrations      # Folder contains all of the database tables that this sub-component used, Automatically populated. 
    │       │   │   └── __init__.py # Tells python to treat this folder as a python package.
    │       │   ├── models.py       # Specifies all of the tables that this app/compnent needs in the database.
    │       │   ├── tests.py        # Used to run tests on this app/compnent. 
    │       │   ├── urls.py         # All of the url patterns for this sub-component/app.
    │       │   └── views.py        # Used to actually display/render the HTML page to the user with or without extra information.
    │       └── ...
    └── ...


#### Site config folder

    .
    ├── ...
    │   ├── ...
    │   ├── ...
    │   └── webapp
    │       ├── ...
    │       ├── ...
    │       ├── ...
    │       ├── ...
    │       ├── site_config
    |       │   ├── __init__.py     # Tells python to treat this folder as a python package.
    │       │   ├── settings.py     # Stores all of the settings of the whole webapp.
    │       │   ├── urls.py         # All of the initial/top-level url patterns for this webapp.
    │       │   └── wsgi.py         # Used to setup the webserver. 
    │       └── ...
    └── ...

#### Users folder

    .
    ├── ...
    │   ├── ...
    │   ├── ...
    │   └── webapp
    │       ├── ...
    │       ├── ...
    │       ├── ...
    │       ├── ...
    │       ├── ...
    │       ├── ...
    │       └── users
    │           ├── __init__.py     # Tells python to treat this folder as a python package.
    │           ├── admin.py        # Tells Django what to include in djangos default admin page. (localhost:8000/admin).
    │           ├── apps.py         # Tell django that this is an application (or sub-component of the whole webapp).
    │           ├── auth.py         # A custom autentication backend that allows regular users to login without password.
    │           ├── forms.py        # Stores all form field data associated with this webapp
    │           ├── migrations      # Folder contains all of the database tables that this sub-component used, Automatically populated. 
    │           │   └── __init__.py # Tells python to treat this folder as a python package.
    │           ├── models.py       # Specifies all of the tables that this app/compnent needs in the database.
    │           ├── tests.py        # Used to run tests on this app/compnent. 
    │           ├── urls.py         # All of the url patterns for this sub-component/app.
    │           └── views.py        # Used to actually display/render the HTML page to the user with or without extra information.
    └── ...




## Features
 * Authentication
    * Login/Logout
    * Register
    * Hidden admin page for admins, located at http://localhost:8000/users/admin-dash/login
 * Users
    * Create a drawings
    * Save drawings
    * Load a saved drawing
    * Submit a drawing for admin review
    * Delete a drawing
    * View drawings currently showing on the physical LED matrix
  * Admin
    * Able to do everything a regular user can do
    * Aprove/Deny drawings to be displayed on the physical LED matrix
    * Block users (blocking prevents users form submitting drawings but they are still able to create/save drawings)
    * Remove users
    * Change the LED matrix settings
    * View all submission history



## Setup/Installation

We created this project mainly to run on a Raspberry Pi running a version of linux, however this setup guide should also work if your running some version of debian linux on your system. If your running something other than that you can still follow along just know that some commands might be different. 

### Make sure you have Python and Pip
If you already have python and pip installed you can skip this step. You can check if your system has python install by opening up a terminal and typing in. 

```sh
your@machine:~$ python --version 
```

This should tell you what version of python your machine has, if it does not output anything or it gives an error you dont have python installed on your machine. If you are the latter case then install python on debian with this command.

```sh
your@machine:~$ sudo apt install python3 
```

Now we can install pip. Pip is a package manager for python. If you already have pip installed on your machine you can skip this step.

To install pip type this command

```sh
your@machine:~$ sudo apt install python3-pip 
```

### Setup your virtual environment with Pipenv
If you already have Pipenv installed you can skip this step. 

>"Pipenv is a tool that aims to bring the best of all packaging worlds(bundler, composer, npm, cargo, yarn, etc.) to the Python world.
It automatically creates and manages a virtualenv for your projects, as well as adds/removes packages from your Pipfile as you install/uninstall packages. It also generates the ever-important Pipfile.lock, which is used to produce deterministic builds. Pipenv is primarily meant to provide users and developers of applications with an easy method to setup a working environment" 

You can read more about Pipenv [here](https://pipenv.kennethreitz.org/en/latest/) it is a very useful tool to use when working with Python.

To install Pipenv make sure that pip is installed and type this command...
```sh
your@machine:~$ pip install pipenv
```
or if the above command gave an error and you are running python2 you might or might not have to type this instead.
```sh
your@machine:~$ sudo python -m pip install pipenv
```
### Install dependencies and make your virtual environment 


We are going to make a virtual environment that works with this project. The files 'Pipfile' and 'Pipfile.lock' on this project are two very important files. Those files tell pipenv how to set up the python virtual  environment and also lets pipenv know what dependencies/packages (ex. Django) this project uses so that everything works out of the box.

To make a virtual environment for this project simply download this project on your machine and go to the projects root folder and type this command
```sh
your@machine:~$ pipenv install
```
This will create and install every package that was used in this project it will even install the correct python verson that was used in the project if you dont have it.

NOTE: 
    
If you get an error trying to install Pillow simply install a package called libjpeg-dev to your system and try this step again
if you are running a debian based distribution just type this. 

```sh
your@machine:~$ sudo apt install libjpeg-dev
```


### Activate your virtual environment
This step is useful if your using this project to expand and/or development. However, if you you just want to deply it on your target machine feel free to skip this step since there is no need to activate your virtual environment. 

Now that you have installed all of this projects dependencies and made a virtual environment you can activate your virtual environment with 
```sh
your@machine:~$ pipenv shell
```
This makes a Python virtual environment in the system that you can work. 
you you should now see a name in parenthesis before your macine name like this 

```sh
(Your virtual env) your@machine:~$ 
```

## Setup 
Now that you have installed all everything you need to run django there are a few things we need to setup before we actually run django.

### Create/Setup your database 
To create a database in django you must first go to the directory where manage.py (in folder LEDMatrix/webapp) and type these commands.
```sh
(Your virtual env) your@machine:~$ python manage.py makemigrations
(Your virtual env) your@machine:~$ python manage.py migrate
```
These commands will crete a sqlite3 databse file named 'db.sqlite3' on the same folder and initialize it with the proper database tables and fields.

### Create a superuser/admin for this project
In order to see what is in the database and to be able to have admin the permision to approve a drawing to send to the LED matrix you must first crate a superuser(admin). 

To create an admin account type in this in in terminal
```sh
(Your virtual env) your@machine:~$ python manage.py createsuperuser
...
...
```
This will walk you through creating a superuser account for this project and will store the information in the database. 


Note: Passwords in the datbase are not stored as plain text they are all hashed.

### Run the django server
Finally you can run the django server with this command
```sh
(Your virtual env) your@machine:~$ python manage.py runserver
```
Type the address that this command outputted into your browser it should be 'localhost:8000' (the same as 127.0.0.1:8000)

## Deployment
When getting ready to deploy this webapp make sure you do a couple things 
1. Make sure debug is set to off, leaving this on will give detailed stacktraces and all of the available urls in the website when an error occurs. To set debug to off go to this file [LEDMatrix/webapp/site_settings/settings.py](LEDMatrix/webapp/site_config/settings.py) find DEBUG variable and set it to False.
2. It is reccomended to change the private key of the website, this private key is used to generate hashes so its pretty important. Depending on your situation you might need or might not need to generate a new key. To change the private key go to this file [LEDMatrix/webapp/site_settings/settings.py](LEDMatrix/webapp/site_config/settings.py) find the SECRET_KEY variable and use a generator a custom program to generate a new SHA256 hash and place it in the mentioned variable.

## How to use?
Now that you have setup your environment and installed  everything you need to run django here is how to use it. 



## Credits
 * James Daniel for his awsome [Iro](https://iro.js.org/) color picker.

## License
This Project is under the Mozzila Public Licence 2.0

[Django](https://www.djangoproject.com/) and the [Iro](https://iro.js.org/) color picker used in this project are under the MIT licence.

It is 100% free for personal and commercial use.

MPL 2.0 © [LED Matrix Team](https://github.com/AldenSchools)
