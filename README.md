# MNGR 

MNGR is an intuitive project management app that allows users to
- Track multiple projects
- Create project-specific tasks
-  Assign tasks to other users
- Track task details
	-  Status
	* Start Date
	* Estimated Complete Date
----
<br>
## Tech Used
- Node.JS
- ExpressJS (Web Server)
- Heroku (Web Hosting)
- MySQL (Database)
- Sequelize (ORM)
- Handlebars (Templating Engine)
- Sass (CSS Style Library)
- Passport (User Validation)
<br>

## Getting Started
*To setup and run the application locally, follow these steps*
1. Clone the repo 
```
git clone git@github.com:lukeduran/project-two.git
```

2. Navigate to the the directory you saved the repo to

3. Install dependencies 
``` 
npm install
```
4. Create a local instance of the MySQL database
a. From your MySQL Workbench, create a new Query Tab
b. Paste the following code into the new query
```
DROP DATABASE IF EXISTS project_two;
CREATE DATABASE project_two;
USE project_two;
```
c. Select and execute the script
4. Create a new local .env file
a. Create a new file named `.env`
b. Paste the following code
``` 
DB_HOST="localhost"
DB_USER=""
DB_PASSWORD=""
DB_DATABASE="project_two"
```
d. Update the `DB_USER=""` to `DB_USER="root"` or whatever username your MySQL session is running on
e. Update the `DB_PASSWORD=""` to `DB_USER= "<your password>" `
f. Save the file

6. Run the following code from your command line
```
node server.js 
```
7. From your browser, naviage to `localhost:3000`

<br>
##Contributors
@jstevens79 @lukeduran @mprestonsparks @ctracey92 
