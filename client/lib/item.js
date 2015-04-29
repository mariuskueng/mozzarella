Template.item.helpers({
  itemMoment: function(dueDate) {
    if (dueDate) {
      return moment(dueDate).format("ddd, Do MMMM YYYY");
    }
  }
});
