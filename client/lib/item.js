Template.item.helpers({
  momentDueDate: function(dueDate) {
    if (dueDate) {
      var now = new Date().getTime();
      if (dueDate < now) {
        return moment(dueDate).fromNow(true) + " ago";
      } else {
        return "in " + moment(dueDate).fromNow(true);
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
  hasAmountBiggerThanOne: function(amount) {
    if (amount > 1) {
      return true;
    }
    return false;
  }
});
