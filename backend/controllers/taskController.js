import Task from "../models/Task.js";

export const getTasks=async(req,res)=>{
    try{
        const tasks=await Task.find({user:  req.user.id});
        res.status(200).json(tasks);
    }catch(error){
        res.status(500).json({message:"Error fetching tasks",error});
    }

    };


    export const createTask=async(req,res)=>{
        try{
            const { title,description}=req.body;

            if(!title){
                return res.status(400).json({message:"Task title is required!"});
            }
            const newTask=new Task({
                title,
                description:description || "No description"
            });


            const savedTask=await newTask.save();
            res.status(201).json(savedTask);
        }catch(error){
            console.log("Task creation error:",error);
            res.status(500).json({message:"Error creating task"});
        }
    };


 export const updateTask=async(req,res)=>{
    try{
        const {id}=req.params;
        const {title,description,completed}=req.body;
         
        const updatedTask=await Task.findByIdAndUpdate(
        id,{title, description, completed}, {new:true});

        if(!updatedTask){
            return res.status(404).json({message:"Task not found"});
        }
        
        res.status(200).json({message:"Task updated successfully", task:updatedTask });

    }catch(error){
        res.status(500).json({message:"Error updating task",error});
    }
 };


 export const deleteTask=async(req,res)=>{
    try{
        const{id}=req.params;
        const deletedTask=await Task.findByIdAndDelete(id);

        if(!deletedTask){
            return res.status(404).json({message:"Task not found"});

        }

        res.status(200).json({message:"Task deleted successfully"});
    }catch(error){
        res.status(500).json({message:"Error deleting task",error});
    }
 };



        
    
