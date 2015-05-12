Template.appView.events({
  // listen on jasny event...
  'show.bs.offcanvas #appNavMenu': function(event) {
    $('.add-list-button').addClass('visible');
  },
  'hide.bs.offcanvas #appNavMenu': function(event) {
    $('.add-list-button').removeClass('visible');
  }
});
