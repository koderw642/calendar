import React, { useState } from 'react';
import '../styles/Calender.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 3, 1)); // April 2025
  const [todos, setTodos] = useState([
    { id: 1, text: 'Weekly Inspiration', completed: false },
    { id: 2, text: 'New Product Feature', completed: true },
    { id: 3, text: 'User Testimonial', completed: false },
    { id: 4, text: 'Behind-the-Scenes', completed: true },
    { id: 5, text: 'Weekly Advice', completed: false },
    { id: 6, text: 'Market Update', completed: true },
    { id: 7, text: 'How-To Guide', completed: false },
    { id: 8, text: 'Event Announcement', completed: false },
    { id: 9, text: 'Team Member Highlight', completed: false },
    { id: 10, text: 'Fun Fact', completed: false }
  ]);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskDate, setNewTaskDate] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');

  const platformColors = {
    'Platform A': '#8CCCC9',
    'Platform B': '#BFD7ED',
    'Platform C': '#F2E9E1',
    'Platform D': '#D9CFE8'
  };

  const [calendarEvents, setCalendarEvents] = useState({
    7: { text: 'Run Fact', platform: null },
    6: { text: 'Behind-the-Scenes', platform: null },
    13: { text: 'How-To Guide', platform: null },
    17: { text: 'User Testimonial', platform: null },
    20: { text: 'Weekly Inspiration', platform: null },
    24: { text: 'User Testimonial', platform: null },
    27: { text: 'Weekly Advice', platform: null },
    30: { text: 'Platform A', platform: 'Platform A' },
    30: { text: 'Platform C', platform: 'Platform C' },
    29: { text: 'Platform D', platform: 'Platform D' },
    27: { text: 'Platform B', platform: 'Platform B' }
  });

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const navigateMonth = (direction) => {
    setCurrentDate(new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + direction,
      1
    ));
  };

  const addNewTask = () => {
    if (newTaskText.trim()) {
      // Add task to todos
      const newTask = {
        id: todos.length + 1,
        text: newTaskText,
        completed: false,
        date: newTaskDate,
        platform: selectedPlatform
      };
      setTodos([...todos, newTask]);

      // Add task to calendar events
      const day = new Date(newTaskDate).getDate();
      setCalendarEvents({
        ...calendarEvents,
        [day]: {
          text: newTaskText,
          platform: selectedPlatform
        }
      });

      // Reset form fields
      setNewTaskText('');
      setNewTaskDate('');
      setSelectedPlatform('');
      setShowAddTaskModal(false);
    }
  };

  const renderCalendar = () => {
    const days = [];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
      days.push(<div key={`header-${day}`} className="calendar-header">{day}</div>);
    });

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(
        <div key={`prev-${i}`} className="calendar-day other-month">
          <div className="day-number">{daysInPrevMonth - i}</div>
        </div>
      );
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const event = calendarEvents[i];
      const hasEvent = !!event;
      const platformColor = event?.platform ? platformColors[event.platform] : null;

      days.push(
        <div
          key={`day-${i}`}
          className="calendar-day"
          style={{
            borderTop: `5px solid ${platformColor || 'black'}`
          }}
        >
          <div className="day-number">{i}</div>
          {hasEvent && (
            <div className="calendar-event">
              {event.text}
            </div>
          )}
        </div>
      );
    }

    const daysToAdd = 42 - (firstDay + daysInMonth);
    for (let i = 1; i <= daysToAdd; i++) {
      days.push(
        <div key={`next-${i}`} className="calendar-day other-month">
          <div className="day-number">{i}</div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="app-container">
      <div className="calendar-container">
        <div className="calendar-header-row">
          <button className="nav-button" onClick={() => navigateMonth(-1)}>&lt;</button>
          <h2 className="month-title"> {currentDate.toLocaleString('default', { month: 'long' })} </h2>
          <button className="nav-button" onClick={() => navigateMonth(1)}>&gt;</button>
        </div>
        <div className="calendar-grid">
          {renderCalendar()}
        </div>
      </div>

      <div className="todo-container">
        <div className="todo-header">
          <h2>Monthly To Do list</h2>
          <button
            className="add-button"
            onClick={() => setShowAddTaskModal(true)}
          >
            +
          </button>
        </div>
        <div className="todo-divider"></div>
        <div className="todo-list-container">
          <h3>To Do</h3>
          <ul className="todo-list">
            {todos.map(todo => (
              <li key={todo.id} className="todo-item">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <span className="checkmark"></span>
                  <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                    {todo.text}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="todo-divider"></div>
        <div className="platforms-container">
          <h3>Subject</h3>
          <div className="platform-grid">
            {Object.entries(platformColors).map(([platform, color]) => (
              <div
                key={platform}
                className="platform-tag"
                style={{ backgroundColor: color }}
              >
                {platform}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Updated Pop-Up Modal */}
      {showAddTaskModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Add Task</h3>
              <button className="close-button" onClick={() => setShowAddTaskModal(false)}>
                &times;
              </button>
            </div>
            <form className="modal-form">
              <div className="form-group">
                <input
                  type="text"
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  placeholder="add task"
                  className="task-input"
                />
              </div>
              <div className="form-group">
                <input
                  type="date"
                  value={newTaskDate}
                  onChange={(e) => setNewTaskDate(e.target.value)}
                  className="task-input"
                />
              </div>
              <div className="form-group">
                <select
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                  className="task-input"
                >
                  <option value="">select subject</option>
                  {Object.keys(platformColors).map((platform) => (
                    <option key={platform} value={platform}>
                      {platform}
                    </option>
                  ))}
                </select>
              </div>
              <div className="modal-actions">
                <button
                  className="cancel-button"
                  onClick={() => setShowAddTaskModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="add-task-button"
                  onClick={addNewTask}
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;