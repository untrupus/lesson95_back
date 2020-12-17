const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CocktailSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: String,
    published: {
        type: Boolean,
        required: true,
        default: false
    },
    user: {
        type: Schema.Types.ObjectID,
        ref: "User",
        required: true
    },
    recipe: {
        type: String,
        required: true
    },
    ingredients: []
});

const Cocktail = mongoose.model("Cocktail", CocktailSchema);
module.exports = Cocktail;