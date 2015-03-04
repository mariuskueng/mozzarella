Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', function () {
  if (Meteor.user()) {
    this.render('appView');
  } else {
    this.render('homeView');
  }
});
