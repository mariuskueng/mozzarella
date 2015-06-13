Template.settings.helpers({
  bgImageUrl: function(){
    if (Session.get('bgImageUrl')) {
      return Session.get('bgImageUrl');
    } else {
      var user = Meteor.user();
      return user.profile.backgroundImage;
    }
  }
});

Template.settings.events({
  'submit #form-settings': function(event, template){
    console.log(event.target);
    var bgImageUrl = event.target.backgroundImage.value;
    console.log(bgImageUrl);

    Meteor.call('setUserBackgroundImage', bgImageUrl, function(error, response) {
      Session.set('bgImageUrl', bgImageUrl);
    });

    return false;
  }
});
