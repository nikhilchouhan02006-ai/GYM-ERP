import React, { useState, useEffect } from "react";
import "./DashboardTrainer.css";

export default function DashboardTrainer() {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [activeTab, setActiveTab] = useState("dashboard");

  const [clients, setClients] = useState([
    { 
      id: 1, 
      name: "Rahul Sharma", 
      age: "26", 
      weight: "78 kg", 
      goal: "Weight Loss", 
      plan: "Fat Loss & HIIT Conditioning", 
      progress: "75%", 
      status: "Active" 
    },
    { 
      id: 2, 
      name: "Priya Singh", 
      age: "24", 
      weight: "58 kg", 
      goal: "Muscle Gain", 
      plan: "Hypertrophy Split (Upper/Lower)", 
      progress: "60%", 
      status: "Active" 
    },
    { 
      id: 3, 
      name: "Amit Verma", 
      age: "29", 
      weight: "82 kg", 
      goal: "Endurance", 
      plan: "Stamina & Functional Training", 
      progress: "90%", 
      status: "Active" 
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    weight: "",
    goal: "Weight Loss",
    plan: "Fat Loss & HIIT Conditioning",
    status: "Active"
  });

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddClientSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.weight) return;

    const newClientObj = {
      id: clients.length + 1,
      name: formData.name,
      age: formData.age || "N/A",
      weight: formData.weight.includes("kg") ? formData.weight : `${formData.weight} kg`,
      goal: formData.goal,
      plan: formData.plan,
      progress: "10%",
      status: formData.status
    };

    setClients([...clients, newClientObj]);
    setFormData({
      name: "",
      age: "",
      weight: "",
      goal: "Weight Loss",
      plan: "Fat Loss & HIIT Conditioning",
      status: "Active"
    });
    setShowModal(false);
  };

  // Logout Handler Function
  const handleLogout = () => {
    // Aap yahan apna navigation ya login redirect laga sakte hain e.g. window.location.href = "/login";
    alert("Logged out successfully!");
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊", badge: null },
    { id: "clients", label: "My Clients", icon: "👥", badge: clients.length },
    { id: "workouts", label: "Workout Plans", icon: "💪", badge: "3 Active" },
    { id: "schedule", label: "Schedule", icon: "📅", badge: "Today" },
    { id: "settings", label: "Settings", icon: "⚙️", badge: null }
  ];

  return (
    <div className="dashboard-container">
      
      {isMobile && sidebarOpen && (
        <div className="mobile-backdrop" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar Navigation */}
      <aside className={`trainer-sidebar ${sidebarOpen ? "open" : "collapsed"} ${isMobile ? "mobile" : ""}`}>
        <div className="sidebar-brand-header">
          {sidebarOpen && (
            <div className="brand-title-box">
              <div className="brand-logo-icon">G</div>
              <div>
                <h2 className="brand-title">GymFlow</h2>
                <span className="brand-badge">TRAINER ERP</span>
              </div>
            </div>
          )}
          {!isMobile && (
            <button className="sidebar-toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? "◀" : "▶"}
            </button>
          )}
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                className={`nav-item-btn ${isActive ? "active" : ""}`}
                onClick={() => {
                  setActiveTab(item.id);
                  if (isMobile) setSidebarOpen(false);
                }}
              >
                <div className="nav-item-left">
                  <span className="nav-icon">{item.icon}</span>
                  {sidebarOpen && <span className="nav-label">{item.label}</span>}
                </div>
                {sidebarOpen && item.badge && (
                  <span className={`nav-badge ${isActive ? "active-badge" : ""}`}>{item.badge}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer Section with Logout Button */}
        <div className="sidebar-footer-section">
          {sidebarOpen && (
            <div className="sidebar-profile-card">
              <div className="profile-avatar">MT</div>
              <div className="profile-info">
                <div className="profile-name">Alex Morgan</div>
                <div className="profile-role">Master Trainer</div>
              </div>
            </div>
          )}
          <button className="logout-action-btn" onClick={handleLogout} title="Logout">
            <span className="nav-icon">🚪</span>
            {sidebarOpen && <span className="nav-label">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="trainer-main-content">
        
        <header className="top-navbar">
          <div className="top-nav-left">
            {isMobile && (
              <button className="mobile-menu-btn" onClick={() => setSidebarOpen(true)}>
                ☰
              </button>
            )}
            <h1 className="page-header-title">{activeTab}</h1>
          </div>

          <div className="top-nav-right">
            <span className="status-online-tag">
              <span className="online-dot"></span> Online
            </span>
            <button className="primary-action-btn" onClick={() => setShowModal(true)}>
              + Add Client
            </button>
          </div>
        </header>

        <div className="content-body-padding">
          
          {activeTab === "dashboard" && (
            <div className="tab-layout-wrapper">
              <div className="stat-cards-grid">
                <div className="stat-card sky-card">
                  <div className="card-top-row">
                    <span className="card-label">Active Trainees</span>
                    <span className="card-icon">👥</span>
                  </div>
                  <h3 className="card-value">{clients.length}</h3>
                  <span className="card-subtext sky-text">↑ +2 added this week</span>
                </div>

                <div className="stat-card mint-card">
                  <div className="card-top-row">
                    <span className="card-label">Avg Attendance</span>
                    <span className="card-icon">🔥</span>
                  </div>
                  <h3 className="card-value">88.4%</h3>
                  <span className="card-subtext mint-text">↑ High Compliance</span>
                </div>

                <div className="stat-card violet-card">
                  <div className="card-top-row">
                    <span className="card-label">Assigned Plans</span>
                    <span className="card-icon">💪</span>
                  </div>
                  <h3 className="card-value">{clients.length} Enrolled</h3>
                  <span className="card-subtext violet-text">Active training routines</span>
                </div>
              </div>

              <div className="charts-two-column-grid">
                <div className="chart-card-box">
                  <div className="card-header-row">
                    <div>
                      <h3 className="card-title">Weekly Session Frequency</h3>
                      <p className="card-subtitle">Hours dedicated to individual training</p>
                    </div>
                    <span className="pill-tag">This Week</span>
                  </div>

                  <div className="bar-graph-container">
                    {[
                      { day: "Mon", val: "70%", color: "#0284c7" },
                      { day: "Tue", val: "90%", color: "#0284c7" },
                      { day: "Wed", val: "50%", color: "#10b981" },
                      { day: "Thu", val: "100%", color: "#0284c7" },
                      { day: "Fri", val: "80%", color: "#8b5cf6" },
                      { day: "Sat", val: "95%", color: "#0284c7" },
                      { day: "Sun", val: "35%", color: "#f59e0b" },
                    ].map((bar, i) => (
                      <div key={i} className="bar-column">
                        <div className="bar-fill" style={{ height: bar.val, background: `linear-gradient(180deg, ${bar.color} 0%, #cbd5e1 100%)` }}></div>
                        <span className="bar-label">{bar.day}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rose-card-box">
                  <h3 className="card-title rose-title">Goal Distribution</h3>
                  <div className="progress-stack">
                    <div>
                      <div className="progress-info-row rose-text">
                        <span>Fat Loss</span>
                        <span>60%</span>
                      </div>
                      <div className="progress-track rose-bg">
                        <div className="progress-bar rose-bar" style={{ width: "60%" }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="progress-info-row sky-text">
                        <span>Hypertrophy</span>
                        <span>25%</span>
                      </div>
                      <div className="progress-track sky-bg">
                        <div className="progress-bar sky-bar" style={{ width: "25%" }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="progress-info-row mint-text">
                        <span>Stamina</span>
                        <span>15%</span>
                      </div>
                      <div className="progress-track mint-bg">
                        <div className="progress-bar mint-bar" style={{ width: "15%" }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="tip-callout-box">💡 High client demand for Fat Loss & HIIT conditioning.</div>
                </div>
              </div>

              <div className="table-card-container">
                <div className="card-header-row">
                  <h3 className="card-title">Client Progress Directory</h3>
                  <button className="text-link-btn" onClick={() => setActiveTab("clients")}>View All →</button>
                </div>

                <div className="table-responsive-wrapper">
                  <table className="custom-data-table">
                    <thead>
                      <tr>
                        <th>Client Name</th>
                        <th>Weight</th>
                        <th>Goal</th>
                        <th>Selected Plan</th>
                        <th>Progress</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clients.map((c) => (
                        <tr key={c.id}>
                          <td className="font-bold-title">{c.name}</td>
                          <td><span className="weight-badge">{c.weight}</span></td>
                          <td>{c.goal}</td>
                          <td className="plan-text-cell">{c.plan}</td>
                          <td>
                            <div className="table-progress-box">
                              <div className="table-progress-track">
                                <div className="table-progress-fill" style={{ width: c.progress }}></div>
                              </div>
                              <span className="progress-text">{c.progress}</span>
                            </div>
                          </td>
                          <td><span className="status-badge-active">{c.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {activeTab === "clients" && (
            <div className="table-card-container">
              <div className="card-header-row margin-bottom-20">
                <h3 className="card-title">Enrolled Clients Full List</h3>
                <button className="primary-action-btn" onClick={() => setShowModal(true)}>+ Add Client</button>
              </div>

              <div className="table-responsive-wrapper">
                <table className="custom-data-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Age</th>
                      <th>Current Weight</th>
                      <th>Goal</th>
                      <th>Selected Workout Plan</th>
                      <th>Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((c) => (
                      <tr key={c.id}>
                        <td className="font-bold-title">{c.name}</td>
                        <td>{c.age} yrs</td>
                        <td><span className="weight-badge">{c.weight}</span></td>
                        <td>{c.goal}</td>
                        <td className="plan-text-cell">{c.plan}</td>
                        <td className="font-bold-blue">{c.progress}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "workouts" && (
            <div className="workout-cards-grid">
              <div className="workout-card-item sky-border">
                <div className="workout-icon">🏋️‍♂️</div>
                <h3>Hypertrophy Split (Upper/Lower)</h3>
                <p>4-day progressive overload resistance program focused on muscle building.</p>
                <div className="plan-assigned-tag sky-tag">Assigned to: Muscle Gain Clients</div>
              </div>

              <div className="workout-card-item mint-border">
                <div className="workout-icon">🏃‍♂️</div>
                <h3>Fat Loss & HIIT Conditioning</h3>
                <p>High-intensity calorie burning circuit workouts combined with agility exercises.</p>
                <div className="plan-assigned-tag mint-tag">Assigned to: Weight Loss Clients</div>
              </div>

              <div className="workout-card-item violet-border">
                <div className="workout-icon">🧘‍♂️</div>
                <h3>Stamina & Functional Training</h3>
                <p>Full-body functional movements, mobility drills, and core strengthening.</p>
                <div className="plan-assigned-tag violet-tag">Assigned to: Endurance Trainees</div>
              </div>
            </div>
          )}

          {activeTab === "schedule" && (
            <div className="table-card-container">
              <h3 className="card-title margin-bottom-16">Today's Scheduled Sessions</h3>
              <div className="schedule-list">
                <div className="schedule-item-card sky-accent">
                  <div>
                    <h4>09:00 AM - Personal Training Session</h4>
                    <p>Client: Rahul Sharma (Weight: 78 kg | Focus: HIIT)</p>
                  </div>
                  <span className="status-pill sky-pill">Confirmed</span>
                </div>

                <div className="schedule-item-card violet-accent">
                  <div>
                    <h4>11:30 AM - Workout & Diet Plan Check</h4>
                    <p>Client: Priya Singh (Weight: 58 kg | Focus: Muscle Gain)</p>
                  </div>
                  <span className="status-pill violet-pill">Upcoming</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="settings-form-container">
              <h3 className="card-title margin-bottom-20">Trainer Account Settings</h3>
              <div className="form-group-stack">
                <div className="form-input-group">
                  <label>Trainer Full Name</label>
                  <input type="text" defaultValue="Alex Morgan" />
                </div>
                <div className="form-input-group">
                  <label>Primary Specialization</label>
                  <input type="text" defaultValue="Strength & Body Transformation" />
                </div>
                <button className="primary-action-btn width-full">Save Changes</button>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* DETAILED ADD CLIENT FORM MODAL */}
      {showModal && (
        <div className="modal-backdrop-overlay">
          <div className="modal-form-card">
            <div className="modal-header-row">
              <h3>Enroll New Trainee</h3>
              <button className="modal-close-x" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <p className="modal-subtitle">Enter client body stats and select their assigned workout plan.</p>

            <form onSubmit={handleAddClientSubmit} className="modal-input-form">
              <div className="form-row-two-col">
                <div className="form-input-group">
                  <label>Client Full Name *</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    placeholder="E.g., Vikramaditya" 
                    required 
                  />
                </div>

                <div className="form-row-inner-stat">
                  <div className="form-input-group">
                    <label>Age (Yrs)</label>
                    <input 
                      type="number" 
                      name="age" 
                      value={formData.age} 
                      onChange={handleInputChange} 
                      placeholder="E.g., 25" 
                    />
                  </div>

                  <div className="form-input-group">
                    <label>Weight (kg) *</label>
                    <input 
                      type="text" 
                      name="weight" 
                      value={formData.weight} 
                      onChange={handleInputChange} 
                      placeholder="E.g., 72" 
                      required 
                    />
                  </div>
                </div>
              </div>

              <div className="form-row-two-col">
                <div className="form-input-group">
                  <label>Fitness Target Goal</label>
                  <select name="goal" value={formData.goal} onChange={handleInputChange}>
                    <option value="Weight Loss">Weight Loss</option>
                    <option value="Muscle Gain">Muscle Gain / Hypertrophy</option>
                    <option value="Endurance">Stamina & Endurance</option>
                    <option value="Flexibility">Flexibility & Core</option>
                  </select>
                </div>

                <div className="form-input-group">
                  <label>Select Workout Plan *</label>
                  <select name="plan" value={formData.plan} onChange={handleInputChange}>
                    <option value="Fat Loss & HIIT Conditioning">Fat Loss & HIIT Conditioning</option>
                    <option value="Hypertrophy Split (Upper/Lower)">Hypertrophy Split (Upper/Lower)</option>
                    <option value="Stamina & Functional Training">Stamina & Functional Training</option>
                    <option value="Custom Bodyweight Routine">Custom Bodyweight Routine</option>
                  </select>
                </div>
              </div>

              <div className="modal-action-buttons">
                <button type="button" className="secondary-cancel-btn" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="primary-action-btn">
                  Save & Assign Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}