// Get references to page elements
var $myRecipeTitle = $("#recipe-title");
var $myRecipeText = $("#recipe-text");
var $submitBtn = $("#submit");
var $myRecipeList = $("#recipe-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $myRecipe = data.map(function(example) {
      var $a = $("<a>")
        .text(example.title)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $myRecipeList.empty();
    $myRecipeList.append($myRecipe);
  });
};
refreshExamples();
// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    title: $myRecipeTitle.val().trim(),
    directions: $myRecipeText.val().trim()
  };

  if (!(example.title && example.directions)) {
    alert("You must enter an recipe title and directions!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $myRecipeTitle.val("");
  $myRecipeText.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$myRecipeList.on("click", ".delete", handleDeleteBtnClick);
