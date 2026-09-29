
import { useState } from 'react'
import './App.css'

function App() {
  const [jobSearch, setJobSearch] = useState('')
  const [jobRole, setJobRole] = useState('All')
  const [selectedJob, setSelectedJob] = useState(null)

  const [applicationSubmitted, setApplicationSubmitted] = useState(false)
  const [applicantName, setApplicantName] = useState('')
  const [applicantEmail, setApplicantEmail] = useState('')
  const [resumeName, setResumeName] = useState('')

  const [applications, setApplications] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem('careerApplications') || '[]'
      )
    } catch {
      return []
    }
  })

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [name, setName] = useState(
    localStorage.getItem('careerName') || ''
  )
  const [college, setCollege] = useState(
    localStorage.getItem('careerCollege') || ''
  )
  const [degree, setDegree] = useState(
    localStorage.getItem('careerDegree') || ''
  )
  const [skills, setSkills] = useState(
    localStorage.getItem('careerSkills') || ''
  )
  const [interests, setInterests] = useState(
    localStorage.getItem('careerInterests') || ''
  )
  const [goal, setGoal] = useState(
    localStorage.getItem('careerGoal') || ''
  )

  const [showResult, setShowResult] = useState(false)
  const [openRoadmap, setOpenRoadmap] = useState(null)

  const [progress, setProgress] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem('careerProgress')
      ) || {
        programming: false,
        web: false,
        projects: false,
        problemSolving: false,
        interview: false,
      }
    } catch {
      return {
        programming: false,
        web: false,
        projects: false,
        problemSolving: false,
        interview: false,
      }
    }
  })

  const roadmapSteps = [
    {
      id: 'programming',
      number: '01',
      title: 'Learn Programming',
      description: 'Strengthen Python and Java fundamentals.',
      details: [
        'Learn Python variables, data types and operators.',
        'Practice conditions, loops and functions.',
        'Understand Java classes and objects.',
        'Write simple Python and Java programs.',
      ],
    },
    {
      id: 'web',
      number: '02',
      title: 'Improve Web Development',
      description: 'Learn HTML, CSS, JavaScript and React.',
      details: [
        'Learn HTML tags and page structure.',
        'Practice CSS styling and responsive layouts.',
        'Understand JavaScript functions and DOM.',
        'Learn React components, props and state.',
      ],
    },
    {
      id: 'projects',
      number: '03',
      title: 'Build Projects',
      description: 'Create practical projects for your portfolio.',
      details: [
        'Create a simple portfolio website.',
        'Build a to-do list using JavaScript.',
        'Develop a small React application.',
        'Upload your projects to GitHub.',
      ],
    },
    {
      id: 'problemSolving',
      number: '04',
      title: 'Practice Problem Solving',
      description: 'Practice coding and logical problems regularly.',
      details: [
        'Practice basic aptitude questions.',
        'Solve simple coding problems.',
        'Learn arrays, strings and searching.',
        'Practice logical reasoning regularly.',
      ],
    },
    {
      id: 'interview',
      number: '05',
      title: 'Prepare for Interviews',
      description: 'Improve communication and interview skills.',
      details: [
        'Prepare a simple professional resume.',
        'Revise programming fundamentals.',
        'Practice introducing yourself in English.',
        'Practice common technical interview questions.',
      ],
    },
  ]

  const handleLogin = (e) => {
    e.preventDefault()

    if (!email || !password) {
      alert('Please enter your email and password.')
      return
    }

    setIsLoggedIn(true)
  }

  const handleSignup = (e) => {
    e.preventDefault()

    if (!name || !email || !password) {
      alert('Please fill in your name, email and password.')
      return
    }

    localStorage.setItem('careerUserEmail', email)
    localStorage.setItem('careerName', name)

    alert('Account created successfully!')
    setIsLoggedIn(true)
    setShowSignup(false)
  }

  const saveProfile = () => {
    localStorage.setItem('careerName', name)
    localStorage.setItem('careerCollege', college)
    localStorage.setItem('careerDegree', degree)
    localStorage.setItem('careerSkills', skills)
    localStorage.setItem('careerInterests', interests)
    localStorage.setItem('careerGoal', goal)
  }

  const analyzeCareer = () => {
    if (
      !name.trim() ||
      !skills.trim() ||
      !interests.trim() ||
      !goal.trim()
    ) {
      alert(
        'Please fill in your name, skills, interests and career goal.'
      )
      return
    }

    saveProfile()
    setShowResult(true)

    setTimeout(() => {
      document.getElementById('career-result')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }, 150)
  }

  const jobs = [
    {
      title: 'Python Developer',
      category: 'Developer',
      description: 'Develop applications using Python.',
      skills: 'Python, SQL, Git',
    },
    {
      title: 'Java Developer',
      category: 'Developer',
      description: 'Build applications using Java.',
      skills: 'Java, SQL, OOP',
    },
    {
      title: 'Web Developer',
      category: 'Web',
      description: 'Create modern websites and web applications.',
      skills: 'HTML, CSS, JavaScript, React',
    },
    {
      title: 'AI/ML Engineer',
      category: 'AI/ML',
      description: 'Explore artificial intelligence and machine learning.',
      skills: 'Python, Machine Learning, SQL',
    },
    {
      title: 'Software Developer',
      category: 'Developer',
      description: 'Design and develop software applications.',
      skills: 'Java, Python, Git, Problem Solving',
    },
  ]

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title
      .toLowerCase()
      .includes(jobSearch.toLowerCase())

    const matchesRole =
      jobRole === 'All' || job.category === jobRole

    return matchesSearch && matchesRole
  })

  const toggleProgress = (skill) => {
    const updatedProgress = {
      ...progress,
      [skill]: !progress[skill],
    }

    setProgress(updatedProgress)
    localStorage.setItem(
      'careerProgress',
      JSON.stringify(updatedProgress)
    )
  }

  const completed = Object.values(progress).filter(Boolean).length
  const total = Object.values(progress).length
  const percentage = Math.round((completed / total) * 100)

  const openApplication = (job) => {
    setSelectedJob(job)
    setApplicationSubmitted(false)
    setApplicantName(name || '')
    setApplicantEmail(email || '')
    setResumeName('')

    setTimeout(() => {
      document.getElementById('application-section')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }, 100)
  }

  const submitApplication = (e) => {
    e.preventDefault()

    if (
      !applicantName.trim() ||
      !applicantEmail.trim() ||
      !resumeName.trim()
    ) {
      alert('Please fill in your name, email and resume.')
      return
    }

    const alreadyApplied = applications.some(
      (application) =>
        application.jobTitle === selectedJob.title &&
        application.email.toLowerCase() ===
          applicantEmail.trim().toLowerCase()
    )

    if (alreadyApplied) {
      alert('You have already applied for this job with this email.')
      return
    }

    const newApplication = {
      id: Date.now(),
      jobTitle: selectedJob.title,
      category: selectedJob.category,
      skills: selectedJob.skills,
      name: applicantName.trim(),
      email: applicantEmail.trim(),
      resume: resumeName.trim(),
      status: 'Submitted',
      appliedDate: new Date().toLocaleDateString(),
    }

    const updatedApplications = [
      ...applications,
      newApplication,
    ]

    setApplications(updatedApplications)
    localStorage.setItem(
      'careerApplications',
      JSON.stringify(updatedApplications)
    )

    setApplicationSubmitted(true)
  }

  const closeApplication = () => {
    setSelectedJob(null)
    setApplicationSubmitted(false)
    setApplicantName('')
    setApplicantEmail('')
    setResumeName('')
  }

  const deleteApplication = (id) => {
    const updatedApplications = applications.filter(
      (application) => application.id !== id
    )

    setApplications(updatedApplications)
    localStorage.setItem(
      'careerApplications',
      JSON.stringify(updatedApplications)
    )
  }

  if (!isLoggedIn) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <h1>AI Career Companion</h1>

          <p>
            {showSignup
              ? 'Create your account and start your career journey.'
              : 'Login to continue your career journey.'}
          </p>

          {showSignup ? (
            <form onSubmit={handleSignup}>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit">Create Account</button>
            </form>
          ) : (
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit">Login</button>
            </form>
          )}

          <div className="auth-switch">
            {showSignup ? (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setShowSignup(false)}
                >
                  Login
                </button>
              </p>
            ) : (
              <p>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setShowSignup(true)}
                >
                  Sign Up
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <nav>
        <h2>AI Career Companion</h2>
        <div>
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#profile">Profile</a>
          <a href="#applications">Applications</a>

          <button
            onClick={() => setIsLoggedIn(false)}
            className="logout-btn"
          >
            Logout
          </button>
        </div>
      </nav>

      <main>
        <section id="home">
          <p>AI POWERED CAREER GUIDANCE</p>
          <h1>
            Build Your
            <br />
            Future With AI
          </h1>
          <p>
            Discover the right career path, identify your skill gaps,
            and create a personalized roadmap for your future.
          </p>
          <button
            onClick={() =>
              document.getElementById('profile')?.scrollIntoView({
                behavior: 'smooth',
              })
            }
          >
            Get Started →
          </button>
        </section>

        <section id="profile">
          <h2>Create Your Career Profile</h2>
          <p>
            Tell us about yourself to get personalized career guidance.
          </p>

          <div className="profile-form">
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter your college"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter your degree"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter your skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter your interests"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
            />
            <input
              type="text"
              placeholder="Your career goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />

            <button onClick={analyzeCareer}>
              Analyze My Career
            </button>
          </div>

          {showResult && (
            <div id="career-result" className="career-result">
              <h2>Career Analysis for {name}</h2>
              <p>
                Based on your skills, interests and career goal,
                here is your initial career guidance.
              </p>

              <h3>🎯 Suggested Direction</h3>
              <p>
                Technology and software-related career opportunities
                can be explored based on your profile.
              </p>

              <h3>📊 Skill Gap Analysis</h3>
              <div className="skill-card">
                <span>Python</span>
                <strong className="skill-good">✓ Good</strong>
              </div>
              <div className="skill-card">
                <span>Java</span>
                <strong className="skill-medium">● Improve</strong>
              </div>
              <div className="skill-card">
                <span>Web Development</span>
                <strong className="skill-medium">● Improve</strong>
              </div>
              <div className="skill-card">
                <span>Communication</span>
                <strong className="skill-low">! Needs Focus</strong>
              </div>
              <div className="skill-card">
                <span>Problem Solving</span>
                <strong className="skill-medium">● Improve</strong>
              </div>

              <h3>🗺️ Personalized Career Roadmap</h3>
              <p>Click each step to view its learning tasks.</p>

              <div className="roadmap">
                {roadmapSteps.map((step) => (
                  <div className="roadmap-step" key={step.id}>
                    <button
                      type="button"
                      className="roadmap-toggle"
                      aria-expanded={openRoadmap === step.id}
                      onClick={() =>
                        setOpenRoadmap(
                          openRoadmap === step.id ? null : step.id
                        )
                      }
                    >
                      <span>{step.number}</span>
                      <div>
                        <h4>{step.title}</h4>
                        <p>{step.description}</p>
                      </div>
                      <span>
                        {openRoadmap === step.id ? '▲' : '▼'}
                      </span>
                    </button>

                    {openRoadmap === step.id && (
                      <div className="roadmap-details">
                        <h4>Learning Tasks</h4>
                        <ul>
                          {step.details.map((detail, index) => (
                            <li key={index}>{detail}</li>
                          ))}
                        </ul>

                        <button
                          type="button"
                          className={
                            progress[step.id] ? 'completed' : ''
                          }
                          onClick={() => toggleProgress(step.id)}
                        >
                          {progress[step.id]
                            ? '✓ Completed'
                            : 'Mark Complete'}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <h3>💼 Job Recommendations</h3>
              <div className="job-search">
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={jobSearch}
                  onChange={(e) => setJobSearch(e.target.value)}
                />
                <select
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                >
                  <option value="All">All Roles</option>
                  <option value="Developer">Developer</option>
                  <option value="AI/ML">AI / ML</option>
                  <option value="Web">Web Development</option>
                </select>
              </div>

              <div className="job-list">
                {filteredJobs.map((job) => (
                  <div className="job-card" key={job.title}>
                    <h4>{job.title}</h4>
                    <p>{job.description}</p>
                    <p>
                      <strong>Required Skills:</strong> {job.skills}
                    </p>
                    <button onClick={() => openApplication(job)}>
                      Apply Now
                    </button>
                  </div>
                ))}

                {filteredJobs.length === 0 && (
                  <p>No jobs found. Try another search.</p>
                )}
              </div>

              <h3>📈 Progress Tracker</h3>
              <div className="progress-summary">
                <h2>{percentage}%</h2>
                <p>
                  {completed} of {total} roadmap tasks completed
                </p>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>

              {roadmapSteps.map((step) => (
                <div className="progress-item" key={step.id}>
                  <span>{step.title}</span>
                  <button
                    className={progress[step.id] ? 'completed' : ''}
                    onClick={() => toggleProgress(step.id)}
                  >
                    {progress[step.id]
                      ? '✓ Completed'
                      : 'Mark Complete'}
                  </button>
                </div>
              ))}

              <h3>🚀 Next Step</h3>
              <p>
                Complete each roadmap task and track your career progress.
              </p>

              {selectedJob && (
                <div
                  id="application-section"
                  className="application-box"
                >
                  <h3>📄 Apply for {selectedJob.title}</h3>

                  {!applicationSubmitted ? (
                    <form onSubmit={submitApplication}>
                      <p>
                        <strong>Job:</strong> {selectedJob.title}
                      </p>
                      <p>
                        <strong>Required Skills:</strong>{' '}
                        {selectedJob.skills}
                      </p>

                      <input
                        type="text"
                        placeholder="Enter your name"
                        value={applicantName}
                        onChange={(e) =>
                          setApplicantName(e.target.value)
                        }
                        required
                      />
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={applicantEmail}
                        onChange={(e) =>
                          setApplicantEmail(e.target.value)
                        }
                        required
                      />
                      <input
                        type="text"
                        placeholder="Enter resume file name"
                        value={resumeName}
                        onChange={(e) =>
                          setResumeName(e.target.value)
                        }
                        required
                      />

                      <button type="submit">
                        Submit Application
                      </button>
                      <button type="button" onClick={closeApplication}>
                        Cancel
                      </button>
                    </form>
                  ) : (
                    <div className="application-success">
                      <h3>
                        ✅ Application Submitted Successfully!
                      </h3>
                      <p>
                        Your application for{' '}
                        <strong>{selectedJob.title}</strong> has been
                        saved in My Applications.
                      </p>
                      <button onClick={closeApplication}>
                        Back to Jobs
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </section>

        <section id="applications">
          <h2>📋 My Applications</h2>
          <p>View the jobs you have applied for.</p>

          {applications.length === 0 ? (
            <div className="application-empty">
              <h3>No Applications Yet</h3>
              <p>
                Apply for a job and your application will appear here.
              </p>
            </div>
          ) : (
            <div className="application-list">
              {applications.map((application) => (
                <div
                  className="application-card"
                  key={application.id}
                >
                  <h3>💼 {application.jobTitle}</h3>
                  <p>
                    <strong>Category:</strong> {application.category}
                  </p>
                  <p>
                    <strong>Applicant:</strong> {application.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {application.email}
                  </p>
                  <p>
                    <strong>Resume:</strong> {application.resume}
                  </p>
                  <p>
                    <strong>Applied Date:</strong>{' '}
                    {application.appliedDate}
                  </p>
                  <p>
                    <strong>Status:</strong>{' '}
                    <span className="application-status">
                      {application.status}
                    </span>
                  </p>
                  <button
                    onClick={() => deleteApplication(application.id)}
                  >
                    Remove Application
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <section id="features">
          <h2>Everything You Need For Your Career</h2>
          <div>
            <h3>🎯 Career Guidance</h3>
            <p>
              Find career paths that match your interests and skills.
            </p>
          </div>
          <div>
            <h3>📊 Skill Gap Analysis</h3>
            <p>
              Understand which skills you need to improve.
            </p>
          </div>
          <div>
            <h3>🗺️ Career Roadmap</h3>
            <p>
              Get a personalized step-by-step learning roadmap.
            </p>
          </div>
          <div>
            <h3>💼 Job Recommendations</h3>
            <p>
              Explore suitable job roles based on your profile.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App