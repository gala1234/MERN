const express = require('express');
const router = express.Router();

// Require the controller
const data_controller = require('../controllers/data.controller');

// a simple test url to check that all of our files are communicating correctly.
router.get('/test', data_controller.test);
module.exports = router;

// 1ª task in my CRUD, Create a new product.
router.post('/create', data_controller.product_create);
// 2º task in my CRUD, Read an existing product.
router.get('/:id', data_controller.product_details); 
// 3º task in my CRUD, Update an existing product.
router.put('/:id/update', data_controller.product_update);
// 4º task in my CRUD, Delete an existing product.
router.delete('/:id/delete', data_controller.product_delete);