import React, { useState } from 'react';
import CreateCrewmateForm from './pages/CreateCrewmateForm';
import CrewmateSummary from './pages/CrewmateSummary';
import CrewmateInfoPage from './pages/CrewmateInfoPage';

const App = () => {
    const [crewmates, setCrewmates] = useState([]);
    const [currentPage, setCurrentPage] = useState('summary');
    const [selectedCrewmate, setSelectedCrewmate] = useState(null);

    const handleAddCrewmate = (newCrewmate) => {
        // Generate a unique ID for the crewmate
        const id = crewmates.length + 1;
        const crewmateWithId = { ...newCrewmate, id };
        setCrewmates([...crewmates, crewmateWithId]);
        setCurrentPage('summary');
    };

    const handleUpdateCrewmate = (id) => {
        // Logic to update crewmate
        // This could involve opening a modal with a form pre-filled with crewmate data
        console.log(`Update crewmate with ID: ${id}`);
    };

    const handleDeleteCrewmate = (id) => {
        // Logic to delete crewmate
        const updatedCrewmates = crewmates.filter((crewmate) => crewmate.id !== id);
        setCrewmates(updatedCrewmates);
    };

    const handleCrewmateClick = (id) => {
        setSelectedCrewmate(id);
        setCurrentPage('info');
    };

    return (
        <div>
            {currentPage === 'summary' && (
                <>
                    <CreateCrewmateForm onAddCrewmate={handleAddCrewmate} />
                    <CrewmateSummary
                        crewmates={crewmates}
                        onUpdateCrewmate={handleUpdateCrewmate}
                        onDeleteCrewmate={handleDeleteCrewmate}
                        onCrewmateClick={handleCrewmateClick}
                    />
                </>
            )}

            {currentPage === 'info' && (
                <CrewmateInfoPage
                    crewmates={crewmates}
                    crewmateId={selectedCrewmate}
                    onBack={() => setCurrentPage('summary')}
                />
            )}
        </div>
    );
};

export default App;

