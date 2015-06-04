Template.editItemView.helpers({
  item: function() {
    return Session.get('currentItem');
  },
  getDueDate: function() {
    var item = Session.get('currentItem');
    return moment(item.dueDate).format('LL');
  },
  getCreator: function(userId) {
    var item = Session.get('currentItem');
    // TODO: async call...
    return Meteor.call('getCreator', item.createdBy);
  }
});

Template.editItemView.rendered = function(){
  this.autorun(function(c) {
    if (Session.get('currentItem')) {
        $('#editItem').offcanvas('show');
    }
  });
};
