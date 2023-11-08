import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const CoresDetails = ({ core, dispatch }) => { 
    const [isChecked, setIsChecked] = useState(false);
    const { user } = useAuthContext();
    

    useEffect(() => {
        //this updates the initial state of isChecked when needAdditional changes
        setIsChecked(core.needAdditional || false);
    }, [core, user.token]);

    //handle click to delete core
    const handleDeleteClick = async () => {
        if (!user) {
            return
        }
        const response = await fetch('/api/cores/' + core._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`,
            }
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
                'Authorization': `Bearer ${user.token}`,
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
        <div style={{ border: isChecked ? '5px inset red' : '1px solid black' }} className="cores-details">

            <h4>Core Size: {core.size}</h4>
            <h4>Count: {core.count}</h4>  
            <h4><input type='checkbox' onChange={handleMoreClick} checked={isChecked}/> More in orders than in stock</h4>    
            <span className='material-symbols-rounded' onClick={handleDeleteClick} title='Delete Core'>Delete</span>

        </div>
    )
}

export default CoresDetails;