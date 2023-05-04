import React,{Suspense} from 'react';
import Form from './AddToTask';
import {TodoItem} from '../components/Server';

const page = () => {
  return (
    <div className='home'>
      <div className='container'>
      <Form/>  
      </div>    
      <div className='container'>
        <Suspense fallback={<h1>lodding..</h1>}>
          <TodoItem/>
        </Suspense>
      </div>  
    </div>
  )
}

export default page