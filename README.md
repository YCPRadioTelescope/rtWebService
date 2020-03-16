# Radio telescope Webservice

A  webService to retrieve data from the control room

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing

Install the latest version of Node.js: https://nodejs.org/en/

Install Chocolatey: https://chocolatey.org/install

Then Install Yarn: https://classic.yarnpkg.com/en/docs/install/#windows-stable


Clone the project<br/>
In the terminal navigate into the project folder<br/>
run npm install<br/> 

Acquire the config.json file from Todd or one of the other mobile app team members
and place it in the main directory (same area as index.js).
## Running the Service

In the terminal, navigate to the project folder<br/>
run node index.js

The service will attempt to connect to the host, which is production by default.

If you would like to connect to a local backend then install the backend (instructions: https://github.com/YCPRadioTelescope/RT-Contracts)
 and then change "host" in config.json to the address of the local backend
## Deploying to AWS

Go to aws and get an access key and a secret key<br/>
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


## Testing

Run yarn jest

## Common Errors

connect ETIMEDOUT
    at Connection._handleConnectTimeout (C:\....\rtWebService\node_modules\mysql\lib\Connection.js:412:13)
    
This occurs if the production database cannot be reached.
Check if you are connected to the internet and you have a security inbound route set to your IP address.

Instructions to fix:
Log in to AWS <br/>
Click on RDS <br/>
Click on DB instances <br/>
Select ycas-rt-production <br/>
Under connectivity and security, click the link under VPC security groups <br/>
Click the Inbound tab and press edit<br/>
Find your rule (or create a new one if you dont)<br/>
click source and set to my IP<br/>
error should disappear<br/>

  


