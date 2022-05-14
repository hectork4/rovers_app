
import React, { useCallback, useContext, useEffect, useState } from 'react'
import PhotoContext from '../../context/photoContext'
import getPhotos from '../../service/getPhotos'
import Photo from '../Photo'
import Spinner from '../Spinner'
import './styles.css'

export default function PhotoList() {

    const { parameters } = useContext(PhotoContext);
    const [ photos, setPhotos ] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1)
    const [error, setError] = useState(false)

    const paginator = () => {
        return (
            <div>            
                {
                page > 1 && 
                <button
                    className='paginationButton'
                    onClick={() => setPage((previousPage) => previousPage-1)}
                >
                    Previous page
                </button>
                }
                {photos.length === 25 && 
                <button 
                    className='paginationButton'
                    onClick={() => setPage((previousPage) => previousPage+1)}
                >
                    Next Page
                </button>
                }
            </div>
        )
    }

    const fetchData = useCallback((ParametersToUse) =>{
        const { rover = 'curiosity', camera = 'All', earth = '', sol = '1000' } = ParametersToUse
        setLoading(true)
        getPhotos({ rover, camera, earth, sol, page }).then((newPhotos)=>{
            setPhotos(newPhotos)
            setLoading(false)
            setError(false)
            localStorage.setItem('lastParameters', JSON.stringify(ParametersToUse))
        }).catch(() => {
            setError(true)
            setLoading(false)
        })

    }, [page])

    useEffect(()=>{  
        const ParametersToUse = parameters || JSON.parse(localStorage.getItem('lastParameters')) || []
        fetchData(ParametersToUse)
    },[parameters, fetchData])

    if(error) return <h1>Sorry! an error occurred</h1>

    if(loading) return <Spinner />

    if(!photos.length) return <h1>No results</h1>

    return (        
        <>
            {paginator()}
            <div className='ListOfPhotos'>
            {
                photos.map((eachPhoto)=>{
                    return( 
                    <Photo
                        key={eachPhoto.id}
                        title={eachPhoto.title}
                        url={eachPhoto.url}
                        id={eachPhoto.id}
                    />
                    )
                })
            }
            </div>
        </>
    )
}
