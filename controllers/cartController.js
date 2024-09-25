import Books from "../models/booksModel.js";
import Cart from "../models/cartModel.js";
import mongoose from "mongoose";
export const PostCart = async (req,res)=>{
    try{
        const {id, quantity} = req.body
        const book = await Books.findOne({_id: id})
        
        //if no book available
        if (!book) {
            res.status(404).json({ message: "Book not found" });
        }
        const price = book.price
        const userId = req.user.id;
        
        //if cart exists for a user
        let cart = await Cart.findOne({ userId });
        if(cart){
            const cartIndex = cart.books.findIndex((item)=>{
                return item.book._id.toString() === id
            })

            //if book already in cart
            if(cartIndex > -1){
                let bookInCart  = cart.books[cartIndex]
                bookInCart.quantity += quantity
            }

            //adding new book in cart
            else{
                cart.books.push({
                    book: book._id,
                    quantity: quantity
                })
            }
            
            cart.totalProducts = cart.books.length
            cart.totalPrice = cart.books.reduce((acc, curr)=>{
                //accumulated price of each book in books array
                return acc + curr.quantity * price
            },0)
            cart.totalQuantity = cart.books.reduce((acc, curr)=>{
                //accumulated quantity of each book in books array
                return acc + curr.quantity
            },0)

            cart = await cart.populate('userId','_id');
            cart = await cart.populate('books.book');
            await cart.save()
            return res.status(200).json({ message: "Cart updated", data: cart });
        }

        let newCart=new Cart({
            userId: req.user.id,
            books: [{
                book: book._id,
                quantity: quantity
            }],
            totalPrice: quantity * price,
            totalProducts: 1 ,
            totalQuantity: quantity,
        })
        newCart= await newCart.populate('userId','_id');
        newCart= await newCart.populate('books.book')
        newCart= await newCart.save()
        res.status(200).json({
            msg: "Cart Created and book has been added",
            data: newCart
        })
    }
    catch(error){
        res.status(500).json({ 
            msg: "internal server error", 
            error: error.message 
        });
    }
}

export const GetCart = async (req,res)=>{
    try{
        const userId = req.user.id;
        let cart= await Cart.findOne({userId})
        if (!cart || cart.books.length === 0) {
            return res.status(400).json({ msg: "Cart is empty" });
        }
        await cart.populate('books.book')
        return res.status(200).json({
            data: cart
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
export const DeleteCart = async (req,res)=>{
    try{
        const userId = req.user.id;
        const bookId = req.params.id;
        let cart =await Cart.findOne({ userId }).populate('books.book');
        if (!cart) {
            return res.status(404).json({ msg: "Cart not found" });
        }
        const bookIndex = cart.books.findIndex((item)=>item.book._id.toString() === bookId)
        if (bookIndex === -1) {
            return res.status(404).json({ msg: "Book not found in the cart" });
        }
        cart.books.slice(bookIndex, 1)
        cart.totalProducts = cart.books.length
        cart.totalPrice = cart.books.reduce((acc, curr)=>{
            return acc + curr.quantity * curr.book.price
        },0)
        cart.totalQuantity = cart.books.reduce((acc, curr)=>{
            return acc + curr.quantity
        },0)
        await cart.save()

        return res.status(200).json({msg: `Successfully deleted `, data: cart})
    }
    catch(err){
        console.error(err)
        res.status(500).json({ 
            msg: "Something went wrong", 
            error: err.message 
        });
    }
}
