$("#user-sign-up").on("submit", function (e) {
  e.preventDefault();
  $.ajax({
    method: "POST",
    url: "/api/post",
    data: {
      email: $("#email")
        .val()
        .trim(),
      userName: $("#userName")
        .val()
        .trim(),
      password: $("#password")
        .val()
        .trim()
    }
  })
    .then(function (data) {
      console.log(data);
      window.location.replace(data);
    })
    .catch(function (err) {
      console.log(err);
      alert(err.responseText);
    });
});
