Meteor.publish('Items', function() {
  return Items.find();
});
