// Global router config
Router.configure({
  loadingTemplate: 'loading',

  // wait on the following subscriptions before rendering the page to ensure
  // the data it's expecting is present
  waitOn: function() {
    return [
      Meteor.subscribe('Lists')
    ];
  }
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
  this.route('listsView', {
    path: '/lists/:_id',
    template: 'appView',
    onBeforeAction: function () {
      if (!Meteor.userId()) {
        // if the user is not logged in, render the Login template
        this.render('homeView');
      } else {
        // set the current list before rendering
        Meteor.call('setCurrentList', this.params._id);
        // otherwise don't hold up the rest of hooks or our route/action function
        // from running
        this.next();
      }
    },
    action: function () {
      this.render();
    }
  });

  this.route('allView', {
    path: '/lists/all',
    template: 'appView'
  });

    this.route('overDueView', {
    path: '/lists/over-due',
    template: 'appView'
  });

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
    action: function() {
      // passes the last opened user's list (MAGIC)
      var user = Meteor.user();
      if (user.profile && user.profile.lastOpenedList) {
        var lastList = Lists.findOne(Meteor.user().profile.lastOpenedList);
        if (lastList && lastList._id) {
          Router.go('listsView', lastList);
        }
      } else {
        Router.go('allView', 'all');
      }
    }
  });

});
