'use client';

import Script from 'next/script';
import { useRef } from 'react';
import './HikariSplash.css';

declare const gsap: any;

interface HikariSplashProps {
  onFinished: () => void;
}

const HikariSplash = ({ onFinished }: HikariSplashProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const runAnimation = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    if (typeof gsap === 'undefined') {
      setTimeout(onFinished, 500);
      return;
    }

    const n = 19;
    const rots = [
        { ry: 270, a: 0.5 },
        { ry: 0, a: 0.85 },
        { ry: 90, a: 0.4 },
        { ry: 180, a: 0.0 }
    ];

    gsap.set(container.querySelectorAll(".face"), {
        z: 200,
        rotateY: (i: number) => rots[i % 4].ry,
        transformOrigin: "50% 50% -201px"
    });

    const tray = container.querySelector('.tray');
    if (!tray) return;
    const dieTemplate = tray.querySelector('.die');
    if (!dieTemplate) return;

    for (let i = 0; i < n; i++) {
        let currentDie = (i === 0) ? dieTemplate : dieTemplate.cloneNode(true);
        if (i > 0) tray.append(currentDie);
        
        const cube = (currentDie as HTMLElement).querySelector('.cube');
        if (!cube) continue;

        const facesInThisCube = cube.querySelectorAll('.face');

        gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'power3.inOut', duration: 0.75 } }) // Speed up color animation
            .fromTo(cube, { rotateY: -90 }, { rotateY: 90, ease: 'power1.inOut', duration: 1.5 }) // Speed up cube rotation
            .fromTo(facesInThisCube, {
                color: (j: number) => `hsl(${(i / n) * 75 + 181}, 67%, ${100 * (rots[[3, 0, 1, 2][j % 4]]?.a ?? 0)}%)` // Change hue to neon-cyan (181)
            }, {
                color: (j: number) => `hsl(${(i / n) * 75 + 181}, 67%, ${100 * (rots[[0, 1, 2, 3][j % 4]]?.a ?? 0)}%)` // Change hue to neon-cyan (181)
            }, 0)
            .to(facesInThisCube, {
                color: (j: number) => `hsl(${(i / n) * 75 + 181}, 67%, ${100 * (rots[[1, 2, 3, 0][j % 4]]?.a ?? 0)}%)` // Change hue to neon-cyan (181)
            }, 0.75) // Match new color animation duration
            .progress(i / n);
    }

    gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'power1.inOut' } })
        .from(tray, { yPercent: -3, duration: 1.5 }, 0) // Speed up tray animation
        .fromTo(tray, { rotate: -15 }, { rotate: 15, duration: 3 }, 0) // Speed up tray animation
        .from(container.querySelectorAll('.die'), { duration: 0.01, opacity: 0, stagger: { each: -0.05, ease: 'power1.in' } }, 0)
        .to(tray, { scale: 1.2, duration: 1.5, ease: 'power3.inOut' }, 0); // Speed up tray animation

    const handleResize = () => {
        const h = n * 56;
        gsap.set(tray, { height: h });
        const pov = container.querySelector('.pov');
        if (pov) gsap.set(pov, { scale: window.innerHeight / h });
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);

    setTimeout(() => {
      gsap.to(container, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          window.removeEventListener('resize', handleResize);
          gsap.globalTimeline.clear();
          onFinished();
        }
      });
    }, 2000); // Reduce total display time to 2 seconds
  };

  return (
    <div ref={containerRef} className="hikari-splash-container">
      <Script id="gsap-script" src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" strategy="afterInteractive" onLoad={runAnimation} />
      <div className="hikari-splash-font">
        <div className="pov">
            <div className="tray">
                <div className="die">
                    <div className="cube">
                        <div className="face" style={{fontSize: '60px'}}>algo</div>
                        <div className="face" style={{fontSize: '58px'}}>Amaterasu</div>
                        <div className="face" style={{fontSize: '55px'}}>Hikari</div>
                        <div className="face" style={{fontSize: '55px'}}></div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HikariSplash;
