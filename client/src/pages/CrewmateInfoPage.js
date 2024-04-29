import React from 'react';
import { useParams } from 'react-router-dom';

const CrewmateInfoPage = ({ crewmates }) => {
    const { id } = useParams();
    const crewmate = crewmates.find((crewmate) => crewmate.id === parseInt(id));

    if (!crewmate) {
        return <div>Crewmate not found!</div>;
    }

    return (
        <div>
            <h2>Crewmate Info: {crewmate.name}</h2>
            <p>Attributes: {crewmate.attributes.join(', ')}</p>
        </div>
    );
};

export default CrewmateInfoPage;
