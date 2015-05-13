Meteor.subscribe('Lists');

Template.listsView.helpers({
  listItemsCount: function (listId) {
    return Items.find({list: listId}).count();
  },
  user: function() {
    return Meteor.user();
  },
  lists: function() {
    return Lists.find({createdBy: Meteor.userId()}, {sort:{createdAt: 1}});
  },
  isCurrentList: function (listId) {
    var controller = Iron.controller();
    var params = controller.getParams();
    if (controller.url.indexOf(listId) > -1) {
      return true;
    }
    return false;
  }
});

Template.listsView.events({
  'click .list-group-item': function(event, template) {
    if ($('#appNavMenu').hasClass('canvas-slid')) {
      $('#appNavMenu').offcanvas('toggle');
    }
  },
  'click .list-edit': function(event) {
    var listId = $(event.target).parent().attr('data-list-id');
    Session.set('editListId', listId);
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
  title: function() {
    if (Session.get('editListId'))
    return Lists.findOne(Session.get('editListId')).title;
  }
});

Template.editListView.events({
  'submit .edit-list': function (event, template) {
    // This function is called when the new item form is submitted
    var text = event.target.text.value;
    if (text === '') return false;

    Meteor.call('editList', Session.get('editListId'), text);

    // Clear form
    event.target.text.value = "";

    // Prevent default form submit
    return false;
  },
  'click .btn-list-user-add': function(event, template) {
    var email = $('.list-user-add-email').val();
    var user = Meteor.users.findOne({"emails.address": email});
    if (user) {
      var userId = Meteor.users.findOne({"emails.address": email})._id;
      return Meteor.call('addUserToList', Session.get('editListId'), userId);
    } else {
      return false;
    }
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
