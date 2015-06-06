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
      dueDate: Session.get('newItemDueDate'),
      listId: params._id,
      amount: Session.get('newItemAmount')
    };

    Meteor.call("addItem", newItem);

    // Clear form
    event.target.text.value = "";
    // Clear newItemDueDate & newItemAmount
    Session.set('newItemAmount', 1);
    Session.set('newItemDueDate', null);

    // Prevent default form submit
    return false;
  }
});

Template.addItemView.helpers({
  isItemDueDateChanged: function() {
    return Session.get('newItemDueDate');
  },
  food: function() {
    return TYPEAHEAD_PRESETS.map(function(it) {return it.product; });
  },
});

Template.addItemView.rendered = function() {
  Meteor.typeahead.inject();
};
