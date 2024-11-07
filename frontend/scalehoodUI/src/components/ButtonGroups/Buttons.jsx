import React from 'react';
import './Buttons.css';

function ButtonGroup({ activeView, setActiveView, buttons }) {
    return (
        <div className="button-group">
            {buttons.map(({ name, value }) => (
                <button 
                    key={value}
                    className={`button ${activeView === value ? 'active' : ''}`} 
                    onClick={() => setActiveView(value)}>
                    <strong>{name}</strong>
                </button>
            ))}
        </div>
    );
}
export default ButtonGroup;





