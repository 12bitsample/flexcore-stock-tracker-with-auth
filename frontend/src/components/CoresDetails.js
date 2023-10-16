import { useState, useContext, useEffect } from "react";
import { CoresContext } from "../context/CoreContext";

const CoresDetails = ({ core }) => { 
    const { dispatch, needAdditional } = useContext(CoresContext);
    // const [ isChecked, setIsChecked ] = useState(needAdditional || false);
    const [ isChecked, setIsChecked ] = useState(needAdditional || false);

    console.log('here is needAdditional value: ', needAdditional);    
    useEffect(() => {
        //this updates the initial state of isChecked when needAdditional changes
        setIsChecked(needAdditional);
    }, [needAdditional]);

    //handle click to delete core
    const handleDeleteClick = async () => {
        const response = await fetch('/api/cores/' + core._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_CORE', payload: json})
        }
    }

    //handle more bands needed checkbox
    // const handleMoreClick = async () => {
    //     const updatedNeedAdditional = !isChecked;

    //     const updatedCore = {...core, needAdditional: updatedNeedAdditional };
        
    //     setIsChecked(updatedNeedAdditional); // Toggle the checkbox state

    //     console.log(core._id);

    //     const response = await fetch('/api/cores/' + core._id, {
    //         method: 'PATCH',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body:JSON.stringify(updatedCore), 
    //     });

    //     if (response.ok) {
    //         const updatedCore = await response.json();
    //         dispatch({
    //             type: 'UPDATE_CORE',
    //             payload: {
    //                 updatedCore,
    //             },
    //         });
    //     } else {
    //         console.error('Failed to update core.');
    //     }
    //     // Dispatch an action to update the context state
    
    // }

    const handleMoreClick = async () => {
        const updatedNeedAdditional = !isChecked;

        const updatedCore = {...core, needAdditional: updatedNeedAdditional };
        
        setIsChecked(updatedNeedAdditional); // Toggle the checkbox state

        console.log(core._id);

        const response = await fetch('/api/cores/' + core._id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({ ...core, needAdditional: updatedNeedAdditional }), 
        });

        if (response.ok) {
            const updatedCore = await response.json();
            dispatch({
                type: 'UPDATE_CORE',
                payload: {
                    updatedCore,
                },
            });
        } else {
            console.error('Failed to update core.');
        }
        // Dispatch an action to update the context state
    
    }


    
    return (
        <div className="cores-details">
            <h4>Core Size: {core.size}</h4>
            <h4>Count: {core.count}</h4>
            <h4><input type='checkbox' onChange={handleMoreClick} checked={isChecked}/> More in orders than in stock</h4>    
            <span className='material-symbols-rounded' onClick={handleDeleteClick} title='Delete Core'>Delete</span>

        </div>
    )
}

export default CoresDetails;