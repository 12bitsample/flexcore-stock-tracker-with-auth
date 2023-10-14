import coreModel from "../models/coreModel.js";


//retrieve id by size
const getIdBySize = async (req,res) => {
    const { size } = req.params;

    console.log('Recieved values in getIdBySize: ', size);

    try {
        const core = await coreModel.findOne({ size });
        if (core) {
            res.json({ id: core._id});
            console.log('The id of this core is ' + core._id);
        } else {
            res.status(404).json({ message: 'Core not found! '});
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error!'});
    }
}

//toggle true/false for need additional bands
const changeTrueFalse = async (req,res) => {
    

    console.log(req.params);
    const { id } = req.params;


    try {
        const isChecked = req.params.needAdditional;

        const updatedCore = await coreModel.findByIdAndUpdate(
            id,
            { needAdditional: isChecked },
            { new: true },
        );

        if(!updatedCore) {
            return res.status(404).json({ message: 'Core not found!' });
        }

        return res.json(updatedCore);
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export {
    getIdBySize,
    changeTrueFalse,
};