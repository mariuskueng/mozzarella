Meteor.subscribe('Items');

Template.itemsView.helpers({
  items: function() {
    var controller = Iron.controller();
    var params = controller.getParams();

    if (params._id == 'all') {
      return Items.find({
        createdBy: Meteor.userId()
      }, {
        sort:{
          createdAt: -1
        }
      });

    } else if(params._id == 'over-due') {
      var currentDate = new Date().getTime();
      return Items.find({
        createdBy: Meteor.userId(),
        dueDate: { $lte: currentDate }
      }, {
        sort:{
          createdAt: -1
        }
      });
    } else {
      return Items.find({
        createdBy: Meteor.userId(),
        list: params._id
      }, {
        sort:{
          createdAt: -1
        }
      });
    }
  },
  isGenericList: function() {
    var controller = Iron.controller();
    var params = controller.getParams();
    var listId = params._id;

    if (listId === 'all' || listId === 'over-due') {
      return true;
    }
    return false;
  },
});

Template.itemsView.events({
  "submit .new-item-form": function (event) {
    // This function is called when the new item form is submitted
    var controller = Iron.controller();
    var params = controller.getParams();

    var text = event.target.text.value;
    Meteor.call("addItem", text, params._id);

    // Clear form
    event.target.text.value = "";

    // Prevent default form submit
    return false;
  },
  "click .hide-completed": function () {
    Session.set("hideCompleted", ! Session.get("hideCompleted"));
  }
});
