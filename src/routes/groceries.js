const { Router } = require('express');
const router = Router();

const Products = [
    {
        id: 1,
        item: 'Milk',
        quantity: 2,
        department: 'product',
    },
    {
        id: 2,
        item: 'Chocolate',
        quantity: 1,
        department: 'product',
    },
    {
        id: 3,
        item: 'Cereal',
        quantity: 3,
        department: 'product',
    },
]

// GET Method and Get query
router.get('/', (req, res) => {
    const { id } = req.query;
    if(id !== undefined){
        const filteredProducts = Products.filter((prod) => prod.id == id);
        res.send(filteredProducts);
    }else{
        res.send(Products); // Get all Products
    }
});

// GET method with Params
router.get('/:item', (req, res) => {
    const { item } = req.params;
    const ProductsItem = Products.find((prodItem) => prodItem.item.toLowerCase() === item.toLowerCase());
    res.send(ProductsItem);
});

router.post('/',(req, res) => {
    const {id, item, quantity, department} = req.body;
    const newItem = { id, item, quantity, department: department.toLowerCase()};
    if(department.toLowerCase() !== "product"){
        res.status(406).json({ message: "Invalid Department" });
    }else{
        Products.push(newItem);
        res.sendStatus(201)
    }
});

module.exports = router;