import { useEffect } from "react";
import { useCoresContext } from "../hooks/useCoresContext.js"


//components
import CoresDetails from '../components/CoresDetails.js'
import AdminForm from "../components/AdminForm.js";
import UserForm from "../components/UserForm.js";

const Home = () => {
    const {cores, dispatch} = useCoresContext();
    
    useEffect(() => {
        const fetchCores = async () => {
            const response = await fetch('/api/cores');
            const json = await response.json();
            console.log(json);

            if (response.ok) {
                dispatch({type: 'SET_CORES', payload: json})
            }
        }
        fetchCores();
    }, [dispatch])

    return (
        <div className="home">
            <h3 className='core-title'>Core Details</h3>
            <div className="cores">
                {/* {cores && cores.map((core) => (
                    <CoresDetails key={core._id} core={core} />
                ))} */}
                {cores && cores.map((core) => (
                    <CoresDetails key={core._id} core={core} needAdditional={core.needAdditional} />
                ))}

            </div>
            <AdminForm />
            <UserForm />
        </div>
    )
}

export default Home;