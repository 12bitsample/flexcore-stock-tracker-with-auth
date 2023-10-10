import { useState } from "react"
import { useCoresContext } from "../hooks/useCoresContext.js"


const AdminForm = () => {
    const { dispatch } = useCoresContext();
    const [size, setSize] = useState('');
    const [count, setCount] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const core = {size, count};

        const response = await fetch('/api/cores', {
            method: 'POST',
            body: JSON.stringify(core),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
        
        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }
        if (response.ok) {
            
            setSize('');
            setCount('');
            setError(null);
            setEmptyFields([]);
            console.log('Added new core!', json)
            dispatch({type: 'CREATE_CORE', payload: json})
        }
    }

    return (
        <div>
            {/* add new core */}
            <form action="" className="create" id="admin-form" onSubmit={handleSubmit}>
                <h3>Create New Core</h3>
                <label>Core Size: </label>
                <input 
                    type="text"
                    onChange={(e) => setSize(e.target.value)} 
                    value={size}
                    className={emptyFields?.includes('size') ? 'error' : ''}
                />

                <label><bold>Core Count: </bold></label>
                <input 
                    type="number"
                    onChange={(e) => setCount(e.target.value)} 
                    value={count}
                    className={emptyFields?.includes('count') ? 'error' : ''}
                />

                <button>Add Core</button>
                {error && <div className="error">{error}</div>}
            </form>

        </div>
    )
}

export default AdminForm