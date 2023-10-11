import coreModel from "../models/coreModel.js";
import mongoose from "mongoose";


//get all cores
const getCores = async (req, res) => {
    const cores = await coreModel.find({}).sort({count: 1});

    res.status(200).json(cores);
}


//get a single core
const getCore = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such core exists!'});
    }

    const core = await coreModel.findById(id);

    if (!core) {
        return res.status(404).json({error: 'No core found.'});
    }

    res.status(200).json(core);
}

//create new core
const createCore = async (req, res) => {
    const {size, count} = req.body;

    let emptyFields = [];

    if (!size) {
        emptyFields.push('size')
    }
    if (!count) {
        emptyFields.push('count')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all empty fields!', emptyFields })
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all empty fields!', emptyFields })
    }
    

    //add document to db
    try {
      const core = await coreModel.create({size, count});  
      res.status(200).json(core);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//delete a core
const deleteCore = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such core exists!'});
    }

    const core = await coreModel.findOneAndDelete({_id: id});

    if (!core) {
        return res.status(400).json({error: 'No such core exists!'});
    }

    res.status(200).json(core);
}


//update a core
const updateCore = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such core exists!'});
    }

    const core = await coreModel.findOneAndUpdate({_id: id}, {
       ...req.body
    })
    

    if (!core) {
        return res.status(400).json({error: 'No such core exists!'});
    }

    res.status(200).json(core);
}

//ADDING or SUBTRACTING core count

const updateCoreStock = async (req,res) => {
    
    let {size, action, count, id} = req.body;
    let emptyFields = [];

    console.log('here is the req.body in controller', req.body);

    if (!count) {
        emptyFields.push('count')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all empty fields!', emptyFields })
    }

    if (action == 'Subtract') {
        count = -Math.abs(count);
    }

    try {
        let core = await coreModel.findOneAndUpdate(
            { _id: id}, 
            {'$inc': {'count': count}}, 
            {new: true},
        );
        res.json(core);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
    
}

export {
    getCore,
    getCores,
    createCore,
    deleteCore,
    updateCore,
    updateCoreStock,
};