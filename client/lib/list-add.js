Template.addListView.events({
  'submit .add-list': function (event, template) {
    // This function is called when the new item form is submitted
    var text = event.target.text.value;
    if (text === '') return false;
    Meteor.call("addList", text);

    // Clear form
    event.target.text.value = "";

    // Prevent default form submit
    return false;
  }
});
