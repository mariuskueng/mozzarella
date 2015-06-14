Template.settings.helpers({
  bgImageUrl: function(){
    if (Session.get('bgImageUrl')) {
      return Session.get('bgImageUrl');
    } else {
      var user = Meteor.user();
      if (user && user.profile.backgroundImage)
        return user.profile.backgroundImage;
    }
  }
});

Template.settings.events({
  'submit #form-settings': function(event, template){
    var bgImageUrl = event.target.backgroundImage.value;

    Meteor.call('setUserBackgroundImage', bgImageUrl, function(error, response) {
      Session.set('bgImageUrl', bgImageUrl);
    });

    return false;
  }
});
