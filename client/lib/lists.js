Meteor.subscribe('Lists');

Template.listsView.helpers({
  listItemsCount: function (listId) {
    return Items.find({
      list: listId,
      completed: false
      })
      .count();
  },
  user: function() {
    return Meteor.user();
  },
  lists: function() {
    return Lists.find({}, { sort: { createdAt: 1 } });
  },
  isCurrentList: function (listId) {
    var controller = Iron.controller();
    var params = controller.getParams();
    if (controller.url.indexOf(listId) > -1) {
      return true;
    }
    return false;
  },
  hasMultipleUsers: function (listId) {
    var list = Lists.findOne(listId);
    if (list.users) {
      if (list.users.length > 1) {
        return true;
      } else {
        return false;
      }
    }
  }
});

Template.listsView.events({
  'click .list-group-item': function(event, template) {
    if ($('#appNavMenu').hasClass('canvas-slid')) {
      $('#appNavMenu').offcanvas('toggle');
    }
  },
  'click .list-edit': function(event) {
    Meteor.call('getListCollaborators', Session.get('currentList'), function(error, response) {
      Session.set('ListCollaborators', response);
    });
  }
});
