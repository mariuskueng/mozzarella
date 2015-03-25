// Global router config
Router.configure({
  loadingTemplate: 'loading'
});

// simple route with
// name 'about' that
// matches '/about' and automatically renders
// template 'about'
Router.map( function () {
  this.route('about');

  // simple route with
  // name 'appView' that
  // matches '/' and automatically renders
  // template 'appView'
  this.route('appView', {
    path: '/',
    onBeforeAction: function () {
      if (!Meteor.userId()) {
        // if the user is not logged in, render the Login template
        this.render('homeView');
      } else {
        // otherwise don't hold up the rest of hooks or our route/action function
        // from running
        this.next();
      }
    },
    action: function () {
      this.render();
    }
  });
});
