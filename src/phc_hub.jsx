import React, { useState, useEffect } from 'react';
import './phc_hub.css';

const PHCHub = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('');
  const [villageFilter, setVillageFilter] = useState('');

  // Sample patient data
  const patientsData = [
    {
      id: '9012',
      name: 'Ravi Kumar',
      age: 45,
      gender: 'Male',
      village: 'rampur',
      mobile: '+91-98765-43210',
      riskLevel: 'high',
      lastVitals: {
        bp: '165/95',
        sugar: '245',
        heartRate: '98',
        temperature: '98.6',
        weight: '72',
        oxygen: '95'
      },
      conditions: ['Hypertension', 'Pre-diabetes'],
      lastVisit: '2024-12-15',
      emergencyContact: 'Sunita Kumar - 98765-43211'
    },
    {
      id: '7834',
      name: 'Sunita Devi',
      age: 52,
      gender: 'Female',
      village: 'dharamkot',
      mobile: '+91-98765-43212',
      riskLevel: 'medium',
      lastVitals: {
        bp: '145/92',
        sugar: '140',
        heartRate: '102',
        temperature: '98.4',
        weight: '68',
        oxygen: '97'
      },
      conditions: ['Hypertension'],
      lastVisit: '2024-12-14',
      emergencyContact: 'Mohan Devi - 98765-43213'
    },
    {
      id: '5621',
      name: 'Mohan Singh',
      age: 38,
      gender: 'Male',
      village: 'mcleodganj',
      mobile: '+91-98765-43214',
      riskLevel: 'low',
      lastVitals: {
        bp: '120/80',
        sugar: '95',
        heartRate: '72',
        temperature: '98.6',
        weight: '75',
        oxygen: '98'
      },
      conditions: ['None'],
      lastVisit: '2024-12-10',
      emergencyContact: 'Priya Singh - 98765-43215'
    },
    {
      id: '3456',
      name: 'Kamla Devi',
      age: 67,
      gender: 'Female',
      village: 'bhagsu',
      mobile: '+91-98765-43216',
      riskLevel: 'high',
      lastVitals: {
        bp: '170/100',
        sugar: '180',
        heartRate: '88',
        temperature: '99.2',
        weight: '65',
        oxygen: '94'
      },
      conditions: ['Diabetes', 'Hypertension', 'Heart Disease'],
      lastVisit: '2024-12-12',
      emergencyContact: 'Ram Singh - 98765-43217'
    }
  ];

  const showTab = (tabName) => {
    setActiveTab(tabName);
  };

  const getRiskColor = (riskLevel) => {
    return riskLevel === 'high' ? '#dc3545' : 
           riskLevel === 'medium' ? '#ffc107' : '#28a745';
  };

  const viewPatient = (patientId) => {
    const patient = patientsData.find(p => p.id === patientId);
    setSelectedPatient(patient);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPatient(null);
  };

  const startConsultation = (patientId) => {
    const patient = patientsData.find(p => p.id === patientId);
    alert(`Starting teleconsultation with ${patient.name}\n\nConnecting to video call...\nConsultation room prepared.\nPatient notified via SMS.`);
    closeModal();
  };

  const callPatient = (patientId) => {
    const patient = patientsData.find(p => p.id === patientId);
    alert(`Calling ${patient.name} at ${patient.mobile}...\n\nCall connected. Duration: 2:30 minutes\nPatient status discussed and care instructions provided.`);
  };

  const respondToEmergency = (patientId) => {
    alert(`Emergency response initiated for Patient ID: ${patientId}\nAmbulance dispatched to patient location.\nETA: 15 minutes`);
  };

  const scheduleFollowup = (patientId) => {
    const patient = patientsData.find(p => p.id === patientId);
    alert(`Follow-up scheduled for ${patient.name}\n\nNext appointment: ${new Date(Date.now() + 7*24*60*60*1000).toLocaleDateString()}\nSMS reminder will be sent 24 hours before appointment.`);
    closeModal();
  };

  const markAllRead = () => {
    alert('All emergency alerts marked as read');
  };

  const testEmergency = () => {
    alert('Test emergency alert activated - All systems functioning');
  };

  const filterPatients = () => {
    return patientsData.filter(patient => {
      const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          patient.id.includes(searchTerm) ||
                          patient.mobile.includes(searchTerm);
      const matchesRisk = !riskFilter || patient.riskLevel === riskFilter;
      const matchesVillage = !villageFilter || patient.village === villageFilter;
      
      return matchesSearch && matchesRisk && matchesVillage;
    });
  };

  const OverviewTab = () => (
    <div>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">847</div>
          <div className="stat-label">Registered Patients</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">23</div>
          <div className="stat-label">Active Consultations</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">12</div>
          <div className="stat-label">Emergency Alerts</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">156</div>
          <div className="stat-label">This Month</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
        <div style={{ background: '#f8f9fa', padding: '25px', borderRadius: '15px' }}>
          <h3 style={{ color: '#2c5aa0', marginBottom: '20px' }}>Recent High-Risk Patients</h3>
          <div>
            <div style={{ padding: '15px', background: 'white', borderLeft: '4px solid #dc3545', borderRadius: '8px', marginBottom: '15px' }}>
              <strong>Ravi Kumar (ID: 9012)</strong><br />
              <small>BP: 165/95, Blood Sugar: 245 mg/dL</small><br />
              <span style={{ color: '#dc3545', fontWeight: 'bold' }}>Critical Risk - Requires Immediate Attention</span>
            </div>
            <div style={{ padding: '15px', background: 'white', borderLeft: '4px solid #ffc107', borderRadius: '8px', marginBottom: '15px' }}>
              <strong>Sunita Devi (ID: 7834)</strong><br />
              <small>BP: 145/92, Heart Rate: 102 BPM</small><br />
              <span style={{ color: '#856404', fontWeight: 'bold' }}>Medium Risk - Monitor Closely</span>
            </div>
          </div>
        </div>

        <div style={{ background: '#f8f9fa', padding: '25px', borderRadius: '15px' }}>
          <h3 style={{ color: '#2c5aa0', marginBottom: '20px' }}>Today's Schedule</h3>
          <div>
            <div style={{ padding: '15px', background: 'white', borderRadius: '8px', marginBottom: '15px' }}>
              <strong>10:00 AM - Health Camp</strong><br />
              <small>Village Dharamkot - Vaccination Drive</small>
            </div>
            <div style={{ padding: '15px', background: 'white', borderRadius: '8px', marginBottom: '15px' }}>
              <strong>2:00 PM - Teleconsultation</strong><br />
              <small>Specialist consultation with IGMC Shimla</small>
            </div>
            <div style={{ padding: '15px', background: 'white', borderRadius: '8px' }}>
              <strong>4:00 PM - Staff Meeting</strong><br />
              <small>Monthly review and planning</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const PatientsTab = () => {
    const filteredPatients = filterPatients();

    return (
      <div>
        <div className="search-filters">
          <div className="form-group">
            <label>Search Patients</label>
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, ID, or mobile..." 
            />
          </div>
          <div className="form-group">
            <label>Filter by Risk</label>
            <select value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)}>
              <option value="">All Patients</option>
              <option value="high">High Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="low">Low Risk</option>
            </select>
          </div>
          <div className="form-group">
            <label>Village</label>
            <select value={villageFilter} onChange={(e) => setVillageFilter(e.target.value)}>
              <option value="">All Villages</option>
              <option value="rampur">Rampur</option>
              <option value="dharamkot">Dharamkot</option>
              <option value="mcleodganj">McLeod Ganj</option>
              <option value="bhagsu">Bhagsu</option>
            </select>
          </div>
        </div>

        <div className="patients-grid">
          {filteredPatients.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#6c757d', padding: '40px' }}>
              No patients found matching your criteria.
            </div>
          ) : (
            filteredPatients.map(patient => (
              <div key={patient.id} className="patient-card">
                <div className="patient-header">
                  <div>
                    <h3>{patient.name} (ID: {patient.id})</h3>
                    <span style={{ 
                      background: getRiskColor(patient.riskLevel), 
                      color: 'white', 
                      padding: '4px 12px', 
                      borderRadius: '20px', 
                      fontSize: '0.8rem', 
                      fontWeight: 'bold' 
                    }}>
                      {patient.riskLevel.toUpperCase()} RISK
                    </span>
                  </div>
                  <div>
                    <button className="btn" onClick={() => viewPatient(patient.id)}>View Details</button>
                    <button className="btn btn-success" onClick={() => startConsultation(patient.id)} style={{ marginLeft: '10px' }}>Consult</button>
                  </div>
                </div>
                
                <div className="patient-info">
                  <div>
                    <strong>Age/Gender:</strong> {patient.age}/{patient.gender}<br />
                    <strong>Village:</strong> {patient.village.charAt(0).toUpperCase() + patient.village.slice(1)}<br />
                    <strong>Mobile:</strong> {patient.mobile}
                  </div>
                  <div>
                    <strong>Last Visit:</strong> {patient.lastVisit}<br />
                    <strong>Conditions:</strong> {patient.conditions.join(', ')}<br />
                    <strong>Emergency Contact:</strong> {patient.emergencyContact}
                  </div>
                  <div>
                    <strong>Latest Vitals:</strong><br />
                    BP: {patient.lastVitals.bp} | Sugar: {patient.lastVitals.sugar}<br />
                    HR: {patient.lastVitals.heartRate} | O2: {patient.lastVitals.oxygen}%
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  const EmergenciesTab = () => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <h2 style={{ color: '#dc3545' }}>🚨 Emergency Alerts</h2>
        <div>
          <button className="btn btn-success" onClick={markAllRead}>Mark All Read</button>
          <button className="btn btn-warning" onClick={testEmergency} style={{ marginLeft: '10px' }}>Test Alert</button>
        </div>
      </div>

      <div>
        <div className="emergency-alert">
          <h3>CRITICAL EMERGENCY</h3>
          <p><strong>Patient:</strong> Ravi Kumar (ID: 9012) | <strong>Location:</strong> Village Rampur</p>
          <p><strong>Vitals:</strong> BP: 180/110, Heart Rate: 125 BPM, Oxygen: 89%</p>
          <p><strong>Time:</strong> 2 minutes ago</p>
          <div style={{ marginTop: '15px' }}>
            <button className="btn" onClick={() => respondToEmergency('9012')}>Dispatch Ambulance</button>
            <button className="btn btn-success" onClick={() => callPatient('9012')} style={{ marginLeft: '10px' }}>Call Patient</button>
          </div>
        </div>

        <div className="alert alert-warning">
          <h4>Medium Priority Alert</h4>
          <p><strong>Patient:</strong> Sunita Devi (ID: 7834) | <strong>Village:</strong> Dharamkot</p>
          <p><strong>Issue:</strong> Blood pressure 155/95, chest discomfort</p>
          <p><strong>Time:</strong> 15 minutes ago</p>
          <button className="btn btn-warning">Schedule Consultation</button>
        </div>

        <div className="alert alert-success">
          <h4>Resolved Emergency</h4>
          <p><strong>Patient:</strong> Mohan Singh (ID: 5621) | <strong>Village:</strong> McLeod Ganj</p>
          <p><strong>Issue:</strong> Severe stomach pain - Ambulance dispatched</p>
          <p><strong>Status:</strong> Patient reached District Hospital safely</p>
          <p><strong>Time:</strong> 1 hour ago</p>
        </div>
      </div>
    </div>
  );

  const AnalyticsTab = () => (
    <div>
      <h2 style={{ color: '#2c5aa0', marginBottom: '25px' }}>📊 Health Analytics Dashboard</h2>

      <div className="stats-grid">
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #28a745, #1e7e34)' }}>
          <div className="stat-number">78%</div>
          <div className="stat-label">Patients with Normal Vitals</div>
        </div>
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #ffc107, #e0a800)' }}>
          <div className="stat-number">18%</div>
          <div className="stat-label">Medium Risk Patients</div>
        </div>
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #dc3545, #c82333)' }}>
          <div className="stat-number">4%</div>
          <div className="stat-label">High Risk Patients</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginTop: '30px' }}>
        <div style={{ background: '#f8f9fa', padding: '25px', borderRadius: '15px' }}>
          <h3>Common Health Issues (This Month)</h3>
          <div style={{ marginTop: '20px' }}>
            <div style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span>Hypertension</span>
                <span><strong>156 cases</strong></span>
              </div>
              <div style={{ height: '8px', background: '#e9ecef', borderRadius: '4px' }}>
                <div style={{ width: '85%', height: '100%', background: '#dc3545', borderRadius: '4px' }}></div>
              </div>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span>Diabetes</span>
                <span><strong>89 cases</strong></span>
              </div>
              <div style={{ height: '8px', background: '#e9ecef', borderRadius: '4px' }}>
                <div style={{ width: '60%', height: '100%', background: '#ffc107', borderRadius: '4px' }}></div>
              </div>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span>Respiratory Issues</span>
                <span><strong>67 cases</strong></span>
              </div>
              <div style={{ height: '8px', background: '#e9ecef', borderRadius: '4px' }}>
                <div style={{ width: '45%', height: '100%', background: '#17a2b8', borderRadius: '4px' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ background: '#f8f9fa', padding: '25px', borderRadius: '15px' }}>
          <h3>Village-wise Patient Distribution</h3>
          <div style={{ marginTop: '20px' }}>
            <div style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Rampur</span>
                <span><strong>234 patients</strong></span>
              </div>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Dharamkot</span>
                <span><strong>198 patients</strong></span>
              </div>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>McLeod Ganj</span>
                <span><strong>156 patients</strong></span>
              </div>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Bhagsu</span>
                <span><strong>259 patients</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ResourcesTab = () => (
    <div>
      <h2 style={{ color: '#2c5aa0', marginBottom: '25px' }}>📦 Resources & Inventory</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
        <div style={{ background: '#f8f9fa', padding: '25px', borderRadius: '15px' }}>
          <h3>Medicine Inventory</h3>
          <div style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: 'white', borderRadius: '8px', marginBottom: '10px' }}>
              <span>Paracetamol 500mg</span>
              <span className="btn btn-success" style={{ padding: '5px 15px' }}>2,450 tablets</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: 'white', borderRadius: '8px', marginBottom: '10px' }}>
              <span>Amlodipine 5mg</span>
              <span className="btn btn-warning" style={{ padding: '5px 15px' }}>89 tablets</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: 'white', borderRadius: '8px', marginBottom: '10px' }}>
              <span>Metformin 500mg</span>
              <span className="btn btn-danger" style={{ padding: '5px 15px' }}>12 tablets</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: 'white', borderRadius: '8px', marginBottom: '10px' }}>
              <span>ORS Packets</span>
              <span className="btn btn-success" style={{ padding: '5px 15px' }}>156 packets</span>
            </div>
          </div>
        </div>

        <div style={{ background: '#f8f9fa', padding: '25px', borderRadius: '15px' }}>
          <h3>Staff & Equipment</h3>
          <div style={{ marginTop: '20px' }}>
            <div style={{ padding: '15px', background: 'white', borderRadius: '8px', marginBottom: '15px' }}>
              <strong>Staff on Duty</strong><br />
              <small>Dr. Priya Sharma - PHC In-charge</small><br />
              <small>Nurse Rekha Singh - On Duty</small><br />
              <small>ANM Sunita Kumari - Field Visit</small><br />
              <small>Pharmacist Ram Singh - Available</small>
            </div>
            <div style={{ padding: '15px', background: 'white', borderRadius: '8px' }}>
              <strong>Equipment Status</strong><br />
              <small>✅ BP Monitor - Working</small><br />
              <small>✅ Glucometer - Working</small><br />
              <small>⚠️ Pulse Oximeter - Low Battery</small><br />
              <small>❌ ECG Machine - Under Repair</small>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '25px', background: '#f8f9fa', padding: '25px', borderRadius: '15px' }}>
        <h3>Quick Actions</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginTop: '20px' }}>
          <button className="btn">📋 Order Medicines</button>
          <button className="btn">🚑 Request Ambulance</button>
          <button className="btn">📞 Call District Hospital</button>
          <button className="btn">📊 Generate Report</button>
          <button className="btn">👥 Contact Staff</button>
          <button className="btn">🔧 Report Equipment Issue</button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return <OverviewTab />;
      case 'patients': return <PatientsTab />;
      case 'emergencies': return <EmergenciesTab />;
      case 'analytics': return <AnalyticsTab />;
      case 'resources': return <ResourcesTab />;
      default: return <OverviewTab />;
    }
  };

  const PatientModal = () => {
    if (!showModal || !selectedPatient) return null;

    return (
      <div className="modal" style={{ display: 'block' }} onClick={(e) => e.target.className === 'modal' && closeModal()}>
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <div>
            <h2>{selectedPatient.name} - Complete Health Profile</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', margin: '25px 0' }}>
              <div>
                <h3>Personal Information</h3>
                <p><strong>Patient ID:</strong> {selectedPatient.id}</p>
                <p><strong>Age:</strong> {selectedPatient.age} years</p>
                <p><strong>Gender:</strong> {selectedPatient.gender}</p>
                <p><strong>Village:</strong> {selectedPatient.village.charAt(0).toUpperCase() + selectedPatient.village.slice(1)}</p>
                <p><strong>Mobile:</strong> {selectedPatient.mobile}</p>
                <p><strong>Emergency Contact:</strong> {selectedPatient.emergencyContact}</p>
                <p><strong>Last Visit:</strong> {selectedPatient.lastVisit}</p>
              </div>
              <div>
                <h3>Medical History</h3>
                <p><strong>Current Conditions:</strong></p>
                <ul>
                  {selectedPatient.conditions.map((condition, index) => (
                    <li key={index}>{condition}</li>
                  ))}
                </ul>
                <p><strong>Risk Level:</strong> 
                  <span style={{ 
                    color: getRiskColor(selectedPatient.riskLevel), 
                    fontWeight: 'bold',
                    marginLeft: '5px'
                  }}>
                    {selectedPatient.riskLevel.toUpperCase()}
                  </span>
                </p>
              </div>
            </div>
            
            <h3>Latest Vital Signs</h3>
            <div className="vitals-grid">
              <div className="vital-card">
                <div className="vital-value">{selectedPatient.lastVitals.bp}</div>
                <div className="vital-label">Blood Pressure</div>
              </div>
              <div className="vital-card">
                <div className="vital-value">{selectedPatient.lastVitals.sugar}</div>
                <div className="vital-label">Blood Sugar (mg/dL)</div>
              </div>
              <div className="vital-card">
                <div className="vital-value">{selectedPatient.lastVitals.heartRate}</div>
                <div className="vital-label">Heart Rate (BPM)</div>
              </div>
              <div className="vital-card">
                <div className="vital-value">{selectedPatient.lastVitals.temperature}</div>
                <div className="vital-label">Temperature (°F)</div>
              </div>
              <div className="vital-card">
                <div className="vital-value">{selectedPatient.lastVitals.weight}</div>
                <div className="vital-label">Weight (kg)</div>
              </div>
              <div className="vital-card">
                <div className="vital-value">{selectedPatient.lastVitals.oxygen}%</div>
                <div className="vital-label">Oxygen Saturation</div>
              </div>
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '25px' }}>
              <button className="btn btn-success" onClick={() => startConsultation(selectedPatient.id)}>Start Teleconsultation</button>
              <button className="btn" onClick={() => callPatient(selectedPatient.id)} style={{ marginLeft: '15px' }}>Call Patient</button>
              <button className="btn btn-warning" onClick={() => scheduleFollowup(selectedPatient.id)} style={{ marginLeft: '15px' }}>Schedule Follow-up</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="phc-app">
      <div className="container">
        <div className="header">
          <h1>🏥 PHC Hub Dashboard</h1>
          <p>Primary Healthcare Center Management System</p>
          <div style={{ marginTop: '15px', fontWeight: '600' }}>
            <span style={{ color: '#28a745' }}>PHC Rampur</span> | 
            District: Kangra, HP | 
            Login: Dr. Priya Sharma (PHC In-charge)
          </div>
        </div>

        <div className="nav-tabs">
          <button className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => showTab('overview')}>Overview</button>
          <button className={`nav-tab ${activeTab === 'patients' ? 'active' : ''}`} onClick={() => showTab('patients')}>Patients</button>
          <button className={`nav-tab ${activeTab === 'emergencies' ? 'active' : ''}`} onClick={() => showTab('emergencies')}>Emergencies</button>
          <button className={`nav-tab ${activeTab === 'analytics' ? 'active' : ''}`} onClick={() => showTab('analytics')}>Analytics</button>
          <button className={`nav-tab ${activeTab === 'resources' ? 'active' : ''}`} onClick={() => showTab('resources')}>Resources</button>
        </div>

        <div className="main-content">
          <div className="tab-content active">
            {renderTabContent()}
          </div>
        </div>
      </div>

      <PatientModal />
    </div>
  );
};

export default PHCHub;