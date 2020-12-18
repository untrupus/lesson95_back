const express = require('express');
const router = express.Router();
const config = require("../config");
const Cocktail = require('../models/Cocktail');
const auth = require('../middleware/auth');
const permit = require("../middleware/permit");

router.get('/', async (req, res) => {
    let query;
    if (req.query.user) {
        query = {user: req.query.user}
    }
    const result = await Cocktail.find(query);
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

router.delete('/:id', [auth, permit("admin")], async (req, res) => {
    const result = await Cocktail.findByIdAndRemove({_id: req.params.id});
    if (result) {
        res.send("Cocktail removed");
    } else {
        res.sendStatus(404);
    }
});

router.patch('/:id', [auth, permit("admin")], async (req, res) => {
    if (req.body.user) {
        res.send("You can`t change user");
    } else {
        const result = await Cocktail.findByIdAndUpdate(req.params.id, req.body);
        if (result) {
            res.send('Success');
        } else {
            res.sendStatus(404);
        }
    }
});

router.put("/:id", auth, async (req, res) => {
    const newRate = {
        user: req.user._id,
        rating: req.body.rating
    }
    const result = await Cocktail.findById({_id: req.params.id});
    let rating = result.rating.find(index => index.user.equals(req.user._id));

    if (!rating) {
        result.rating.push(newRate);
    } else {
        rating.rating = req.body.rating;
    }

    const cocktail = new Cocktail(result);
    if (result) {
        await cocktail.save();
        res.send(cocktail);
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;