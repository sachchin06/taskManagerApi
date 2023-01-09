const Task = require('../models/Task')

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({})
        // res.status(200).json({ tasks })

        res
            .status(200)
            .json({ status: 'success', data: { tasks, nbHits: tasks.length } })

    } catch (error) {
        res.status(500).json({message: error})
    }
    
}

const createNewTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json({ task })
    } catch (error) {
        res.status(500).json({message: error})
    }
   
}

const getTask = async (req, res) => {
    try {
       
        // const id = req.params.id
        const {id: taskID} = req.params
        // const task = await Task.findById(id).exec();
        const task = await Task.findOne({_id: taskID})

        if(!task) {
            return res.status(404).json( {msg:`No task with id : ${taskID}`} )
        }
        res.status(200).json({ task })
       
    } catch (error) {
        res.status(500).json({message: error})
    }
}

const updateTask = async (req, res) => {
    
    try {
        const {id: taskID} = req.params
        const task = await Task.findOneAndUpdate({_id: taskID}, req.body, {
            new: true,
            runValidators:true
        })
        if(!task) {
            return res.status(404).json( {msg:`No task with id : ${taskID}`} )
        }
        res.status(200).json({ task })
        
    } catch (error) {
        res.status(500).json({message: error})
    }
}

const deleteTask = async (req, res) => {
    
    try {
        const {id: taskID} = req.params
        const task = await Task.findOneAndDelete({ _id: taskID });

        if(!task) {
            return res.status(404).json( {msg:`No task with id : ${taskID}`} )
        }

        res.status(201).json({message: `Task with id : ${taskID} is deleted.` })
    } catch (error) {
        res.status(500).json({message: error})
    }
}


module.exports = {
    getAllTasks,
    createNewTask,
    getTask,
    updateTask,
    deleteTask
}