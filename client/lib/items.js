Meteor.subscribe('Items');

Template.itemsView.events({
  "submit .new-item": function (event) {
    // This function is called when the new item form is submitted
    var text = event.target.text.value;
    Meteor.call("addItem", text);

    // Clear form
    event.target.text.value = "";

    // Prevent default form submit
    return false;
  },
  "click .hide-completed": function () {
    Session.set("hideCompleted", ! Session.get("hideCompleted"));
  }
});

Template.itemsView.helpers({
  items: function() {
    return Items.find();
  }
});
