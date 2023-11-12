import { useEffect } from "react";
import { useCoresContext } from "../hooks/useCoresContext.js"


//components
import CoresDetails from '../components/CoresDetails.js'
import AdminForm from "../components/AdminForm.js";
import UserForm from "../components/UserForm.js";
import { useAuthContext } from "../hooks/useAuthContext.js";

const Home = () => {
    const {cores, dispatch} = useCoresContext();
    const {user} = useAuthContext();
   
        useEffect(() => {
        const fetchCores = async () => {
            const response = await fetch('/api/cores', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();

            if (response.ok) {
                dispatch({type: 'SET_CORES', payload: json})
            }
        }
        if (user) {
            fetchCores();
        }
        
    }, [dispatch, user])

    //custom sort function to prioritize checked cores then sort by count
    const customSort = (a, b) => {
        //sort by checkbox state, whether checked or not
        if (a.needAdditional === b.needAdditional) {
            //when checkbox is the same, sort by count
            return a.count - b.count;
        }
        //move checked boxes to top
        return a.needAdditional ? -1 : 1;
    }

    //sort
    const sortedCores = cores.slice().sort(customSort);

    return (
        <div className="home">
            <h3 className='core-title'>Core Details</h3>
            {/* map cores to home */}
            <div className="cores">
                {sortedCores.map((core) => (
                    <CoresDetails key={core._id} core={core}dispatch={dispatch}  />
                ))}
                
        
            </div>
            <AdminForm />
            <UserForm />
        </div>
    )
}

export default Home;