$(document).ready(function () {

// The API object contains methods for each kind of request we'll make
var API = {
  saveFav: function(recipe) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/favorites",
      data: JSON.stringify(recipe)
    });
  },
  getFavs: function() {
    return $.ajax({
      url: "api/favorites",
      type: "GET"
    });
  },
  deleteFav: function(id) {
    return $.ajax({
      url: "api/favorites/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshFavs = function() {
  $(".fav-container").empty()
  API.getFavs().then(function(data) {
    //console.log(data)
    for(let i=0; i<data.length; i++) {
      var tableRow = $("<tr>")
      var tableIndex = $("<th>")
      tableIndex.attr("scope", i).text(i + 1)
      var tableEntry = $("<td>").text(data[i].title).attr("class", "fav-item" + i)
      var deleteBtn = $("<td>").html("<button class='btn deleteRecipe' data-id=" + data[i].id +">X</button>")
      tableRow.append(tableIndex, tableEntry, deleteBtn)
      $(".fav-container").append(tableRow)
      $(".fav-item" + i).wrap("<a href = '" + data[i].link + "' target='_blank'></a>")
    }
    
  });
};
refreshFavs()
// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFavSubmit = function(recipeTitle, recipeLink) {

  var favorite = {
    title: recipeTitle,
    link: recipeLink,
    UserId: 1
  };
//console.log(favorite)
  API.saveFav(favorite).then(function() {
    refreshFavs();
  });

};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function(recipeid) {
  var idToDelete = recipeid

  API.deleteFav(idToDelete).then(function() {
    //refreshFavs();
    location.reload("/")
  });
};

// Add event listeners to the submit and delete buttons
$(document).on("click", ".heart", function(event) {
  event.preventDefault()
  var recipeTitle = $(this).attr("data-title")
  var recipeLink = $(this).attr("data-link")
  handleFavSubmit(recipeTitle, recipeLink)
});
$(document).on("click", ".deleteRecipe", function(event) {
  event.preventDefault()
  var recipeid = $(this).attr("data-id")
  console.log(recipeid)
  handleDeleteBtnClick(recipeid)
});
})