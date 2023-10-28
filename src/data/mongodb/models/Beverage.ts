import { Schema, model } from "mongoose";

const BeverageSchema = new Schema({
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
    category: {
        type: String,
        required: true
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

export const beverageModel = model("beverages", BeverageSchema);
