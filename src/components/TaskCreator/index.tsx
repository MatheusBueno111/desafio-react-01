import { ClipboardText, PlusCircle } from 'phosphor-react';
import { ButtonHTMLAttributes, ChangeEvent, FormEvent, useState } from 'react';
import { Task } from '../Task';
import { v4 as uuidv4} from 'uuid';

import styles from './styles.module.css';

interface Task {
  id: string;
  title: string;
  isComplete: boolean;
}

export function TaskCreator() {

  const [titleTask, setTitleTask] = useState('')
  const [tasks, setTasks] =  useState<Task[]>([])
  const [taskCounter, setTaskCounter] = useState(0)
  const [taskCounterCompleted, setTaskCounterCompleted] = useState(0)

  function handleNewTask(event: FormEvent) {
    event.preventDefault();
    const updatedTasks = [...tasks]
    const newTask = {
      id: uuidv4(),
      title: titleTask,
      isComplete: false,
    };

    updatedTasks.push(newTask)
    setTasks(updatedTasks)
    setTitleTask('')
    setTaskCounter((count) => {
      return count + 1
    });

  }

  function updateTaskToogleIsComplete(id: string) {
    
    const updateTaskToogle = [...tasks]
    updateTaskToogle.map(task => {
      return (
        task.id === id ? (
          task.isComplete = !task.isComplete,
          task.isComplete === true ? (
            setTaskCounterCompleted((count) => {
              return count + 1
            })
            ) : (
              setTaskCounterCompleted((count) => {
                return count - 1
              }) 
            )
        ) : (tasks) 
        
    )})
    setTasks(updateTaskToogle)
  } 
  
  function DeleteTaskTitle(id: string) {
    const updateTasks= [...tasks]
    const newTask = updateTasks.filter(task => {
      if(task.id === id) {
        task.isComplete === true ? (setTaskCounterCompleted((count) => {
          return count - 1
        })) : (taskCounterCompleted)
      }
      return task.id !== id  
    })
    setTasks(newTask)
    setTaskCounter((count) => {
      return count - 1;
    })
  }

  return (
    <div className={styles.taskContainer}>

      <form onSubmit={handleNewTask}className={styles.formContainer} >
        <input 
          type="text" 
          placeholder='Adicione uma nova tarefa'
          value={titleTask}
          onChange={e => setTitleTask(e.target.value)}
        />
        <button type="submit"  disabled={!titleTask}>
          <span>Criar</span>
          <PlusCircle size={16} weight="bold"/>
        </button>
      </form>

      <div>
        <div className={styles.tasksBox}>
          <div className={styles.taskCounter}>
            <p>Tarefas criadas</p>
            <span>{taskCounter}</span>
          </div>
          <div className={styles.taskAccomplished}>
            <p>Concluídas</p>
            <span>{taskCounterCompleted} de {taskCounter}</span>
          </div>
        </div>

       

        {tasks.length ?  tasks.map(task =>{
          return (
            <Task 
              key={task.id}
              id={task.id}
              title={task.title}
              isComplete={task.isComplete}
              onUpdateTaskToogleIsComplete={updateTaskToogleIsComplete}
              onDeleteTaskTitle ={DeleteTaskTitle}
            />
          )
         }) : (  <div className={styles.noTask}>
          <ClipboardText size={56} weight="thin" />
          <div>
            <strong>Você ainda não tem tarefas cadastradas</strong>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
        </div>)
        
        }          
      </div>
    </div>
  )
}