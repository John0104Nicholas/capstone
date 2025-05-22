import React from 'react';
import { Link } from 'react-router-dom';

const TaskItem = ({ task, onDelete }) => {
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get status class
  const getStatusClass = (status) => {
    switch (status) {
      case 'todo':
        return 'status-todo';
      case 'in-progress':
        return 'status-progress';
      case 'completed':
        return 'status-completed';
      default:
        return '';
    }
  };

  return (
    <div className={`task-item ${getStatusClass(task.status)}`}>
      <div className="task-header">
        <h3>{task.title}</h3>
        <div className="task-actions">
          <Link to={`/task/${task._id}/edit`} className="btn-edit">
            <i className="fas fa-edit"></i>
          </Link>
          <button onClick={onDelete} className="btn-delete">
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
      <p className="task-description">{task.description}</p>
      <div className="task-footer">
        <span className="task-date">Due: {formatDate(task.dueDate)}</span>
        <span className={`task-status ${getStatusClass(task.status)}`}>
          {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
        </span>
      </div>
    </div>
  );
};

export default TaskItem; 