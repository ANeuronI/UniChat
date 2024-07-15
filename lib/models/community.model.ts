import mongoose from "mongoose";

// Define the user schema
const communitySchema = new mongoose.Schema({
    id: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    image: { type: String },
    bio: { type: String },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    threads: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thread'
        }
    ],
    members:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ]
});

// Export the user model
const Community = mongoose.models.Community || mongoose.model('Community', communitySchema);
export default Community;
