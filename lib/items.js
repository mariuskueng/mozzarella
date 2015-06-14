Items = new Mongo.Collection('Items');

Items.allow({
  insert: function(userId, item) {
    // only allow adding if you are logged in
    return !! userId;
  },
  update: function(userId, item) {
    return item.createdBy == userId;
  }
});

Meteor.methods({
  'addItem': function(item) {
    var itemId = Items.insert({
      createdBy: Meteor.userId(),
      createdAt: new Date().getTime(),
      dueDate: item.dueDate,
      title: item.text,
      list: item.listId,
      completed: false,
      completedAt: null,
      amount: item.amount,
      pieces: []
    });
    return itemId;
  },
  'setCompleteItem': function(itemId, completed) {
    Items.update({
      _id: itemId,
    }, {
      $set: {
        completed: completed,
        completedAt: new Date().getTime()
      }
    });
  },
  'showCompletedItems': function(state) {
    Meteor.users.update(Meteor.userId(), {
      $set: {
        'profile.showCompletedItems': state
      }
    });
  },
  'editItem': function(item) {
    Items.update({
      _id: item._id,
    }, {
      $set: {
        title: item.title,
        dueDate: item.dueDate
      }
    });
  },
  'addItemPiece': function(itemId, piece) {
    Items.update({
      _id: itemId,
    }, {
      $push: {
        pieces: {
          title: piece.text,
          dueDate: piece.dueDate,
          completed: piece.completed
        }
      }
    });
  }
});
