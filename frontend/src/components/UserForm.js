import { useState, useEffect,useContext } from "react";
import { useCoresContext } from "../hooks/useCoresContext.js";
import { CoresContext } from "../context/CoreContext.js";



const UserForm = () => {
    const { cores } = useContext(CoresContext);
    const [coreDropdown, setCoresDropdown] = useState([]);
    const { dispatch } = useCoresContext();

    
    const [size, setSize] = useState('');
    const [action, setAction] = useState('');
    const [count, setCount] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    //chatgpt suggestion

      useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/cores', {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'}
                });
        
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
        
                const data = await response.json();
                setCoresDropdown(data);
                dispatch({ type: 'SET_CORES', payload: data });

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData()}, [dispatch]);

        //handle submit
        const handleSubmit = async (e) => {
            e.preventDefault();
        
            let  id = null;
            
            //retrieve id based on size  
            try {
                // Fetch the ID based on the selected core size
                const idResponse = await fetch('/api/cores/get-id-by-size/' + size, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
                });
            
                if (!idResponse.ok) {
                throw new Error('Network response was not ok');
                }
            
                // Parse the response JSON
                const jsonReturnId = await idResponse.json();
            
                // Check if an ID is returned
                if (jsonReturnId && jsonReturnId.id) {
                // Set the id based on the fetched value
                id = jsonReturnId.id;
                } else {
                setError('ID not found for the selected core size.');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data.');
            }
            
            
            const coreCountChange = {size, action, count, id};
            
            
            //add or subtract core count
            const response = await fetch('/api/cores/updateCoreStock', {
                method: 'PATCH',
                body: JSON.stringify(coreCountChange),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }); 

            if (!response.ok) {
                const json = await response.json();
                setError(json.error);
                setEmptyFields(json.emptyFields);
            }

            if (response.ok) {
                setSize('');
                setAction('');
                setCount('');
                setEmptyFields([]);
                const json = await response.json();
                dispatch({type: 'UPDATE_CORE', payload: json});
            }
        }
    
        return (
            <div>
                <form action="" className="" id="admin-form" onSubmit={handleSubmit}>
                <h3>Add/Remove Cores</h3>
                
                <label>Core Size: </label>
                <select value={size} onChange={(e) => setSize(e.target.value)}>
                    <option value="">Select Core...</option>
                    {cores?.map((core) => (
                        <option key={core._id} value={core.id}>
                            {core.size}
                        </option>
                    ))}
                </select>

                <label>Action: </label>
                <select value={action} onChange={(e) => setAction(e.target.value)}>
                    <option>Select</option>
                    <option>Add</option>
                    <option>Subtract</option>
                </select>
                <label>Amount: </label>
                
                <input 
                    type="number" 
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                    className={emptyFields?.includes('count') ? 'error' : ''}
                />
                
                <button>Change Core Amount</button>
                {error && <div className="error">{error}</div>}
            </form>
        
            </div>
        )
}

export default UserForm