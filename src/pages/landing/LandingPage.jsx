
import React, { useState, useEffect } from "react";
import "./LandingPage.css";

function LandingPage() {
  
useEffect(() => {
  const elements = document.querySelectorAll(
    ".section-heading, .feature-card, .benefits-section > div, .cta-section, .trust-strip, .landing-footer"
  );

  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => {
      element.classList.add("is-visible");
    });

    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        } else {
          // Remove the class so the animation can replay on re-entry.
          entry.target.classList.remove("is-visible");
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -30px 0px",
    }
  );

  elements.forEach((element) => observer.observe(element));

  return () => observer.disconnect();
}, []);

  const [darkMode, setDarkMode] = useState(false);

  const features = [
    {
      icon: "👥",
      title: "Member Management",
      description:
        "Manage member profiles, registrations, memberships and renewals in one place.",
    },
    {
      icon: "🏋️",
      title: "Trainer Management",
      description:
        "Organize trainers, assign members and manage workout plans and schedules.",
    },
    {
      icon: "📅",
      title: "Attendance Tracking",
      description:
        "Track daily gym check-ins and monitor member attendance.",
    },
    {
      icon: "💳",
      title: "Payments & Billing",
      description:
        "Record cash, UPI and online payments, including partial payments and balances.",
    },
    {
      icon: "📊",
      title: "Reports & Analytics",
      description:
        "Understand membership growth, revenue and your gym's performance.",
    },
    {
      icon: "🏢",
      title: "Multi-Gym Platform",
      description:
        "Give each gym its own workspace, users and business data.",
    },
  ];

  return (
    <div className={`landing ${darkMode ? "dark" : "light"}`}>
      <header className="landing-navbar">
        <a className="brand" href="/">
          <span className="brand-icon">✦</span>
          GymFlow<span className="brand-highlight">ERP</span>
        </a>

        <nav className="nav-links">
          <a href="#features">Features</a>
          <a href="#benefits">Benefits</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="nav-actions">
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            title={darkMode ? "Light mode" : "Dark mode"}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
          <a className="login-link" href="/login">
            Log in
          </a>
          <a className="button button-small" href="/register">
            Get Started
          </a>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <div className="eyebrow">
              <span className="status-dot" />
              THE SMARTER WAY TO RUN YOUR GYM
            </div>

            <h1>
              Your gym.
              <br />
              <span>One powerful platform.</span>
            </h1>

            <p className="hero-description">
              Manage members, trainers, attendance, memberships and payments
              with one connected Gym ERP platform. Spend less time on
              administration and more time growing your business.
            </p>

            <div className="hero-actions">
              <a className="button" href="/register">
                Get Started <span>↗</span>
              </a>
              <a className="button button-outline" href="#features">
                Explore Features
              </a>
            </div>

            <div className="hero-note">
              <span>✓</span> Built for gym owners, trainers and members
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-glow" />
            <div className="dashboard-preview">
              <div className="preview-top">
                <div>
                  <span className="preview-label">GYM OVERVIEW</span>
                  <h3>Business snapshot</h3>
                </div>
                <span className="preview-badge">● Overview</span>
              </div>

              <div className="preview-stats">
                <div className="preview-stat">
                  <span>Active Members</span>
                  <strong>1,248</strong>
                  <small>Member overview</small>
                </div>
                <div className="preview-stat">
                  <span>Today's Check-ins</span>
                  <strong>186</strong>
                  <small>Daily attendance</small>
                </div>
              </div>

              <div className="chart-card">
                <div className="chart-heading">
                  <span>Gym activity</span>
                  <span>Weekly overview</span>
                </div>
                <div className="chart-bars">
                  {[38, 58, 43, 76, 53, 88, 68].map((height, index) => (
                    <div className="chart-column" key={index}>
                      <div style={{ height: `${height}%` }} />
                    </div>
                  ))}
                </div>
                <div className="chart-days">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </div>

              <div className="preview-footer">
                <span className="footer-check">✓</span>
                <div>
                  <strong>Your gym, organized.</strong>
                  <p>Everything connected in one place.</p>
                </div>
              </div>
            </div>
            <div className="floating-tag">✦ Smart gym management</div>
          </div>
        </section>

        <section className="trust-strip">
          <span>ONE PLATFORM FOR YOUR ENTIRE GYM</span>
          <div>Members</div>
          <div>Trainers</div>
          <div>Payments</div>
          <div>Attendance</div>
          <div>Analytics</div>
        </section>

        <section className="features-section" id="features">
          <div className="section-heading">
            <span className="section-kicker">EVERYTHING CONNECTED</span>
            <h2>
              Run your gym <span>smarter.</span>
            </h2>
            <p>
              The essential tools for daily gym operations, brought together
              in one simple workspace.
            </p>
          </div>

          <div className="feature-grid">
            {features.map((feature) => (
              <article className="feature-card" key={feature.title}>
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <a href="/register" aria-label={`Explore ${feature.title}`}>
                  Explore feature <span>→</span>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="benefits-section" id="benefits">
          <div>
            <span className="section-kicker">MADE FOR GYM BUSINESSES</span>
            <h2>
              Less paperwork.
              <br />
              <span>More progress.</span>
            </h2>
            <p>
              Keep daily operations organized, see important business
              information at a glance and give every user the right workspace.
            </p>
          </div>
          <div className="benefit-list">
            <div><span>✓</span> Centralized member and staff records</div>
            <div><span>✓</span> Membership and payment tracking</div>
            <div><span>✓</span> Role-based dashboards</div>
            <div><span>✓</span> Gym-level data separation</div>
          </div>
        </section>

        <section className="cta-section" id="contact">
          <span className="section-kicker">READY TO GET ORGANIZED?</span>
          <h2>Build a stronger business.</h2>
          <p>Bring your gym operations together with GymFlow ERP.</p>
          <a className="button cta-button" href="/register">
            Get Started Today <span>↗</span>
          </a>
        </section>
      </main>

      <footer className="landing-footer">
        <a className="brand" href="/">
          <span className="brand-icon">✦</span>
          GymFlow<span className="brand-highlight">ERP</span>
        </a>
        <p>Smarter gym management, all in one place.</p>
        <span>© {new Date().getFullYear()} GymFlow ERP</span>
      </footer>
    </div>
  );
}

export default LandingPage;
