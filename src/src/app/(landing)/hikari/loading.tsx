'use client';

import Script from 'next/script';
import { useRef } from 'react';
import './hikari-loading.css';

declare const gsap: any;

const HikariLoading = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const runAnimation = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    if (typeof gsap === 'undefined') {
        console.error("GSAP not loaded");
        return;
    }

    const n = 19;
    const rots = [
        { ry: 270, a: 0.5 },
        { ry: 0, a: 0.85 },
        { ry: 90, a: 0.4 },
        { ry: 180, a: 0.0 }
    ];

    const tray = container.querySelector('.tray');
    if (!tray) return;

    const dieTemplate = tray.querySelector('.die');
    if (!dieTemplate) return;

    // Clear any clones from previous renders (e.g. HMR)
    while (tray.children.length > 1) {
        tray.removeChild(tray.lastChild!);
    }
    
    gsap.set(container.querySelectorAll(".face"), {
        z: 200,
        rotateY: (i: number) => rots[i % 4].ry, // Use modulo for safety
        transformOrigin: "50% 50% -201px"
    });

    for (let i = 0; i < n; i++) {
        let currentDie;
        if (i === 0) {
            currentDie = dieTemplate;
        } else {
            currentDie = dieTemplate.cloneNode(true) as HTMLElement;
            tray.append(currentDie);
        }
        
        const cube = currentDie.querySelector('.cube');
        if (!cube) continue;

        const facesInThisCube = cube.querySelectorAll('.face');

        gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'power3.inOut', duration: 1 } })
            .fromTo(cube, {
                rotateY: -90
            }, {
                rotateY: 90,
                ease: 'power1.inOut',
                duration: 2
            })
            .fromTo(facesInThisCube, {
                color: (j: number) => {
                    const rotIndex = [3, 0, 1, 2][j % 4];
                    const lightness = 100 * (rots[rotIndex]?.a ?? 0);
                    return `hsl(${(i / n) * 75 + 130}, 67%, ${lightness}%)`;
                }
            }, {
                color: (j: number) => {
                    const rotIndex = [0, 1, 2, 3][j % 4];
                    const lightness = 100 * (rots[rotIndex]?.a ?? 0);
                    return `hsl(${(i / n) * 75 + 130}, 67%, ${lightness}%)`;
                }
            }, 0)
            .to(facesInThisCube, {
                color: (j: number) => {
                    const rotIndex = [1, 2, 3, 0][j % 4];
                    const lightness = 100 * (rots[rotIndex]?.a ?? 0);
                    return `hsl(${(i / n) * 75 + 130}, 67%, ${lightness}%)`;
                }
            }, 1)
            .progress(i / n);
    }

    gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'power1.inOut' } })
        .from(tray, { yPercent: -3, duration: 2 }, 0)
        .fromTo(tray, { rotate: -15 }, { rotate: 15, duration: 4 }, 0)
        .from(container.querySelectorAll('.die'), { duration: 0.01, opacity: 0, stagger: { each: -0.05, ease: 'power1.in' } }, 0)
        .to(tray, { scale: 1.2, duration: 2, ease: 'power3.inOut' }, 0);

    const handleResize = () => {
        const h = n * 56;
        gsap.set(tray, { height: h });
        const pov = container.querySelector('.pov');
        if (pov) {
            gsap.set(pov, { scale: window.innerHeight / h });
        }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
        gsap.killTweensOf(container.querySelectorAll('*'));
    };
  };

  return (
    <>
      <Script
        id="gsap-script"
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
        strategy="afterInteractive"
        onLoad={runAnimation}
      />
      <div ref={containerRef} className="hikari-loading-container">
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
    </>
  );
};

export default HikariLoading;
