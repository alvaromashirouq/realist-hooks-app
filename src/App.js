import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

function App() {
  const [tasks, setTasks] = useState([]);

  const { isLoading, error, sendRequest: fetchTasks } = useHttp();
  useEffect(() => {
    const transformTask = (taskObj) => {
      const loadedTask = [];

      for (const taskKey in taskObj) {
        loadedTask.push({ id: taskKey, text: taskObj[taskKey].text });
      }

      setTasks(loadedTask);
    };

    fetchTasks(
      {
        url: ' https://react-http-13682-default-rtdb.firebaseio.com/tasks.json',
        headers: {
          'Content-Type': 'application/json'
        }
      },
      transformTask
    );
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
