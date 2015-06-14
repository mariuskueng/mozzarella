Meteor.subscribe('Items');

itemEditOffCanvas = null;

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
  'click .items-completed': function() {
    if (!Meteor.user().profile.showCompletedItems) {
      Meteor.call('showCompletedItems', true);
    } else {
      Meteor.call('showCompletedItems', false);
    }
  },
  'changeDate .new-item-form .item-datepicker': function(e) {
    Session.set('newItemDueDate', e.date.getTime());
  },
  'change .item-amount': function(e) {
    Session.set('newItemAmount', ((e.target.value > 1) ? e.target.value : 1));
  }
});

Template.itemsView.rendered = function() {
  $('.item-datepicker').datepicker({
    autoclose: true,
    todayHighlight: true
  });

  itemEditOffCanvas = $('#editItem').offcanvas({
    'autohide': false,
    'toggle': false,
    'canvas': 'body'
  });
};
