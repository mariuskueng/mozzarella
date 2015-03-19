Template.listsView.helpers({
  myAppVariable: function () {
    return Session.get('myAppVariable');
  },
  username: function () {
    return Meteor.user().emails[0].address;
  }
});
Template.listsView.events({
  'click button': function (event, template) {
    Session.set('myAppVariable', Math.floor(Math.random() * 11));
  }
});