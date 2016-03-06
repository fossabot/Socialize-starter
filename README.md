# Socialize starter

A starter for your apps that takes care of basic user functionality by
utilizing the `socialize` packages.

## Getting started

### Install Meteor

#### OS X or Linux

Install the latest official Meteor release from your terminal:

`curl https://install.meteor.com/ | sh`

#### Windows

[Download the official Meteor installer](https://install.meteor.com/windows)

### Get the repository

Download the [newest version of the code](https://github.com/StorytellerCZ/Socialize-starter/releases)
or clone this repository either using a git client like [Github Desktop](https://desktop.github.com/)
or the terminal (you need to have git installed):

`git clone https://github.com/StorytellerCZ/Socialize-starter.git`

Navigate into the folder where you extracted/cloned the code.

Run `meteor` in the terminal.

The app will now be available on `localhost:3000`.

## Technology

Please refer to [Meteor Documentation](http://docs.meteor.com/#/full/) and [Meteor Guide](http://guide.meteor.com/)
on how to get started with Meteor and best practices.

### React

React is used for the client.

Templates are located in `client/layouts/`.

Navigation/menus and footer are in `client/navigation/`

Edit the home page look in `client/HomePage.jsx`.

The user dashboard is in `client/modules/users/Dashboard.jsx`.

### Materialize CSS

We are using Material design via the `poetic:materialize-scss`.

This allows you to use scss to change the theme easily.

### Routing

We are using `kadira:flow-router` for routing.
You can find the routes in `lib/routes.jsx`

### Roles

We are using `alanning:roles` for roles management.

Basic "user" role is added to each user after they register.
