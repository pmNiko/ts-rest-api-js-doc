import { Handler } from 'express'
import { getConnection } from '../db'
import { nanoid } from 'nanoid'

export const getTasks: Handler = (req, res) => {
  const data = getConnection().get('tasks').value()
  return res.json(data)
}

export const createTask: Handler = (req, res) => {
  const { name, description } = req.body

  const newTask = {
    name,
    description,
    id: nanoid()
  }

  try {
    getConnection().get('tasks').push(newTask).write()
    res.json(newTask)
  } catch (error) {
    res.status(500).send(error)
  }
}

export const getTask: Handler = (req, res) => {
  const task = getConnection()
    .get('tasks')
    .find({ id: req.params.id })
    .value()

  if(!task) return res.status(404).json({msg: 'Task was not found!'})
  res.json(task)
}

export const countTasks: Handler = (req, res) => {
  const data = getConnection().get('tasks').value().length
  return res.json(data)
}

export const deleteTask: Handler = (req, res) => {
  const task = getConnection()
    .get('tasks')
    .remove({ id: req.params.id })
    .write()  

  if(Object.entries(task).length === 0) return res.status(404).json({msg: 'Task was not found!'})

  res.json(task)
}

export const updateTask: Handler = (req, res) => {
  const task = getConnection()
    .get('tasks')
    .find({id: req.params.id})
    .assign(req.body)
    .write()

  if(Object.entries(task).length === 0) return res.status(404).json({msg: 'Task was not found!'})

  res.json(task)
}

