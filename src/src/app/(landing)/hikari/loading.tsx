'use client';

import Script from 'next/script';
import Head from 'next/head';
import { useEffect, useRef } from 'react';

const HikariLoading = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRan = useRef(false);

  const runAnimation = () => {
    if (animationRan.current || !containerRef.current) return;
    

    const container = containerRef.current;
    if (typeof gsap === 'undefined') {
        console.error("GSAP not loaded");
        return;
    }
    animationRan.current = true;

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

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    
    const onLoad = () => {
      cleanup = runAnimation();
    }

    const script = document.querySelector('script[src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"]');

    if (window.gsap) {
      onLoad();
    } else {
      script?.addEventListener('load', onLoad);
    }
    
    return () => {
      script?.removeEventListener('load', onLoad);
      cleanup?.();
    };
  }, []);

  return (
    <>
      <Head>
        <title>Loading Hikari...</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap" rel="stylesheet" />
      </Head>
      <Script
        id="gsap-script"
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
        strategy="afterInteractive"
      />
      <div ref={containerRef} style={{
          fontFamily: '"Montserrat", sans-serif',
          fontWeight: 900,
          background: '#000',
          overflow: 'hidden',
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 0,
      }}>
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
        <style jsx global>{`
            .pov {
                width: 100%;
                height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0;
            }
            .die {
                width: 400px;
                height: 55px;
                padding-bottom: 9px;
                perspective: 999px;
            }
            .cube {
                position: absolute;
                width: 100%;
                height: 100%;
                transform-style: preserve-3d;
            }
            .face {
                position: absolute;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                backface-visibility: hidden;
            }
        `}</style>
      </div>
    </>
  );
};

export default HikariLoading;
