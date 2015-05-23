Meteor.startup(function () {
  sAlert.config({
      effect: 'stackslide',
      position: 'top-right',
      timeout: 5000,
      html: false,
      onRouteClose: true
  });
});
