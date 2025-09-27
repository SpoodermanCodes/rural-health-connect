import React, { useState, useEffect } from 'react';
import './rural_health_connect.css';

const RuralHealthConnect = () => {
  const [activeTab, setActiveTab] = useState('welcome');
  const [currentPatient, setCurrentPatient] = useState(null);
  const [healthData, setHealthData] = useState(null);
  const [consultationActive, setConsultationActive] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'Dr. Sharma',
      message: 'Hello! I\'ve reviewed your health data. How are you feeling today?',
      type: 'doctor'
    }
  ]);
  const [chatInput, setChatInput] = useState('');

  const showTab = (tabName) => {
    setActiveTab(tabName);
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const patientData = {
      aadhaar: formData.get('aadhaar'),
      mobile: formData.get('mobile'),
      fullName: formData.get('fullName'),
      age: formData.get('age'),
      gender: formData.get('gender'),
      bloodGroup: formData.get('bloodGroup'),
      address: formData.get('address'),
      medicalHistory: formData.get('medicalHistory'),
      registrationDate: new Date().toISOString()
    };

    if (patientData.aadhaar.length < 12) {
      alert('Please enter a valid Aadhaar number');
      return;
    }

    setCurrentPatient(patientData);
    alert(`Registration Successful! Welcome ${patientData.fullName}! Your patient ID: ${patientData.aadhaar.substr(-4)}`);
    e.target.reset();
  };

  const handleHealthData = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const healthInfo = {
      patientId: currentPatient.aadhaar,
      timestamp: new Date().toISOString(),
      vitals: {
        bpSystolic: formData.get('bpSystolic'),
        bpDiastolic: formData.get('bpDiastolic'),
        bloodSugar: formData.get('bloodSugar'),
        heartRate: formData.get('heartRate'),
        temperature: formData.get('temperature'),
        weight: formData.get('weight'),
        oxygenSat: formData.get('oxygenSat')
      },
      symptoms: formData.get('symptoms')
    };

    setHealthData(healthInfo);
    performAIAnalysis(healthInfo);
  };

  const performAIAnalysis = (data) => {
    const risks = [];
    let riskLevel = 'low';

    const systolic = parseInt(data.vitals.bpSystolic);
    const diastolic = parseInt(data.vitals.bpDiastolic);

    if (systolic > 140 || diastolic > 90) {
      risks.push({
        type: 'Hypertension Risk',
        level: 'high',
        message: `Blood pressure ${systolic}/${diastolic} indicates hypertension risk. Immediate medical attention recommended.`
      });
      riskLevel = 'high';
    } else if (systolic > 120 || diastolic > 80) {
      risks.push({
        type: 'Pre-hypertension',
        level: 'medium',
        message: `Blood pressure ${systolic}/${diastolic} is elevated. Monitor regularly and consider lifestyle changes.`
      });
      if (riskLevel === 'low') riskLevel = 'medium';
    }

    const bloodSugar = parseInt(data.vitals.bloodSugar);
    if (bloodSugar > 200) {
      risks.push({
        type: 'Diabetes Risk',
        level: 'high',
        message: `Blood sugar ${bloodSugar} mg/dL is critically high. Immediate consultation required.`
      });
      riskLevel = 'high';
    } else if (bloodSugar > 140) {
      risks.push({
        type: 'Pre-diabetes',
        level: 'medium',
        message: `Blood sugar ${bloodSugar} mg/dL indicates pre-diabetes. Dietary changes recommended.`
      });
      if (riskLevel === 'low') riskLevel = 'medium';
    }

    const heartRate = parseInt(data.vitals.heartRate);
    if (heartRate > 100 || heartRate < 60) {
      risks.push({
        type: 'Heart Rate Abnormality',
        level: 'medium',
        message: `Heart rate ${heartRate} BPM is outside normal range. Consider cardiac evaluation.`
      });
      if (riskLevel === 'low') riskLevel = 'medium';
    }

    const oxygenSat = parseInt(data.vitals.oxygenSat);
    if (oxygenSat < 95) {
      risks.push({
        type: 'Low Oxygen Saturation',
        level: 'high',
        message: `Oxygen saturation ${oxygenSat}% is critically low. Emergency care needed.`
      });
      riskLevel = 'high';
    }

    if (risks.length === 0) {
      risks.push({
        type: 'Normal Parameters',
        level: 'low',
        message: 'All vital signs are within normal ranges. Continue maintaining healthy lifestyle.'
      });
    }

    return { overallRisk: riskLevel, risks: risks };
  };

  const startConsultation = () => {
    setConsultationActive(true);
    setChatMessages([...chatMessages, 
      { type: 'system', message: 'Connecting to Dr. Sharma...', sender: 'System' },
      { type: 'system', message: 'Connected to Dr. Priya Sharma', sender: 'System' },
      { 
        type: 'doctor', 
        message: `Hello ${currentPatient.fullName}! I've reviewed your health data. I can see you have some ${healthData ? (healthData.vitals.bpSystolic > 140 ? 'elevated blood pressure' : 'health concerns') : 'symptoms'}. Can you tell me more about how you're feeling?`,
        sender: 'Dr. Sharma'
      }
    ]);
  };

  const endConsultation = () => {
    setConsultationActive(false);
    setChatMessages([...chatMessages, { type: 'system', message: 'Consultation Ended', sender: 'System' }]);
  };

  const sendMessage = () => {
    if (chatInput.trim() && consultationActive) {
      const newMessages = [...chatMessages, { type: 'patient', message: chatInput, sender: 'You' }];
      
      const doctorResponses = [
        "Thank you for sharing that information. Based on your symptoms, I recommend...",
        "I understand your concern. Let me check your vitals again...",
        "That's very helpful. I'm prescribing some medication for you.",
        "Please continue taking your current medications and monitor your blood pressure daily.",
        "I'll schedule a follow-up appointment for next week. Take care!"
      ];
      
      const randomResponse = doctorResponses[Math.floor(Math.random() * doctorResponses.length)];
      
      setTimeout(() => {
        setChatMessages([...newMessages, { type: 'doctor', message: randomResponse, sender: 'Dr. Sharma' }]);
      }, 1500);
      
      setChatMessages(newMessages);
      setChatInput('');
    }
  };

  const generatePrescription = () => {
    return {
      patient: currentPatient.fullName,
      age: currentPatient.age,
      gender: currentPatient.gender,
      patientId: currentPatient.aadhaar.substr(-4),
      doctor: 'Dr. Priya Sharma',
      regNo: 'MH-12345',
      date: new Date().toLocaleDateString(),
      diagnosis: healthData ? [
        parseInt(healthData.vitals.bpSystolic) > 140 ? 'Hypertension (Stage 1)' : null,
        parseInt(healthData.vitals.bloodSugar) > 140 ? 'Hyperglycemia / Pre-diabetes' : null,
        healthData.symptoms ? `Symptomatic treatment for: ${healthData.symptoms}` : null
      ].filter(Boolean) : [],
      medications: [
        'Amlodipine 5mg - Once daily after breakfast',
        'Metformin 500mg - Twice daily before meals',
        'Paracetamol 650mg - As needed for fever/pain'
      ],
      instructions: [
        'Monitor blood pressure daily',
        'Check blood sugar weekly',
        'Light exercise 30 minutes daily',
        'Follow low-salt, diabetic diet',
        'Return for follow-up in 2 weeks'
      ]
    };
  };

  const loadDemoData = () => {
    setCurrentPatient({
      aadhaar: '1234-5678-9012',
      mobile: '+91-98765-43210',
      fullName: 'Ravi Kumar',
      age: '45',
      gender: 'male',
      bloodGroup: 'B+',
      address: 'Village Rampur, Tehsil Dharamshala, District Kangra, Himachal Pradesh',
      medicalHistory: 'Mild hypertension, family history of diabetes',
      registrationDate: new Date().toISOString()
    });

    setHealthData({
      patientId: '1234-5678-9012',
      timestamp: new Date().toISOString(),
      vitals: {
        bpSystolic: '145',
        bpDiastolic: '92',
        bloodSugar: '160',
        heartRate: '78',
        temperature: '98.6',
        weight: '72',
        oxygenSat: '97'
      },
      symptoms: 'Mild headache, occasional dizziness, feeling tired'
    });

    alert('Demo data loaded! You can now explore all features.');
  };

  const formatAadhaar = (value) => {
    const cleaned = value.replace(/\D/g, '');
    return cleaned.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3');
  };

  const WelcomeTab = () => (
    <div className="welcome-section">
      <h2>Welcome to Rural Health Connect</h2>
      <p style={{ fontSize: '1.1rem', color: '#6c757d', marginBottom: '30px' }}>
        Bridging the healthcare gap in rural India through AI-powered telemedicine and continuous health monitoring.
      </p>
      
      <div className="feature-grid">
        <div className="feature-card">
          <div className="feature-icon">🔒</div>
          <h3>Aadhaar Integrated</h3>
          <p>Secure patient identification and unified health records across all healthcare providers.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🤖</div>
          <h3>AI Risk Detection</h3>
          <p>Advanced algorithms detect early warning signs and predict health risks before they become critical.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">👨‍⚕️</div>
          <h3>Expert Consultation</h3>
          <p>Connect with qualified doctors from central hospitals via video consultation from your local PHC.</p>
        </div>
      </div>
      
      <button className="btn btn-secondary" style={{ marginTop: '20px' }} onClick={loadDemoData}>
        Load Demo Data
      </button>
    </div>
  );

  const RegisterTab = () => (
    <div>
      <h2 style={{ textAlign: 'center', color: '#007bff', marginBottom: '30px' }}>Patient Registration</h2>
      
      <form onSubmit={handleRegistration}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="form-group">
            <label>Aadhaar Number</label>
            <input 
              type="text" 
              name="aadhaar" 
              placeholder="XXXX-XXXX-XXXX" 
              maxLength="14" 
              required
              onChange={(e) => e.target.value = formatAadhaar(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Mobile Number</label>
            <input type="tel" name="mobile" placeholder="+91-XXXXX-XXXXX" required />
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="fullName" placeholder="Enter full name" required />
          </div>
          <div className="form-group">
            <label>Age</label>
            <input type="number" name="age" placeholder="Age" min="1" max="120" required />
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="form-group">
            <label>Gender</label>
            <select name="gender" required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Blood Group</label>
            <select name="bloodGroup">
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
        </div>
        
        <div className="form-group">
          <label>Address</label>
          <textarea name="address" placeholder="Complete address" rows="3"></textarea>
        </div>
        
        <div className="form-group">
          <label>Medical History (if any)</label>
          <textarea name="medicalHistory" placeholder="Previous illnesses, surgeries, allergies, etc." rows="3"></textarea>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <button type="submit" className="btn">Register Patient</button>
        </div>
      </form>
    </div>
  );

  const HealthTab = () => {
    if (!currentPatient) {
      return (
        <div className="alert alert-warning">
          <strong>Please register first!</strong> You need to register as a patient before entering health data.
        </div>
      );
    }

    return (
      <div>
        <h2 style={{ textAlign: 'center', color: '#007bff', marginBottom: '30px' }}>Health Data Entry</h2>
        
        <div className="patient-profile">
          <h3>Patient Profile</h3>
          <p>
            <strong>{currentPatient.fullName}</strong> |
            Age: {currentPatient.age} |
            Gender: {currentPatient.gender} |
            Blood Group: {currentPatient.bloodGroup || 'Not specified'}
          </p>
        </div>
        
        <form onSubmit={handleHealthData}>
          <div className="health-metrics">
            <div className="form-group">
              <label>Blood Pressure (Systolic/Diastolic)</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input type="number" name="bpSystolic" placeholder="120" min="60" max="250" />
                <span style={{ alignSelf: 'center' }}>/</span>
                <input type="number" name="bpDiastolic" placeholder="80" min="40" max="150" />
              </div>
            </div>
            
            <div className="form-group">
              <label>Blood Sugar (mg/dL)</label>
              <input type="number" name="bloodSugar" placeholder="100" min="50" max="500" />
            </div>
            
            <div className="form-group">
              <label>Heart Rate (BPM)</label>
              <input type="number" name="heartRate" placeholder="72" min="30" max="200" />
            </div>
            
            <div className="form-group">
              <label>Temperature (°F)</label>
              <input type="number" name="temperature" placeholder="98.6" min="90" max="110" step="0.1" />
            </div>
            
            <div className="form-group">
              <label>Weight (kg)</label>
              <input type="number" name="weight" placeholder="70" min="20" max="200" />
            </div>
            
            <div className="form-group">
              <label>Oxygen Saturation (%)</label>
              <input type="number" name="oxygenSat" placeholder="98" min="70" max="100" />
            </div>
          </div>
          
          <div className="form-group">
            <label>Current Symptoms</label>
            <textarea name="symptoms" placeholder="Describe any current symptoms..." rows="3"></textarea>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <button type="submit" className="btn">Analyze Health Data</button>
          </div>
        </form>
        
        {healthData && (
          <div style={{ marginTop: '30px' }}>
            <AIAnalysisDisplay healthData={healthData} />
          </div>
        )}
      </div>
    );
  };

  const AIAnalysisDisplay = ({ healthData }) => {
    const analysis = performAIAnalysis(healthData);
    let alertClass = 'alert-success';
    let alertIcon = '✅';

    if (analysis.overallRisk === 'high') {
      alertClass = 'alert-danger';
      alertIcon = '🚨';
    } else if (analysis.overallRisk === 'medium') {
      alertClass = 'alert-warning';
      alertIcon = '⚠️';
    }

    return (
      <div>
        <div className={`alert ${alertClass}`}>
          <h3>{alertIcon} AI Health Analysis - {analysis.overallRisk.toUpperCase()} RISK</h3>
        </div>
        
        <div style={{ marginBottom: '25px' }}>
          <h4 style={{ color: '#007bff', marginBottom: '15px' }}>Risk Assessment:</h4>
          {analysis.risks.map((risk, index) => (
            <div key={index} style={{
              marginBottom: '15px',
              padding: '15px',
              background: 'white',
              borderRadius: '8px',
              borderLeft: `4px solid ${risk.level === 'high' ? '#dc3545' : risk.level === 'medium' ? '#ffc107' : '#28a745'}`
            }}>
              <strong>{risk.type}:</strong> {risk.message}
            </div>
          ))}
        </div>

        {analysis.overallRisk !== 'low' && (
          <div style={{ textAlign: 'center', marginTop: '25px' }}>
            <button className="btn btn-success" onClick={() => showTab('consultation')}>
              Book Teleconsultation Now
            </button>
          </div>
        )}
      </div>
    );
  };

  const ConsultationTab = () => {
    if (!healthData) {
      return (
        <div className="alert alert-warning">
          <strong>Please complete health data entry first!</strong> Health analysis is required before consultation.
        </div>
      );
    }

    const prescription = generatePrescription();

    return (
      <div>
        <h2 style={{ textAlign: 'center', color: '#007bff', marginBottom: '30px' }}>Teleconsultation</h2>
        
        <div className="video-container">
          <div className="video-placeholder">
            <div style={{ textAlign: 'center' }}>
              <div>📹</div>
              <div>Patient Video</div>
            </div>
          </div>
          <div className="video-placeholder">
            <div style={{ textAlign: 'center' }}>
              <div>👨‍⚕️</div>
              <div>Doctor Video</div>
            </div>
          </div>
        </div>
        
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <button className="btn btn-success" onClick={startConsultation}>Start Video Call</button>
          <button className="btn btn-danger" onClick={endConsultation} style={{ marginLeft: '10px' }}>End Call</button>
        </div>
        
        <div className="chat-container">
          <div className="chat-messages">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.type}`}>
                <strong>{msg.sender}:</strong> {msg.message}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input 
              type="text" 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type your message..."
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button className="btn" onClick={sendMessage}>Send</button>
          </div>
        </div>
        
        <div style={{ marginTop: '20px', padding: '20px', background: '#f8f9fa', borderRadius: '12px' }}>
          <h4>Prescription & Recommendations</h4>
          <div className="prescription-section">
            <p><strong>Doctor:</strong> {prescription.doctor}</p>
            <p><strong>Consultation Date:</strong> {prescription.date}</p>
            
            <div style={{ border: '2px solid #007bff', padding: '20px', borderRadius: '12px', background: 'white', marginTop: '15px' }}>
              <h4 style={{ color: '#007bff', textAlign: 'center', marginBottom: '20px' }}>📋 DIGITAL PRESCRIPTION</h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <strong>Patient:</strong> {prescription.patient}<br />
                  <strong>Age/Gender:</strong> {prescription.age}/{prescription.gender}<br />
                  <strong>Patient ID:</strong> {prescription.patientId}
                </div>
                <div>
                  <strong>Doctor:</strong> {prescription.doctor}<br />
                  <strong>Reg. No:</strong> {prescription.regNo}<br />
                  <strong>Date:</strong> {prescription.date}
                </div>
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <strong>Diagnosis:</strong><br />
                {prescription.diagnosis.map((diag, index) => (
                  <div key={index}>• {diag}</div>
                ))}
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <strong>Medications:</strong><br />
                {prescription.medications.map((med, index) => (
                  <div key={index}>{index + 1}. {med}</div>
                ))}
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <strong>Instructions:</strong><br />
                {prescription.instructions.map((inst, index) => (
                  <div key={index}>• {inst}</div>
                ))}
              </div>
              
              <div style={{ textAlign: 'center', marginTop: '20px', paddingTop: '15px', borderTop: '1px solid #dee2e6' }}>
                <strong>Digital Signature: {prescription.doctor}</strong><br />
                <small>This prescription is digitally signed and valid for 30 days</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DashboardTab = () => {
    if (!currentPatient) {
      return (
        <div className="alert alert-warning">
          <strong>Please register first!</strong> Complete registration to view your health dashboard.
        </div>
      );
    }

    return (
      <div>
        <h2 style={{ textAlign: 'center', color: '#007bff', marginBottom: '30px' }}>Health Dashboard</h2>
        
        <div className="patient-profile">
          <h3>Patient Summary</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{currentPatient.fullName}</div>
              <div>Age: {currentPatient.age} | {currentPatient.gender}</div>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{currentPatient.bloodGroup || 'Not Set'}</div>
              <div>Blood Group</div>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>ID: {currentPatient.aadhaar.substr(-4)}</div>
              <div>Patient ID</div>
            </div>
          </div>
        </div>
        
        {healthData ? (
          <div>
            <div className="health-metrics">
              <div className="metric-card">
                <div className="metric-value">{healthData.vitals.bpSystolic}/{healthData.vitals.bpDiastolic}</div>
                <div className="metric-label">Blood Pressure</div>
              </div>
              <div className="metric-card">
                <div className="metric-value">{healthData.vitals.bloodSugar}</div>
                <div className="metric-label">Blood Sugar (mg/dL)</div>
              </div>
              <div className="metric-card">
                <div className="metric-value">{healthData.vitals.heartRate}</div>
                <div className="metric-label">Heart Rate (BPM)</div>
              </div>
              <div className="metric-card">
                <div className="metric-value">{healthData.vitals.temperature}°F</div>
                <div className="metric-label">Temperature</div>
              </div>
              <div className="metric-card">
                <div className="metric-value">{healthData.vitals.oxygenSat}%</div>
                <div className="metric-label">Oxygen Saturation</div>
              </div>
              <div className="metric-card">
                <div className="metric-value">{healthData.vitals.weight} kg</div>
                <div className="metric-label">Weight</div>
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginTop: '25px' }}>
              <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '12px' }}>
                <h4 style={{ color: '#007bff', marginBottom: '15px' }}>Recent Consultations</h4>
                <div style={{ padding: '10px', background: 'white', borderRadius: '8px', marginBottom: '10px' }}>
                  <strong>Dr. Priya Sharma</strong> - {new Date().toLocaleDateString()}<br />
                  <small>General Consultation - Hypertension & Diabetes Management</small>
                </div>
              </div>
              
              <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '12px' }}>
                <h4 style={{ color: '#007bff', marginBottom: '15px' }}>AI Risk Alerts</h4>
                {performAIAnalysis(healthData).risks.map((risk, index) => {
                  const color = risk.level === 'high' ? '#dc3545' : risk.level === 'medium' ? '#ffc107' : '#28a745';
                  return (
                    <div key={index} style={{ padding: '10px', background: 'white', borderLeft: `4px solid ${color}`, borderRadius: '8px', marginBottom: '10px' }}>
                      <strong>{risk.type}</strong><br />
                      <small>{risk.message}</small>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="health-metrics">
            <div className="metric-card" style={{ gridColumn: '1/-1', textAlign: 'center', color: '#6c757d' }}>
              <div>No health data available</div>
              <div><button className="btn" onClick={() => showTab('health')} style={{ marginTop: '10px' }}>Enter Health Data</button></div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'welcome': return <WelcomeTab />;
      case 'register': return <RegisterTab />;
      case 'health': return <HealthTab />;
      case 'consultation': return <ConsultationTab />;
      case 'dashboard': return <DashboardTab />;
      default: return <WelcomeTab />;
    }
  };

  return (
    <div className="app-container">
      <div className="container">
        <div className="header">
          <h1>🏥 Rural Health Connect</h1>
          <p>AI-Powered Healthcare for Rural India | Connecting Lives, Saving Futures</p>
        </div>

        <div className="main-container">
          <div className="nav-tabs">
            <button 
              className={`nav-tab ${activeTab === 'welcome' ? 'active' : ''}`} 
              onClick={() => showTab('welcome')}
            >
              Home
            </button>
            <button 
              className={`nav-tab ${activeTab === 'register' ? 'active' : ''}`} 
              onClick={() => showTab('register')}
            >
              Register
            </button>
            <button 
              className={`nav-tab ${activeTab === 'health' ? 'active' : ''}`} 
              onClick={() => showTab('health')}
            >
              Health Data
            </button>
            <button 
              className={`nav-tab ${activeTab === 'consultation' ? 'active' : ''}`} 
              onClick={() => showTab('consultation')}
            >
              Teleconsultation
            </button>
            <button 
              className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`} 
              onClick={() => showTab('dashboard')}
            >
              Dashboard
            </button>
          </div>

          <div className="tab-content active">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RuralHealthConnect;