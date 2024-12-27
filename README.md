MERN stack: Mongodb, Express js, React Native
Tech related: Web scraping, SEO

API design : should be stateless RESTful API - each request contain all info necessary to process certain request, should not remember previous requests; fat model , thin controller

Feature: Password encryption using statless(The server does not store any state about the client session on the server between requests. ) JWT autentication is to store user's log-in state on the server using sessions

MVC framework:

Components of MVC:
-Model: Represents the data and business logic layer of the software. In the context of a web application using MongoDB, models would interact with the database and define the schema for how data is stored and retrieved.

-View: Represents the UI layer of the software. In web applications, views are typically templating files that render data to the user. However, in your case with a React Native frontend, the views would be your React components.

-Controller: Acts as an interface between Model and View components to process all the business logic and incoming requests, manipulate data using the Model component, and interact with Views to render the final output.

ushuaren_ui (View)
Role: This is clearly your View layer, handling all the user interface and user interaction aspects of your application. Since it's built with React Native, it contains all the components and UI logic.
Structure: This part will typically include all your React components, styles, and any utilities related specifically to the frontend presentation.

ushuaren_api (Controller + Model)
Role: This should handle both the Controller and the Model components of the MVC architecture. The API will manage the business logic (Controller) and the data interaction logic (Model).
Structure:
Controllers: Implementing business logic and handling requests, sending commands to the model, and sending responses to the client.
Routes: Defining endpoints that map to the controller functions.
Models: Interacting directly with the database, defining data schemas, and handling CRUD operations.

ushuaren_db
Role: If this is intended to be strictly related to the database operations or configurations, it would generally fall under part of the Model layer in traditional MVC, but in a modern application architecture, especially with Node.js and MongoDB, the model definitions and database interaction logic are usually kept within the API project under the Models directory.
Structure: In most setups, ushuaren_db might not be a separate component but rather integrated into ushuaren_api under the Models. However, if you choose to keep database scripts, backups, or raw data files separate, this could be organized under ushuaren_db. For typical web app projects, this directory isn't necessary unless it serves a specific purpose like storing database migration scripts or large datasets for seeding.

# ushuaren

## set up env

# npx create-expo-app . --template blank

# npm start ( it will start from the set up on the script on package.json file)

# scan qr code

## api -

    - npm init
    - npm install express --save
    - npm install nodemon --save-dev or npm i nodemon --global
    - npm i morgan  (a popular middleware to allow us to see request data right in the console, not saved because it is not dev dependency it is regular dependency )
    - npm start  -> it will start app.js from package.json
    - npm i mongoose@5
    - create server.js to set db connection info
    - npm i eslint prettier eslint-config-prettier eslint-plugin-prettier
    - npm install validator

    - npm i ndb --global -dev-save    (by google node debuger tool , add in server.js debug line and run npm i ndb --global -dev-save )

## password authentication

    -npm i bcryptjs  (password encryption algo for js)
    -npm i jsonwebtoken

## sending reset password email to user

    -npm i nodemailer
    - external sign up: mailtrap

Q & A:
HOW TO KNOW WHICH COLLECTION SHOULD MONGODB WRITE TO?
The line mongoose.model('Category', categorySchema) instructs Mongoose to create a model named Category which will interact with a MongoDB collection named categories. Mongoose automatically looks for the plural, lowercase form of your model name by default. Thus Category becomes categories.

If you want to use a different collection name such as "category" instead of the default "categories," you can explicitly define it when you create the model.

const categorySchema = new mongoose.Schema({
name: {
type: String,
required: [true, 'A category must have a name'],
unique: true
},
description: {
type: String,
default: ''
},
icon: {
type: String
}
}, { collection: 'category' }); // Explicitly setting the collection name to 'category'

const Category = mongoose.model('Category', categorySchema);
