const { Router } = require('express');
const router = Router();

const superMarkets = [
    {
        name: 'Robinsons'
    },
    {
        name: 'Everwin'
    },
    {
        name: 'New Star'
    },
];

router.get('/', (req, res) => {
    res.send(superMarkets)
})

module.exports = router;