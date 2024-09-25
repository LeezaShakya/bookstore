import Genre from "../models/genreModel.js";
import mongoose from "mongoose";
export const PostGenre = async (req,res)=>{
    try{
        const duplicate = await Genre.findOne({name: req.body.name})
        if (duplicate) {
            return res.status(409).json({msg: "Genre with this title already exists"})
        }
        let genre=new Genre({
            name: req.body.name
        });
        genre= await genre.save()
        res.status(200).json({
            msg: "Genre has been added",
            data: genre
        })
    }
    catch(error){
        console.error(error)
        res.status(409).json({
            msg: "Genre already exists"
        })
        res.status(500).json({ 
            msg: "internal server error", 
            error: error.message 
        });
    }
}
export const GetGenreById = async (req,res)=>{
    try{
        const genre = await Genre.findOne({slug: req.params.slug})
        if (!genre) {
            return res.status(404).json({ msg: "Genre not found" });
        }
        
        res.status(200).json(genre);
    }
    catch(err){
        console.error(err)
        res.status(500).json({ 
            msg: "Something went wrong", 
            error: err.message 
        });
    }
}
export const GetAllGenre = async (req,res)=>{
    try{
        const genre = await Genre.find(req.queryFilter)
            .sort(req.queryOptions.sort)
            .limit(req.queryOptions.limit)
            .skip((req.queryOptions.page - 1) * req.queryOptions.limit);
        return res.status(200).json({
            data: genre
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
export const UpdateGenre = async (req,res)=>{
    try{
        const genre = await Genre.findOneAndUpdate(
            { slug: req.params.slug },
            {
                name: req.body.name
            },
            { new:true }
        )
        if (!genre){
            return res.status(400).json({msg:"Genre Not Found"})
        }
        return res.status(200).json(genre)
    }
    catch(err){
        console.error(err)
        res.status(500).json({ 
            msg: "Something went wrong", 
            error: err.message 
        });
    }
}
export const DeleteGenre = async (req,res)=>{
    try{
        const result =await Genre.findOneAndDelete({ slug: req.params.slug })
        if(!result){
            res.status(400).json({msg: "Genre not found"})
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
