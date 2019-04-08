//Carousel:
$("#search").on("submit", function (event) {
    event.preventDefault();
    var APIKey2 = "b95bb5225a3532d46ab9e25e313900b5";
    var appID = "179fac11";
    var recipe = $("#searchRecipe").val().trim();
    var queryUrl2 = "https://api.edamam.com/search?q=" + recipe + "&app_id=" + appID + "&app_key=" + APIKey2 + "&from=0&to=9"
    $.ajax({
        method: "GET",
        url: queryUrl2
    }).then(function (response) {
        console.log(response)
        for (var i = 0; i < response.hits.length; i++) {
            var imageUrl = response.hits[i].recipe.image
            var label = $("<h5>").text(response.hits[i].recipe.label);
            var linkUrl = response.hits[i].recipe.url
            var index
            if(i===0 || i===3 || i===6) {
                index = 0
            }
            else if(i===1 || i===4 || i===7) {
                index = 1
            }
            else if(i===2 || i===5 || i===8) {
                index = 2
            }
            var image = $("<img>").attr({"src": imageUrl}).addClass("d-block img" + i)
            var title = $("<div>").addClass("title" + index).append(label);
            var heart = $("<div>").addClass("heart" + index).html('<a href=""><i class="far fa-heart"></i></a>')

            if (i <= 2) {
                $(".slide1").append(image, title, heart)
            }
            else if (i <= 5) {
                $(".slide2").append(image, title, heart)
            }
            else if (i <= 8) {
                $(".slide3").append(image, title, heart)
            }
            $(".img" + i).wrap("<a href = '" + linkUrl + "' target='_blank'></a>")
            
        }

    })
})