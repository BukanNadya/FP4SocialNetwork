# FP4SocialNetwork

## Frontend Part:

This project was bootstrapped with Create React App

### To set up this project on your local machine, please follow these steps:

- Clone the repository: Start by cloning the repository to your local computer using the following command:

```shell
git clone
```

- Install dependencies: After cloning the repository, you need to install the necessary dependencies.
This project uses Node Package Manager (npm) to manage these dependencies. Running npm install downloads and installs all the required packages and dependencies listed in the package.json file.
This command ensures that your local environment has the same packages and versions as the development environment, allowing the project to run smoothly without any compatibility issues. To install them, navigate to the project directory and run the following command:
```shell
# if you're not in the social-network-ui/ yet
cd social-network-ui

npm install
```

- Start the project: With all the dependencies installed, you can now start the project by running the appropriate command, such as:
```shell
# if you're not in the social-network-ui/ yet
cd social-network-ui

npm start
```

## Available Scripts

In the `social-network-ui/` directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000] to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

### `npm test`
Launches the test runner in the interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.
App is ready to be deployed!

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**
If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from project.
Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.
You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
____
## Backend Part:

*This project was bootstrapped with Spring Boot App*
## Springboot-app
### Requirements
____
For building and running the application you need:

+ [JDK 17](https://www.oracle.com/java/technologies/downloads/#java17)
+ [Maven 3.0.4](https://maven.apache.org/)
### Running the application locally
____
There are several ways to run a Spring Boot application on your local machine. One way is to execute the `main` method in the `de.codecentric.springbootsample.Application` class from your IDE.

Alternatively you can use the [Spring Boot Maven plugin](https://docs.spring.io/spring-boot/docs/current/reference/html/build-tool-plugins.html#build-tool-plugins.maven) like so:

```mvn spring-boot:run```
### Deploying the application to OpenShift
____
The easiest way to deploy the sample application to OpenShift is to use the [OpenShift CLI](https://docs.okd.io/latest/cli_reference/index.html):

```
oc new-app codecentric/springboot-maven3-centos~https://github.com/AlexKhmarenko/FP4SocialNetwork
```
#### This will create:
+ An ImageStream called "springboot-maven3-centos"
+ An ImageStream called "springboot-sample-app"
+ A BuildConfig called "springboot-sample-app"
+ DeploymentConfig called "springboot-sample-app"
+ Service called "springboot-sample-app"

#### If you want to access the app from outside your OpenShift installation, you have to expose the springboot-sample-app service:
```
oc expose springboot-sample-app --hostname=www.example.com
```
