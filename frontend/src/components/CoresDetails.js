import { useCoresContext } from "../hooks/useCoresContext"

const CoresDetails = ({ core }) => { 
    const { dispatch } = useCoresContext();

    const handleDeleteClick = async () => {
        const response = await fetch('/api/cores/' + core._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_CORE', payload: json})
        }
    }

    const handleMoreClick = async (e) => {
        if (e.target.checked) {
            const updatedCore = {...core, needAdditional: true};

            const response = await fetch('/api/cores/' + core._id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(updatedCore), 
            })

            if (response.ok) {
                const updatedCoreData = await response.json();
                dispatch({ type: 'UPDATE_CORE', payload: updatedCoreData });
            }
        }
    }


    
    return (
        <div className="cores-details">
            <h4>Core Size: {core.size}</h4>
            <h4>Count: {core.count}</h4>
            <h4><input type='checkbox' onChange={handleMoreClick}></input> More in orders than in stock</h4>    
            <span className='material-symbols-rounded' onClick={handleDeleteClick} title='Delete Core'>Delete</span>

        </div>
    )
}

export default CoresDetails;