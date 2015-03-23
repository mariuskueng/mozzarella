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

Router.route('/lists/:_id', function () {
  // console.log('Lists', this.params._id)
  var listId = this.params._id;
  // this.items = Meteor.subscribe('items', this.params._id);
  this.render('appView', {data: {listId:listId}});
});
