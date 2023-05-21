import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = new Schema({
  title: String,
  message: String,
  creator: {
    id: String,
    name: String,
    default: {},
  },
  tags: [String],
  photo: String,
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  comments: [
    {
      value: String,
      author: {
        name: String,
        photo: String,
        id: String,
      },
      date: {
        type: Date,
        default: new Date(),
      },
    },
  ],
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
