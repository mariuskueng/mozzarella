Template.editItemView.helpers({
  item: function() {
    return Session.get('currentItem');
  },
  getDueDate: function() {
    if (Session.get('editItemDueDate')) {
      return moment(Session.get('editItemDueDate')).format('LL');
    } else {
      var item = Session.get('currentItem');
      if (item && item.dueDate) {
        return moment(item.dueDate).format('LL');
      } else {
        return null;
      }
    }
  },
  isOverDue: function(dueDate) {
    var momentNow = moment(new Date());
    var momentDueDate = moment(dueDate);

    if (momentDueDate > momentNow) {
      return 'success';
    } else if (momentNow.diff(momentDueDate, 'weeks') < 1){
      return 'warning';
    } else {
      return 'danger';
    }
  },
  getCreator: function(userId) {
    var item = Session.get('currentItem');
    Meteor.call('getCreator', item.createdBy, function(error, email) {
      Session.set('itemCreator', email);
    });
    return Session.get('itemCreator');
  }
});

Template.editItemView.events({
  'dblclick .item-title': function(event, template) {
    $('#editItem .item-title, #editItem .item-title-edit').toggleClass('hidden');
  },
  'submit #item-edit': function(event, template) {
    event.preventDefault();
    var item = Session.get('currentItem');
    var form = event.target;
    item.title = form.itemTitleEdit.value;
    if (Session.get('editItemDueDate'))
      item.dueDate = Session.get('editItemDueDate');

    Meteor.call('editItem', item, function(error, result) {
      itemEditOffCanvas.offcanvas('hide');
      Session.set('editItemDueDate', null);
      Session.set('currentItem', null);
      Session.set('getCreator', null);
    });

    return false;
  },
  'changeDate #editItem .item-header .item-datepicker': function(e) {
    Session.set('editItemDueDate', e.date.getTime());
    return false;
  },
  'hidden.bs.offcanvas #editItem': function(e) {
    if ($('#editItem .item-title').hasClass('hidden')) {
      $('#editItem .item-title, #editItem .item-title-edit').toggleClass('hidden');
    }
  },
  'click #editItem .item-header .item-checkbox': function(event, template) {
    var $Item = $(event.target);
    var itemId = Session.get('currentItem')._id;

    if ($Item.is(':checked')) {
      $Item.prop('checked', true);
      Meteor.call('setCompleteItem', itemId, true);
    } else {
      $Item.prop('checked', false);
      Meteor.call('setCompleteItem', itemId, false);
    }
  },
  'click .item-delete': function(event, template) {
    Meteor.call('removeItem', Session.get('currentItem')._id, function(error, result) {
      itemEditOffCanvas.offcanvas('hide');
    });
  }
});

Template.editItemView.rendered = function() {
  $('#editItem .item-datepicker').datepicker({
    autoclose: true,
    todayHighlight: true
  });
};
