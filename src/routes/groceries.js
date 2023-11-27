const { Router } = require('express');
const router = Router();

const Products = [
    {
        item: 'Milk',
        quantity: 2,
    },
    {
        item: 'Chocolate',
        quantity: 1,
    },
    {
        item: 'Cereal',
        quantity: 3,
    },
]

// GET Method
router.get('/', (req, res) => {
        res.send(Products);
    },
);

// use GET method with Params
router.get('/:item', (req, res) => {
    const { item } = req.params;
    const ProductsItem = Products.find((prodItem) => prodItem.item.toLowerCase() === item.toLowerCase());
    res.send(ProductsItem);
    },
);

router.post('/',(req, res) => {
    Products.push(req.body);
    res.sendStatus(201);
    }
);

module.exports = router;