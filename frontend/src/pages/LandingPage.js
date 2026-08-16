import { Link } from "react-router-dom";

function LandingPage() {
    return (
        <div className="landing-page">

            {/* Background Effects */}
            <div className="landing-glow landing-glow-one"></div>
            <div className="landing-glow landing-glow-two"></div>

            {/* Navigation */}
            <nav className="landing-navbar">

                <Link to="/" className="landing-brand">
                    <div className="landing-brand-icon">
                        🏋️
                    </div>

                    <div>
                        <span>GYM</span>
                        <strong>WORKOUT LOGGER</strong>
                    </div>
                </Link>

                <div className="landing-nav-links">
                    <a href="#features">Features</a>
                    <a href="#about">About</a>

                    <Link
                        to="/login"
                        className="landing-login"
                    >
                        Log In
                    </Link>

                    <Link
                        to="/register"
                        className="landing-nav-button"
                    >
                        Get Started
                    </Link>
                </div>

            </nav>

            {/* Hero Section */}
            <main className="landing-hero">

                <div className="landing-hero-content">

                    <div className="landing-badge">
                        <span></span>
                        YOUR FITNESS. YOUR PROGRESS.
                    </div>

                    <h1>
                        TRAIN
                        <br />
                        <span>SMARTER.</span>
                        <br />
                        GET STRONGER.
                    </h1>

                    <p>
                        Track every workout, monitor your progress,
                        and build consistency with a powerful workout
                        logging experience designed for serious training.
                    </p>

                    <div className="landing-hero-buttons">

                        <Link
                            to="/register"
                            className="landing-primary-button"
                        >
                            Start Training
                            <span>→</span>
                        </Link>

                        <a
                            href="#features"
                            className="landing-secondary-button"
                        >
                            Explore Features
                        </a>

                    </div>

                    <div className="landing-trust">

                        <div className="landing-trust-item">
                            <strong>100%</strong>
                            <span>Personal Tracking</span>
                        </div>

                        <div className="landing-trust-line"></div>

                        <div className="landing-trust-item">
                            <strong>∞</strong>
                            <span>Workout History</span>
                        </div>

                        <div className="landing-trust-line"></div>

                        <div className="landing-trust-item">
                            <strong>24/7</strong>
                            <span>Progress Access</span>
                        </div>

                    </div>

                </div>

                {/* Hero Visual */}
                <div className="landing-hero-visual">

                    <div className="landing-circle landing-circle-one"></div>
                    <div className="landing-circle landing-circle-two"></div>

                    <div className="landing-workout-card">

                        <div className="landing-card-header">
                            <div>
                                <span>WORKOUT</span>
                                <h3>Today's Session</h3>
                            </div>

                            <div className="landing-card-icon">
                                ↗
                            </div>
                        </div>

                        <div className="landing-stat">
                            <span>Exercises</span>
                            <strong>06</strong>
                        </div>

                        <div className="landing-stat">
                            <span>Total Sets</span>
                            <strong>18</strong>
                        </div>

                        <div className="landing-stat">
                            <span>Volume</span>
                            <strong>4,850 kg</strong>
                        </div>

                        <div className="landing-progress">

                            <div className="landing-progress-label">
                                <span>SESSION PROGRESS</span>
                                <strong>82%</strong>
                            </div>

                            <div className="landing-progress-bar">
                                <div></div>
                            </div>

                        </div>

                        <div className="landing-card-footer">
                            <span>●</span>
                            Consistency builds strength
                        </div>

                    </div>

                    <div className="landing-floating-card">
                        <span>WEEKLY PROGRESS</span>

                        <strong>+18.6%</strong>

                        <small>vs. last week</small>
                    </div>

                </div>

            </main>

            {/* Features */}
            <section
                id="features"
                className="landing-features"
            >

                <div className="landing-section-heading">

                    <span>BUILT FOR PROGRESS</span>

                    <h2>
                        Everything you need to
                        <strong> train better.</strong>
                    </h2>

                    <p>
                        Keep your training organized and your progress
                        visible without unnecessary complexity.
                    </p>

                </div>

                <div className="landing-feature-grid">

                    <div className="landing-feature-card">

                        <div className="landing-feature-icon">
                            ◉
                        </div>

                        <h3>Track Workouts</h3>

                        <p>
                            Record exercises, sets, reps and weights
                            for every training session.
                        </p>

                    </div>

                    <div className="landing-feature-card">

                        <div className="landing-feature-icon">
                            ↗
                        </div>

                        <h3>Monitor Progress</h3>

                        <p>
                            Keep your workout history organized and
                            see how your performance improves.
                        </p>

                    </div>

                    <div className="landing-feature-card">

                        <div className="landing-feature-icon">
                            ◇
                        </div>

                        <h3>Stay Consistent</h3>

                        <p>
                            Build a reliable training routine by
                            keeping every session in one place.
                        </p>

                    </div>

                </div>

            </section>

            {/* About */}
            <section
                id="about"
                className="landing-about"
            >

                <div className="landing-about-box">

                    <div>
                        <span>YOUR TRAINING JOURNEY</span>

                        <h2>
                            Every rep counts.
                            <br />
                            <strong>Every session matters.</strong>
                        </h2>
                    </div>

                    <Link
                        to="/register"
                        className="landing-about-button"
                    >
                        Create Your Account →
                    </Link>

                </div>

            </section>

            {/* Footer */}
            <footer className="landing-footer">

                <div className="landing-footer-brand">
                    <div className="landing-brand-icon">
                        🏋️
                    </div>

                    <div>
                        <span>GYM</span>
                        <strong>WORKOUT LOGGER</strong>
                    </div>
                </div>

                <p>
                    Track. Train. Progress.
                </p>

                <span className="landing-copyright">
                    © 2026 Gym Workout Logger
                </span>

            </footer>

        </div>
    );
}

export default LandingPage;