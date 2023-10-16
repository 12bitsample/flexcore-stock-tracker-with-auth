import { createContext, useReducer } from "react"

export const CoresContext = createContext();

export const coresReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CORES':
            return {
                ...state,
                cores: action.payload
            }
        case 'CREATE_CORE':
            return {
                cores: [...state.cores, action.payload]
            }
        case 'DELETE_CORE':
            return {
                cores: state.cores.filter((w) => w._id !== action.payload._id)
            }
        case 'UPDATE_CORE':
            
            return {
                cores: state.cores.map((core) =>
                    core._id === action.payload._id ? { ...core, ...action.payload } : core
                )
            }
            
            default: 
                return state
    }
}

export const CoresContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(coresReducer, {
        cores: [],
        needAdditional: false,
    });

    return (
        // <CoresContext.Provider value={{ cores: state.cores, needAdditional: state.needAdditional, dispatch}}>
        //     { children }
        // </CoresContext.Provider>

        <CoresContext.Provider value={{ cores: state.cores, dispatch, needAdditional: state.needAdditional }}>
        { children }
        </CoresContext.Provider>
    )
}

