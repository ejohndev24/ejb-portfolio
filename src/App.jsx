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
  const [activeSlide, setActiveSlide] = useState(0)
  const [previewOpen, setPreviewOpen] = useState(false)
  const hasGallery = project.images?.length > 0

  useEffect(() => {
    if (!previewOpen) return undefined

    const previousOverflow = document.body.style.overflow
    const handlePreviewKeyDown = (event) => {
      if (event.key === 'Escape') setPreviewOpen(false)
      if (event.key === 'ArrowLeft') changeSlide(-1)
      if (event.key === 'ArrowRight') changeSlide(1)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handlePreviewKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handlePreviewKeyDown)
    }
  }, [previewOpen])

  const changeSlide = (direction) => {
    setActiveSlide((current) => (current + direction + project.images.length) % project.images.length)
  }

  const getSlidePosition = (index) => {
    if (index === activeSlide) return 'active'
    if (index === (activeSlide - 1 + project.images.length) % project.images.length) return 'previous'
    if (index === (activeSlide + 1) % project.images.length) return 'next'
    return 'hidden'
  }

  return (
    <article className={`project-card ${project.tone}${hasGallery ? ' featured-project' : ''}`}>
      <div className="project-details">
        <div className="project-top">
          <span className="project-number">/{project.number}</span>
          <div className="project-tags">
            {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        </div>
        <div className="project-body">
          {hasGallery && <span className="project-kicker">Featured mobile project</span>}
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
      </div>

      {hasGallery && (
        <div
          className="project-gallery"
          aria-label={`${project.title} app screenshots`}
          tabIndex="0"
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft') changeSlide(-1)
            if (event.key === 'ArrowRight') changeSlide(1)
          }}
        >
          <div className="gallery-frame" aria-live="polite">
            <span className="gallery-label">Explore the interface</span>
            {project.images.map((image, index) => (
              <img
                key={image}
                className={getSlidePosition(index)}
                src={image}
                alt={`${project.title} app screen ${index + 1} of ${project.images.length}`}
                loading={index === 0 ? 'eager' : 'lazy'}
                role={index === activeSlide ? 'button' : undefined}
                tabIndex={index === activeSlide ? 0 : -1}
                aria-label={index === activeSlide ? `Preview ${project.title} screenshot ${index + 1}` : undefined}
                onClick={index === activeSlide ? () => setPreviewOpen(true) : undefined}
                onKeyDown={index === activeSlide ? (event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    setPreviewOpen(true)
                  }
                } : undefined}
              />
            ))}
          </div>
          <div className="gallery-controls">
            <div className="gallery-buttons">
              <button type="button" onClick={() => changeSlide(-1)} aria-label="Previous screenshot"><span>←</span></button>
              <button type="button" onClick={() => changeSlide(1)} aria-label="Next screenshot"><span>→</span></button>
            </div>
            <div className="gallery-dots" aria-label="Choose screenshot">
              {project.images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={index === activeSlide ? 'active' : ''}
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Show screenshot ${index + 1}`}
                  aria-current={index === activeSlide ? 'true' : undefined}
                />
              ))}
            </div>
            <span className="gallery-count">{String(activeSlide + 1).padStart(2, '0')} / {String(project.images.length).padStart(2, '0')}</span>
          </div>
        </div>
      )}

      {hasGallery && previewOpen && (
        <div
          className="image-preview-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget) setPreviewOpen(false)
          }}
        >
          <div className="image-preview" role="dialog" aria-modal="true" aria-label={`${project.title} screenshot preview`}>
            <button className="preview-close" type="button" onClick={() => setPreviewOpen(false)} aria-label="Close image preview" autoFocus>
              <span aria-hidden="true">&times;</span>
            </button>
            <button className="preview-arrow preview-previous" type="button" onClick={() => changeSlide(-1)} aria-label="Previous screenshot">
              <span aria-hidden="true">&larr;</span>
            </button>
            <img src={project.images[activeSlide]} alt={`${project.title} app screen ${activeSlide + 1} enlarged`} />
            <button className="preview-arrow preview-next" type="button" onClick={() => changeSlide(1)} aria-label="Next screenshot">
              <span aria-hidden="true">&rarr;</span>
            </button>
            <span className="preview-count">{String(activeSlide + 1).padStart(2, '0')} / {String(project.images.length).padStart(2, '0')}</span>
          </div>
        </div>
      )}
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
          </div>
          <div className="project-grid">
            {projects.filter((project) => !project.hidden).map((project) => <ProjectCard key={project.number} project={project} />)}
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
