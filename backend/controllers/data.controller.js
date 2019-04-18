const Data = require('../models/data.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.json({'message': 'Greetings from the Test controller!'});
};

// The data_create controller
exports.data_create = function (req, res, next) {
    const reqBody = req.body
    let product = new Product(
        {
            name: {
                title: {ES: "nombre", EN: "name"},
                value: reqBody.name.value
            },
            description: {
                title: {ES: "descripción", EN: "description"},
                value: {ES: reqBody.description.value.ES, EN: reqBody.description.value.EN}
            }
        }
    );

    product.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully')
    })
};

// The product_details controller
exports.product_details = function (req, res, next) {
    Product.findById(req.params.id, function (err, product) {
        if (err) return next (err);
        res.send(product);
    });
};

// The product_update controller
exports.product_update = function (req, res, next) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body},function (err, product) {
        if (err) return next (err);
        res.send('Product updated.');
    });
}

// The product_delete controller
exports.product_delete = function (req, res, next) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next (err);
        res.send('Deleted successfully!');
    })
};