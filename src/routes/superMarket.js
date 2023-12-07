const { Router } = require('express');
const router = Router();

// check if the user is login
router.use((req, res, next) => {
    if (req.session.user) next();
    else res.sendStatus(401);
});

const superMarkets = [
    {
        id: 1,
        name: 'Robinsons',
        rating: 1.5,
        department: 'store',
    },
    {
        id: 2,
        name: 'Everwin',
        rating: 2,
        department: 'store',
    },
    {
        id: 3,
        name: 'New Star',
        rating: 2.5,
        department: 'store',
    },
];

// Get method and Get Query
router.get('/', (req, res) => {
    const { rating } = req.query; // Get Query
    if(rating !== undefined){
        const filteredStores = superMarkets.filter((market) => market.rating == rating);
        res.send(filteredStores);
    }else{
        res.send(superMarkets); // Get all Stores 
    }
});

// GET method with Params
router.get('/:name', (req, res) => {
    const { name } = req.params;
    const findStore = superMarkets.find((store) => store.name.toLowerCase() === name.toLowerCase());
    res.send(findStore);
});

// Insert new Store
router.post('/', (req, res) => {
    const { id, name, rating, department} = req.body;
    const newStore = {id, name, rating, department: department.toLowerCase()};
    if(department.toLowerCase() !== "store"){
        res.sendStatus(406).json({ message: "Invalid Department" });
    }else{
        superMarkets.push(newStore)
        res.sendStatus(201).json({ message: "Successfully Added" });
    }
});

module.exports = router;