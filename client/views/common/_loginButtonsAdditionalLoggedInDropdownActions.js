Template._loginButtonsLoggedInDropdown.events({
    'click #login-buttons-about': function(event) {
        Router.go('about');
    },
    'click #login-buttons-settings': function(event) {
        $('#settings-modal-dialog').modal('show');
    },
});
