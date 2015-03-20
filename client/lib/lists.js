Meteor.subscribe('Lists');

Template.listsView.helpers({
  myAppVariable: function () {
    return Session.get('myAppVariable');
  },
  username: function () {
    return Meteor.user().emails[0].address;
  }
});
Template.listsView.events({
  'click .add-list': function (event, template) {

  }
});
