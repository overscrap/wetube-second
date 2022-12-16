import mongoose from "mongoose";

//형식을 정해준다.
const storySchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now, required: true },
    hashtags: [{ type: String, trim: true }],
    meta: {
        views: { type: Number, default: 0, required: true },
        rating: { type: Number, default: 0, required: true },
    },
    owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    fileUrl: String
});

storySchema.static("formatHashtags", function (hashtags) {
    return hashtags.split(",").map((word) => word.startsWith("#") ? word : `#${word}`);
});

const Story = mongoose.model("Story", storySchema);
export default Story;