$("#houndSearch").on("submit", function (event) {
    event.preventDefault();

    const houndSearch = $("#hound-search-input").val().trim();


    var queryUrl2 = `/api/hound/${houndSearch}`;
   
    $.ajax({
        method: "GET",
        url: queryUrl2
    }).then(function (response) {
        console.log(response);
        $("#show-hound-text").text(response.WrittenResponseLong);
    });
});