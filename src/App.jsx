import { useEffect, useState } from 'react'
import { projects } from './projects'

const Arrow = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 19 19 5M8 5h11v11" />
  </svg>
)

const Mark = () => (
  <a className="mark" href="#top" aria-label="EJB home">
    <span>E</span><span>J</span><span>B</span>
  </a>
)

function ProjectCard({ project }) {
  const isPlaceholder = project.link === '#'

  return (
    <article className={`project-card ${project.tone}`}>
      <div className="project-top">
        <span className="project-number">/{project.number}</span>
        <div className="project-tags">
          {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </div>
      <div className="project-body">
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
      </div>
      <a
        className="project-link"
        href={project.link}
        target={isPlaceholder ? undefined : '_blank'}
        rel={isPlaceholder ? undefined : 'noreferrer'}
        onClick={isPlaceholder ? (event) => event.preventDefault() : undefined}
        aria-label={isPlaceholder ? `${project.title} link coming soon` : `View ${project.title}`}
      >
        <span>{isPlaceholder ? 'Link coming soon' : 'View project'}</span>
        <Arrow />
      </a>
    </article>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-shell" id="top">
      <header className={scrolled ? 'site-header scrolled' : 'site-header'}>
        <Mark />
        <nav className={menuOpen ? 'nav open' : 'nav'} aria-label="Primary navigation">
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
        <button
          className={menuOpen ? 'menu-button open' : 'menu-button'}
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span /><span />
        </button>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero-copy">
            <p className="eyebrow"><span /> Based in the Philippines · Available for great work</p>
            <h1 id="hero-heading">
              <span className="hero-name">Emil John</span>
              <span className="hero-name outline">Benitez.</span>
              <span className="hero-role">Front-End <i>Developer</i></span>
            </h1>
            <div className="hero-bottom">
              <p>I turn ideas into thoughtful interfaces—built to feel fast, natural, and genuinely good to use.</p>
              <a className="round-link" href="#work" aria-label="See selected work">
                <span>See my<br />work</span><Arrow />
              </a>
            </div>
          </div>

          <div className="hero-art" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="phone-shape">
              <div className="phone-notch" />
              <div className="phone-content">
                <span className="tiny-label">CRAFTING</span>
                <strong>mobile<br />moments</strong>
                <div className="swipe-line"><span /></div>
              </div>
            </div>
            <span className="art-note note-one">5 years<br />in motion</span>
            <span className="art-note note-two">React<br />Native</span>
          </div>
        </section>

        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            <span>React Native</span><b>✦</b><span>React</span><b>✦</b><span>Mobile Experiences</span><b>✦</b><span>Clean Interfaces</span><b>✦</b>
            <span>React Native</span><b>✦</b><span>React</span><b>✦</b><span>Mobile Experiences</span><b>✦</b><span>Clean Interfaces</span><b>✦</b>
          </div>
        </div>

        <section className="about section" id="about">
          <div className="section-label"><span>01</span> The person behind the pixels</div>
          <div className="about-grid">
            <div className="about-heading">
              <p>Developer.<br />Problem solver.<br /><em>Always learning.</em></p>
            </div>
            <div className="about-copy">
              <p className="lead">I’m a Front-End Developer with five years of experience, mostly focused on building mobile apps with React Native.</p>
              <p>I really enjoy creating smooth, user-friendly mobile experiences. I also have experience with React for the web. Now I’m beginning to learn back-end development as I work toward becoming a Full-Stack Software Developer.</p>
              <div className="fact-row">
                <div><strong>05</strong><span>Years of<br />experience</span></div>
                <div><strong>02</strong><span>Core<br />platforms</span></div>
                <div><strong>∞</strong><span>Room to<br />keep growing</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="work section" id="work">
          <div className="section-label light"><span>02</span> Selected work</div>
          <div className="work-heading">
            <h2>A space for things<br /><em>I’ve shipped.</em></h2>
            <p>Swap in your real project info and links whenever you’re ready.</p>
          </div>
          <div className="project-grid">
            {projects.map((project) => <ProjectCard key={project.number} project={project} />)}
          </div>
        </section>

        <section className="stack section">
          <div className="section-label"><span>03</span> Tools & direction</div>
          <div className="stack-grid">
            <h2>What I bring<br />to the build.</h2>
            <div className="skill-list">
              <div><span>01</span><strong>React Native</strong><small>Primary craft</small></div>
              <div><span>02</span><strong>React</strong><small>Web experiences</small></div>
              <div><span>03</span><strong>JavaScript</strong><small>The daily driver</small></div>
              <div><span>04</span><strong>Back-End</strong><small>Currently learning</small></div>
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="contact-kicker">Have an idea worth building?</div>
          <h2>Let’s make it<br /><em>feel right.</em></h2>
          <a className="email-link" href="mailto:emiljohnbenitez24@gmail.com">
            <span>emiljohnbenitez24@gmail.com</span><Arrow />
          </a>
          <div className="contact-footer">
            <Mark />
            <p>Designed & built with care.<br />© {new Date().getFullYear()} Emil John Benitez</p>
            <a href="#top">Back to top ↑</a>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
