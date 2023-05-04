"use client";

import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { server } from '../app/layout';
import { redirect ,useRouter} from 'next/navigation';
import { Context } from '@/components/Clients';

const AddToTask = () => {
  const router = useRouter();
  const {user,setUser} = useContext(Context);
  const [form,setForm] = useState({
    title:"",
    description:""
  });
  const controlHandler=(e)=>{
    setForm({...form,[e.target.id]:e.target.value});
  }
  const submitHandler= async(e)=>{
    e.preventDefault();
    try {
      const res = await fetch(`${server}/task/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:"include",
        body: JSON.stringify(form),
      });
      const data = await res.json();
      
      if (!data.success) return toast.error(data.message);
      setForm({});
      toast.success(data.message);
      router.refresh();
    } catch (error) {
      toast.error(error);
    }
  }

  if(!user._id) return redirect('/login');
  return (
        <form>
            <input type="text"
            placeholder='Task Title'
            value={form.title}
            onChange={controlHandler}
            id='title'
            required
            />
            <textarea cols="30" rows="10"
            placeholder='Task Description'
            value={form.description}
            onChange={controlHandler}
            id='description'
            required
            ></textarea>

            <button onClick={submitHandler}>ADD TASK</button>
        </form>
  )
}

export default AddToTask