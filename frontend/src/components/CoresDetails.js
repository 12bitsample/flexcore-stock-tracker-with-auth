import { useCoresContext } from "../hooks/useCoresContext"

const CoresDetails = ({ core }) => { 
    const { dispatch } = useCoresContext();

    const handleClick = async () => {
        const response = await fetch('/api/cores/' + core._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_CORE', payload: json})
        }
    }


    
    return (
        <div className="cores-details">
            <h4>Core Size: {core.size}</h4>
            <h4>Count: {core.count}</h4>
            <span className='material-symbols-rounded' onClick={handleClick} title='Delete Core'>Delete</span>
        </div>
    )
}

export default CoresDetails;