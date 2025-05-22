import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listTasks, deleteTask } from '../actions/taskActions';
import TaskItem from '../components/TaskItem';
import AddTaskForm from '../components/AddTaskForm';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const taskList = useSelector((state) => state.taskList);
  const { loading, error, tasks } = taskList;

  const taskDelete = useSelector((state) => state.taskDelete);
  const { success: successDelete } = taskDelete;

  const taskCreate = useSelector((state) => state.taskCreate);
  const { success: successCreate } = taskCreate;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      dispatch(listTasks());
    }
  }, [dispatch, navigate, userInfo, successDelete, successCreate]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(id));
    }
  };

  return (
    <div className="home-container">
      <h1>My Tasks</h1>
      <AddTaskForm />
      
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="task-list">
          {tasks.length === 0 ? (
            <Message>No tasks found. Add a task to get started!</Message>
          ) : (
            <>
              <div className="task-categories">
                <div className="task-category">
                  <h3>To Do</h3>
                  {tasks.filter(task => task.status === 'todo').map((task) => (
                    <TaskItem 
                      key={task._id} 
                      task={task} 
                      onDelete={() => deleteHandler(task._id)}
                    />
                  ))}
                </div>
                
                <div className="task-category">
                  <h3>In Progress</h3>
                  {tasks.filter(task => task.status === 'in-progress').map((task) => (
                    <TaskItem 
                      key={task._id} 
                      task={task} 
                      onDelete={() => deleteHandler(task._id)}
                    />
                  ))}
                </div>
                
                <div className="task-category">
                  <h3>Completed</h3>
                  {tasks.filter(task => task.status === 'completed').map((task) => (
                    <TaskItem 
                      key={task._id} 
                      task={task} 
                      onDelete={() => deleteHandler(task._id)}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default HomeScreen; 