import Books from "../models/booksModel.js";
export const PostBook = async (req,res)=>{
    try{
        const duplicate = await Books.findOne({name: req.body.name})
        console.log(duplicate,"--------")
        if (duplicate) {
            return res.status(409).json({msg: "Book with this title already exists"})
        }
        let book=new Books({
            name: req.body.name,
            description: req.body.description,
            author: req.body.author, 
            image: req.body.image,
            price: req.body.price,
            genre: req.body.genre,
            sold: req.body.sold,
            stock: req.body.stock,
            slug: req.body.slug,
        })
        book= await book.save()
        book= await Books.findById(book._id).populate('author').populate('genre');
        // book= await book.populate('genre') 
        res.status(200).json({
            msg: "Book has been added",
            data: book
        })
    }
    catch(error){
        console.error(error)
        console.log(req.body.name)
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
export const GetAllBooks = async (req,res)=>{
    try{
        const book= await Books.find()
        return res.status(200).json({
            data: book
        })
    }
    catch(err){
        console.error(err)
        res.status(500).json({ 
            msg: "Something went wrong", 
            error: err.message 
        });
    }
}
export const UpdateBook = async (req,res)=>{
    try{
        const book = await Books.findOneAndUpdate(
            { slug: req.params.slug },
            {
                name: req.body.name,
                description: req.body.description,
                author: req.body.author, 
                image: req.body.image,
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