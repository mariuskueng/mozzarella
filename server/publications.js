// passing null as collection name because we already subscribe to Meteor.users
Meteor.publish(null, function() {
  return Meteor.users.find({}, {fields: {'emails.address': 1}});
});
