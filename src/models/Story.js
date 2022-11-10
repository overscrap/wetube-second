import mongoose from "mongoose";

//형식을 정해준다.
const storySchema = new mongoose.Schema({
    title: String,
    description: String,
    creationAt: Date,
    hashtag: [{ type: String }],
    meta: {
        views: Number,
        rating: Number,

    }
});

const Story = mongoose.model("Story", storySchema);
export default Story;