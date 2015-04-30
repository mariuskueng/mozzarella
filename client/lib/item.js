Template.item.helpers({
  momentDueDate: function(dueDate) {
    if (dueDate) {
      var momentDueDate = moment(dueDate);
      return momentDueDate.fromNow(true);
    }
  },
  isOverDue: function(dueDate) {
    if ((dueDate < new Date().getTime())) {
      return true;
    }
    return false;
  }
});
