//Carousel:
$("#search").on("submit", function (event) {
    event.preventDefault();
    var APIKey2 = "b95bb5225a3532d46ab9e25e313900b5";
    var appID = "179fac11";
    var recipe = $("#searchRecipe").val().trim();
    var queryUrl2 = "https://api.edamam.com/search?q=" + recipe + "&app_id=" + appID + "&app_key=" + APIKey2 + "&from=0&to=9"
    //clear previous results
    $(".slide1").empty();
    $(".slide2").empty();
    $.ajax({
        method: "GET",
        url: queryUrl2
    }).then(function (response) {
        console.log(response)
        for (var i = 0; i < response.hits.length; i++) {
            var imageUrl = response.hits[i].recipe.image
            var label = $("<h5>").text(response.hits[i].recipe.label);
            var linkUrl = response.hits[i].recipe.url
            var index;
            
            var imgContainer = $("<div>").addClass("col-3 float-left resultImg")
            var image = $("<img>").attr({ "src": imageUrl }).addClass("img-fluid recipeImg" + i)
            var title = $("<div>").addClass("title").append(label);
            var heart = $("<div>").addClass("heart").html('<a href="#"><i class="far fa-heart"></i></a>').attr("data-title", response.hits[i].recipe.label)
            
            if (i <= 3) {
                imgContainer.append(image, title, heart);
                $(".slide1").append(imgContainer);
            }
            else if (i <= 7) {
                imgContainer.append(image, title, heart);
                $(".slide2").append(imgContainer)
            }
            $(".recipeImg" + i).wrap("<a href = '" + linkUrl + "' target='_blank'></a>")
            console.log(linkUrl)
                //<div class="col-3 float-left"><img class="img-fluid" src="http://placehold.it/350x280/222/fff?text=1">
            //     < div class="title" >
            //         <h5>First slide label</h5>
            //     </div >
            //     <div class="heart">
            //         <a href=""><i class="far fa-heart"></i></a>
            //     </div>
            // </div >
        }

    })
})