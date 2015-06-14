Template.pieces.helpers({
  getPieceDueDate: function(dueDate) {
    if (dueDate) {
      return moment(dueDate).format('LL');
    } else {
      return null;
    }
  },
  newItemPieceDueDateChanged: function() {
    if (Session.get('newItemPieceDueDate')) {
      return true;
    }
    return false;
  },
  getPieces: function() {
    var item = Session.get('currentItem');
    return Pieces.find({
      item: item._id
    });
  },
  getPiecesCount: function() {
    var count = Pieces.find({
      item: Session.get('currentItem')._id
    }).count();
    if (count > 0) {
      return count;
    }
    return 0;
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
  }
});

Template.pieces.events({
  'changeDate #editItem .add-item-piece .item-datepicker': function(e) {
    Session.set('newItemPieceDueDate', e.date.getTime());
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

    Meteor.call('addPiece', piece, itemId, function(error, result) {
      // Session.set('currentItem', Items.findOne(itemId));
      event.target.text.value = "";
      Session.set('newItemPieceDueDate', null);
    });

    return false;
  },
  'click .piece .item-checkbox': function(event, template) {
    var $Item = $(event.target);
    var itemId = Session.get('currentItem')._id;
    var pieceId = $Item.parent().attr('id');

    if ($Item.is(':checked')) {
      $Item.prop('checked', true);
      Meteor.call('setCompletePiece', pieceId, true);
    } else {
      $Item.prop('checked', false);
      Meteor.call('setCompletePiece', pieceId, false);
    }
  }
});
