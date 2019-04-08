$(document).ready(function() {
    // recipeContainer holds all of our posts
    var recipeContainer = $(".favorite");
    var postCategorySelect = $("#category");
    // Click events for the edit and delete buttons
    $(document).on("click", "button.delete", handlePostDelete);
    $(document).on("click", "button.edit", handlePostEdit);
    postCategorySelect.on("change", handleCategoryChange);
    var posts;
   
    // This function grabs posts from the database and updates the view
    
});