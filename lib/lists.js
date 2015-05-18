Lists = new Mongo.Collection('Lists');

Lists.allow({
  insert: function(userId, text) {
    // only allow adding if you are logged in
    return !! userId;
  },
  update: function(userId, text) {
    return !! userId;
  }
});

Meteor.methods({
  'addList': function(text) {
    var listId = Lists.insert({
      createdBy: Meteor.userId(),
      createdAt: new Date().getTime(),
      title: text,
      users: [
        { userId: Meteor.userId() }
      ]
    });
    return listId;
  },
  'editList': function(listId, text) {
    if (Lists.findOne(listId).createdBy === Meteor.userId()) {
          Lists.update(Lists.findOne(listId), {
        $set: {
          'title': text
        }
      });
    }
  },
  'setCurrentList': function(listId) {
    Meteor.users.update(Meteor.userId(), {
      $set: {
        'profile.lastOpenedList': listId
      }
    });
  },
  'addUserToList': function(listId, userId) {
    // if list is created by current user or is already added to list
    var currentList = Lists.findOne(listId);
    if (currentList.createdBy === Meteor.userId() || currentList.users.indexOf(Meteor.userId()) > -1) {
      // if user given user isn't added to list
      if (currentList.users.indexOf(userId) === -1) {
        Lists.update(Lists.findOne(listId), {
          $push: {
            'users': userId
          }
        });
        return true;
      }
    } else {
      return false;
    }
  }
});
