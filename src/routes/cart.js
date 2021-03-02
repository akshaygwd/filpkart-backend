const express = require('express');
const { userMiddleware, requireSignn } = require('../common-middleware');
const router = express.Router();
const  { addItemToCart } =  require('../controller/cart');


router.post('/user/cart/addtocart', requireSignn, userMiddleware, addItemToCart);


module.exports = router;