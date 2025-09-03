import React, { useState } from 'react';
import './index.css';

function App() {
  const [activeService, setActiveService] = useState(null);
  const [activeTab, setActiveTab] = useState('demo-transport');

  const showService = (serviceId) => {
    setActiveService(serviceId);
    setActiveTab('demo-transport');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hideService = () => {
    setActiveService(null);
    const servicesSection = document.querySelector('.services-section');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="App">
      <Header />
      
      <div className="container">
        <ServicesSection 
          showService={showService} 
          activeService={activeService} 
          activeTab={activeTab}
          handleTabChange={handleTabChange}
          hideService={hideService}
        />
      </div>
      
      <Footer />
    </div>
  );
}

const Header = () => (
  <header>
    <div className="logo">
      <i className="fas fa-building"></i>
      <h1>Mutu Solutions</h1>
    </div>
  </header>
);

const ServicesSection = ({ showService, activeService, activeTab, handleTabChange, hideService }) => (
  <div className="services-section">
    <br /><br />
    <h2><i className="fas fa-concierge-bell"></i> Our Services</h2>
    <div className="services-grids">
      <div className="grid-top">
        <ServiceCard 
          className="white" 
          icon="fas fa-truck" 
          title="Transport" 
          description="Logistics and fleet management" 
          onClick={() => showService('transport')} 
        />
        <ServiceCard 
          className="white" 
          icon="fas fa-users" 
          title="HR System" 
          description="Human resources platform" 
          onClick={() => showService('hr')} 
        />
        <ServiceCard 
          className="white" 
          icon="fas fa-industry" 
          title="Factory" 
          description="Production management" 
          onClick={() => showService('factory')} 
        />
        <ServiceCard 
          className="white" 
          icon="fas fa-warehouse" 
          title="WMS" 
          description="Warehouse system" 
          onClick={() => showService('wms')} 
        />
      </div>
      
      <div className="grid-bottom">
        <ServiceCard 
          className="blue" 
          icon="fas fa-ship" 
          title="Shipping" 
          description="Maritime logistics" 
          onClick={() => showService('shipping')} 
        />
        <ServiceCard 
          className="blue" 
          icon="fas fa-passport" 
          title="Custom Clearing" 
          description="Trade compliance" 
          onClick={() => showService('customclearing')} 
        />
        <ServiceCard 
          className="blue" 
          icon="fas fa-dollar-sign" 
          title="Financial" 
          description="Accounting solutions" 
          onClick={() => showService('financial')} 
        />
      </div>
    </div>
    <br /><br /><br />

    {activeService === 'transport' && (
      <TransportContent 
        activeTab={activeTab} 
        handleTabChange={handleTabChange} 
        hideService={hideService} 
      />
    )}
  </div>
);

const ServiceCard = ({ className, icon, title, description, onClick }) => (
  <div className={`service-card ${className}`} onClick={onClick}>
    <i className={icon}></i>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const TransportContent = ({ activeTab, handleTabChange, hideService }) => (
  <div id="transport-content" className="content-area">
    <div className="service-header">
      <div className="service-icon">
        <i className="fas fa-truck"></i>
      </div>
      <h2 className="service-title">Transport Management System</h2>
    </div>

    <div className="local-tabs">
      <button 
        className={`local-tab ${activeTab === 'demo-transport' ? 'active' : ''}`} 
        onClick={() => handleTabChange('demo-transport')}
      >
        Demo
      </button>
      <button 
        className={`local-tab ${activeTab === 'presentation-transport' ? 'active' : ''}`} 
        onClick={() => handleTabChange('presentation-transport')}
      >
        Presentation
      </button>
      <button 
        className={`local-tab ${activeTab === 'video-transport' ? 'active' : ''}`} 
        onClick={() => handleTabChange('video-transport')}
      >
        Video
      </button>
    </div>

    {activeTab === 'demo-transport' && (
      <div id="demo-transport" className="local-section active">
        <h3><i className="fas fa-desktop"></i> Live Demo</h3>
        <div className="demo-placeholder">
          <i className="fas fa-truck"></i>
          <p>Transport Management Interface Preview</p>
        </div>
        <div className="action-buttons">
          <button className="action-btn demo-btn">
            <i className="fas fa-play"></i> View Demo
          </button>
        </div>
      </div>
    )}

    {activeTab === 'presentation-transport' && (
      <div id="presentation-transport" className="local-section active">
        <h3><i className="fas fa-file-powerpoint"></i> Presentation</h3>
        <div className="demo-placeholder">
          <i className="fas fa-file-powerpoint"></i>
          <p>Transport Management Presentation</p>
        </div>
        <div className="action-buttons">
          <button className="action-btn presentation-btn">
            <i className="fas fa-download"></i> Download PDF
          </button>
        </div>
      </div>
    )}

    {activeTab === 'video-transport' && (
      <div id="video-transport" className="local-section active">
        <h3><i className="fas fa-video"></i> Video Resources</h3>
        <div className="video-row">
          <div className="video-container">
            <div className="demo-placeholder">
              <i className="fas fa-video"></i>
              <p>Main Transport Management Video</p>
            </div>
          </div>

          <div className="video-selection">
            <div className="video-option">
              <i className="fas fa-play-circle"></i>
              <h4>Introduction</h4>
              <p>5:23 min</p>
            </div>

            <div className="video-option">
              <i className="fas fa-play-circle"></i>
              <h4>How To Use</h4>
              <p>7:45 min</p>
            </div>

            <div className="video-option">
              <i className="fas fa-play-circle"></i>
              <h4>Features</h4>
              <p>9:12 min</p>
            </div>

            <div className="video-option">
              <i className="fas fa-play-circle"></i>
              <h4>Support</h4>
              <p>4:37 min</p>
            </div>
          </div>
        </div>
      </div>
    )}

    <button className="back-btn" onClick={hideService}>
      <i className="fas fa-arrow-left"></i> Back to Services
    </button>
  </div>
);

const Footer = () => (
  <footer>
    <p>© 2025 Mutu Solutions. All rights reserved.</p>
  </footer>
);

export default App;