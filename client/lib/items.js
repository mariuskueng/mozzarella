Meteor.subscribe('Items');

Template.itemsView.helpers({
  items: function() {
    var controller = Iron.controller();
    var params = controller.getParams();

    return Items.find({
      createdBy: Meteor.userId(),
      list: params._id
    }, {
      sort:{
        createdAt: -1
      }
    });
  }
});

Template.itemsView.events({
  "submit .new-item": function (event) {
    // This function is called when the new item form is submitted
    var controller = Iron.controller();
    var params = controller.getParams();

    var text = event.target.text.value;
    Meteor.call("addItem", text, params._id);

    // Clear form
    event.target.text.value = "";

    // Prevent default form submit
    return false;
  },
  "click .hide-completed": function () {
    Session.set("hideCompleted", ! Session.get("hideCompleted"));
  }
});
