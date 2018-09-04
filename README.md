# **2811ICT-Project**
*A Client Server Chat Application based on NodeJS, Express, and Angular created as Part 1 of 2 for the 2811ICT Web Development Course in the Computer Science program at Griffith University, Australia*

## Introduction

## Layout of Git Repository
The project is separeted into two sections *Client* which contains the angular project and *Server* which contains the nodeJS and Express project for the REST API. The client and server projects were managed within a single git repository

### Client Folder
The client folder contains the root folder of the Angular project and has several files and folders including: 

##### Dist
The "dist" folder is not visible in git repository as it is created during ng build and contains the compiled development version of the project. It is this folder that the NodeJS/Express server points to as a static folder for serving the client side content of the site.

##### e2e
Contains files related to compiling the angular project

##### src 
The source folder contains the angular project files that will be worked on during development. It is the files in this folder that will be used to complile the angular project into the dist folder. More details about the content of this folder will be provided in the Angular Architecture secction of this document.

##### Node Modules
The node_modules contains packages installed via the npm package manager that is build into node. Angular is one of these packages.

##### Files 
There are several files in the client folder, the most important being the package-json file which contains the information required to rebuild the node_modules folder. Another very important file here is the .gitignore file which tells git to exclude certain files or folders which doing commits (for example the dist and node_modules folders).

### Server Folder
The server folder is the root of the NodeJS/Express project and contains the project the provides REST API. It contains several important files and folders including:

##### Data
The Data folder contains the JSON file "data.json" that serves as a data storage method in the interim until a database server is added to the project. Additionally it has a data.js file which was intended to provide a central place for managing read/write access to various parts of the JSON file but it was not implemented due to time constraints and will be updated in Part 2 of the project if there is still a requirement to store any JSON data to file.

##### Node Modules
The node_modules folder contains packages installed via the npm package manager that is build into node. NodeJS and Express are some of these packages.

##### Routes
The routes folder contains several javascript files which split the REST API functionality across several areas such as users, channels, groups, login, etc. Each one provides a separate part of the API. There is more detail about the specific routes in the Routes section of this document.

##### Files 
There are several files in the server folder, the most important being the package-json file which contains the information required to rebuild the node_modules folder. Another very important file here is the .gitignore file which tells git to exclude certain files or folders which doing commits (for example the node_modules folders). Additonally there is a listen.js file which configures the http server part of the project to listen on port 3000 and also the server.js file which is the starting point for node project.

## Git Repository Usage
Single developer projects sometimes don't require the full set of tools provided by git, however the branch and merge functionality is something that could have been used to better manage the project as opposed to just a sequential series of commits that happens with a single developer project. 

The workflow for this project was a series of sequential add, commits with a revert to an earlier commit when the project went slightly off track. 

The git commits generally followed the pattern of a separate commit for each new feature or part of the project with additional commits for bug fixes or extra functionality. 

In hindsight the more effective workflow of a branch for each new feature would have enabled working on separate parts of the project in a non sequential way.

## Server Data Structures
For Part 1 of the project a JSON file was used to store all data. The main sections of the JSON file are described below:

##### Users
Users are stored in a JSON array of objects and include id, name, email parameters stored as key:value pairs.

##### Roles
User Roles are stored in a JSON array of objects and include roleid, role name and role description key:value pairs

##### Channels
Channels are stored in a JSON array of objects and include channel id, channel name and channel description key:value pairs.

##### Groups
Groups are stored in a JSON array of objects and include group id, group name and group description key:value pairs.

##### User_Group
User_Group contains the users that belong to a specific group and are stored in a JSON array of objects and include user id and group id key:value pairs.

##### Group_Channel
Group_Channel contains the channels that belong to a specific group and are stored in a JSON array of objects which include group id and channel id key:value pairs.

##### User_Role
UserRole contains the relationship between users and roles (eg: the role/s assigned to each user) and are stored in a JSON array of objects containing roleid and userid key:value pairs.

## Angular Architecture
Describe your *Angular architecture in terms of components, services, and models.
components, services, models, routes
### Menu
The *menu component* works with the *Session Service* to generate the navigation bar view and controls which parts of the menu are available for each user role.

### Login
The *Login Component* creates the login view and via the *Login Service* it sends requests to the REST API to log a valid user in and out.

### User component and service
The *User Component* generates a table view of the Users data and via the *User Service* it adds, updates, deletes and gets users from the REST API.

### Chat component and service
The *Chat Component* will provide a view of the current channel in part 2 of the project

### Groups component and service
The *Groups Component* provides a table view of the groups data and uses the *Groups Service* to communicate with the REST API allowing add, update, delete and get functionality.

### Channels component and service
The *Channels Component* provides a table view of the channels data and allows for adding, updating, deleting and getting channels via the *Channels Service* and the REST API.

### Roles component and service
The *Roles Component* provides a table view of the user roles data and uses the *Roles Service* to communicate with the REST API for add, delete, update and get functionality.

### Channel-Users component and service
The *Channel-Users Component* works on conjunction with the *Channel-Users Service* to provide a Master/Detail view of the users in each channel. Unfortunately it was not completely implemented for Part 1 due to time constraints but when completed will provide a view for adding and deleting users from specific channels.

### Group-Channels component and service
The *Group-Channels Component* working in conjuntion with the *Channel-Users Service* to provide and interface to the REST API provides a Master/Detail view of the channels assigned to each group with the ability to add and delete channels from each group. Unfortunately due to time constraints this was not fully implemented in Part 1 of the project. 

### Group-Users component and service 
The *Group-Users Component* via the *Group-Users Service* acting as an interface to the REST API provides a Master/Detail view of the users contained in each group with the ability to add and delete users from each group. Unfortunately due to time constraints this was not fully implemented in Part 1 of the project. 

### The Session Service
It quickly became clear that while the user login details for a successful login are stored in local session storage that it would be difficult for other components in the angular system to notice changes in these session variables. A singleton service *SessionService* was created which provided a single instance of a service that handled reading and writing of session variables.

Additionaly it was configured as an observable so that components could subscribe to it and be notified by an event whenever a session variable was changed which made it very easy to enable and disable various parts of the view depending on the login details stored in the session variables without needing to poll/check them constantly.

## Routes (REST API)
parameters, returnvalues, purpose
### User Routes

### Role Routes

### Groups Routes

### Channels Routes

### Login Routes






