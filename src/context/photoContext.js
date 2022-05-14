import React, { useState } from 'react'

const PhotoContext = React.createContext({})

export function PhotoContextProvider({children}) {

    const [parameters, setParamenters] = useState(JSON.parse(localStorage.getItem('lastParameters')) || {}) 
     
    return (
        <PhotoContext.Provider value={{parameters, setParamenters}}>
            {children}
        </PhotoContext.Provider>
    )
}

export default PhotoContext
