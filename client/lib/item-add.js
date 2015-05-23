var newItemDueDate = null;
var newItemAmount = 1;

Template.addItemView.events({
  "submit .new-item-form": function (event) {
    // This function is called when the new item form is submitted
    var controller = Iron.controller();
    var params = controller.getParams();

    var text = event.target.text.value;
    if (text === '') return false;

    var newItem = {
      text: text,
      dueDate: newItemDueDate,
      listId: params._id,
      amount: newItemAmount
    };

    Meteor.call("addItem", newItem);

    // Clear form
    event.target.text.value = "";
    // Clear newItemDueDate
    newItemDueDate = null;
    Session.set('itemDueDateChanged', false);

    // Prevent default form submit
    return false;
  }
});

Template.addItemView.helpers({
  isItemDueDateChanged: function() {
    return Session.get('itemDueDateChanged');
  },
  food: function() {
    return TYPEAHEAD_PRESETS.map(function(it) {return it.product; });
  },
});

Template.addItemView.rendered = function() {
  Meteor.typeahead.inject();
};
