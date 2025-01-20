import queryFilter from "../config/filter.js";
import Books from "../models/booksModel.js";
import Genre from "../models/genreModel.js";
import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.js";


export const PostBook = async (req,res)=>{
    try{
        const duplicate = await Books.findOne({name: req.body.name})
        console.log(duplicate,"--------")
        if (duplicate) {
            return res.status(409).json({msg: "Book with this title already exists"})
        }
        let bestseller = req.body.sold > req.body.stock
        let imageUrl;
        if (req.body.image) {
            const cloudinaryResponse = await cloudinary.v2.uploader.upload(req.body.image, {
                folder: 'bookstore',
                transformation: [
                    { width: 500, height: 500, crop: 'scale' } 
                ],
            });
            imageUrl = cloudinaryResponse.secure_url;
        }
        let books=new Books({
            name: req.body.name,
            description: req.body.description,
            author: req.body.author, 
            image: imageUrl,
            price: req.body.price,
            genre: req.body.genre,
            sold: req.body.sold,
            stock: req.body.stock,
            slug: req.body.slug,
            featured: req.body.featured
        })
        books= await books.save()
        books= await Books.findById(books._id).populate('author').populate('genre');
        // book= await book.populate('genre') 
        res.status(200).json({
            msg: "Book has been added",
            books
        })
    }
    catch(error){
        console.error(error)
        res.status(409).json({
            msg: "Book already exists"
        })
        res.status(500).json({ 
            msg: "internal server error", 
            error: error.message 
        });
    }
}
export const GetBookById = async (req,res)=>{
    try{
        console.log(req.params.slug, "-----slug ")
        const book = await Books.findOne({slug: req.params.slug})
        if (!book) {
            return res.status(404).json({ msg: "Book not found" });
        }
        
        res.status(200).json(book);
    }
    catch(err){
        console.error(err)
        res.status(500).json({ 
            msg: "Something went wrong", 
            error: err.message 
        });
    }
}

export const GetAllBooks = async (req, res) => {
    try {
        if(req.queryFilter.genre){
            const genre = await Genre.findOne({name: req.queryFilter.genre})
            if(genre){
                req.queryFilter.genre = genre
            }
            else{
                return res.status(404).json({
                    msg:"Genre not found"
                })
            }
        }
        const books = await Books.find(req.queryFilter)
            .populate('genre')
            .sort(req.queryOptions.sort)
            .limit(req.queryOptions.limit)
            .skip((req.queryOptions.page - 1) * req.queryOptions.limit);

        return res.status(200).json({
            books
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "Something went wrong",
            error: err.message
        });
    }
};


export const UpdateBook = async (req,res)=>{
    try{
        let imageUrl;

        if (req.body.image) {
            const cloudinaryResponse = await cloudinary.v2.uploader.upload(req.body.image, {
                folder: 'bookstore', 
            });
            imageUrl = cloudinaryResponse.secure_url; 
        }
        const book = await Books.findOneAndUpdate(
            { slug: req.params.slug },
            {
                name: req.body.name,
                description: req.body.description,
                author: req.body.author, 
                image: imageUrl || undefined,
                price: req.body.price,
                genre: req.body.genre,
            },
            { new:true }
        )
        if (!book){
            return res.status(400).json({msg:"Book Not Found"})
        }
        return res.status(200).json(book)
    }
    catch(err){
        console.error(err)
        res.status(500).json({ 
            msg: "Something went wrong", 
            error: err.message 
        });
    }
}
export const DeleteBook = async (req,res)=>{
    try{
        const result =await Books.findOneAndDelete({ slug: req.params.slug })
        if(!result){
            res.status(400).json({msg: "Book not found"})
        }
        return res.status(200).json({msg: `Successfully deleted `})
    }
    catch(err){
        console.error(err)
        res.status(500).json({ 
            msg: "Something went wrong", 
            error: err.message 
        });
    }
}

