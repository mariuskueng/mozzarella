Meteor.subscribe('Items');

var newItemDueDate = null;
var newItemAmount = 1;
Session.set('itemDueDateChanged', false);

Template.itemsView.helpers({
  completedItems: function() {
    var controller = Iron.controller();
    var params = controller.getParams();

    return Items.find({
      createdBy: Meteor.userId(),
      list: params._id,
      completed: true
    }, {
      sort:{
        completedAt: -1
      }
    });
  },
  showCompletedItems: function() {
    return Meteor.user().profile.showCompletedItems;
  }
});

Template.itemsView.events({
  "click .item-checkbox": function(event) {
    var $Item = $(event.target);
    var itemId = $Item.parent().attr('id');

    if ($Item.is(':checked')) {
      $Item.prop('checked', true);
      Meteor.call('setCompleteItem', itemId, true);
    } else {
      $Item.prop('checked', false);
      Meteor.call('setCompleteItem', itemId, false);
    }
  },
  'click .items-completed': function() {
    if (!Meteor.user().profile.showCompletedItems) {
      Meteor.call('showCompletedItems', true);
    } else {
      Meteor.call('showCompletedItems', false);
    }
  },
  'changeDate #item-datepicker': function(e) {
    newItemDueDate = e.date.getTime();
    Session.set('itemDueDateChanged', true);
  },
  'change .item-amount': function(e) {
    newItemAmount = ((e.target.value > 1) ? e.target.value : 1);
  }
});

Template.itemsView.rendered = function() {
  $('#item-datepicker').datepicker({
    autoclose: true,
    todayHighlight: true
  });
};

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
