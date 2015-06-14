Meteor.publish("Pieces", function(){
  // var items = Items.find()
  // .map(function(item){ return item._id; });
  //
  // var pieces = Pieces.find({
  //   list: {$in: lists}
  // });
  //
  // return pieces;
  return Pieces.find({});
});
