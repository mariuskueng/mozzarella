Meteor.publish('Lists', function() {
  return Lists.find({createdBy: this.userId});
})
