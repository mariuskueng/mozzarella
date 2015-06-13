Meteor.users.deny({
  update: function() {
    return true;
  }
});

Meteor.methods({
  'setUserBackgroundImage': function (url) {
    Meteor.users.update(Meteor.userId(), {
      $set: {
        'profile.backgroundImage': url
      }
    });
  }
});
