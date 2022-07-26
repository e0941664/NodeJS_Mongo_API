# BACKEND DEVELOPMENT WITH NODEJS_MONGODB - REST API

This is a starter project to gain hands-on on how NODEJS can be used to perform CRUD operations with REST API from a persistence database. 
- Framework : Express
- Database  : MongoDB
- Testing Framework : Mocha
- Development tool  : Visual Studio code
- API Platform tool  : Postman

# REQUIRED INSTALLATIONS
    
    Before you run the project make sure you have the following. 

        1) Any code editor tool. I used visual studio code for this. To download, use the following URL: 'https://code.visualstudio.com/download'
        
        2) Node Js. To download, use the following URL: 'https://nodejs.org/en/download/'. I used the LTS version 16.16.0 for this project. 
        
        3) MongoDB: A free account can be created in the cloud based Mongo Atlas which I have made use of in this       
                    project. To create the account and  database, follow the steps provided in the below link 'https://www.mongodb.com/docs/atlas/getting-started/' (change to ATLAS UI for clear understanding if you are not familiar using CLI) and update your respective DB connection end point in the following path '../config/db'. Change MONGO_URI with you respective URI.
        
        4) Postman: For this project, I used Postman to build and test the API. To download, use the following URL: 
                    'https://www.postman.com/downloads/'

# SETTING UP THE CODE
  1) Download the project.
  2) Navigate to the folder path containing the project and open terminal from that path.
  3) If you are using VS Code, open the folder containing the project and open terminal from there.
  4) Run the command 'npm install'. This will install all the dependencies that were added in package.json file. After 
     the installation is successful, you will see node_modules folder generated in the path. 
   
### PACKAGE.JSON

The file holds all the necessary dependencies that we need for this project. We need to run the scripts for the application to run.

Scripts: 

1) The command 'npm run dev' will start the project. This will run the index.js file which is the starting point of our project. We run this project on PORT: 5000.  

2) The command 'npm test' will run the unit test cases we have written for CRUD operations.

3) To stop our application, use 'CTRL + C'. 

# API DOCUMENTATION

The API documentation is published in the following URL: 'https://documenter.getpostman.com/view/20201670/UzXLzxq1'

Download the documentation of the collection from the URL and start you test. 

# GETTING STARTED
## APPLICATION FEATURES

As mentioned, this is a starter project to perform CRUD operations with REST API. We will perform CRUD on user data. To store user data, we create a respective user model and hold basic information about out user.

### USER MODEL

   - _id : user ID (Primary Key, type: String)
   - name : user name (type: String)
   - dob : date of birth (type: String)
   - address : user address (type: String)
   - description : user description (type: String)
   - createdAt : user created Date (type: Date)
  
### FUNCTIONALITY

Once you run 'npm run dev', our project will start running on 'http://localhost:5000/'. To check the CRUD operations on user data, open postman and  send a new request.

The default path that we will be using is 'http://localhost:5000/api/v1/users' and depending on the request method, the respective CRUD operations will occur. Note that the our project should be ruuning for this to work.

#### GET All users
    In Postman, select the GET method, 
    REQUEST: Enter the following details and hit send
               1) URL : 'http://localhost:5000/api/v1/users'
               2) Headers : None
               3) Body : None
    
    RESPONSE: We will get the following responses. If success then we will get SUCCESS response and if we had any error, we will receive the ERROR response

        SUCCESS:
                {
                    success: true
                    count: count of the users returned
                    data: user details
                }
        ERROR : We will get the following response
                {
                    success: false
                    statusCode: 4XX
                    error: error message
                }


#### GET User by id
    In Postman, select the GET method, 
    REQUEST: Enter the following details and hit send
               1) URL : 'http://localhost:5000/api/v1/users/1' (We search by user id  1)
               2) Headers : None
               3) Body : None
    
    RESPONSE: We will get the following responses. If success then we will get SUCCESS response and if we had any 
              error, we will receive the ERROR response

        SUCCESS:
                {
                    success: true
                    data: user detail
                }
        ERROR : We will get the following response
                {
                    success: false
                    statusCode: 4XX
                    error: error message
                }

#### POST Create new user
    In Postman, select the POST method, 
    REQUEST: Enter the following details and hit send
               1) URL : 'http://localhost:5000/api/v1/users'                          
               2) Headers : Content-Type = application/json
               3) Body: {
                            "_id": "1",
                            "name": "First user",
                            "dob": "25-07-1990",
                            "address": "25, post man street, post",
                            "description": "I am the first user here to check the documentation."
                        }
    
    NOTE: The createdAt is optional. We set a default datetime in user model. So it is completely our choice to include the createdAt field

    RESPONSE: We will get the following responses. If success then we will get SUCCESS response and if we had any 
              error, we will receive the ERROR response

        SUCCESS:
                {
                    success: true
                    data: new user data that we created
                }
        ERROR : We will get the following response
                {
                    success: false
                    statusCode: 4XX
                    error: error message
                }

#### PUT Update a user by id
    In Postman, select the PUT method, 
    REQUEST: Enter the following details and hit send
               1) URL : 'http://localhost:5000/api/v1/users/1' (Update the user with id 1)                          
               2) Headers : Content-Type = application/json
               3) Body: {
                            "_id": "1",
                            "name": "Updated First user",
                            "dob": "25-07-1990",
                            "address": "30, post man street, post",
                            "description": "Changed my address"
                        }
    
    NOTE: It is not required to enter all the field we we need to update.

    RESPONSE: We will get the following responses. If success then we will get SUCCESS response and if we had any 
              error, we will receive the ERROR response

        SUCCESS:
                {
                    success: true
                    data: updated data of the user
                }
        ERROR : We will get the following response
                {
                    success: false
                    statusCode: 4XX
                    error: error message
                }

#### DELETE User by id
    In Postman, select the DELETE method, 
    REQUEST: Enter the following details and hit send
               1) URL : 'http://localhost:5000/api/v1/users/1' (We delete the user by id  1)
               2) Headers : None
               3) Body : None
    
    RESPONSE: We will get the following responses. If success then we will get SUCCESS response and if we had any 
              error, we will receive the ERROR response

        SUCCESS:
                {
                    success: true
                    data: No data
                }
        ERROR : We will get the following response
                {
                    success: false
                    statusCode: 4XX
                    error: error message
                }

## UNIT TESTING

Folder Structure: The test cases we have written is present in the following folder path
                    '../test/userdetails.js'

Run Test cases: To run the test cases use the command 'npm test'. This will start and run the test cases we have written.