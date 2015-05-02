// Meteor.subscribe('Lists');

Template.listsView.helpers({
  myAppVariable: function () {
    return Session.get('myAppVariable');
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
