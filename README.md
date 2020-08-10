

![Github logo](https://user-images.githubusercontent.com/60409723/89744596-b5857680-da6b-11ea-87f9-632219702ed6.jpg)

# TECHCareers Milestone 2 project - socialCube

This project aims to demonstrate knowledge and competency in project
planning, teamwork, HTML5, CSS3, ES6 JavaScript, git within a team context, React, React-
Redux, and React-Router. 

## Features 

- User interface developed entirely in React, with reusable components
- Ability to sign up new users, log in existing as well as search for users
- Multiple pages have been displayed through an implementation of the React Router
- Axios library is used to fetch random user posts from [jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com)
- All data is managed internally through Redux

## Deployment instructions

To deploy the website code following steps will need to be followed:

1. Installation of node.js (latest stable version can be found [here](https://nodejs.org))
2. Clone this repository into a folder using `git clone` or by downloading a zipped file version from GitHub.
3. Run `npm install` or `yarn` in the folder of choice to download all libraries/dependencies.
4. To test the code locally, start a local webserver by executing `npm start` or `yarn start` in the project folder.
5. To deploy the website on a server, make sure that the correct server location is specified using the `homepage` field in `package.json`.
6. If you are changing the `homepage` from `/`, ensure that all relative links in the code (`<Link>` elements and `this.props.history` references are updated accordingly).
7. Use `npm build` or `yarn build` to generate a deployment package and upload to target web server.

## Live website demo

Should you wish to try the application without the need to download code to your system and set up JS libraries, check out the live demo at the following [link](https://altx.dev/socialcube)

## Trello project board

The project board can be found at the following [link](https://trello.com/b/WjGnn0tJ/milestone-2-react-redux-react-router)