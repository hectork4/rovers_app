import React, { useState } from 'react'
import { useForm } from '../../hooks/useForm';
import Input from '../Input';
import Select from '../Select';
import './styles.css'

const CAMERA = ["All", "CHEMCAM", "FHAZ", "MARDI", "RHAZ", "PANCAM", "MINITES", "MAST", "MAHLI", "NAVCAM"];
const ROVERS = [ 'curiosity', 'opportunity', 'spirit']
const favourites = () => JSON.parse(localStorage.getItem('favourites'))?.map(e=> `${e.rover} | ${e.camera} | ${e.sol?e.sol:e.earth}`) || []

 function SearchForm({onSubmit:handleSubmitHome}) {

    const {rover, camera, sol, earth, updateRover, updateCamera, updateSol, updateEarth} = useForm()

    const [optFav, setOptFav] = useState(favourites())
    const [favSelected, setFavSelected] = useState(favourites[0])

    const handleSubmit = (evt) =>{
        evt.preventDefault()
        handleSubmitHome({rover, camera, earth, sol}) 
    }

    const handleChangeRover = (evt) =>{
        console.log(evt.target.value)
        updateRover({rover:evt.target.value}) 
    }

    const handleChangeCamera = (evt) =>{
        updateCamera({camera:evt.target.value})
    }

    const handleChangeSol = (evt) =>{
        updateSol({sol:evt.target.value})
    }

    const handleChangeEarth = (evt) =>{
        updateEarth({earth:evt.target.value})
    }

    const handleChangeFav = (evt) => {
        setFavSelected(evt.target.value);
        const dataFromFav = evt.target.value.replace(/\s/g, '').split('|')
        rover !== dataFromFav[0] && updateRover({rover:dataFromFav[0]}) 
        camera !== dataFromFav[1] && updateCamera({camera: dataFromFav[1]})
        dataFromFav[2].includes("-") ? updateEarth({earth:dataFromFav[2]}) :updateSol({sol:dataFromFav[2]})
    }

    const handleSolClick = () => {
        !sol && updateSol({sol: JSON.parse(localStorage.getItem('lastParameters')).sol || '1000'})
    }

    const handleEarthClick = () => {
        !earth && updateEarth({earth: JSON.parse(localStorage.getItem('lastParameters')).earth || '2021-06-03'})
    }

    const handleAddFavourite = (evt) => {
        evt.preventDefault()
        const fav = JSON.parse(localStorage.getItem('favourites')) || []
        console.log({rover, camera, sol, earth})
        const newObject = [...fav, {rover, camera, sol, earth}]
        localStorage.setItem('favourites', JSON.stringify(newObject))
        setOptFav((prevState)=>[...prevState, `${rover} | ${camera} | ${sol?sol:earth}`])
    }

    const handleRemoveFavourite = (evt) => {
        evt.preventDefault()
        const fav = JSON.parse(localStorage.getItem('favourites'))
        const newObject = fav.filter(eachObj => JSON.stringify(eachObj) !== JSON.stringify({rover, camera, sol, earth}))
        localStorage.setItem('favourites', JSON.stringify(newObject))
        setOptFav(favourites())
    }

    const favButton = () => {
        const fav = JSON.parse(localStorage.getItem('favourites')) || []
        return !fav.some((e)=> JSON.stringify(e) === JSON.stringify({rover, camera, sol, earth})) ? 
        <button 
            title="Add+ Favourite!" 
            style={{backgroundColor:'green'}} 
            onClick={handleAddFavourite}
        >
            ➕🤍
        </button> :
        <button 
            title="Remove Favourite" 
            style={{backgroundColor:'red'}} 
            onClick={handleRemoveFavourite}
        >
            ➖💖
        </button>
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='search-form'>
                <Select 
                    title='Favourites' 
                    value={favSelected} 
                    onChangeFunction={handleChangeFav} 
                    options={optFav}
                />
                <Select 
                    title='Rover' 
                    value={rover} 
                    onChangeFunction={handleChangeRover} 
                    options={ROVERS}
                />
                <Select 
                    title='Camera' 
                    value={camera} 
                    onChangeFunction={handleChangeCamera} 
                    options={CAMERA}
                />

                <div onClick={handleSolClick}>
                <Input 
                    min="0" max="4605" 
                    type='number'
                    value={sol} 
                    onChangeValue={handleChangeSol}
                    title="Martian sol"
                />
                </div>

                <div onClick={handleEarthClick}>
                <Input 
                    min="2000-01-01" max="2028-12-31"
                    type='date'
                    value={earth} 
                    onChangeValue={handleChangeEarth}
                    title="Earth date "
                />
                </div>           
                {
                    favButton()
                }
                <button data-testid="search-button">Search</button>           
            </form>

        </>
    )
}

export default React.memo(SearchForm)