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
  },
  'getListCollaborators': function (listId) {
    var currentList = Lists.findOne(listId);
    var users = [];
    if (currentList) {
      currentList.users.forEach(function (userId) {
        if (userId !== Meteor.userId()) {
          var user = Meteor.users.findOne(userId, {fields: {'emails.address': 1}});
          if (user) {
            users.push(user.emails[0].address);
          }
        }
      });
      return users;
    }
  }
});
