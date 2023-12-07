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

// check if the user is login
router.use((req, res, next) => {
    if (req.session.user) next();
    else res.sendStatus(401);
});

// GET Method and Get query
router.get('/', (req, res) => {
    const { id } = req.query;
    if(id !== undefined){
        const filteredProducts = Products.filter((prod) => prod.id == id);
        res.send(filteredProducts);
    }else{
        // Set Cookie
        // res.cookie('Visited', true, { maxAge : 10000,});
        res.send(Products); // Get all Products
    }
});

// GET method with Params
router.get('/:item', (req, res) => {
    // note install cookie parser
    console.log(req.cookies);
    const { item } = req.params;
    const ProductsItem = Products.find((prodItem) => prodItem.item.toLowerCase() === item.toLowerCase());
    res.send(ProductsItem);
});

router.post('/',(req, res) => {
    const {id, item, quantity, department} = req.body;
    const newItem = { id, item, quantity, department: department.toLowerCase()};
    if(department.toLowerCase() !== "product"){
        res.sendStatus(406).json({ message: "Invalid Department" });
    }else{
        Products.push(newItem);
        res.sendStatus(201);
    }
});

// example for Session
router.get('/shopping/cart', (req, res) => {
    const { cart } = req.session;
    if (!cart) {
        res.send('You have no item');
    } else {
        res.send(cart);
    }
});

router.post('/shopping/cart/item', (req, res) => {
    const { id, item, quantity, department } = req.body;
    const cartItem = { id, item, quantity, department };
    const { cart } = req.session;
    if (cart) {
        req.session.cart.items.push(cartItem);
    } else {
        req.session.cart = {
            items: [cartItem],
        };
    }
    res.sendStatus(201);
});
module.exports = router;