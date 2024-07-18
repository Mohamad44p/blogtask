import db from "../config/db.js";

const createPost = async (req, res, next) => {
  try {
    const { title, content, authorId } = req.body;
    const author = await db.user.findUnique({
      where: { id: parseInt(authorId) },
    });

    if (!author || author.role !== "ADMIN") {
      return res.status(403).json({ message: "Permission denied" });
    }

    const post = await db.post.create({
      data: {
        title,
        content,
        userId: author.id,
      },
    });

    return res.status(201).json({ message: "Post created", post });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    const posts = await db.post.findMany({
      include: { User: true },
    });

    return res.status(200).json({ posts });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await db.post.findUnique({
      where: { id: parseInt(id) },
      include: { User: true },
    });

    if (!post) {
      return res.status(400).json({ message: "Post not found" });
    }

    return res.status(200).json({ post });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, published, authorId } = req.body;
    const author = await db.user.findUnique({
      where: { id: parseInt(authorId) },
    });

    if (!author || author.role !== "ADMIN") {
      return res.status(403).json({ message: "Permission denied" });
    }

    const post = await db.post.update({
      where: { id: parseInt(id) },
      data: { title, content, published },
    });

    return res.status(200).json({ message: "Post updated", post });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { authorId } = req.body;
    const author = await db.user.findUnique({
      where: { id: parseInt(authorId) },
    });

    if (!author || author.role !== "ADMIN") {
      return res.status(403).json({ message: "Permission denied" });
    }

    await db.post.delete({ where: { id: parseInt(id) } });

    return res.status(204).json({ message: "Post deleted" });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export { createPost, getAllPosts, getPostById, updatePost, deletePost };
