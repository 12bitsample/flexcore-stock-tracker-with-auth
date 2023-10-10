import { CoresContext } from "../context/CoreContext";
import { useContext } from "react";

export const useCoresContext = () => {
    const context = useContext(CoresContext);

    if (!context) {
        throw Error('useCoresContext must be used inside a CoresContextProvider')
    }

    return context
}