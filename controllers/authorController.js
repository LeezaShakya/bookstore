import Author from "../models/authorModel.js";

export const getAllAuthors = async (req, res) => {
    try{
      const authors = await Author.find();
      res.status(200).json({
        success:true,
        data: authors});
    } catch(error){
      res.status(500).json({ 
        success:false, 
        error: error.message });
    }
};

export const getAuthorById = async (req, res) => {
  try {
    const { slug } = req.params;
    const author = await Author.findOne({ slug });
    if (!author) {
      return res.status(404).json({
        success: false,
        message: 'Author not found',
      });
    }
    res.status(200).json({
      success: true,
      data:author,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createAuthor = async (req, res) => {
  try {
    const { name } = req.body;
    const newAuthor = new Author({
      name
    });
    const savedAuthor = await newAuthor.save();
    res.status(201).json({ 
      success: true, 
      message : `${savedAuthor.name} author has been added sucessfully`,
      data : savedAuthor
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message });
  }
};

export const updateAuthor = async (req, res) => {
  try {
    const { slug } = req.params;
    const updateData = req.body;
    const author = await Author.findOneAndUpdate(slug, updateData, {
      new: true
    });
    if(!author){
      return res.status(404).json({
        success:false,
        message: 'Author not found' 
      });
    }
    res.status(200).json({
      success: true,
      data: author
    });
  } catch (error) {
    res.status(400).json({
      success:false,
      error: error.message });
  }
};

export const deleteAuthor = async (req, res) => {
  try {
    const  deletedauthor = await Author.findByIdAndDelete({ slug: req.params.slug });
    if (!deletedauthor){
      return res.status(404).json({
        success:false,
        message: 'Author not found' });
    }
    res.status(201).json({ 
      success:true,
      message : `${deletedauthor.name} author has been deleted sucessfully`
    });
  } catch (error) {
    res.status(400).json({
      success:false,
      error: error.message });
  }
};
