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

  $('.item-datepicker').datepicker({
    autoclose: true,
    todayHighlight: true
  });

};

Template.editItemView.events({
  'dblclick .item-title': function(event, template) {
    $('#editItem .item-title, #editItem .item-title-edit').toggleClass('hidden');
  },
  'submit #item-edit': function(event, template) {
    event.preventDefault();
    var item = Session.get('currentItem');
    var form = event.target;
    item.title = form.itemTitleEdit.value;

    Meteor.call('editItem', item);

    return false;
  },
  'changeDate .item-datepicker': function(e) {
    Session.set('newItemDueDate', e.date.getTime());
  },
});
