// override momentjs fromNow string outputs
moment.locale('en', {
  relativeTime : {
    future: "%s",
    past:   "%s",
    h:  "1h",
    hh: "%dh",
    d:  "1d",
    dd: "%dd",
    M:  "1m",
    MM: "%dm",
    y:  "1y",
    yy: "%dy"
  }
});

Template.item.helpers({
  momentDueDate: function(dueDate) {
    if (dueDate) {
      var now = new Date().getTime();
      return moment(dueDate).fromNow(true);
    } else {
      return null;
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
  hasAmountBiggerThanOne: function(amount) {
    if (amount > 1) {
      return true;
    }
    return false;
  }
});

Template.item.events({
  'click .item-edit': function(event, template) {
    var itemId = event.target.parentNode.parentNode.getAttribute('id');
    Session.set('currentItem', Items.findOne(itemId));
    $('#editItem').offcanvas('show');
  },
  'click .item-checkbox': function(event) {
    var $Item = $(event.target);
    var itemId = $Item.parent().attr('id');

    if ($Item.is(':checked')) {
      $Item.prop('checked', true);
      Meteor.call('setCompleteItem', itemId, true);
    } else {
      $Item.prop('checked', false);
      Meteor.call('setCompleteItem', itemId, false);
    }
  }
});
