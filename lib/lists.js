Lists = new Mongo.Collection('Lists');

Lists.allow({
  insert: function(userId, text) {
    // only allow adding if you are logged in
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
  }
});
