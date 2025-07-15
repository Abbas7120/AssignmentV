const express = require('express')
const app=express()
const dotenv=require('dotenv')
const Note=require("./models/notes")
const mongoose=require('mongoose')
dotenv.config()

const PORT=3000
app.use(express.json())


mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("MongoDB Connected"))
.catch((error)=>(console.log("Error in coonnection",error)))

//get all notes
app.get("/notes",async (req,res)=>{
    const notes=await Note.find().sort({createdAt:-1})
    res.json(notes)
})
//get notes by id
app.get("/notes/:id",async (req,res)=>{
    try{
        const note=await Note.findById(req.params.id)
if(!note)return res.status(404).json({message:"Note not found"})
 res.json(note)   }
    catch(err){
  res.status(400).json({message:"Invalid id or format"})
    }
})

//post a new note
app.post("/notes/add",async(req,res)=>{
    const {title,content}=req.body;
    try{
        const newNote=new Note({title,content})
        await newNote.save()
res.status(201).json(newNote)
    }
    catch(error){
          res.status(400).json({message:"Error in creating note"})
  
    }
})
//update anote
app.put("/notes/update/:id",async (req,res)=>{
    try{
        const {title,content}=req.body;
        const note=await Note.findByIdAndUpdate(req.params.id,{title,content},{new:true})
if(!note)return res.status(404).json({message:"Note not found"})
 res.json(note)   }
    catch(err){
  res.status(400).json({message:"Invalid id "})
    }
})
//delete a note
app.delete("/notes/delete/:id",async (req,res)=>{
    try{
        const note=await Note.findByIdAndDelete(req.params.id)
if(!note)return res.status(404).json({message:"Not able to delete"})
 res.json({message:"Note deleted",note:deleted})   }
    catch(err){
  res.status(400).json({message:"Invalid id or format"})
    }
})
app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
})



