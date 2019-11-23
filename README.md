# LEDMatrix-V2.0
LED Matrix lets users to draw on N x N grid that simulates a physical LED matrix of the same dimention N is how many leds per row and column.
after users draw what they want they can send it for review wehre an administrator with an administrator account can look at all submission and choose which 
one to send to the physical LED matrix for displaying. The Physical LED matrix will display exactly what the user drew.

## Motivation
This project was created for the students of Alden Schools to help them engage with technology and maybe inspire them as well as for fun.

## Code style


[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
 
## Screenshots

## Folder structure
    .
    ├── LEDMatrix       # Main project folder
    ├── .gitignore      # Tells git what files/folder to ignore when you commit  
    ├── Pipfile         # Describes dependencies that pipenv needs to setup virtual env
    ├── Pipfile.lock    # Describes detail information for each dependency
    ├── LICENSE         # This projects licence file
    |── LICENCE.django  # Djangos licence
    └── README.md       # This file

## Tech/framework used
<b>Built with</b>
- [Django](https://www.djangoproject.com/)
- [JQuery](https://jquery.com/)
- [Python 3.7]()

## Features
 - Users can login/register.
 - Users can save and load drawing.
 - Users can submit drawings for review to be sent to the LED matrix.
 - Admin can aprove/deny which drawing to send to send to the physical LED matrix.
 - Admin can remove/bock any user.
 - Admin can change the settings of the LED matrix (on/off, delay, time to start, etc...).
 - Admin can view all submission history for showing anytime.



## Setup/Installation

Our target operating system is debian Linux so if your running something other than that you can still follow along just know that some commands mitght be different. 

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

"Pipenv is a tool that aims to bring the best of all packaging worlds(bundler, composer, npm, cargo, yarn, etc.) to the Python world.

It automatically creates and manages a virtualenv for your projects, as well as adds/removes packages from your Pipfile as you install/uninstall packages. It also generates the ever-important Pipfile.lock, which is used to produce deterministic builds. Pipenv is primarily meant to provide users and developers of applications with an easy method to setup a working environment" You can read more about Pipenv [here](https://pipenv.kennethreitz.org/en/latest/) it is a very useful tool to use when working with Python.

To install Pipenv make sure that pip is installed and type this command...
```sh
your@machine:~$ pip install pipenv
```
or if the above command gave an error and you are running python2 you might or might not have to type this instead.
```sh
your@machine:~$ sudo python -m pip install pipenv
```
### Make your virtual environment
We are going to make a virtual environment that works with this project. The files 'Pipfile' and 'Pipfile.lock' on this project are two very important files. Those files tell pipenv how to set up the python virtual  environment and also lets pipenv know what dependencies/packages (ex. Django) this project uses so that everything works out of the box.

To make a virtual environment for this project simply download this project on your machine and go to the projects root folder and type this command
```sh
your@machine:~$ pipenv install
```
This will create and install every package that was used in this project it will even install the correct python verson that was used in the project if you dont have it.


### Activate your virtual environment
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

### Create setup your database 
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

## How to use?
Now that you have setup your environment and installed  everything you need to run django here is how to use it. 



## Credits
 * James Daniel for his awsome [Iro](https://iro.js.org/) color picker

#### Anything else that seems useful

## License
This Project is under the Mozzila Public Licence 2.0

[Django](https://www.djangoproject.com/) and the [Iro](https://iro.js.org/) color picker used in this project are under the MIT licence.

It is 100% free for personal and commercial use.

MPL 2.0 © [LED Matrix Team](https://github.com/AldenSchools)
