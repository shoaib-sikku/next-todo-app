"use client";

import React,{ useState } from "react";
import Link from "next/link";
import {server} from "../layout";
import { toast } from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [form,setForm] = useState({
    name:'',
    email:'',
    password:''
  });

  const submitHandler= async(e)=>{
    e.preventDefault();
    try {
      const res = await fetch(`${server}/users/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:"include",
        body: JSON.stringify(form),
      });
      const data = await res.json();
      
      if (!data.success) return toast.error(data.message);
      
      toast.success(data.message);

      router.push('/login');
    } catch (error) {
      return toast.error(error);
    }
  }

  const controlHandler=(e)=>{
    setForm({...form,[e.target.id] : e.target.value});
  }

  if(user._id) return redirect('/');
  return (
    <div className="container">
      <form>
        <input 
        type="text" 
        placeholder="Name" 
        id="name" 
        value={form.name} 
        onChange={controlHandler}/>

        <input 
        type="email" 
        placeholder="Email" 
        id="email" 
        value={form.email} 
        onChange={controlHandler}/>

        <input 
        type="password" placeholder="Password" 
        id="password" 
        value={form.password} 
        onChange={controlHandler}/>

        <button onClick={submitHandler}>Register</button>
      </form>
      <br /><br />
        <small>or</small>
        <br /><br />
          <Link href={"/login"}>Log In</Link>
    </div>
  );
};

export default page;
