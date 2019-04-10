$(document).ready(function () {
    // recipeContainer holds all of our posts
    //let recipeContainer = $(".heart");

    //postCategorySelect.on("change", handleCategoryChange);
    //var posts;

    // this will save recipe on click function

    $(document).on("click", ".heart", saveRecipe);


    // $("#houndSearch").on("submit", function (event) {
    //     event.preventDefault();
    
    //     const houndSearch = $("#hound-search-input").val().trim();
    
    
    //     var queryUrl2 = `/api/hound/${houndSearch}`;
       
    //     $.ajax({
    //         method: "GET",
    //         url: queryUrl2
    //     }).then(function (response) {
    //         console.log(response);
    //         $("#show-hound-text").text(response.WrittenResponseLong);
    //     });
    // });

    let favContainer = $(".fav-container");
    let posts;
    // This function grabs posts from the database and updates the view

    function saveRecipe() {
        // event.preventDefault();
        //alert("Ive been clicked!")
        const newRecipe = ({
            title: $(this).attr("data-title"),
            UserId: 20
        })

        $.post("/api/favorites", newRecipe, function (data) {
            console.log(data.title);
            console.log("post data route")
        })

        $.get("/api/favorites", newRecipe, function (data) {
            $("#bob2").text(JSON.stringify(newRecipe.title));
        })



        // console.log(newRecipe);
    };

    function getFavorite(andres) {
        $.get("/api/favorites" + andres, function (data) {
            console.log("favorites");
            posts = data.title;
            $("#bob").text(data.title);
            if (!posts || !posts.length) {
                displayEmpty();
            }
            else {
                initializeRows();
            }
        });
    };

    getFavorite();

    function initializeRows() {
        favContainer.empty();
        var postsToAdd = [];
        for (var i = 0; i < posts.length; i++) {
            postsToAdd.push(createNewRow(posts));
            console.log(posts)
        }

        //console.log(posts) = this is giving up an html page
        console.log("this is the post part")
        favContainer.append(postsToAdd);
    }

    function createNewRow(post) {
        var newFav = $("<div>");
        var deleteBtn = $("<button>");
        deleteBtn.text("x");
        deleteBtn.addClass("delete btn btn-danger");
        var newPostTitle = $("<h2>");
        newPostTitle.text(post.title + " ");
        newFav.append(deleteBtn, newPostTitle)
        return newFav;
    }

    function displayEmpty() {
        favContainer.empty();
        var messageH2 = $("<h2>");
        messageH2.css({ "text-align": "center", "margin-top": "50px" });
        messageH2.html("No posts yet for this category, navigate <a href='/cms'>here</a> in order to create a new post.");
        favContainer.append(messageH2);
    }

    // A function for creating an favorite recipe. Calls getRecipe upon completion
    // function upsertRecipe(recipeData) {
    //     $.post("/api/recipe", recipeData)
    //         .then(getRecipe);
    // };

    // Function for Creating a new list row for recipe faviorited
    // function createRecipeRow(recipeData) {
    //     let newTr = $("<tr>");
    //     newTr.data("recipe")
    // }
});