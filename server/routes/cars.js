// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// define the car model
let car = require("../models/cars");

/* GET cars List page. READ */
router.get("/", (req, res, next) => {
  // find all cars in the cars collection
  car.find((err, cars) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("cars/index", {
        title: "Cars",
        cars: cars,
      });
    }
  });
});

//  GET the Car Details page in order to add a new Car
router.get("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
   car.find((err, cars) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("cars/details", {
        title: "Add Cars",
        cars: cars,
      });
    }
  });
});

// POST process the Car  Details page and create a new Car  - CREATE
router.post("/add", (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/

  let newCar = car ({
    "Carname" : req.body.Carname,
    "Category" : req.body.Category,
    "Carmodel" : req.body.Carmodel,
    "Price": req.body.Price,
  });

  car.create(newCar, (err, car) =>{
    if (err)
    {
      res.end(err)
    }

    else {
      res.redirect("/cars")
      console.log("the submit button is still working")
    }

  })
   

});


  ///CREATE NEW CAR NOW///



// GET the Car Details page in order to edit an existing Car
router.get("/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   * 
   *****************/
  let id = req.params.id;
  car.findById(id, (err, cartoedit) => {
    if (err) {
      console.log(err);
      res.end(err)
      console.log("This route is NOT working")
    }
    else {
      console.log("this route is working")
      res.render("cars/details" , {
        title: "Edit Car",
        car: cartoedit,

      });
    }
  }) 
  
 
});

// POST - process the information passed from the details form and update the document
router.post("/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/

  let id = req.params.id;
  let updateCar = car ({
    _id:id,
    Carname : req.body.Carname,
    Category : req.body.Category,
    Carmodel : req.body.Carmodel,
    Price: req.body.Price,

  });

  car.updateOne ({_id:id}, updateCar, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      res.redirect("/cars");
    }
  });


});



// GET - process the delete
router.get("/delete/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  console.log("the delete button is working on first instance")
  let id = req.params.id;
  car.remove({_id:id}, (err) => {
    if(err){
      console.log(err);
      res.end(err);
    }
    else{

      console.log("the delete button is working")
      res.redirect("/cars")
    }
  });
});

module.exports = router;
