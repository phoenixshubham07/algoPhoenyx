'use client';

import { useEffect } from 'react';

const LandingPage = () => {
  useEffect(() => {
    // --- 2. Scroll-Triggered Fade-in Animations ---
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          } else {
            entry.target.classList.remove('show');
          }
        });
      },
      { threshold: 0.1 }
    );
    document
      .querySelectorAll('.hidden')
      .forEach((el) => observer.observe(el));

    // --- 3. Pillar Card Logic ---
    const cards = document.querySelectorAll('.pillar-card');
    cards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        document.body.classList.add('card-open-blur');
      });
      card.addEventListener('mouseleave', () => {
        document.body.classList.remove('card-open-blur');
      });
    });

    // --- 4. Button Ripple Effect ---
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach((button) => {
      button.addEventListener('click', function (e) {
        let ripple = document.createElement('span');
        ripple.classList.add('btn-ripple');
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        const existingRipple = button.querySelector('.btn-ripple');
        if (existingRipple) {
          existingRipple.remove();
        }
        this.appendChild(ripple);
      });
    });

    // --- 6. DSA Topic Box on Click ---
    const dsaTopics = [
      'Arrays', 'Linked Lists', 'Stacks', 'Queues', 'Binary Trees',
      'Binary Search Trees', 'Heaps', 'Hash Tables', 'Graphs',
      'Linear Search', 'Binary Search', 'Bubble Sort', 'Insertion Sort',
      'Selection Sort', 'Merge Sort', 'Quick Sort', 'Heap Sort',
      'Depth-First Search', 'Breadth-First Search', "Dijkstra's Algorithm",
      'Recursion', 'Dynamic Programming',
    ];
    let clickCount = 0;
    let topicIndex = 0;
    const particlesDiv = document.getElementById('particles-js');

    if (particlesDiv) {
      particlesDiv.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.tagName.toLowerCase() !== 'canvas') {
          return;
        }

        clickCount++;

        if (clickCount % 5 === 1 || clickCount % 5 === 3) {
          const topic = dsaTopics[topicIndex % dsaTopics.length];
          topicIndex++;

          const topicBox = document.createElement('div');
          topicBox.className = 'dsa-topic-box burn-in';
          topicBox.textContent = topic;
          document.body.appendChild(topicBox);

          topicBox.style.left = `${e.clientX + window.scrollX}px`;
          topicBox.style.top = `${e.clientY + window.scrollY}px`;

          topicBox.addEventListener(
            'animationend',
            (animEvent: AnimationEvent) => {
              if (animEvent.animationName === 'burn-in-animation') {
                topicBox.classList.remove('burn-in');
                topicBox.classList.add('float');
              }
            },
            { once: true }
          );

          setTimeout(() => {
            topicBox.classList.remove('float');
            topicBox.classList.add('disappear');
          }, 5000);

          setTimeout(() => {
            if (topicBox.parentNode) {
              topicBox.remove();
            }
          }, 6000);
        }
      });
    }

    // --- 7. Pricing Card Hover Effect ---
    const priceCards = document.querySelectorAll('.price-card');
    priceCards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        document.body.classList.add('pricing-card-hovered');
      });
      card.addEventListener('mouseleave', () => {
        document.body.classList.remove('pricing-card-hovered');
      });
    });

    // Cleanup function to remove event listeners
    return () => {
      document.querySelectorAll('.hidden').forEach((el) => observer.unobserve(el));
      // Other cleanup if necessary
    };
  }, []);

  return (
    <>
      <main>
        <section id="home" className="hero-section">
          <div className="hero-content hidden">
            <div className="hero-logo-placeholder">
              <div className="phoenix-silhouette"></div>
            </div>
            <h1 className="hero-title">
              FALL. <span className="highlight-gold">CODE.</span> BURN.
            </h1>
            <p className="hero-subtitle">Finding the Spark at the Nexus of Creativity and Code.</p>
            <div className="hero-actions">
              <button className="btn btn-primary-gold">Login</button>
              <button className="btn btn-outline-cyan">Demo Protocol</button>
            </div>
          </div>
        </section>

        <section id="pillars" className="character-pillars">
          <video
            src="/matrix1.mp4"
            autoPlay
            loop
            muted
            className="pillars-background-video"
          ></video>
          <h2 className="section-title hidden">The Pillars of AlgoPhoenyx</h2>
          <div className="pillar-container">
            <div className="pillar-card" data-character="amaterasu">
              <div className="pillar-closed-view">
                <span className="pillar-label">AMATERASU</span>
                <div className="pillar-icon">☀️</div>
              </div>
              <div className="pillar-content amaterasu-theme">
                <h3>AlgoAmaterasu</h3>
                <p className="pillar-role">The Illuminator</p>
                <p className="pillar-desc">Provides wisdom and logic debugging. She lights the path through complex algorithms.</p>
                <button className="btn btn-close-modal">Close Link</button>
              </div>
            </div>

            <div className="pillar-card" data-character="inari">
              <div className="pillar-closed-view">
                <span className="pillar-label">INARI</span>
                <div className="pillar-icon">🦊</div>
              </div>
              <div className="pillar-content inari-theme">
                <h3>AlgoInari</h3>
                <p className="pillar-role">The Resource</p>
                <p className="pillar-desc">Manages assets and adapts to new frameworks. The shapeshifter of your tech stack.</p>
                <button className="btn btn-close-modal">Close Link</button>
              </div>
            </div>

            <div className="pillar-card" data-character="raiden">
              <div className="pillar-closed-view">
                <span className="pillar-label">RAIDEN</span>
                <div className="pillar-icon">⚡</div>
              </div>
              <div className="pillar-content raiden-theme">
                <h3>AlgoRaiden</h3>
                <p className="pillar-role">The Executor</p>
                <p className="pillar-desc">Speed, execution, and raw power. Compiles and deploys at lightning speeds.</p>
                <button className="btn btn-close-modal">Close Link</button>
              </div>
            </div>
          </div>
        </section>

        <section className="ai-logos-section hidden">
          <div className="carousel-track">
            <div className="logo-list">
              <div className="logo-item">PYTHON</div>
              <div className="logo-item">JAVA</div>
              <div className="logo-item">REACT</div>
              <div className="logo-item">NODE.JS</div>
              <div className="logo-item">AWS</div>
              <div className="logo-item">DOCKER</div>
              <div className="logo-item">KUBERNETES</div>
            </div>
            <div className="logo-list" aria-hidden="true">
              <div className="logo-item">PYTHON</div>
              <div className="logo-item">JAVA</div>
              <div className="logo-item">REACT</div>
              <div className="logo-item">NODE.JS</div>
              <div className="logo-item">AWS</div>
              <div className="logo-item">DOCKER</div>
              <div className="logo-item">KUBERNETES</div>
            </div>
          </div>
        </section>

        <section className="ai-logos-section hidden reverse">
          <div className="carousel-track">
            <div className="logo-list">
                <div className="logo-item">Go</div>
                <div className="logo-item">TypeScript</div>
                <div className="logo-item">PostgreSQL</div>
                <div className="logo-item">GraphQL</div>
                <div className="logo-item">Terraform</div>
                <div className="logo-item">Ansible</div>
                <div className="logo-item">Jenkins</div>
            </div>
            <div className="logo-list" aria-hidden="true">
                <div className="logo-item">Go</div>
                <div className="logo-item">TypeScript</div>
                <div className="logo-item">PostgreSQL</div>
                <div className="logo-item">GraphQL</div>
                <div className="logo-item">Terraform</div>
                <div className="logo-item">Ansible</div>
                <div className="logo-item">Jenkins</div>
            </div>
          </div>
        </section>

        <section id="pricing" className="pricing-section">
          <h2 className="section-title hidden">Ascension Tiers</h2>
          <div className="pricing-container">
            <div className="price-card hidden">
              <div className="card-header">
                <h3 className="tier-name">Initiate</h3>
                <div className="price-tag">$19<span>/mo</span></div>
              </div>
              <ul className="feature-list">
                <li>Basic Raiden Access</li>
                <li>Community Support</li>
                <li>5 Projects</li>
              </ul>
              <button className="btn btn-outline-cyan full-width">Choose Path</button>
            </div>

            <div className="price-card recommended hidden">
              <div className="popular-badge">MOST POPULAR</div>
              <div className="card-header">
                <h3 className="tier-name">Adept</h3>
                <div className="price-tag">$49<span>/mo</span></div>
              </div>
              <ul className="feature-list">
                <li>Full Inari & Raiden Access</li>
                <li>Priority Debugging</li>
                <li>Unlimited Projects</li>
                <li>API Access</li>
              </ul>
              <button className="btn btn-primary-gold full-width">Ascend Now</button>
            </div>

            <div className="price-card hidden">
              <div className="card-header">
                <h3 className="tier-name">Ascendant</h3>
                <div className="price-tag">$99<span>/mo</span></div>
              </div>
              <ul className="feature-list">
                <li><strong>All Pillar Access</strong></li>
                <li>Dedicated Mentor</li>
                <li>White-label Solutions</li>
                <li>Early Beta Access</li>
              </ul>
              <button className="btn btn-neon-border full-width">Contact Us</button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default LandingPage;
