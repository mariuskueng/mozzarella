// Global routes

GENERIC_ROUTES = {
  all: {
    title: 'All',
    path: 'all'
  },
  overDue: {
    title: 'Over Due',
    path: 'over-due'
  }
};

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
Router.route('about', function() {
  this.render('about');
});

// simple route with
// name 'listsView' that
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
      // set the current list before rendering
      Meteor.call('setCurrentList', this.params._id);
      // otherwise don't hold up the rest of hooks or our route/action function
      // from running
      this.next();
    }
  },
  action: function () {
    this.render();
  },
  data: function() {
    var listId = this.params._id;
    return {items: Items.find({
        createdBy: Meteor.userId(),
        list: listId,
        completed: false
      }, {
        sort:{
          completedAt: 1,
          createdAt: -1
        }
      })
    };
  }
});

// redirect lists root to all
Router.route('/lists/', function() {
  this.redirect('/all');
});

Router.route('allView', {
  path: '/all',
  template: 'appView',
  onBeforeAction: function () {
    if (!Meteor.userId()) {
      // if the user is not logged in, render the Login template
      this.render('homeView');
    } else {
      // set the current list before rendering
      Meteor.call('setCurrentList', 'all');
      // otherwise don't hold up the rest of hooks or our route/action function
      // from running
      this.next();
    }
  },
  data: {
    items: function() {
      return Items.find({
      createdBy: Meteor.userId(),
      completed: false
      }, {
        sort:{
          createdAt: -1
        }
      });
    }
  }
});

Router.route('overDueView', {
  path: '/over-due',
  template: 'appView',
  onBeforeAction: function () {
    if (!Meteor.userId()) {
      // if the user is not logged in, render the Login template
      this.render('homeView');
    } else {
      // set the current list before rendering
      Meteor.call('setCurrentList', 'over-due');
      // otherwise don't hold up the rest of hooks or our route/action function
      // from running
      this.next();
    }
  },
  data: {
    items: function() {
      return Items.find({
        createdBy: Meteor.userId(),
        dueDate: { $lte: new Date().getTime() },
        completed: false
      }, {
        sort:{
          dueDate: -1,
          createdAt: -1,

        }
      });
    }
  }
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
      console.log(user.profile.lastOpenedList);
      var lastList = Lists.findOne(user.profile.lastOpenedList);
      if (lastList && lastList._id) {
        Router.go('listsView', lastList);
      } else {
        this.redirect('/' + user.profile.lastOpenedList);
      }
    } else {
      Router.go('allView', 'all');
    }
  }
});
