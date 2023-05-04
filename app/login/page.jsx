"use client";

import Link from "next/link";
import { server } from "../layout";
import React,{ useContext,useState } from "react";
import { toast } from "react-hot-toast";
import { Context } from "@/components/Clients";
import { redirect } from "next/navigation";

const page = () => {
  const {user,setUser} = useContext(Context);
  const [form,setForm] = useState({
    email:"",
    password:""
  })

  const submitHandler = async (e) => {
    
    e.preventDefault();
    try {
      const res = await fetch(`${server}/users/login`, {
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
      setUser(data.user);
    } catch (error) {
      return toast.error(error);
    }
  };

  const controlHandler = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  if(user._id) return redirect('/');
  return (
    <div className="container">
      <form>
        <input
          type="email"
          placeholder="Email"
          id="email"
          value={form.email}
          onChange={controlHandler}
        />

        <input
          type="password"
          placeholder="Password"
          id="password"
          value={form.password}
          onChange={controlHandler}
        />

        <button onClick={submitHandler}>Login</button>
      </form>
      <br />
      <small>or</small>
      <br />
      <br />
      <Link href={"/register"}>Signup</Link>
    </div>
  );
};

export default page;
