import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ajouterTache, modifierTache } from "../features/tasksSlice";

const AddTask = ({ taskId = null }) => {
    const dispatch = useDispatch();
    const taskToEdit = useSelector((state) => state.tasks.tasks[taskId]);

    const [task, setTask] = useState({
        nom: "",
        desc: "",
        status: "À faire",
        dateDebut: "",
        dateFin: "",
        duree: "",
    });

    useEffect(() => {
        if (taskId) {
            setTask({
                nom: taskToEdit.nom,
                desc: taskToEdit.desc,
                status: taskToEdit.status,
                dateDebut: taskToEdit.dateDebut,
                dateFin: taskToEdit.dateFin,
                duree: taskToEdit.duree,
            });
        }
    }, [taskId, taskToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (taskId) {
            // Modification d'une tâche
            dispatch(modifierTache({ id: taskId, updates: task }));
        } else {
            // Ajout d'une nouvelle tâche
            const id = Date.now().toString();
            dispatch(ajouterTache({ id, task, status: task.status }));
        }

        setTask({
            nom: "",
            desc: "",
            status: "À faire",
            dateDebut: "",
            dateFin: "",
            duree: "",
        });
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                {taskId ? "Modifier la tâche" : "Ajouter une nouvelle tâche"}
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nom de la tâche</label>
                        <input
                            type="text"
                            placeholder="Nom de la tâche"
                            value={task.nom}
                            onChange={(e) => setTask({ ...task, nom: e.target.value })}
                            required
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            placeholder="Description"
                            value={task.desc}
                            onChange={(e) => setTask({ ...task, desc: e.target.value })}
                            required
                            rows="4"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Statut</label>
                        <select
                            value={task.status}
                            onChange={(e) => setTask({ ...task, status: e.target.value })}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="À faire">À faire</option>
                            <option value="En cours">En cours</option>
                            <option value="Terminée">Terminée</option>
                        </select>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-700">Date début</label>
                            <input
                                type="date"
                                value={task.dateDebut}
                                onChange={(e) => setTask({ ...task, dateDebut: e.target.value })}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-700">Date fin</label>
                            <input
                                type="date"
                                value={task.dateFin}
                                onChange={(e) => setTask({ ...task, dateFin: e.target.value })}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Durée</label>
                        <input
                            type="text"
                            placeholder="Durée"
                            value={task.duree}
                            onChange={(e) => setTask({ ...task, duree: e.target.value })}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {taskId ? "Modifier" : "Ajouter"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTask;
