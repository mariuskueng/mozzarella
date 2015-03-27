Items = new Mongo.Collection('Items');

Items.allow({
  insert: function(userId, text) {
    // only allow adding if you are logged in
    return !! userId;
  }
});

Meteor.methods({
  'addItem': function(text, listId) {
    var itemId = Items.insert({
      createdBy: Meteor.userId(),
      createdAt: new Date().getTime(),
      dueDate: new Date("12.31.2015").getTime(), // form value or now
      title: text,
      list: listId
    });
    return itemId;
  }
});
