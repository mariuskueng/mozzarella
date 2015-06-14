Pieces = new Mongo.Collection('Pieces');

Pieces.allow({
  insert: function(userId, piece) {
    // only allow adding if you are logged in
    return !! userId;
  }
});

Meteor.methods({
  'addPiece': function(piece, itemId) {
    console.log(piece);
    var pieceId = Pieces.insert({
      item: itemId,
      title: piece.text,
      dueDate: piece.dueDate,
      completed: piece.completed
    });
    return pieceId;
  },
  'setCompletePiece': function(pieceId, completed) {
    Pieces.update({
      _id: pieceId,
    }, {
      $set: {
        'completed': completed
      }
    });
  },
});
