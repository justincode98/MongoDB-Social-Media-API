# MongoDB Social Media API
This project uses MongoDB, Mongoose, Express, and Moment.js to create the backend for a hypothetical social media site. 

Models: User, Thoughts

Routes contain routes used in the API calls.

Controller contain implementation of the calls.

Utils contains only dateFormat, which uses Moment.js for timestamping.

## Installation
Download the code and run **npm install** , then run **npm start**

## Usage
After running **npm start**, use insomnia to make requests. Server runs on port 3001, routes can be found in their respective route files. 

## Known Issues
Remove Reaction currently not working - request goes through but does not delete
