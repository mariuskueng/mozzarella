Meteor.publish('Lists', function() {
  return Lists.find({
    $or: [
      { users: this.userId },
      { createdBy: this.userId }
    ]});
});

Meteor.methods({
  'getUserIdByEmail': function(email) {
    var user = Meteor.users.findOne({'emails.address': email});
    if (user) {
      return user._id;
    }
    return null;
  }
});
