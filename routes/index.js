var express = require('express');
var router = express.Router();

const products = [
  {
    title: "Apollo",
    price: "$50.00",
    imageUrl: "/images/product-image.webp",
    ratingTotal: 5,
    averageRating: 5,
  },
  {
    title: "Apollo Running",
    price: "$25.00",
    imageUrl: "/images/product-image.webp",
    ratingTotal: 6,
    averageRating: 5,
  },

  {
    title: "Apollo Short",
    price: "$10.00",
    imageUrl: "/images/product-image.webp",
    ratingTotal: 7,
    averageRating: 5,
  },

  {
    title: "Running Short",
    price: "$20.00",
    imageUrl: "/images/product-image.webp",
    ratingTotal: 8,
    averageRating: 5,
  },

  {
    title: "Running",
    price: "$60.00",
    imageUrl: "/images/product-image.webp",
    ratingTotal: 9,
    averageRating: 5,
  },
  {
    title: "Running Apollo",
    price: "$17.00",
    imageUrl: "/images/product-image.webp",
    ratingTotal: 10,
    averageRating: 5,
  },
  {
    title: "Short",
    price: "$10.00",
    imageUrl: "/images/product-image.webp",
    ratingTotal: 11,
    averageRating: 5,
  },

  {
    title: "Short Apollo Running",
    price: "$15.00",
    imageUrl: "/images/product-image.webp",
    ratingTotal: 12,
    averageRating: 4,
  },
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Shopping Cart', products });
});

module.exports = router;
