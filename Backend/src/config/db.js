import mongoose from "mongoose";

export const connectDB = async () =>{
    const mongoUrl = process.env.MONGO_URL;

    if (!mongoUrl) {
        throw new Error("MONGO_URL is not configured. Add it to Backend/.env.");
    }

    if (mongoUrl.includes("<") || mongoUrl.includes(">")) {
        throw new Error(
            "MONGO_URL still contains a placeholder. Replace the MongoDB username and password in Backend/.env."
        );
    }

    await mongoose.connect(mongoUrl);
    console.log("Mongoose connected successfully!");
};