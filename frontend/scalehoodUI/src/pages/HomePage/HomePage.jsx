import * as React from 'react';
import { useState } from 'react';
import NavBar from '../../components/NavigationBar/NavBar';
import ButtonGroup from '../../components/ButtonGroups/Buttons';
import FinancialMetrics from '../../components/FinancialMetrics/Cards';
import RecentTransactions from '../../components/RecentTransactions/RecentTransactions';
import Portfolio from '../../components/Portfolio/Portfolio';
import '../../global.css'



export default function HomePage() {
  const [activeView, setActiveView] = useState('Home'); // Default to 'Home' view

  const buttonData = [
      { name: 'Home', value: 'Home' },
      { name: 'Portfolio', value: 'Portfolio' },
  ];

  return (
      <div>
          <NavBar/>
          <div style={{margin: 'auto', maxWidth: 1000}}>
              {/* Pass the activeView, setter function, and button data to ButtonGroup */}
              <ButtonGroup 
                  activeView={activeView} 
                  setActiveView={setActiveView} 
                  buttons={buttonData} 
              />
              <div>
                  {/* Conditionally render components based on the active button */}
                  {activeView === 'Home' && (
                      <>
                          <FinancialMetrics/>
                          <RecentTransactions/>
                      </>
                  )}
                  {activeView === 'Portfolio' && (
                      <Portfolio/>
                  )}
              </div>
          </div>
      </div>
  );
}

// export default function HomePage() {
//   const [activeView, setActiveView] = useState('Home'); // Default to 'Home' view

//   return (
//     <div>
//       <NavBar/>
//       <div style={{margin: 'auto', maxWidth: 1000}}>
//         {/* Pass the activeView and setter function to ButtonGroup */}
//         <ButtonGroup activeView={activeView} setActiveView={setActiveView} />
//         <div>
//           {/* Conditionally render components based on the active button */}
//           {activeView === 'Home' && (
//             <>
//               <FinancialMetrics/>
//               <RecentTransactions/>
//             </>
//           )}
//           {activeView === 'Portfolio' && (
//             <Portfolio/>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


