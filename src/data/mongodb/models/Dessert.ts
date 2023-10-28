import { Schema, model } from "mongoose";

const DessertSchema = new Schema({
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
        enum: ["cold", "hot"],
        default: "cold",
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

export const dessertModel = model("desserts", DessertSchema);
