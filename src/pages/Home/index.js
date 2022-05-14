import React, { useContext, useEffect, useState } from 'react'
import PhotoList from '../../components/PhotoList'
import SearchForm from '../../components/SearchForm'
import PhotoContext from '../../context/photoContext'
import useSeo from '../../hooks/useSeo'

export default function Home() {    

    const {setParamenters} = useContext(PhotoContext)
    const [lastSearch, setLastSearch] = useState()

    const handleSubmit = ({rover, camera, earth, sol}) =>{
        setParamenters({rover, camera, earth, sol}) 
        setLastSearch(false)       
    }

    useSeo({title: 'Home', description: 'Photo home' })

    useEffect(() => {
        localStorage.getItem('lastParameters') && setLastSearch(true)
    },[])

    return (
        <div className='home-content'>
            <SearchForm onSubmit={handleSubmit} />
            <div className="App-results">
                <>
                    {
                        lastSearch && <h3>Ultima busqueda </h3>
                    }
                    <PhotoList /> 
                </>
            </div>
        </div>
    )
}