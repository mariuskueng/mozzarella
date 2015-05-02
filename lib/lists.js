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
      title: text
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
  }
});
