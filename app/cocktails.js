const express = require('express');
const router = express.Router();
const config = require("../config");
const Cocktail = require('../models/Cocktail');
const auth = require('../middleware/auth');
const permit = require("../middleware/permit");

router.get('/', async (req, res) => {
    const result = await Cocktail.find();
    if (result) {
        res.send(result);
    } else {
        res.sendStatus(404);
    }
});

router.post('/', [auth, config.upload.single("image")], async (req, res) => {
    const cocktailData = req.body;
    cocktailData.user = req.user._id;
    if (req.file) {
        cocktailData.image = req.file.filename;
    }
    cocktailData.ingredients = JSON.parse(req.body.ingredients);
    const cocktail = new Cocktail(cocktailData);
    try {
        await cocktail.save();
        res.send(cocktail);
    } catch (e) {
        res.status(400).send(e);
    }
});


module.exports = router;