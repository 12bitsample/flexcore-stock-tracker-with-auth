import express from 'express';
import {
        getCore,
        getCores,
        createCore, 
        deleteCore,
        updateCoreStock,
    } from '../controllers/coresController.js';

import { getIdBySize } from '../services/getIdBySize.js';

const router = express.Router();

//GET all cores
router.get('/', getCores);

//GET single core
router.get('/:id', getCore);

//GET id by size
router.get('/get-id-by-size/:size', getIdBySize);

//POST a core
router.post('/', createCore);

//DELETE A core
router.delete('/:id', deleteCore);

//CHANGE count
router.patch('/updateCoreStock', updateCoreStock);

//CHANGE need additional cores for order
// router.patch(':id', changeTrueFalse);

export {router as default};