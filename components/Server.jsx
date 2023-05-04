import { server } from '@/app/layout';
import {TodoButton} from '../components/Clients';
import {cookies} from "next/headers"


const fetchData=async(token)=>{
    try {
        const res = await fetch(`${server}/task/my`,{
            cache:"no-cache",
            credentials:"include",
            headers:{
                cookie:`token=${token}`
            }
        })
        const data =await res.json();
        if (!data.success) return [];

        return data.tasks;

    } catch (error) {
        console.log(error);
        return [];
    }
}
export const TodoItem=async()=>{
    const token = cookies().get('token')?.value;
    const task =await fetchData(token);
    return <>
        {task.map((task)=>(
            <div className="todoContainer" key={task._id}>
            <div>
               <h4>{task.title}</h4> 
               <p>{task.description}</p> 
            </div>
            <div>
                <TodoButton id={task._id} completed={task.isCompleted}/>
            </div>
        </div>
        ))
        }
</>
    
}