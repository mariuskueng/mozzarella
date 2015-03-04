Meteor.publish('Pieces', function() {
  return Pieces.find();
})