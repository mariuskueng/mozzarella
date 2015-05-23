Meteor.subscribe('Items');

Session.set('itemDueDateChanged', false);

Template.itemsView.helpers({
  completedItems: function() {
    var controller = Iron.controller();
    var params = controller.getParams();

    return Items.find({
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
