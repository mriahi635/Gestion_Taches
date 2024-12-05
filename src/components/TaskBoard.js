import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { reordonnerTaches, supprimerTache } from "../features/tasksSlice";
import { useState } from "react";
import AddTask from "./AddTask"; // Importez votre composant AddTask

const TaskBoard = () => {
    const { tasks, columns, columnOrder } = useSelector((state) => state.tasks);
    const dispatch = useDispatch();

    const [editingTaskId, setEditingTaskId] = useState(null); // Etat pour la tâche en cours de modification

    const onDragEnd = (result) => {
        const { source, destination, draggableId } = result;

        if (!destination) return; // Drag annulé

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return; // Pas de changement
        }

        dispatch(
            reordonnerTaches({
                source,
                destination,
                taskId: draggableId,
            })
        );
    };

    const handleDelete = (taskId, status) => {
        dispatch(supprimerTache({ id: taskId, status }));
    };

    const handleEdit = (taskId) => {
        setEditingTaskId(taskId); // Lance la modification de la tâche
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex gap-6 overflow-x-auto">
                    {columnOrder.map((columnId) => (
                        <Droppable key={columnId} droppableId={columnId}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="bg-white p-4 rounded-lg shadow-lg w-64 min-w-[250px]"
                                >
                                    <h3 className="font-semibold text-xl mb-4 text-center text-gray-700">{columnId}</h3>
                                    {columns[columnId].map((taskId, index) => (
                                        <Draggable key={taskId} draggableId={taskId} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="bg-white p-4 mb-4 rounded-lg shadow-md border border-gray-200"
                                                    style={{
                                                        ...provided.draggableProps.style,
                                                    }}
                                                >
                                                    <h4 className="font-semibold text-lg">{tasks[taskId].nom}</h4>
                                                    <p className="text-gray-600 text-sm">{tasks[taskId].desc}</p>
                                                    <p className="text-gray-500 text-xs mt-2">Date début: {tasks[taskId].dateDebut}</p>
                                                    <p className="text-gray-500 text-xs">Date fin: {tasks[taskId].dateFin}</p>
                                                    <p className="text-gray-500 text-xs">Durée: {tasks[taskId].duree}</p>
                                                    <div className="flex justify-between mt-4">
                                                        <button
                                                            onClick={() => handleDelete(taskId, columnId)}
                                                            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                                                        >
                                                            Supprimer
                                                        </button>
                                                        <button
                                                            onClick={() => handleEdit(taskId)}
                                                            className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                                                        >
                                                            Modifier
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>

            {editingTaskId && (
                <div className="mt-8">
                    <AddTask taskId={editingTaskId} />
                </div>
            )}
        </div>
    );
};

export default TaskBoard;
