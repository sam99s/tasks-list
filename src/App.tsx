import React, { useState, useRef } from "react";
type FormElement = React.FormEvent<HTMLFormElement>;
interface ITask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newTask, setnewTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const tasksInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask);
    setnewTask("");
    tasksInput.current?.focus();
  };
  const addTask = (name: string): void => {    
    const notString = (text: string) => {
      for(let i = 0; i < text.length; i++){
        if(text[i] === " ") continue;
        return false
      }
      return true
    }
    if(!name || notString(name)) return;
    const newTasks: ITask[] = [...tasks, { name, done: false }];
    setTasks(newTasks);
  };

  const toggleDoneTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks);
  };

  const removeTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(i, 1);
    setTasks(newTasks);
  };

  return (
    <div className="container p-4">
      <div className="row text-center mb-5">
        <h1>Tasks List</h1>
      </div>
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={(e) => setnewTask(e.target.value)}
              value={newTask}
              className="form-control border-info"
              ref={tasksInput}
              autoFocus
            />
            <button className="btn btn-light btn-block mt-2 border-success">Save</button>
          </form>
          {tasks.map((t: ITask, i: number) => (
            <div className="card card-body mt-2 border-info" key={i}>
              <h2 style={{ textDecoration: t.done ? "line-through" : "" }}>
                {t.name}
              </h2>
              <div>
                <button
                  className="btn btn-success"
                  onClick={() => toggleDoneTask(i)}
                >
                  {t.done ? "✓" : "✗"}
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => removeTask(i)}
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
