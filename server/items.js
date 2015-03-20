Meteor.publish('Items', function() {
  return Items.find({createdBy: this.userId});
});
