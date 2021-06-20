import {Router} from 'express'
import { getTasks, createTask, getTask, deleteTask, updateTask, countTasks } from '../controllers/tasks.controller';


const router = Router()

router.get('/', getTasks);

router.get('/count', countTasks);

router.get('/:id', getTask); 

router.delete('/:id', deleteTask);

router.post('/', createTask);


router.put('/:id', updateTask);

export default router;