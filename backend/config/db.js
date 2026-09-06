// import mongoose from "mongoose";


// export const connectDB = async () => {
//     try {
//         await mongoose.connect("mongodb+srv://dayalpal:dayalpal620@cluster0.x1uycdy.mongodb/");
//         console.log("MONGODB CONNECTED")
//     } catch (error) {
//         console.log(`Error: ${error.message}`);
//     }
// }

import mongoose from "mongoose";

export const connectDB = async () => {
    if (mongoose.connection.readyState === 1) return mongoose.connection;

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected Successfully");
        return mongoose.connection;
    } catch (error) {
        console.log("MongoDB Connection Error:", error.message);
        throw error;
    }
};

export default connectDB;