import React from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Form } from './components/Form';

async function getPosts() {

  const response = await axios.get(`${process.env.BASE_URL}/api/posts`)

  return response.data;

}

export default async function Home() {
  const data: { id: number; title: string }[] = await getPosts()

  console.log(data)

  return (
    <main className='py-8 px-48'>
      <Link className='bg-teal-500 text-black font-medium py-2 px-4 rounded-md' href={'/dashboard'}>Go to the dashboard</Link>

      {data.map(post => {
        return (
          <>
          <div key={post.id}>
            <h1>{post.title}</h1>
            <h1>{post.id}</h1>
          </div>
          </>
        )
      })}
      <h1>----------------</h1>
      <br/>
      <br/>
      <br/>
      <h1>----------------</h1>
      <Form />
    </main>
  )
}