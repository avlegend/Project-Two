const db = require("../models");
const passport = require("../config/passport");
const isAuthenticated = require("../config/middleware/isAuthenticated");
const uuid = require("node-uuid");
const crypto = require("crypto");
const axios = require("axios");

module.exports = app => {
  //FAVORITES ROUTES
  // Get all favorites
  app.get("/api/favorites", isAuthenticated, (req, res) => {
    db.Favorite.findAll({
       where: {
        UserId: req.user.id
       }
    }).then(dbFavs => {
      res.json(dbFavs);
    });
  });

  // Create a new favorite
  app.post("/api/favorites", isAuthenticated, (req, res) => {
    db.Favorite.create({
      UserId: req.user.id,
      title: req.body.title,
      link: req.body.link, 
      calories: req.body.calories
    }).then(dbFav => {
      res.json(dbFav);
    });
  });

  // Delete a favorite by id
  app.delete("/api/favorites/:id", (req, res) => {
    db.Favorite.destroy({ where: { id: req.params.id } }).then(dbFavs => {
      res.json(dbFavs);
    });
  });


  //MY RECIPES ROUTES
  // Get all examples
  app.get("/api/examples", isAuthenticated, (req, res) => {
    db.Example.findAll({
      where: {
        UserId: req.user.id
      }
    }).then(dbExamples => {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", isAuthenticated, (req, res) => {
    db.Example.create({
      UserId: req.user.id,
      title: req.body.title,
      directions: req.body.directions
    }).then(dbExample => {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", (req, res) => {
    db.Example.destroy({ where: { id: req.params.id } }).then(dbExample => {
      res.json(dbExample);
    });
  });
  // Update an example by id
  app.put("/api/examples", function(req, res) {
    db.Post.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });


  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/profile");
   
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      userName: req.body.userName,
      password: req.body.password,
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(422).json(err.errors[0].message);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });




  app.get("/api/hound/:query", (req, res) => {


    function generateAuthHeaders(clientId, clientKey, userId, requestId) {

      if (!clientId || !clientKey) {
        throw new Error('Must provide a Client ID and a Client Key');
      }

      // Generate a unique UserId and RequestId.
      userId = userId || uuid.v1();

      // keep track of this requestId, you will need it for the RequestInfo Object
      requestId = requestId || uuid.v1();

      var requestData = userId + ';' + requestId;

      // keep track of this timestamp, you will need it for the RequestInfo Object
      var timestamp = Math.floor(Date.now() / 1000),

        unescapeBase64Url = function (key) {
          return key.replace(/-/g, '+').replace(/_/g, '/');
        },

        escapeBase64Url = function (key) {
          return key.replace(/\+/g, '-').replace(/\//g, '_');
        },

        signKey = function (clientKey, message) {
          var key = new Buffer(unescapeBase64Url(clientKey), 'base64');
          var hash = crypto.createHmac('sha256', key).update(message).digest('base64');
          return escapeBase64Url(hash);

        },

        encodedData = signKey(clientKey, requestData + timestamp),
        headers = {
          'Hound-Request-Authentication': requestData,
          'Hound-Client-Authentication': clientId + ';' + timestamp + ';' + encodedData
        };

      return headers;
    };

    const myHeaders = generateAuthHeaders("eT1NIPB2gSoL9yvc-cg1Pg==", "GDD42myRc-vD7_ZEBqG_7r_2dh2nZVjKBFcBEJuDrmYzGwBzTfWPl5Fm51-RHKLotgFbs2vBFnmf7_DM_8yj0Q==")
    axios({
      url: `https://api.houndify.com/v1/text?query=${req.params.query}`,
      method: "POST",
      headers: myHeaders
    }).then(response => {
      res.json(response.data.AllResults[0]);
    });
  })



 };
