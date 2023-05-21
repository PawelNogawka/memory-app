import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";
import Joi from "joi";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    if (postMessages.length === 0) {
      res.status(404).json({ message: "No posts found." });
    } else {
      res.status(200).json({ postMessages });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Internal server error, please try again later.",
      details: error.message,
    });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostMessage.findById(id);

    if (!post) {
      res.status(404).json({
        message: "Post not found. Unable to find a post with the provided ID.",
      });
    } else {
      res.status(200).json(post);
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error, please try again later.",
      details: error.message,
    });
  }
};

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.params;

  const decodedSearchQuery = decodeURIComponent(searchQuery);
  const decodedTags = tags
    ? tags.split(",").map((tag) => decodeURIComponent(tag))
    : [];

  try {
    const title = new RegExp(decodedSearchQuery, "i");

    let posts;

    if (decodedTags.length > 0) {
      posts = await PostMessage.find({ tags: { $in: decodedTags } });
    } else {
      posts = await PostMessage.find({ $or: [{ title }] });
    }

    if (posts.length === 0) {
      res.status(404).json({
        message: `No posts found with query: ${
          tags ? tags : decodedSearchQuery
        }`,
      });
    } else {
      res.status(200).json({ posts });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error, please try again later.",
      details: error.message,
    });
  }
};

export const getUserPosts = async (req, res) => {
  const { userId } = req.params;

  try {
    const userPosts = await PostMessage.find({
      $or: [
        { "creator.id": userId },
        { likes: userId },
        { "comments.author.id": userId },
      ],
    });

    if (userPosts.length == 0) {
      res.status(404).json({ message: "No user posts found." });
    }
    res.status(200).json({ userPosts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const schema = Joi.object({
    title: Joi.string().required(),
    message: Joi.string().required(),
    tags: Joi.array().required(),
    photo: Joi.string().required(),
    creator: Joi.object().required(),
  });

  try {
    const { error } = schema.validate(post);

    if (!req.userId)
      return res.status(401).json({ message: "Unauthenticated" });

    if (error) {
      return res.status(400).json({
        message: "Ivalid post data , please enter correctly",
        errors: error.details,
      });
    }

    const newPost = new PostMessage({
      ...post,
      creator: { ...post.creator, id: req.userId },
      createdAt: new Date().toISOString(),
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.status(401).json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: `No post with id: ${id}` });

  try {
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id == String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });

    res.json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { message, title, tags, photo, creator } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: `No post with id: ${id}` });

  const schema = Joi.object({
    title: Joi.string().required(),
    message: Joi.string().required(),
    tags: Joi.array().required(),
    photo: Joi.string().required(),
    _id: Joi.string().required(),
    likes: Joi.array().required(),
    creator: Joi.object().required(),
  });

  const existingPost = await PostMessage.findById(id);

  if (!existingPost) {
    return res.status(404).json({ message: "No posts founds with that id." });
  }

  if (existingPost.creator.id !== req.userId) {
    return res.status(401).json({ message: "Unauthenticated" });
  }

  const post = {
    likes: existingPost.likes,
    message,
    title,
    tags,
    photo,
    creator: existingPost.creator,
    _id: id,
  };

  try {
    const { error } = schema.validate(post);

    if (error) {
      return res.status(400).json({
        message: "Invalid post data, please enter correctly",
        errors: error.details,
      });
    }

    await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
      omitUndefined: true,
    });

    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const commentPost = async (req, res) => {
  const { id } = req.params;
  const { value, author } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: `No post with id: ${id}` });

  const schema = Joi.object({
    value: Joi.string().required(),
    author: Joi.object().required(),
    date: Joi.date().required(),
  });

  const comment = {
    value,
    author,
    date: new Date(),
  };

  try {
    const { error } = schema.validate(comment);

    if (error) {
      return res.status(400).json({
        message: "Invalid comment data, please enter correctly",
        errors: error.details,
      });
    }

    const existingPost = await PostMessage.findById(id);

    if (!existingPost) {
      return res.status(404).json({ message: "No post found with that id." });
    }

    existingPost.comments.push(comment);
    const updatedPost = await existingPost.save();

    res.json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: `No post with id: ${id}` });

  try {
    const existingPost = await PostMessage.findById(id);

    if (existingPost.creator.id !== req.userId) {
      return res.status(401).json({ message: "Unauthenticated" });
    }

    const post = await PostMessage.findByIdAndRemove(id);

    if (!post) {
      return res.status(404).json({ message: `No post with id: ${id}` });
    }

    res.status(200).json({ message: "Post deleted successfully", post });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete post" });
  }
};
