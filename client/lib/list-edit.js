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
    var email = $('.list-user-add-email');
    Meteor.call('getUserIdByEmail', email.val(), function (error, userId) {
      if (userId) {
        Meteor.call('addUserToList', Session.get('currentList'), userId, function(error, response) {
          Meteor.call('getListCollaborators', Session.get('currentList'), function(error, response) {
            Session.set('ListCollaborators', response);
            email.val('');
          });
        });
      } else {
        sAlert.error('User ' + email.val() + 'has not been found.');
      }
    });
  },
  'click .list-delete': function(event, template) {
    Meteor.call('removeList', Session.get('currentList'), function(error, listName) {
      Router.go('/all');
    });
  }
});
