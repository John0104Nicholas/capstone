import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTask } from '../actions/taskActions';
import Message from './Message';
import Loader from './Loader';
import { TASK_CREATE_RESET } from '../constants/taskConstants';

const AddTaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('todo');
  const [dueDate, setDueDate] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const dispatch = useDispatch();

  const taskCreate = useSelector((state) => state.taskCreate);
  const { loading, error, success } = taskCreate;

  const submitHandler = (e) => {
    e.preventDefault();
    
    dispatch(createTask({
      title,
      description,
      status,
      dueDate
    }));

    // Reset form if successful
    if (success) {
      setTitle('');
      setDescription('');
      setStatus('todo');
      setDueDate('');
      setIsFormOpen(false);
      dispatch({ type: TASK_CREATE_RESET });
    }
  };

  return (
    <div className="add-task-container">
      <button 
        className="btn btn-primary add-task-toggle" 
        onClick={() => setIsFormOpen(!isFormOpen)}
      >
        {isFormOpen ? 'Cancel' : 'Add New Task'}
      </button>

      {isFormOpen && (
        <div className="add-task-form">
          <h3>Add New Task</h3>
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                placeholder="Enter task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="3"
              ></textarea>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select 
                value={status} 
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="form-group">
              <label>Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-success">
              Add Task
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddTaskForm; 