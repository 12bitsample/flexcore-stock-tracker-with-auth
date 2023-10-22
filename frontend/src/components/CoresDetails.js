import { useState, useEffect } from "react";


const CoresDetails = ({ core, dispatch }) => { 
    // const { dispatch, needAdditional } = useContext(CoresContext);
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        //this updates the initial state of isChecked when needAdditional changes
        setIsChecked(core.needAdditional || false);
    }, [core]);

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

    const handleMoreClick = async () => {
        const updatedNeedAdditional = !isChecked;
        
        setIsChecked(updatedNeedAdditional); // Toggle the checkbox state

        console.log('this is isChecked value', isChecked);

        const response = await fetch('/api/cores/' + core._id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({ ...core, needAdditional: updatedNeedAdditional }), 
        });

        if (response.ok) {
            const updatedCore = await response.json();
            dispatch({ type: 'UPDATE_CORE', payload: updatedCore })
            //trigger sorting immediately upon click
            dispatch({ type: 'SORT_CORES' })
        } else {
            console.error('Failed to update core.');
        }
    
    };

  

    return (
        //red border css for checked cores
        // <div className={`cores-details ${isChecked ? 'div.cores-details.selected-core ' : ''}`}>
        <div style={{ border: isChecked ? '2px solid red' : '1px solid black' }} className="cores-details">

            <h4>Core Size: {core.size}</h4>
            <h4>Count: {core.count}</h4>  
            <h4><input type='checkbox' onChange={handleMoreClick} checked={isChecked}/> More in orders than in stock</h4>    
            <span className='material-symbols-rounded' onClick={handleDeleteClick} title='Delete Core'>Delete</span>

        </div>
    )
}

export default CoresDetails;