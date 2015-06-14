Template.appView.helpers({
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

Template.appView.events({
  // listen on jasny event...
  'show.bs.offcanvas #appNavMenu': function(event) {
    $('.add-list-button').addClass('visible');
  },
  'hide.bs.offcanvas #appNavMenu': function(event) {
    $('.add-list-button').removeClass('visible');
  }
});
