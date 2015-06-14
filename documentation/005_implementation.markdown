
# Implementation

## Final vs Mockup

- Edit view was heavily improved
- Delete item button added
- Added typeahead.js
- Notification plugin added.

## Technologies

Due to the Meteor Socket technology there is no classic API needed. Everything is getting piped through a socket and updated automatically. All data collections (Lists, Items, etc.) are reactive.

### Backend

This project is built with [Meteor](https://www.meteor.com). Meteor is a complete open source platform for building web and mobile apps in pure JavaScript.

### Database
Meteor only offers MongoDB for now. A document-oriented database in JSON format. Relations can be implemented with keys and cross-table matching queries. Mongo is fast and very easy to implement.
It is recommended to use a schema setup to handle migrations and specific datatypes. This was not used in this project though.

### Frontend
- [Meteor](https://www.meteor.com): Meteor is a full-stack framework and works on the back- as well as on the frontend.

- [Bootstrap](http://getbootstrap.com): As a ui framework  with responsive components.

- [Flat-UI](http://designmodo.github.io/Flat-UI/): A flat design library on top of Bootstrap

- [Typeahead.js](https://twitter.github.io/typeahead.js/) A autocompletion library for form inputs. Was used to add food.

- S-Alert
- Fontawesome
- Jasny
- Moment.js

## Development Tools

- Meteor: Comes with a built-in build tool
- Jasmine: Testing framework
- TravisCI: Continous integration service
- GitHub: Distributed source control service with Git
- Heroku: App deployment service

## Development Workflow
- Meteor builds app
- Push to heroku
- TravisCI starts build, testing
- Heroku starts deployment as soon as Travis is finished & successful.

## Project structure

- client: All data shared on the client (templates, helpers, libs,styles)
- lib: Data & methods shared on both client and server. Most database actions (i.e. Insert) is handled through such a method
- public: Data such as images, icons
- server: Sensitive data only accessable by the server.
- tests: Application tests
- packages: Version Meteor packages for package manager

## Installation

### Install Meteor if you haven't already

```
$ curl https://install.meteor.com/ | sh
```

### Get it

```
$ git clone git@github.com:mariuskueng/mozzarella.git
```

### Run it

```
$ cd mozzarella
$ meteor
```

## Next steps
- Replace Bootstrap with [Angular Material](https://material.angularjs.org/latest/#/). Boostrap is simply not designed to built a modern web-app.
- Refactor code
- Implement a schema
- Add a monitoring system for the app to observe events and db queries

## Final thoughts
Building this project was very intersting and a lot of fun. I wanted to built something bigger than a tutorial app with Meteor since over a year ago. I think that Meteor has a future but a least in a year.
It really makes developing and prototyping fast but sometimes also a bit messy. Furthermore it can be confusing because so much is happening at the same time.
