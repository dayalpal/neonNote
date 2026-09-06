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
// import dotenv from "dotenv";
// dotenv.config();

export const connectDB = async () => {
    try {
        await mongoose.connect(
            process.env.MONGO_URI
        );
//mongodb+srv://dayalpal:<db_password>@cluster0.x1uycdy.mongodb.net/
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.log("MongoDB Connection Error:", error.message);
        process.exit(1);
    }
};

export default connectDB;