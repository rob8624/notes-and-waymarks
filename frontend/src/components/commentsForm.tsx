import React from 'react'
import ReactDOM from 'react-dom/client'
import { useForm } from '@tanstack/react-form'


interface CommentsFormProps {
    post: number
}


export function CommentsForm(post:CommentsFormProps) {
    const form = useForm({
        defaultValues: {
            author: '',
            email:'',
            content: '',
            post: post
        }
    })



    return(
        <div></div>
    )
}