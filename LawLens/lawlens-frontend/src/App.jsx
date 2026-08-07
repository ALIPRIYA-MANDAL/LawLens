import { useState } from "react";
import "./App.css";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // When user selects a file
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);
      setShowResults(false);
    }
  };

  // Start fake analysis
  const handleAnalyze = () => {
    setIsAnalyzing(true);

    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 3000);
  };

  // Start a new analysis
  const handleNewAnalysis = () => {
    setSelectedFile(null);
    setShowResults(false);
    setIsAnalyzing(false);
  };

  return (
    <div className="app">

      {/* ==================================================
          ANALYZING SCREEN
      ================================================== */}

      {isAnalyzing ? (
        <div className="analyzing-screen">

          <div className="loading-icon">
            🔄
          </div>

          <h1>Analyzing Your Contract</h1>

          <p>
            Please wait while LawLens reviews your document.
          </p>

          <div className="analysis-steps">

            <div>
              📄 Reading your document...
            </div>

            <div>
              🔍 Finding risky clauses...
            </div>

            <div>
              ⚠️ Checking important terms...
            </div>

            <div>
              📊 Preparing your report...
            </div>

          </div>

        </div>

      ) : showResults ? (

        /* ==================================================
           RESULTS PAGE
        ================================================== */

        <div className="results-page">

          {/* Results Navbar */}

          <nav className="navbar">

            <div className="logo">
              ⚖️ LawLens
            </div>

            <div className="nav-links">
              <a href="#results">Results</a>

              <button
                className="nav-new-button"
                onClick={handleNewAnalysis}
              >
                New Analysis
              </button>
            </div>

          </nav>


          {/* Results Container */}

          <div className="results-container">

            {/* Results Header */}

            <div className="results-header">

              <div>

                <small>
                  CONTRACT ANALYSIS
                </small>

                <h1>
                  {selectedFile?.name || "Contract"}
                </h1>

                <p>
                  AI-powered risk assessment
                </p>

              </div>

              <button
                className="new-analysis-button"
                onClick={handleNewAnalysis}
              >
                + New Analysis
              </button>

            </div>


            {/* ==================================================
                RISK DASHBOARD
            ================================================== */}

            <div className="risk-dashboard">

              {/* Overall Score */}

              <div className="score-card">

                <div className="score-heading">
                  Overall Risk Score
                </div>

                <div className="big-score">
                  78
                  <span>/100</span>
                </div>

                <div className="score-label">
                  HIGH RISK
                </div>

                <p>
                  This contract contains several clauses
                  that need your attention before signing.
                </p>

              </div>


              {/* Risk Counts */}

              <div className="risk-counts">

                <div className="count-card high-count">
                  <strong>3</strong>
                  <span>High Risk</span>
                </div>

                <div className="count-card medium-count">
                  <strong>4</strong>
                  <span>Medium Risk</span>
                </div>

                <div className="count-card low-count">
                  <strong>8</strong>
                  <span>Low Risk</span>
                </div>

              </div>

            </div>


            {/* ==================================================
                RISKY CLAUSES
            ================================================== */}

            <section className="results-section">

              <div className="section-title">

                <div>

                  <h2>
                    ⚠️ Risky Clauses
                  </h2>

                  <p>
                    Clauses that may require your attention.
                  </p>

                </div>

              </div>


              {/* High Risk */}

              <div className="result-risk-card high-risk-card">

                <div className="risk-card-top">

                  <span className="risk-badge high-badge">
                    HIGH RISK
                  </span>

                  <span className="risk-number">
                    #1
                  </span>

                </div>

                <h3>
                  Non-Compete Clause
                </h3>

                <p>
                  This clause prevents you from working
                  with competing companies for 2 years
                  after leaving the organization.
                </p>

                <div className="recommendation">

                  <strong>
                    💡 Recommendation
                  </strong>

                  <p>
                    Consider asking the employer to reduce
                    the duration or clarify the restrictions.
                  </p>

                </div>

              </div>


              {/* Medium Risk */}

              <div className="result-risk-card medium-risk-card">

                <div className="risk-card-top">

                  <span className="risk-badge medium-badge">
                    MEDIUM RISK
                  </span>

                  <span className="risk-number">
                    #2
                  </span>

                </div>

                <h3>
                  Long Notice Period
                </h3>

                <p>
                  The contract requires 90 days notice
                  before termination.
                </p>

                <div className="recommendation">

                  <strong>
                    💡 Recommendation
                  </strong>

                  <p>
                    Confirm whether this notice period
                    applies equally to both parties.
                  </p>

                </div>

              </div>


              {/* Low Risk */}

              <div className="result-risk-card low-risk-card">

                <div className="risk-card-top">

                  <span className="risk-badge low-badge">
                    LOW RISK
                  </span>

                  <span className="risk-number">
                    #3
                  </span>

                </div>

                <h3>
                  Payment Terms
                </h3>

                <p>
                  Payment terms are clearly mentioned
                  and appear straightforward.
                </p>

              </div>

            </section>


            {/* ==================================================
                MISSING CLAUSES
            ================================================== */}

            <section className="results-section">

              <h2>
                ❌ Missing Clauses
              </h2>

              <p className="section-subtitle">
                Important information that could not be found.
              </p>

              <div className="missing-grid">

                <div className="missing-card">
                  <span>📋</span>
                  <div>
                    <strong>Leave Policy</strong>
                    <small>Not found</small>
                  </div>
                </div>

                <div className="missing-card">
                  <span>⏰</span>
                  <div>
                    <strong>Working Hours</strong>
                    <small>Not found</small>
                  </div>
                </div>

                <div className="missing-card">
                  <span>💰</span>
                  <div>
                    <strong>Overtime Terms</strong>
                    <small>Not found</small>
                  </div>
                </div>

              </div>

            </section>


            {/* ==================================================
                SIMPLE EXPLANATION
            ================================================== */}

            <section className="simple-section">

              <div className="simple-icon">
                💡
              </div>

              <div>

                <h2>
                  Simple Explanation
                </h2>

                <p>
                  This contract appears to contain a few
                  conditions you should understand before
                  signing. The biggest concern is the
                  two-year non-compete clause, which may
                  restrict where you can work after leaving.
                </p>

                <p>
                  LawLens recommends reviewing these
                  clauses carefully and discussing them
                  with the other party before signing.
                </p>

              </div>

            </section>


            {/* ==================================================
                REPORT ACTIONS
            ================================================== */}

            <div className="report-actions">

              <button className="download-button">
                ↓ Download Full Report
              </button>

              <button
                className="back-button"
                onClick={handleNewAnalysis}
              >
                Analyze Another Contract
              </button>

            </div>

          </div>

        </div>

      ) : (

        /* ==================================================
           LANDING PAGE
        ================================================== */

        <>

          {/* Navbar */}

          <nav className="navbar">

            <div className="logo">
              ⚖️ LawLens
            </div>

            <div className="nav-links">
              <a href="#home">
                Home
              </a>

              <a href="#how-it-works">
                How It Works
              </a>

              <a href="#about">
                About
              </a>
            </div>

          </nav>


          {/* ==================================================
              HERO
          ================================================== */}

          <main className="hero" id="home">

            <div className="hero-content">

              <div className="badge">
                ✨ AI-Powered Contract Analysis
              </div>

              <h1>
                Understand Your Contract
                <span>Before You Sign.</span>
              </h1>

              <p>
                LawLens uses AI to identify risky clauses,
                missing terms, hidden penalties, and
                important contract details — explained
                in simple language.
              </p>


              {/* Upload */}

              <label className="upload-button">

                📄 Upload Contract

                <input
                  type="file"
                  accept=".pdf,.docx"
                  hidden
                  onChange={handleFileChange}
                />

              </label>


              {/* Selected File */}

              {selectedFile && (
                <div className="selected-file">
                  📄 {selectedFile.name}
                </div>
              )}


              {/* Analyze */}

              {selectedFile && (
                <button
                  className="analyze-button"
                  onClick={handleAnalyze}
                >
                  🔍 Analyze Contract
                </button>
              )}


              <div className="privacy">
                🔒 Your documents are secure and private
              </div>

            </div>


            {/* ==================================================
                PREVIEW CARD
            ================================================== */}

            <div className="hero-card">

              <div className="card-header">

                <div>

                  <small>
                    CONTRACT ANALYSIS
                  </small>

                  <h3>
                    Employment Agreement
                  </h3>

                </div>

                <span className="file-icon">
                  📄
                </span>

              </div>


              <div className="risk-score">

                <div className="score-circle">

                  <strong>
                    78
                  </strong>

                  <small>
                    /100
                  </small>

                </div>

                <div>

                  <h3>
                    High Risk
                  </h3>

                  <p>
                    3 issues need attention
                  </p>

                </div>

              </div>


              <div className="risk-item high">
                🔴 Non-compete clause
              </div>

              <div className="risk-item medium">
                🟡 Long notice period
              </div>

              <div className="risk-item safe">
                🟢 Payment terms
              </div>

            </div>

          </main>


          {/* ==================================================
              FEATURES
          ================================================== */}

          <section
            className="features"
            id="how-it-works"
          >

            <h2>
              What LawLens Finds
            </h2>

            <p className="section-description">
              Get a clear picture of what's inside your contract.
            </p>


            <div className="feature-grid">


              <div className="feature-card">

                <div className="feature-icon">
                  🔍
                </div>

                <h3>
                  Find Risky Clauses
                </h3>

                <p>
                  Detect clauses that could create problems
                  or unexpected obligations.
                </p>

              </div>


              <div className="feature-card">

                <div className="feature-icon">
                  ⚠️
                </div>

                <h3>
                  Risk Score
                </h3>

                <p>
                  Get an easy-to-understand overall risk
                  score for your contract.
                </p>

              </div>


              <div className="feature-card">

                <div className="feature-icon">
                  💡
                </div>

                <h3>
                  Simple Explanations
                </h3>

                <p>
                  Complex legal language explained in
                  straightforward language.
                </p>

              </div>

            </div>

          </section>

        </>

      )}

    </div>
  );
}

export default App;