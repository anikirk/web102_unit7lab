import React, { useState } from 'react';

const CreateCrewmateForm = ({ onAddCrewmate }) => {
    const [name, setName] = useState('');
    const [attributes, setAttributes] = useState([]);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleAttributeClick = (attribute) => {
        // Logic to handle attribute selection
        setAttributes([...attributes, attribute]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Pass the crewmate data to the parent component
        onAddCrewmate({ name, attributes });
        // Clear the form fields after submission
        setName('');
        setAttributes([]);
    };

    return (
        <div>
            <h2>Add New Crewmate</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" value={name} onChange={handleNameChange} required />
                <br />

                <h3>Attributes:</h3>
                <button type="button" onClick={() => handleAttributeClick('Engineer')}>Engineer</button>
                <button type="button" onClick={() => handleAttributeClick('Pilot')}>Pilot</button>
                <button type="button" onClick={() => handleAttributeClick('Medic')}>Medic</button>
                {/* Add more attribute buttons as needed */}
                <br />

                <button type="submit">Add Crewmate</button>
            </form>
        </div>
    );
};

export default CreateCrewmateForm;