const express = require('express');
const app = express();

const Product = require("../models/productM");

app.get('/', function (req, res) {
    res.json({
        'success': true,
        'message' : 'Welcome to NODEJS + MONGODB + ROBO 3T API PRODUCTS',
        'data' : []
    })
});
  
app.get('/products', function (req, res) {

    Product.find({})
            .exec( (err, productList) => {
                if(err){
                    return res.status(400).json({
                        'success': false,
                        'message' : err,
                        'data' : []
                    });
                }
                return res.json({
                    'success': true,
                    'message' : 'Product List',
                    'data' : [productList]
                })
            });

});
  
app.post('/product', function (req, res) {
    let data = req.body;

    let product = new Product({
        name: data.name,
        branch: data.branch,
        description: data.description,
        color: data.color,
        cost: data.cost
    });

    product.save( (err, productDB) => {
        if(err){
            return res.status(400).json({
                'success': false,
                'message' : err,
                'data' : []
            });
        }
        return res.json({
            'success': true,
            'message' : 'Product saved successfully',
            'data' : [productDB]
        })
    });
});


app.get('/product/:id', function (req, res) {
    let id = req.params.id;

    Product.findById(id)
            .exec( (err, productDetail) => {
                if(err){
                    return res.status(400).json({
                        'success': false,
                        'message' : err,
                        'data' : []
                    });
                }
                return res.json({
                    'success': true,
                    'message' : 'Product Detail',
                    'data' : [productDetail]
                })
            });
});


app.put('/product/:id', function (req, res) {
    let id = req.params.id;
    let data = req.body;

    Product.findByIdAndUpdate(id, data, {new : true,  runValidators: true}, (err, productDB) => {
        if(err){
            return res.status(400).json({
                'success': false,
                'message' : err,
                'data' : []
            });
        }
        return res.json({
            'success': true,
            'message' : 'Product updated successfully',
            'data' : [productDB]
        })
    });
});



app.delete('/product/:id', function (req, res) {
    let id = req.params.id;
    let data = { active : false };
    Product.findByIdAndUpdate(id, data, {new : true,  runValidators: true}, (err, productDB) => {
        if(err){
            return res.status(400).json({
                'success': false,
                'message' : err,
                'data' : []
            });
        }
        if(!productDB){
            return res.status(400).json({
                'success': false,
                'message' : 'Product doesnt found',
                'data' : []
            });
        }
        return res.json({
            'success': true,
            'message' : 'Product deleted successfully',
            'data' : [productDB]
        })
    });
});


module.exports = app;