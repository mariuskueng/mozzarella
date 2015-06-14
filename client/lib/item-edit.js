Template.editItemView.helpers({
  item: function() {
    return Session.get('currentItem');
  },
  getDueDate: function() {
    var item = Session.get('currentItem');
    if (item.dueDate) {
      return moment(item.dueDate).format('LL');
    } else {
      return null;
    }
  },
  getPieceDueDate: function(dueDate) {
    if (dueDate) {
      return moment(dueDate).format('LL');
    } else {
      return null;
    }
  },
  getCreator: function(userId) {
    var item = Session.get('currentItem');
    Meteor.call('getCreator', item.createdBy, function(error, email) {
      Session.set('itemCreator', email);
    });
    return Session.get('itemCreator');
  },
  newItemPieceDueDateChanged: function() {
    if (Session.get('newItemPieceDueDate')) {
      return true;
    }
    return false;
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

    Meteor.call('editItem', item, function(error, result) {
      $('#editItem').offcanvas('hide');
    });

    return false;
  },
  'changeDate #editItem .item-header .item-datepicker': function(e) {
    var item = Session.get('currentItem');
    item.dueDate = e.date.getTime();
    Meteor.call('editItem', item);
    return false;
  },
  'changeDate #editItem .add-item-piece .item-datepicker': function(e) {
    Session.set('newItemPieceDueDate', e.date.getTime());
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
  'submit #item-add-piece': function(event, template) {
    var itemId = Session.get('currentItem')._id;

    if (!event.target.text.value)
      return false;

    var piece = {
      text: event.target.text.value,
      dueDate: Session.get('newItemPieceDueDate'),
      completed: false
    };

    Meteor.call('addItemPiece', itemId, piece, function(error, result) {
      Session.set('currentItem', Items.findOne(itemId));
      event.target.text.value = "";
    });

    return false;
  }
});
