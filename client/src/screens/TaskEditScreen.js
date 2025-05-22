import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getTaskDetails, updateTask } from '../actions/taskActions';
import { TASK_UPDATE_RESET, TASK_DETAILS_RESET } from '../constants/taskConstants';

const TaskEditScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('todo');
  const [dueDate, setDueDate] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const taskDetails = useSelector((state) => state.taskDetails);
  const { loading, error, task } = taskDetails;

  const taskUpdate = useSelector((state) => state.taskUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = taskUpdate;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
      return;
    }

    if (successUpdate) {
      dispatch({ type: TASK_UPDATE_RESET });
      dispatch({ type: TASK_DETAILS_RESET });
      navigate('/');
      return;
    }

    if (!task || !task.title || task._id !== id) {
      dispatch(getTaskDetails(id));
    } else {
      setTitle(task.title);
      setDescription(task.description || '');
      setStatus(task.status || 'todo');
      setDueDate(task.dueDate ? task.dueDate.substring(0, 10) : '');
    }

    // Cleanup function to reset task details when component unmounts
    return () => {
      dispatch({ type: TASK_DETAILS_RESET });
    };
  }, [dispatch, navigate, id, task, successUpdate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateTask({
        _id: id,
        title,
        description,
        status,
        dueDate,
      })
    );
  };

  return (
    <div className="form-container">
      <h2>Edit Task</h2>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
            ></textarea>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
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

          <button type="submit" className="btn btn-primary">
            Update
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              dispatch({ type: TASK_DETAILS_RESET });
              navigate('/');
            }}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default TaskEditScreen; 