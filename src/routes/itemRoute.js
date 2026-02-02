const express = require('express');
const ItemController = require('../controllers/itemController');

const router = express.Router();

router.get("/all-items", ItemController.getAllItems)
router.get("/items", ItemController.getSearchedItems)
router.get("/items/:id", ItemController.getSingleItem)

module.exports = router