import React, { useState } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import "../App.css"
import { addPost, deletPost, updatePost } from '../redux/postSlice'

export default function Posts() {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [updatedTitle, setUpdatedTitle] = useState("")
    const [updatedDesc, setUpdatedDesc] = useState("")
    const [isEdit, setIsIdit] = useState(false)
    const [id, setId] = useState(null)
    const posts = useSelector((state) => state.posts.items)

    const dispatch = useDispatch()
 
    return (
    <div>
        <div className="form">
            <input type="text" 
                    value={title}
                    placeholder="Enter post title" 
                    onChange={(e) => setTitle(e.target.value)}
                    />
            <input type="text" 
                    value={desc}
                    placeholder="Enter post description" 
                    onChange={(e) => setDesc(e.target.value)}
                    />
            <button onClick={() => {
                dispatch(addPost({id:posts.length + 1, title, desc}))
                setTitle("")
                setDesc("")
            }}>Add Post</button>
        </div>


        <div className='posts'>
            {posts.length > 0 ? posts.map(post => 
                <div className='post'>
                    <h2>{post.title}</h2>
                    <p>{post.desc}</p>
                    <button onClick={() => {
                        setIsIdit(true)
                        setId(post.id)
                                    }}>Edit</button>
                    <button onClick={() => dispatch(deletPost({id: post.id}))}>delete</button>
                    <br />
                    {isEdit && id === post.id && (
                        <>
                            <input type="text" placeholder='Update title' onChange={(e) => setUpdatedTitle(e.target.value)} />
                            <input type="text" placeholder='Update description' onChange={(e) => setUpdatedDesc(e.target.value)} />
                            <button onClick={() => {
                                dispatch(updatePost({id: post.id, title: updatedTitle, desc: updatedDesc}))
                                setIsIdit(false)
                            }} >Updata</button>
                        </>
                    )}
                </div>
                ):'there is no posts now' }
        </div>
    </div>
  )
}
