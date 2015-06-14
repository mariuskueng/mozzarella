Meteor.publish("Pieces", function(){
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
  }).map(function(item) { return item._id; });

  var pieces = Pieces.find({
    item: {$in: items}
  });

  return pieces;
});
