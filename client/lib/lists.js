Meteor.subscribe('Lists');

Template.listsView.helpers({
  myAppVariable: function () {
    return Session.get('myAppVariable');
  },
  username: function () {
    return Meteor.user().emails[0].address;
  },
  lists: function() {
    return Lists.find({createdBy: this.userId}, {sort:{createdAt: -1}});
  }
});
Template.addListView.events({
  'submit .add-list': function (event, template) {
    // This function is called when the new item form is submitted
    var text = event.target.text.value;
    Meteor.call("addList", text);

    // Clear form
    event.target.text.value = "";

    // Prevent default form submit
    return false;
  }
});
