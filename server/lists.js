Meteor.publish('Lists', function() {
  return Lists.find({
    $or: [
      { users: this.userId },
      { createdBy: this.userId }
    ]});
});
