import coreModel from "../models/coreModel.js";



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

export {getIdBySize};