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
    if ((dueDate < new Date().getTime())) {
      return true;
    }
    return false;
  }
});
