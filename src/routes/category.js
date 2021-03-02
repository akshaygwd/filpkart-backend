const express = require('express');
const { adminMiddleware, requireSignn } = require('../common-middleware');
const router = express.Router();
const  { addCategory, getCategory } =  require('../controller/category');
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,  path.join(path.dirname(__dirname), 'uploads'));
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

router.post('/category/createCategory', requireSignn, adminMiddleware, upload.single('categoryImage'), addCategory);
router.get('/category/getCategory', getCategory);


module.exports = router;