import { useContext, useReducer } from "react"
import PhotoContext from "../context/photoContext";
    
const TYPES = {
    UPDATE_ROVER: 'changeKeyword',
    UPDATE_CAMARA: 'changeRating',
    UPDATE_SOL: 'changeSolDate',
    UPDATE_EARTH: 'changeEarthDate'
}
    
export const useForm = () => {

    const { parameters } = useContext(PhotoContext);

    const initialState = parameters && Object.keys(parameters).length !== 0 ? parameters : {
        rover: 'curiosity',
        camera: 'All',
        sol: '',
        earth: '2015-06-03'
    }

    const reducer = (state, action) =>{ 
        switch (action.type) {
            case TYPES.UPDATE_ROVER:
                return {
                    ...state,
                    rover:  action.payload
                }

            case TYPES.UPDATE_CAMARA:
                return {
                    ...state,
                    camera: action.payload
                }   
                
            case TYPES.UPDATE_SOL:
                return {
                    ...state,
                    sol: action.payload,
                    earth: ''
                }

            case TYPES.UPDATE_EARTH:
                return {
                    ...state,
                    earth: action.payload,
                    sol:''
                }
                
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    const {rover, camera, sol, earth} = state 

    return {
        rover,
        camera,
        sol,
        earth,
        updateRover: ({rover}) => dispatch({payload:rover, type:TYPES.UPDATE_ROVER}), 
        updateCamera: ({camera}) => dispatch({payload:camera, type:TYPES.UPDATE_CAMARA}),
        updateSol: ({sol}) => dispatch({payload:sol, type:TYPES.UPDATE_SOL}),
        updateEarth: ({earth}) => dispatch({payload:earth, type:TYPES.UPDATE_EARTH}),
    }
}

