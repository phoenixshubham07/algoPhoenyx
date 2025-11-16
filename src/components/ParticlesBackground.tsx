import { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { type Container, type ISourceOptions, MoveDirection, OutMode } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';
import { usePathname } from 'next/navigation';

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    if (container) {
      console.log('Particles container loaded', container);
    }
  };

  const options: ISourceOptions = useMemo(() => {
    let particleColor: string | string[] = '#ffffff';
    let lineColor: string | string[] = '#ffaa00'; // Default gold

    switch (pathname) {
      case '/':
        particleColor = ['#ffaa00', '#00f3ff', '#FF69B4']; // Gold, Blue, Pink
        lineColor = 'random'; // This will now work with tsparticles
        break;
      case '/hikari':
        lineColor = '#00f3ff'; // Blue
        break;
      case '/tavern':
        lineColor = '#ffaa00'; // Gold
        break;
      case '/judgement-hall':
        lineColor = '#FF69B4'; // Pink
        break;
      default:
        lineColor = '#ffaa00';
        particleColor = '#ffffff';
        break;
    }

    return {
      background: {
        color: {
          value: '#000000',
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: 'push',
          },
          onHover: {
            enable: true,
            mode: 'grab',
          },
          resize: true,
        },
        modes: {
          push: {
            quantity: 4,
          },
          grab: {
            distance: 140,
            links: {
              opacity: 1,
            },
          },
          bubble: { distance: 400, size: 40, duration: 2, opacity: 0.8 },
          repulse: { distance: 200, duration: 0.4 },
          remove: { particles_nb: 2 },
        },
      },
      particles: {
        color: {
          value: particleColor,
        },
        links: {
          color: lineColor,
          distance: 150,
          enable: true,
          opacity: 0.6,
          width: 1,
          consent: false,
          triangles: {
            enable: false,
          },
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: {
            default: OutMode.out,
          },
          random: false,
          speed: 2,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 120,
        },
        opacity: {
          value: 0.5,
          animation: {
            enable: true,
            speed: 1,
            minimumValue: 0.1,
            sync: false,
          },
        },
        shape: {
          type: 'circle',
        },
        size: {
          value: { min: 1, max: 3 },
          animation: {
            enable: false,
          },
        },
      },
      detectRetina: true,
    };
  }, [pathname]);

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
        style={{
          position: 'fixed',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      />
    );
  }

  return <></>;
};

export default ParticlesBackground;
