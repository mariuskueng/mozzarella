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

Template.addListView.events({
  'submit .add-list': function (event, template) {
    // This function is called when the new item form is submitted
    var text = event.target.text.value;
    if (text === '') return false;
    Meteor.call("addList", text);

    // Clear form
    event.target.text.value = "";

    // Prevent default form submit
    return false;
  }
});

Template.editListView.helpers({
  list: function() {
    return Lists.findOne(Session.get('currentList'));
  },
  collaborators: function () {
    return Session.get('ListCollaborators');
  }
});

Template.editListView.events({
  'submit .edit-list': function (event, template) {
    // This function is called when the new item form is submitted
    var text = event.target.text.value;
    if (text === '') return false;

    Meteor.call('editList', Session.get('currentList'), text);

    // Clear form
    event.target.text.value = "";

    // Prevent default form submit
    return false;
  },
  'click .btn-list-user-add': function(event, template) {
    var email = $('.list-user-add-email').val();
    Meteor.call('getUserIdByEmail', email, function (error, userId) {
      if (userId) {
        Meteor.call('addUserToList', Session.get('currentList'), userId, function(error, response) {
          Meteor.call('getListCollaborators', Session.get('currentList'), function(error, response) {
            Session.set('ListCollaborators', response);
          });
        });
      } else {
        // TODO: throw error
      }
    });
  }
});

Template.navigation.helpers({
  currentList: function() {
    var controller = Iron.controller();
    var params = controller.getParams();

    if (controller.url.indexOf('all') > -1) {
      return GENERIC_ROUTES.all.title;
    }
    else if (controller.url.indexOf('over-due') > -1) {
      return GENERIC_ROUTES.overDue.title;
    }
    if (Lists.findOne(params._id)) {
      return Lists.findOne(params._id).title;
    }
    return null;
  }
});
