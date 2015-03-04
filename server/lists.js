Meteor.publish('Lists', function() {
  return Lists.find();
})