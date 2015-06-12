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
  getCreator: function(userId) {
    var item = Session.get('currentItem');
    Meteor.call('getCreator', item.createdBy, function(error, email) {
      Session.set('itemCreator', email);
    });
    return Session.get('itemCreator');
  }
});

Template.editItemView.rendered = function(){
  this.autorun(function(c) {
    if (Session.get('currentItem')) {
        $('#editItem').offcanvas('show');
    }
  });
};
