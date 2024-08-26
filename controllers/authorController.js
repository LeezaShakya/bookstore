import Author from "../models/authorModel.js";

// Create a new author
export const createAuthor = async (req, res) => {
  try {
    const author = new Author(req.body);
    await author.save();
    res.status(201).json({ author });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all authors
export const getAllAuthors = async (req, res) => {
 res.send("All users")
};


