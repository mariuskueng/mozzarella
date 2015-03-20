Items = new Mongo.Collection('Items');

Items.allow({
  insert: function(userId, text) {
    // only allow adding if you are logged in
    return !! userId;
  }
});

Meteor.methods({
  'addItem': function(text) {
    var itemId = Items.insert({
      createdBy: Meteor.userId(),
      createdAt: new Date().getTime(),
      title: text
    });
    return itemId;
  }
});
