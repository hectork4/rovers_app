import { useEffect, useRef } from 'react'

export default function useSeo({title, description}){
    const prevTitle = useRef(document.title)
    const prevDesc = useRef(document.querySelector('meta[name="description"]'));

    useEffect(()=>{
        const previousTitle = prevTitle.current;

        document.title = title;

        return () => document.title = previousTitle 
    },[title])
    
    useEffect(()=>{
        const previousDesc = prevDesc.current;
        const metaDesc = document.querySelector('meta[name="description"]')

        if(description){
            metaDesc?.setAttribute("content", description)
        }
        return () => metaDesc.setAttribute("content", previousDesc)
    },[description])


}
