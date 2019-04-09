$(document).ready(function() {
    // recipeContainer holds all of our posts
    var recipeContainer = $(".favorite");
  
    postCategorySelect.on("change", handleCategoryChange);
    var posts;
   
    // This function grabs posts from the database and updates the view

    function saveRecipe(event) {
        event.preventDefault();
        upsertRecipe({
            name: nameInput
            .val()
            .trim()
        })
    };

     // A function for creating an author. Calls getRecipe upon completion
  function upsertRecipe (recipeData) {
    $.post("/api/recipe", recipeData)
      .then(getRecipe);
  };

    // Function for Creating a new list row for recipe faviorited
    function createRecipeRow(recipeData) {
        let newTr = $("<tr>");
        newTr.data("recipe", )
    }
});