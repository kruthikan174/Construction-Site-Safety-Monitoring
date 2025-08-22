import React, { useState } from 'react';
import './HelpSection.css'; // Importing CSS for styling
import HospitalTab from './HospitalTab';
import FirstAidTab from './FirstAidTab';
import Header from './Header';
import banner from '../Images/img7.jpg'

const Help = () => {
  const [activeTab, setActiveTab] = useState('hospitals');

  const handleTabClick = (tab) => setActiveTab(tab);

  return (
    <div>
       <Header/>
       <div className="banner">
        <img
          src={banner} // Replace with your banner image URL
          alt="Help Section Banner"
          className="banner-image"
          style={{width:"90%", height:"50%"}}
        />
      </div>
       <div className="help-section">
      <div className="tabs">
        <button className={`tab ${activeTab === 'hospitals' ? 'active' : ''}`} onClick={() => handleTabClick('hospitals')}>Nearby Hospitals</button>
        <button className={`tab ${activeTab === 'firstaid' ? 'active' : ''}`} onClick={() => handleTabClick('firstaid')}>Basic First Aid</button>
      </div>
      <div className="tab-content">
        {activeTab === 'hospitals' && <HospitalTab />}
        {activeTab === 'firstaid' && <FirstAidTab />}
      </div>
    </div>
    </div>
    
  );
};

export default Help;
