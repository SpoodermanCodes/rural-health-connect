import React, { useState, useEffect } from 'react';
import './doctor_portal.css';

const DoctorPortal = () => {
  const [activeTab, setActiveTab] = useState('consultation');
  const [currentPrescriptionMeds, setCurrentPrescriptionMeds] = useState([]);
  const [currentConsultationId, setCurrentConsultationId] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [chatMessages, setChatMessages] = useState([
    { type: 'patient', text: "Doctor sahib, I'm feeling very dizzy since morning. My head is paining a lot." },
    { type: 'doctor', text: "I can see your blood pressure is quite high at 165/95. Are you taking your medications regularly?" },
    { type: 'patient', text: "Sometimes I forget to take them. Also feeling chest pain." },
    { type: 'doctor', text: "This is concerning. I'm prescribing immediate medication. Please go to PHC Rampur today." }
  ]);
  const [messageInput, setMessageInput] = useState('');
  const [prescriptionForm, setPrescriptionForm] = useState({
    patient: '',
    diagnosis: '',
    clinicalNotes: '',
    medicineName: '',
    medicineQuantity: '',
    dosage: '',
    duration: '',
    instructions: '',
    additionalInstructions: ''
  });
  const [historySearch, setHistorySearch] = useState('');

  const showTab = (tabName) => {
    setActiveTab(tabName);
  };

  const toggleCall = () => {
    if (currentConsultationId) {
      setCurrentConsultationId(null);
      alert('Call ended');
    } else {
      setCurrentConsultationId('active');
      alert('Call started');
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
  };

  const shareScreen = () => {
    alert('Screen sharing started. Patient can now see your screen.');
  };

  const endConsultation = () => {
    if (window.confirm('Are you sure you want to end this consultation?')) {
      alert('Consultation ended. Prescription and notes saved to patient record.');
      setCurrentConsultationId(null);
    }
  };

  const sendMessage = () => {
    const message = messageInput.trim();
    
    if (message) {
      setChatMessages(prev => [...prev, { type: 'doctor', text: message }]);
      setMessageInput('');
      
      // Simulate patient response after 2 seconds
      setTimeout(() => {
        const responses = [
          "Thank you doctor, I understand.",
          "Should I come to PHC today?",
          "I will take the medicine as prescribed.",
          "The pain is reducing now.",
          "I have one more question doctor."
        ];
        const response = responses[Math.floor(Math.random() * responses.length)];
        setChatMessages(prev => [...prev, { type: 'patient', text: response }]);
      }, 2000);
    }
  };

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  const startConsultation = (patientId) => {
    alert(`Starting consultation with Patient ID: ${patientId}\nConnecting to video call...\nNotifying PHC and patient...`);
    setActiveTab('consultation');
  };

  const prioritizePatient = (patientId) => {
    alert(`Patient ID: ${patientId} moved to priority queue.\nNotification sent to PHC staff.\nEstimated wait time: 2 minutes.`);
  };

  const addMedication = () => {
    const { medicineName, medicineQuantity, dosage, duration, instructions } = prescriptionForm;
    
    if (!medicineName || !medicineQuantity || !dosage) {
      alert('Please fill in medicine name, quantity, and dosage');
      return;
    }
    
    const medication = {
      medicine: medicineName,
      quantity: medicineQuantity,
      dosage,
      duration,
      instructions
    };
    
    setCurrentPrescriptionMeds(prev => [...prev, medication]);
    
    // Clear form
    setPrescriptionForm(prev => ({
      ...prev,
      medicineName: '',
      medicineQuantity: '',
      dosage: '',
      duration: '',
      instructions: ''
    }));
  };

  const removeMedication = (index) => {
    setCurrentPrescriptionMeds(prev => prev.filter((_, i) => i !== index));
  };

  const generatePrescription = () => {
    const { patient, diagnosis, clinicalNotes, additionalInstructions } = prescriptionForm;
    
    if (!patient || currentPrescriptionMeds.length === 0) {
      alert('Please select a patient and add at least one medication');
      return;
    }
    
    alert('Digital prescription generated successfully!\n\nPrescription details:\n- Patient notified via SMS\n- PHC copy sent electronically\n- Prescription ID: RX-' + Date.now().toString().slice(-6) + '\n- Valid for 30 days');
    
    // Clear form
    setCurrentPrescriptionMeds([]);
    setPrescriptionForm(prev => ({
      ...prev,
      diagnosis: '',
      clinicalNotes: '',
      additionalInstructions: ''
    }));
  };

  const saveDraft = () => {
    alert('Prescription saved as draft.\nYou can complete it later from the drafts section.');
  };

  const blockTimeSlot = () => {
    alert('Time slot blocked for personal break.\nSlot: 12:00 - 12:30 PM\nReason: Lunch break');
  };

  const loadHistory = (patientId) => {
    // This would typically fetch data from an API
    alert(`Loading history for Patient ID: ${patientId}`);
  };

  const downloadHistory = (patientId) => {
    alert(`Medical history for Patient ID: ${patientId} downloaded as PDF.\nFile saved to Downloads folder.\nFilename: Patient_${patientId}_History_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const updatePrescriptionForm = (field, value) => {
    setPrescriptionForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="container">
      <div className="header">
        <div className="doctor-info">
          <div className="doctor-avatar">DS</div>
          <div>
            <h1>Dr. Rajesh Sharma</h1>
            <p style={{color: '#6c757d', margin: '5px 0'}}>MBBS, MD (Internal Medicine)</p>
            <p style={{color: '#6c757d'}}>Reg. No: MH-45678 | IGMC Shimla</p>
          </div>
        </div>
        <div style={{textAlign: 'right'}}>
          <div style={{color: '#28a745', fontWeight: 'bold', fontSize: '1.1rem'}}>Online</div>
          <div style={{color: '#6c757d'}}>Available for Consultations</div>
          <div style={{color: '#6c757d', fontSize: '0.9rem'}}>Connected PHCs: 12 | Active Cases: 8</div>
        </div>
      </div>

      <div className="nav-tabs">
        <button 
          className={`nav-tab ${activeTab === 'consultation' ? 'active' : ''}`}
          onClick={() => showTab('consultation')}
        >
          Active Consultation
        </button>
        <button 
          className={`nav-tab ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => showTab('history')}
        >
          Medical History
        </button>
      </div>

      <div className="main-content">
        {/* Active Consultation Tab */}
        {activeTab === 'consultation' && (
          <div className="tab-content active">
            <div className="consultation-grid">
              <div className="video-section">
                <div className="video-container">
                  <div className="video-main">
                    <div style={{textAlign: 'center'}}>
                      <div style={{fontSize: '4rem', marginBottom: '10px'}}>👤</div>
                      <div>Patient: Ravi Kumar</div>
                      <div style={{fontSize: '0.9rem', opacity: '0.8'}}>Village Rampur, Kangra</div>
                    </div>
                  </div>
                  <div className="video-small">
                    <div style={{textAlign: 'center'}}>
                      <div style={{fontSize: '2rem', marginBottom: '5px'}}>👨‍⚕️</div>
                      <div>Dr. Sharma</div>
                    </div>
                  </div>
                </div>
                
                <div className="video-controls">
                  <button 
                    className={`control-btn call ${currentConsultationId ? 'active' : ''}`}
                    onClick={toggleCall}
                    title="Start/End Call"
                  >
                    📞
                  </button>
                  <button 
                    className={`control-btn mute ${isMuted ? 'muted' : ''}`}
                    onClick={toggleMute}
                    title="Mute/Unmute"
                  >
                    {isMuted ? '🔇' : '🎤'}
                  </button>
                  <button 
                    className={`control-btn mute ${!isVideoOn ? 'off' : ''}`}
                    onClick={toggleVideo}
                    title="Camera On/Off"
                  >
                    📹
                  </button>
                  <button 
                    className="control-btn mute"
                    onClick={shareScreen}
                    title="Share Screen"
                  >
                    🖥️
                  </button>
                  <button 
                    className="control-btn end"
                    onClick={endConsultation}
                    title="End Consultation"
                  >
                    ❌
                  </button>
                </div>
              </div>

              <div className="patient-panel">
                <div className="patient-info">
                  <div className="patient-avatar">RK</div>
                  <h3>Ravi Kumar</h3>
                  <p>Age: 45 | Male | ID: 9012</p>
                  <p style={{color: '#dc3545', fontWeight: 'bold', marginTop: '10px'}}>HIGH RISK PATIENT</p>
                </div>

                <div>
                  <h4>Current Vitals</h4>
                  <div className="vitals-display">
                    <div className="vital-item">
                      <div className="vital-value">165/95</div>
                      <div className="vital-label">Blood Pressure</div>
                    </div>
                    <div className="vital-item">
                      <div className="vital-value">245</div>
                      <div className="vital-label">Blood Sugar</div>
                    </div>
                    <div className="vital-item">
                      <div className="vital-value">98</div>
                      <div className="vital-label">Heart Rate</div>
                    </div>
                    <div className="vital-item">
                      <div className="vital-value">95%</div>
                      <div className="vital-label">Oxygen Sat</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4>Symptoms Reported</h4>
                  <div style={{background: 'white', padding: '15px', borderRadius: '10px'}}>
                    <p>• Severe headache (Duration: 2 days)</p>
                    <p>• Dizziness and blurred vision</p>
                    <p>• Chest discomfort</p>
                    <p>• Fatigue and weakness</p>
                  </div>
                </div>

                <div className="chat-section">
                  <div className="chat-header">Patient Communication</div>
                  <div className="chat-messages">
                    {chatMessages.map((msg, index) => (
                      <div key={index} className={`message ${msg.type}`}>
                        {msg.text}
                      </div>
                    ))}
                  </div>
                  <div className="chat-input">
                    <input
                      type="text"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      placeholder="Type your message..."
                      onKeyPress={handleEnter}
                    />
                    <button className="btn" onClick={sendMessage}>Send</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Medical History Tab */}
        {activeTab === 'history' && (
          <div className="tab-content active">
            <h2 style={{marginBottom: '30px'}}>Patient Medical History</h2>
            
            <div style={{display: 'grid', gridTemplateColumns: '300px 1fr', gap: '30px'}}>
              <div>
                <h3>Patient Search</h3>
                <div className="form-group">
                  <input
                    type="text"
                    value={historySearch}
                    onChange={(e) => setHistorySearch(e.target.value)}
                    placeholder="Search by name or ID..."
                  />
                </div>
                
                <div className="history-patient-list">
                  <div className="patient-history-item" onClick={() => loadHistory('9012')}>
                    <strong>Ravi Kumar</strong><br />
                    <small>ID: 9012 | Age: 45</small>
                  </div>
                  <div className="patient-history-item" onClick={() => loadHistory('7834')}>
                    <strong>Sunita Devi</strong><br />
                    <small>ID: 7834 | Age: 52</small>
                  </div>
                  <div className="patient-history-item" onClick={() => loadHistory('5621')}>
                    <strong>Mohan Singh</strong><br />
                    <small>ID: 5621 | Age: 38</small>
                  </div>
                  <div className="patient-history-item" onClick={() => loadHistory('3456')}>
                    <strong>Kamla Devi</strong><br />
                    <small>ID: 3456 | Age: 67</small>
                  </div>
                </div>
              </div>
              
              <div className="history-details">
                <div style={{textAlign: 'center', color: '#6c757d', padding: '60px'}}>
                  Select a patient from the left to view their complete medical history
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorPortal;