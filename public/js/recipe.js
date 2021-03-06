$(document).ready(function () {
  // Get references to page elements
  var $myRecipeTitle = $("#recipe-title");
  var $myRecipeText = $("#recipe-text");
  var newrecipe = []
  // The API object contains methods for each kind of request we'll make
  var API = {
    saveExample: function (example) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/examples",
        data: JSON.stringify(example)
      });
    },
    getExamples: function () {
      return $.ajax({
        url: "api/examples",
        type: "GET"
      });
    },
    deleteExample: function (id) {
      return $.ajax({
        url: "api/examples/" + id,
        type: "DELETE"
      });
    }
  };

  // refreshExamples gets new examples from the db and repopulates the list
  var refreshExamples = function () {
    $("#recipe-list").empty();
    API.getExamples().then(function (data) {
      console.log(data.length)
      if (data.length === 0) {
        $(".myrecipe-data").hide();
        $(".myrecipe-table").hide()
      }
      else {
        $(".myrecipe-data").show();
        $(".myrecipe-table").show();
      }
      for (let i = 0; i < data.length; i++) {
        var tableRow = $("<tr>")
        var tableIndex = $("<th>")
        tableIndex.attr("scope", i).text(i + 1)
        var tableEntry = $("<td>").text(data[i].title).attr("class", "my-recipe" + i)
        var dataEntry = $("<td>").text(data[i].directions).attr("class", "myrecipeEntry")
        var deleteBtn = $("<td>").html("<button class='btn deleteMyRecipe' data-id=" + data[i].id + ">X</button>")
        var updateBtn = $("<td>").html("<button class='btn updateMyRecipe' data-id=" + data[i].id + ">+</button>")
        tableRow.append(tableIndex, tableEntry, dataEntry, updateBtn, deleteBtn)
        $("#recipe-list").append(tableRow)
        $(".my-recipe" + i).wrap("<a href = '/example/" + data[i].id + "' class='my-recipe-link'></a>")
      }

    });
  };
  refreshExamples();
  // handleFormSubmit is called whenever we submit a new example
  // Save the new example to the db and refresh the list
  var handleFormSubmit = function () {

    var example = {
      title: $myRecipeTitle.val().trim(),
      directions: $myRecipeText.val().trim()
    };
    // // If we're updating a post run updatePost to update a post
    // // Otherwise run submitPost to create a whole new post
    // if (updating) {
    //   exampe.id = postId;
    //   updatePost(newPost);
    // }
    // else {
    //   submitPost(newPost);
    // }

    if (!(example.title && example.directions)) {
      alert("You must enter an recipe title and directions!");
      return;
    }

    API.saveExample(example).then(function () {
      refreshExamples();
    });

    $myRecipeTitle.val("");
    $myRecipeText.val("");
  };

  // handleDeleteBtnClick is called when an example's delete button is clicked
  // Remove the example from the db and refresh the list
  var handleDeleteBtnClick = function (recipeid) {

    var idToDelete = recipeid
    API.deleteExample(idToDelete).then(function () {
      refreshExamples();
      //location.reload("/example")
    });
  };

  // Add event listeners to the submit and delete buttons
  $(document).on("click", "#submit", function () {
    event.preventDefault()
    handleFormSubmit()
  });
  $(document).on("click", ".deleteMyRecipe", function () {
    var recipeid = $(this).attr("data-id")
    //console.log(recipeid)
    handleDeleteBtnClick(recipeid)
  });
  $(document).on("click", ".updateMyRecipe", function (event) {
    event.preventDefault()
    var recipeid = $(this).attr("data-id")
    console.log(recipeid)
    if ($myRecipeTitle.val().trim() === "" && $myRecipeText.val().trim()==="") {
      alert("You must enter your modifications first!");
      return;
    }
    $.ajax({
      method: "PUT",
      url: `/api/examples/` + recipeid,
      data: {
        title: $myRecipeTitle.val().trim(),
        directions: $myRecipeText.val().trim()
      }
    })
      .then(function (example) {
        console.log(example)
        refreshExamples()
        //window.location.href = "/example";
      })
  });

  // function updatePost() {
  //   $.ajax({
  //     method: "PUT",
  //     url: "/api/examples/:id",
  //     data: 
  //   })
  //     .then(function() {
  //       window.location.href = "/example";
  //     });
  // }

})
