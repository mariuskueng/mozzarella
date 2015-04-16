Meteor.subscribe('Items');

Template.itemsView.helpers({
  items: function() {
    var controller = Iron.controller();
    var params = controller.getParams();

    if (params._id == 'all') {
      return Items.find({
        createdBy: Meteor.userId(),
        completed: false
      }, {
        sort:{
          createdAt: -1
        }
      });

    } else if(params._id == 'over-due') {
      var currentDate = new Date().getTime();
      return Items.find({
        createdBy: Meteor.userId(),
        dueDate: { $lte: currentDate },
        completed: false
      }, {
        sort:{
          createdAt: -1
        }
      });
    } else {
      return Items.find({
        createdBy: Meteor.userId(),
        list: params._id,
        completed: false
      }, {
        sort:{
          createdAt: -1
        }
      });
    }
  },
  completedItems: function() {
    var controller = Iron.controller();
    var params = controller.getParams();

    return Items.find({
      createdBy: Meteor.userId(),
      list: params._id,
      completed: true
    }, {
      sort:{
        completedAt: -1
      }
    });
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
    if (text === '') return false;
    Meteor.call("addItem", text, params._id);

    // Clear form
    event.target.text.value = "";

    // Prevent default form submit
    return false;
  },
  "click .hide-completed": function () {
    Session.set("hideCompleted", ! Session.get("hideCompleted"));
  },
  "click .item-checkbox": function(event) {
    var $Item = $(event.target);
    var itemId = $Item.parent().attr('id');

    if ($Item.is(':checked')) {
      $Item.prop('checked', true);
      Meteor.call('setCompleteItem', itemId, true);
    } else {
      $Item.prop('checked', false);
      Meteor.call('setCompleteItem', itemId, false);
    }
  },
  'click .items-completed': function() {
    var items = $('.items-completed-list');
    if (items.hasClass('hidden'))
      items.removeClass('hidden').addClass('show');
    else
      items.removeClass('show').addClass('hidden');
  }
});
