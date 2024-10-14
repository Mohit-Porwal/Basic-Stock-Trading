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

// function ButtonGroup({ activeView, setActiveView }) {
//     return (
//         <div className="button-group">
//             <button 
//                 className={`button ${activeView === 'Home' ? 'active' : ''}`} 
//                 onClick={() => setActiveView('Home')}>
//                 <strong>Home</strong>
//             </button>

//             <button 
//                 className={`button ${activeView === 'Portfolio' ? 'active' : ''}`} 
//                 onClick={() => setActiveView('Portfolio')}>
//                 <strong>Portfolio</strong>
//             </button>
//         </div>
//     );
// }

// export default ButtonGroup;




