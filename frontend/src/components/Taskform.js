import {useState} from "react";
import axios from "axios";
function TaskForm({fetchTasks}){
    const [title,setTitle]=useState("");
    const addTask =async(e)=>{
        e.preventDefault();
        try{
            await axios.post( "http://localhost:4000/api/tasks",
                {title},
                {
                    headers:  { Authorization:`Bearer ${localStorage.getItem("token")}`},
                }
            );

            setTitle("");
            fetchTasks();
        }catch (error){
            console.error(error.response.data.message);
        }

        
        };
    
return(
    <form onSubmit={addTask}>
        <input type="text"
        placeholder="New Task"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        required/>
<button type="submit">Add</button>{" "}

    </form>
);
}

export default TaskForm;