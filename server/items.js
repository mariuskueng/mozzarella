Meteor.publish('Items', function() {
  var lists = Lists.find(
    {
      $or: [
        { users: this.userId },
        { createdBy: this.userId }
      ]
    },
    {
      _id: 1
    }
  ).map(function(list){ return list._id; });

  var items = Items.find({
    list: {$in: lists}
  });

  return items;

});
