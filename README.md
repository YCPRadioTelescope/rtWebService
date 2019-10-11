# Radio telescope Webservice

A  webService to retrieve data from the control room

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing

Clone the project<br/>
In the terminal navigate into the project folder<br/>
run npm install<br/> 

## Running the Service

In the terminal, navigate to the project folder<br/>
run node index.js

## Deploying to AWS

Set up Docker Desktop on your machine https://www.docker.com/products/docker-desktop<br/>
navigate to the project in the terminal<br/>
run docker build -t 'your username'/node-web-app . to create a new docker container <br/>
run docker run -p 49160:8080 -d 'your username'/node-web-app to test <br/>
run docker ps to get the container id<br/>
run docker logs 'container id' to ensure the app ran correctly<br/>
run  zip ../myapp.zip -r * .[^.]* to create a zip bundle for aws<br/>
Login to AWS and go to the elastic beanstalk console<br/>
Click on the beanstalk itself 
In the middle where it says running version, click upload and deploy<br/>
Upload the newly zipped bundle<br/>



