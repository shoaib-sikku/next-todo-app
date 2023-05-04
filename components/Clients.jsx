"use client";
import React, { createContext, useContext, useState,useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import { server } from "../app/layout";

export const Context = createContext({ user: {} });
export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    
    async function fetchUser(){
      await fetch(`${server}/users/me`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setUser(data.user);
      });
     }
     fetchUser();
       
  }, []);
  return (
    <Context.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
      <Toaster position="top-center" reverseOrder={false} />
    </Context.Provider>
  );
};

export const LogoutBtn = () => {
  const { user, setUser } = useContext(Context);
  const router = useRouter();
  const Handler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${server}/users/logout`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      setUser({});
      toast.success(data.message);
      router.push("/login");
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <>
      {user?._id ? (
        <a onClick={Handler}>LOGOUT</a>
      ) : (
        <Link href="/login">LOGIN</Link>
      )}
    </>
  );
};

export const TodoButton = ({ id, completed }) => {
  const router = useRouter();
  const deleteHandler = async (id) => {
    try {
      const res = await fetch(`${server}/task/${id}`, {
        method: "DELETE",
        credentials:"include"
      });

      const data = await res.json();

      if (!data.success) return toast.error(data.message);

      toast.success(data.message);
      router.refresh();
    } catch (error) {
      console.log(error);
      return toast.error(error);
    }
  };
  const updateHandler = async (id) => {
    try {
      const res = await fetch(`${server}/task/${id}`, {
        method: "PUT",
        credentials:"include"
      });
      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      toast.success(data.message);
      router.refresh();
    } catch (error) {
      return toast.error(error);
    }
  };
  return (
    <>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => updateHandler(id)}
      />
      <button onClick={() => deleteHandler(id)}>Delete</button>
    </>
  );
};
