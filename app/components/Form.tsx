"use client"

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export const Form: React.FC = () => {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [published, setPublished] = useState(false)
    const router = useRouter()

    async function handlePublished() {
        await setPublished(!published)
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        try {
            e.preventDefault()

            const data = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
                title: title,
                content: content,
                published: published
            })

            router.refresh()
        }

        catch (error: any) {
            alert(error.response.data.message)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" id="title" placeholder='title' onChange={e => setTitle(e.target.value)} value={title} />
            <input type="text" name="content" id="content" placeholder='content' onChange={e => setContent(e.target.value)} value={content} />
            <br />
            <label htmlFor="published">published</label>
            <input type="checkbox" name="published" id="published" onChange={handlePublished} checked={published} />
            <br />
            <button type="submit">Create Post</button>
        </form>
    )
}