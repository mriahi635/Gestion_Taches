import React from "react";
import TaskBoard from "./components/TaskBoard";
import AddTask from "./components/AddTask";


const App = () => {
    return (
        <div style={{ padding: "20px" }}>
            <h1>Gestion de Tâches - Style ClickUp</h1>
            <AddTask />
            <TaskBoard />
        </div>
    );
};

export default App;
