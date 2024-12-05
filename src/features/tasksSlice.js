import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: {
        "1": { id: "1", nom: "Configurer Redux", desc: "Mettre en place le store Redux", status: "À faire", dateDebut: "2024-12-01", dateFin: "2024-12-05", duree: "4 jours" },
        "2": { id: "2", nom: "Créer des colonnes", desc: "Ajouter des colonnes pour chaque statut", status: "En cours", dateDebut: "2024-12-02", dateFin: "2024-12-06", duree: "4 jours" },
        "3": { id: "3", nom: "Implémenter Drag-and-Drop", desc: "Rendre les tâches déplaçables", status: "Terminée", dateDebut: "2024-11-15", dateFin: "2024-11-18", duree: "3 jours" },
    },
    columns: {
        "À faire": ["1"],
        "En cours": ["2"],
        "Terminée": ["3"],
    },
    columnOrder: ["À faire", "En cours", "Terminée"],
};

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        ajouterTache: (state, action) => {
            const { id, task, status } = action.payload;
            state.tasks[id] = task;
            state.columns[status].push(id);
        },
        modifierTache: (state, action) => {
            const { id, updates } = action.payload;
            state.tasks[id] = { ...state.tasks[id], ...updates };
        },
        supprimerTache: (state, action) => {
            const { id, status } = action.payload;
            delete state.tasks[id];
            state.columns[status] = state.columns[status].filter((taskId) => taskId !== id);
        },
        reordonnerTaches: (state, action) => {
            const { source, destination, taskId } = action.payload;

            // Retirer la tâche de sa colonne d'origine
            state.columns[source.droppableId] = state.columns[source.droppableId].filter(
                (id) => id !== taskId
            );

            // Ajouter la tâche à la nouvelle colonne
            state.columns[destination.droppableId].splice(destination.index, 0, taskId);

            // Mettre à jour le statut de la tâche
            state.tasks[taskId].status = destination.droppableId;
        },
    },
});

export const { ajouterTache, modifierTache, supprimerTache, reordonnerTaches } = tasksSlice.actions;
export default tasksSlice.reducer;
