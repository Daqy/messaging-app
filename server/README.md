# secure-messaging-app server
To run this application, you will need to run `npm i` which will install all node modules requried for this project.

# setting up database
You will also need to set up a local mongodb database with the following tables and databases:

Databases
messaging-app
	-> dm-messages
	-> federated_credentials
	-> groups
	-> server-messages (not needed)
	-> users
sessions
	-> sessions
	
# set up env
env key will also need to be set up, allowing passport js to authenticate the user using google, api needs to be set up on google. Follow passport js tutorial.

# Scripts
once all things are set up run `npm run start` and it should run the server.