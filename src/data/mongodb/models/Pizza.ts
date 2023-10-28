import { Schema, model } from "mongoose";

const PizzaSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ["whole", "half"],
        default: "whole",
        required: false
    },
    thumbnail: {
        type: [String],
        default: [""],
        required: false
    },
    status: {
        type: Boolean,
        default: true,
        required: false
    }
});

export const pizzaModel = model("pizzas", PizzaSchema);
