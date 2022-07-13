import { Trash } from "phosphor-react";
import { useState } from 'react';

import styles from './styles.module.css'

interface TaskProps {
  id: string;
  title: string;
  isComplete: boolean;
  onUpdateTaskToogleIsComplete: (id: string) => void;
  onDeleteTaskTitle: (id: string) => void;
}

export function Task({title, id, isComplete, onUpdateTaskToogleIsComplete, onDeleteTaskTitle}: TaskProps) {
 
  function handleUpdateTaskToogleIsComplete() {
    onUpdateTaskToogleIsComplete(id)
  }
  
  function handleDeleteTitleTask() {
    onDeleteTaskTitle(id)
    console.log('deletei a task', title)
  }

  return (
    <div 
      id={id} 
      className={styles.taskWrapper}
      style={ isComplete ? { borderColor: 'var(--gray-500)', textDecoration: 'line-through ', color: 'var(--gray-300)'  } : {}}
    >
      <label 
        className={styles.labelContainer} 
      >
        <div className={styles.containerTitle}>
          <p>{title}</p>
        </div>
        <input type="checkbox" onClick={handleUpdateTaskToogleIsComplete}/>
        <span className={styles.checkMark}></span>
      </label>
      <button type='button' onClick={handleDeleteTitleTask}>
        <Trash size={24} />
      </button>
    </div>
  )
}