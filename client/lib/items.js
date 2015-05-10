Meteor.subscribe('Items');

var newItemDueDate = null;
var newItemAmount = 1;
var itemDueDateChanged = false;
var itemDueDateChangedDep = new Tracker.Dependency();

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
  },
  isItemDueDateChanged: function() {
    itemDueDateChangedDep.depend();
    if (!itemDueDateChanged) {
      return true;
    }
    return false;
  }
});

Template.itemsView.events({
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
    itemDueDateChanged = false;
    itemDueDateChangedDep.changed();

    // Prevent default form submit
    return false;
  },
  "click .hide-completed": function () {
    Session.set("hideCompleted", ! Session.get("hideCompleted"));
  },
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
    var items = $('.items-completed-list');
    if (items.hasClass('hidden')) {
      Meteor.call('showCompletedItems', true);
      items.removeClass('hidden').addClass('show');
    }
    else {
      Meteor.call('showCompletedItems', false);
      items.removeClass('show').addClass('hidden');
    }
  },
  'changeDate #item-datepicker': function(e) {
    newItemDueDate = e.date.getTime();
    itemDueDateChanged = true;
    itemDueDateChangedDep.changed();
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
