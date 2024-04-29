import React, { useState } from 'react';

const CrewmateSummary = ({ crewmates, onUpdateCrewmate, onDeleteCrewmate }) => {
    const handleUpdateClick = (id) => {
        // Logic to update crewmate
        onUpdateCrewmate(id);
    };

    const handleDeleteClick = (id) => {
        // Logic to delete crewmate
        onDeleteCrewmate(id);
    };

    return (
        <div>
            <h2>Crewmate Summary</h2>
            {crewmates.map((crewmate) => (
                <div key={crewmate.id}>
                    <h3>{crewmate.name}</h3>
                    <p>Attributes: {crewmate.attributes.join(', ')}</p>
                    <button onClick={() => handleUpdateClick(crewmate.id)}>Update</button>
                    <button onClick={() => handleDeleteClick(crewmate.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default CrewmateSummary;
