import { useState } from "react";
import "./App.css";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);

  // When user selects a file
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);
      setShowResults(false);
      setAnalysisResults(null);
    }
  };

  // Send contract to backend
  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch(
        "http://10.20.52.228:8000/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      console.log("Backend response:", data);

      setAnalysisResults(data.analysis);
      setIsAnalyzing(false);
      setShowResults(true);
    } catch (error) {
      console.error("Analysis failed:", error);

      alert(
        "Something went wrong while analyzing the contract. Please check that the backend is running."
      );

      setIsAnalyzing(false);
    }
  };

  // Start a new analysis
  const handleNewAnalysis = () => {
    setSelectedFile(null);
    setShowResults(false);
    setIsAnalyzing(false);
    setAnalysisResults(null);
  };

  // Risk counts
  const highRiskCount =
    analysisResults?.risky_clauses?.filter(
      (clause) => clause.risk === "HIGH"
    ).length || 0;

  const mediumRiskCount =
    analysisResults?.risky_clauses?.filter(
      (clause) => clause.risk === "MEDIUM"
    ).length || 0;

  const lowRiskCount =
    analysisResults?.risky_clauses?.filter(
      (clause) => clause.risk === "LOW"
    ).length || 0;

  return (
    <>
      {/* ==================================================
          ANALYZING SCREEN
      ================================================== */}

      {isAnalyzing ? (
        <div className="analyzing-screen">
          <div className="loading-icon">🔄</div>

          <h1>Analyzing Your Contract</h1>

          <p>
            Please wait while LawLens reviews your document.
          </p>

          <div className="analysis-steps">
            <div>📄 Reading your document...</div>
            <div>🔍 Finding risky clauses...</div>
            <div>⚠️ Checking important terms...</div>
            <div>📊 Preparing your report...</div>
          </div>
        </div>
      ) : showResults && analysisResults ? (
        /* ==================================================
           RESULTS PAGE
        ================================================== */

        <div className="results-page">
          {/* Results Navbar */}

          <nav className="navbar">
            <div className="logo">⚖️ LawLens</div>

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
                <small>CONTRACT ANALYSIS</small>

                <h1>
                  {analysisResults.contract_name ||
                    selectedFile?.name ||
                    "Contract"}
                </h1>

                <p>AI-powered risk assessment</p>
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
                  {analysisResults.risk_score}
                  <span>/100</span>
                </div>

                <div className="score-label">
                  {analysisResults.risk_level} RISK
                </div>

                <p>{analysisResults.summary}</p>
              </div>

              {/* Risk Counts */}

              <div className="risk-counts">
                <div className="count-card high-count">
                  <strong>{highRiskCount}</strong>
                  <span>High Risk</span>
                </div>

                <div className="count-card medium-count">
                  <strong>{mediumRiskCount}</strong>
                  <span>Medium Risk</span>
                </div>

                <div className="count-card low-count">
                  <strong>{lowRiskCount}</strong>
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
                  <h2>⚠️ Risky Clauses</h2>

                  <p>
                    Clauses that may require your attention.
                  </p>
                </div>
              </div>

              {analysisResults.risky_clauses?.length > 0 ? (
                analysisResults.risky_clauses.map(
                  (clause, index) => (
                    <div
                      className={`result-risk-card ${
                        clause.risk?.toLowerCase() || "low"
                      }-risk-card`}
                      key={index}
                    >
                      <div className="risk-card-top">
                        <span
                          className={`risk-badge ${
                            clause.risk?.toLowerCase() || "low"
                          }-badge`}
                        >
                          {clause.risk} RISK
                        </span>

                        <span className="risk-number">
                          #{index + 1}
                        </span>
                      </div>

                      <h3>{clause.title}</h3>

                      <p>{clause.explanation}</p>

                      <div className="recommendation">
                        <strong>💡 Recommendation</strong>

                        <p>{clause.recommendation}</p>
                      </div>
                    </div>
                  )
                )
              ) : (
                <p>No risky clauses were identified.</p>
              )}
            </section>

            {/* ==================================================
                MISSING CLAUSES
            ================================================== */}

            <section className="results-section">
              <h2>❌ Missing Clauses</h2>

              <p className="section-subtitle">
                Important information that could not be found.
              </p>

              <div className="missing-grid">
                {analysisResults.missing_clauses?.length > 0 ? (
                  analysisResults.missing_clauses.map(
                    (clause, index) => (
                      <div
                        className="missing-card"
                        key={index}
                      >
                        <span>📋</span>

                        <div>
                          <strong>{clause.title}</strong>

                          <small>{clause.reason}</small>
                        </div>
                      </div>
                    )
                  )
                ) : (
                  <p>No missing clauses were identified.</p>
                )}
              </div>
            </section>

            {/* ==================================================
                SIMPLE EXPLANATION
            ================================================== */}

            <section className="simple-section">
              <div className="simple-icon">💡</div>

              <div>
                <h2>Simple Explanation</h2>

                <p>{analysisResults.summary}</p>

                <p>
                  LawLens recommends reviewing the risky
                  clauses and recommendations carefully
                  before signing the contract.
                </p>
              </div>
            </section>

            {/* ==================================================
                RECOMMENDATIONS
            ================================================== */}

            <section className="results-section">
              <h2>💡 Recommendations</h2>

              <p className="section-subtitle">
                Suggested actions based on the contract
                analysis.
              </p>

              <div className="recommendations-list">
                {analysisResults.recommendations?.length > 0 ? (
                  analysisResults.recommendations.map(
                    (recommendation, index) => (
                      <div
                        className="recommendation"
                        key={index}
                      >
                        <p>
                          {index + 1}. {recommendation}
                        </p>
                      </div>
                    )
                  )
                ) : (
                  <p>No additional recommendations.</p>
                )}
              </div>
            </section>

            {/* ==================================================
                REPORT ACTIONS
            ================================================== */}

            <div className="report-actions">
              <button
                className="download-button"
                onClick={() =>
                  alert(
                    "PDF report generation coming next!"
                  )
                }
              >
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
            <div className="logo">⚖️ LawLens</div>

            <div className="nav-links">
              <a href="#home">Home</a>

              <a href="#how-it-works">
                How It Works
              </a>

              <a href="#about">About</a>
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
                  <small>CONTRACT ANALYSIS</small>

                  <h3>Employment Agreement</h3>
                </div>

                <span className="file-icon">📄</span>
              </div>

              <div className="risk-score">
                <div className="score-circle">
                  <strong>78</strong>

                  <small>/100</small>
                </div>

                <div>
                  <h3>High Risk</h3>

                  <p>3 issues need attention</p>
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
            <h2>What LawLens Finds</h2>

            <p className="section-description">
              Get a clear picture of what's inside your
              contract.
            </p>

            <div className="feature-grid">
              <div className="feature-card">
                <div className="feature-icon">🔍</div>

                <h3>Find Risky Clauses</h3>

                <p>
                  Detect clauses that could create
                  problems or unexpected obligations.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">⚠️</div>

                <h3>Risk Score</h3>

                <p>
                  Get an easy-to-understand overall risk
                  score for your contract.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">💡</div>

                <h3>Simple Explanations</h3>

                <p>
                  Complex legal language explained in
                  straightforward language.
                </p>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default App
