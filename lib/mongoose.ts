import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (!process.env.MONGODB_URL) {
        console.log('MongoDB URL not found');
        return;
    }
    if (isConnected) {
        console.log('Already connected to the database');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL, {});
        isConnected = true;
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
    }
};

