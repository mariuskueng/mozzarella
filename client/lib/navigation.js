Template.navigation.helpers({
  currentList: function() {
    var controller = Iron.controller();
    var params = controller.getParams();

    if (controller.url.indexOf('all') > -1) {
      return GENERIC_ROUTES.all.title;
    }
    else if (controller.url.indexOf('over-due') > -1) {
      return GENERIC_ROUTES.overDue.title;
    }
    if (Lists.findOne(params._id)) {
      return Lists.findOne(params._id).title;
    }
    return null;
  }
});
