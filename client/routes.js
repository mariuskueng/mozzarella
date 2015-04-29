// Global router config
Router.configure({
  loadingTemplate: 'loading',

  // the notFound template is used for unknown routes and missing lists
  notFoundTemplate: 'notFound',

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
Router.route('about', function() {
  this.render('about');
});

// simple route with
// name 'appView' that
// matches '/' and automatically renders
// template 'appView'
Router.route('listsView', {
  path: '/lists/:_id',
  template: 'appView',
  onBeforeAction: function () {
    if (!Meteor.userId()) {
      // if the user is not logged in, render the Login template
      this.render('homeView');
    } else {
      // List must be created by the current user
      var currentList = Lists.findOne(this.params._id);
      var userId = Meteor.userId();

      if (userId === currentList.createdBy) {
        console.log("all good");
        // set the current list before rendering
        Meteor.call('setCurrentList', this.params._id);

      // else if (this.params._id === 'all' || this.params._id === 'over-due') {
      //   Meteor.call('setCurrentList', this.params._id);
      //   this.redirect('/lists/' + this.params._id);
      } else {
        this.redirect('/lists/');
      }
      // otherwise don't hold up the rest of hooks or our route/action function
      // from running
      this.next();
    }
  },
  action: function () {
    this.render();
  }
});

// redirect lists root to all
Router.route('/lists/', function() {
  this.redirect('allView');
});

Router.route('allView', {
  path: '/lists/all',
  template: 'appView'
});

Router.route('overDueView', {
  path: '/lists/over-due',
  template: 'appView'
});

Router.route('appView', {
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
