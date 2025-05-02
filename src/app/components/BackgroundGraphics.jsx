"use client";
import { useEffect, useRef } from "react";

const CombinedBackground = () => {
  const canvasRef = useRef(null);
  const interactiveBubbleRef = useRef(null);
  
  // Curvy Background Settings
  const layers = 5;
  const colors = [
    ["#00BBFF", "#0066FF", "#00224C"], // Adjusted colors to match bubble theme
    ["#7700FF", "#6600CC", "#330066"],
    ["#00DD66", "#00AA44", "#004422"],
    ["#FF5500", "#FF2266", "#991133"],
    ["#5533FF", "#2233CC", "#111166"]
  ];

  useEffect(() => {
    // Canvas setup for curvy lines
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let scrollOffset = 0;

    // Interactive bubble setup
    const interBubble = interactiveBubbleRef.current;
    let curX = 0;
    let curY = 0;
    let tgX = width / 2;
    let tgY = height / 2;

    // Resize handler
    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    // Scroll handler
    window.addEventListener("scroll", () => {
      scrollOffset = window.scrollY / 500;
    });

    // Mouse movement handler for interactive bubble
    const handleMouseMove = (event) => {
      tgX = event.clientX;
      tgY = event.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Smooth bubble movement
    function moveBubble() {
      curX += (tgX - curX) / 10;
      curY += (tgY - curY) / 10;
      interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
      requestAnimationFrame(moveBubble);
    }
    moveBubble();

    // Line class for curved lines animation
    class Line {
      constructor(layer) {
        this.layer = layer;
        this.points = [];
        this.amplitude = Math.random() * 80 + 20; // Slightly reduced amplitude
        this.wavelength = Math.random() * 200 + 50;
        this.speed = Math.random() * 0.02 + 0.01; // Slightly reduced speed
        this.colorPair = colors[layer % colors.length];
        this.offset = Math.random() * 2000;
        
        // Random path type (0-2)
        this.pathType = Math.floor(Math.random() * 3);
        
        // Random exit behavior (true = fade out, false = move out of screen)
        this.fadeOut = Math.random() > 0.5;
        
        // Life cycle properties
        this.lifespan = Math.random() * 300 + 200;
        this.age = Math.random() * this.lifespan; // Start at random age
        
        // 3D effect properties
        this.depth = Math.random() * 0.5 + 0.5; // Depth factor (0.5-1.0)
        this.zSpeed = Math.random() * 0.003 + 0.001; // Slightly reduced z speed
        
        // Path properties
        this.direction = Math.random() * Math.PI * 2;
        this.centerX = Math.random() * width;
        this.centerY = Math.random() * height;
        this.rotationSpeed = (Math.random() - 0.5) * 0.008; // Reduced rotation speed
        this.expansionRate = Math.random() * 0.5 + 0.5;
        
        // Movement vectors
        this.vx = (Math.random() - 0.5) * 1.5; // Reduced speed
        this.vy = (Math.random() - 0.5) * 1.5;
        
        // Create points
        const length = Math.random() * 200 + 100;
        for (let i = 0; i < length; i += 5) {
          this.points.push({ x: 0, y: 0 });
        }
      }

      update(t) {
        // Update age
        this.age += 1;
        
        // Update position
        this.centerX += this.vx;
        this.centerY += this.vy;
        
        // Update direction
        this.direction += this.rotationSpeed;
        
        // Update depth (3D effect)
        this.depth = 0.5 + Math.sin(t * this.zSpeed + this.offset) * 0.3;
        
        // Reset if out of bounds or reached end of life
        if (this.age >= this.lifespan || 
            this.centerX < -200 || this.centerX > width + 200 || 
            this.centerY < -200 || this.centerY > height + 200) {
          this.reset(t);
        }
      }
      
      reset(t) {
        // Reset position to enter from edge
        const edge = Math.floor(Math.random() * 4);
        switch(edge) {
          case 0: // Top
            this.centerX = Math.random() * width;
            this.centerY = -100;
            this.vy = Math.abs(this.vy);
            break;
          case 1: // Right
            this.centerX = width + 100;
            this.centerY = Math.random() * height;
            this.vx = -Math.abs(this.vx);
            break;
          case 2: // Bottom
            this.centerX = Math.random() * width;
            this.centerY = height + 100;
            this.vy = -Math.abs(this.vy);
            break;
          case 3: // Left
            this.centerX = -100;
            this.centerY = Math.random() * height;
            this.vx = Math.abs(this.vx);
            break;
        }
        
        // Randomize properties for next life
        this.pathType = Math.floor(Math.random() * 3);
        this.fadeOut = Math.random() > 0.5;
        this.age = 0;
        this.lifespan = Math.random() * 300 + 200;
        this.offset = t * 10;
        this.direction = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.008;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
      }

      draw(t) {
        // Calculate life progress (0-1)
        const lifeProgress = this.age / this.lifespan;
        
        // Calculate opacity based on life progress
        let opacity = 0.3 + 0.15 * this.layer; // Reduced opacity
        
        // If fading out is the chosen exit strategy
        if (this.fadeOut && lifeProgress > 0.7) {
          opacity *= (1 - (lifeProgress - 0.7) / 0.3);
        }
        
        // Skip rendering if almost invisible
        if (opacity < 0.02) return;
        
        // Line width changes with depth for 3D effect
        const lineWidth = (1.5 + this.layer * 1.5) * this.depth; // Thinner lines
        
        ctx.beginPath();
        
        // Draw points based on selected path type
        for (let i = 0; i < this.points.length; i++) {
          const segmentProgress = i / this.points.length;
          let angle, distance, x, y, wave;
          
          switch(this.pathType) {
            case 0: // Spiral path
              angle = this.direction + (segmentProgress * Math.PI * 2);
              distance = segmentProgress * 150 * this.expansionRate;
              x = this.centerX + Math.cos(angle) * distance;
              y = this.centerY + Math.sin(angle) * distance;
              wave = Math.sin((t * this.speed + segmentProgress * 5 + this.offset)) * this.amplitude;
              break;
              
            case 1: // Sinusoidal path
              angle = this.direction;
              distance = segmentProgress * 200;
              x = this.centerX + Math.cos(angle) * distance;
              y = this.centerY + Math.sin(angle) * distance;
              wave = Math.sin((t * this.speed + segmentProgress * 10 + this.offset)) * this.amplitude;
              break;
              
            case 2: // Lissajous path
              const a = 3 + Math.floor(Math.random() * 3);
              const b = 2 + Math.floor(Math.random() * 4);
              angle = segmentProgress * Math.PI * 2;
              x = this.centerX + Math.sin(a * angle + t * this.speed * 0.3) * 100;
              y = this.centerY + Math.sin(b * angle + this.offset * 0.01) * 100;
              wave = Math.sin((t * this.speed + segmentProgress * 8 + this.offset)) * this.amplitude * 0.5;
              break;
          }
          
          // Add wave effect
          const waveAngle = Math.atan2(y - this.centerY, x - this.centerX) + Math.PI/2;
          const finalX = x + Math.cos(waveAngle) * wave;
          const finalY = y + Math.sin(waveAngle) * wave;
          
          if (i === 0) {
            ctx.moveTo(finalX, finalY);
          } else {
            ctx.lineTo(finalX, finalY);
          }
        }
        
        // Create gradient that shifts over time
        const gradientOffset = (Math.sin(t * 0.001 + this.offset * 0.01) + 1) / 2;
        const grad = ctx.createLinearGradient(
          this.centerX - 200, 
          this.centerY - 200, 
          this.centerX + 200, 
          this.centerY + 200
        );
        
        // Create smooth gradient transition between three colors
        grad.addColorStop(0, this.colorPair[0]);
        grad.addColorStop(0.5 + gradientOffset * 0.5, this.colorPair[1]);
        grad.addColorStop(1, this.colorPair[2]);
        
        ctx.strokeStyle = grad;
        ctx.lineWidth = lineWidth;
        ctx.globalAlpha = opacity;
        ctx.stroke();
      }
    }

    const lines = Array.from({ length: layers * 3 }, (_, i) => new Line(i % layers));

    let t = 0;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Sort lines by depth for better 3D effect
      lines.sort((a, b) => a.depth - b.depth);
      
      lines.forEach((line) => {
        line.update(t);
        line.draw(t);
      });
      
      t += 0.5 + scrollOffset;
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", () => {
        scrollOffset = window.scrollY / 500;
      });
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* SVG Filters */}
      <svg xmlns="http://www.w3.org/2000/svg" className="fixed w-0 h-0">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Base gradient background */}
      <div className="fixed top-0 left-0 w-full h-full -z-30 overflow-hidden bg-gradient-to-br from-[#0a0a0a] to-[#12122a]"></div>

      {/* Bubble gradients layer */}
      <div className="fixed top-0 left-0 w-full h-full -z-20 overflow-hidden">
        <div className="gradients-container" style={{ filter: 'url(#goo) blur(40px)', width: '100%', height: '100%' }}>
          {/* Gradient Bubbles */}
          <div
            className="g1 absolute"
            style={{
              background: 'radial-gradient(circle at center, rgba(0, 183, 255, 0.8) 0, rgba(0, 183, 255, 0) 50%) no-repeat',
              mixBlendMode: 'hard-light',
              width: '80%',
              height: '80%',
              top: 'calc(50% - 40%)',
              left: 'calc(50% - 40%)',
              transformOrigin: 'center center',
              animation: 'moveVertical 30s ease infinite',
              opacity: 0.4
            }}
          />
          <div
            className="g2 absolute"
            style={{
              background: 'radial-gradient(circle at center, rgba(119, 0, 255, 0.8) 0, rgba(119, 0, 255, 0) 50%) no-repeat',
              mixBlendMode: 'hard-light',
              width: '80%',
              height: '80%',
              top: 'calc(50% - 40%)',
              left: 'calc(50% - 40%)',
              transformOrigin: 'calc(50% - 400px)',
              animation: 'moveInCircle 20s reverse infinite',
              opacity: 0.4
            }}
          />
          <div
            className="g3 absolute"
            style={{
              background: 'radial-gradient(circle at center, rgba(0, 255, 136, 0.8) 0, rgba(0, 255, 136, 0) 50%) no-repeat',
              mixBlendMode: 'hard-light',
              width: '80%',
              height: '80%',
              top: 'calc(50% - 40% + 200px)',
              left: 'calc(50% - 40% - 500px)',
              transformOrigin: 'calc(50% + 400px)',
              animation: 'moveInCircle 40s linear infinite',
              opacity: 0.3
            }}
          />
          <div
            className="g4 absolute"
            style={{
              background: 'radial-gradient(circle at center, rgba(85, 51, 255, 0.8) 0, rgba(85, 51, 255, 0) 50%) no-repeat',
              mixBlendMode: 'hard-light',
              width: '80%',
              height: '80%',
              top: 'calc(50% - 40%)',
              left: 'calc(50% - 40%)',
              transformOrigin: 'calc(50% - 200px)',
              animation: 'moveHorizontal 40s ease infinite',
              opacity: 0.3
            }}
          />
          <div
            className="g5 absolute"
            style={{
              background: 'radial-gradient(circle at center, rgba(0, 106, 255, 0.8) 0, rgba(0, 106, 255, 0) 50%) no-repeat',
              mixBlendMode: 'hard-light',
              width: '160%',
              height: '160%',
              top: 'calc(50% - 80%)',
              left: 'calc(50% - 80%)',
              transformOrigin: 'calc(50% - 800px) calc(50% + 200px)',
              animation: 'moveInCircle 20s ease infinite',
              opacity: 0.3
            }}
          />
          {/* Interactive bubble that follows mouse */}
          <div
                ref={interactiveBubbleRef}
                className="interactive absolute"
                style={{
                  background: 'radial-gradient(circle at center, rgba(140, 100, 255, 0.8) 0, rgba(140, 100, 255, 0) 50%) no-repeat',
                  mixBlendMode: 'hard-light',
                  width: '100%',
                  height: '100%',
                  top: '-50%',
                  left: '-50%',
                  opacity: 0.3,
                  willChange: 'transform'
                }}
                />
              </div>
              </div>

              {/* CSS Animations */}
      <style jsx>{`
        @keyframes moveInCircle {
          0% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(180deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes moveVertical {
          0% {
            transform: translateY(-50%);
          }
          50% {
            transform: translateY(50%);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        @keyframes moveHorizontal {
          0% {
            transform: translateX(-50%) translateY(-10%);
          }
          50% {
            transform: translateX(50%) translateY(10%);
          }
          100% {
            transform: translateX(-50%) translateY(-10%);
          }
        }
      `}</style>
    </>
  );
};

export default CombinedBackground;