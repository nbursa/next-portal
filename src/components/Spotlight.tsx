import React, {useEffect, useRef, useState} from "react";

type SpotlightProps = {
  id: number,
  initialX: number,
  initialY: number,
  boundaryX: [number, number],
  boundaryY: [number, number],
  ringColor: string
};

const Spotlight: React.FC<SpotlightProps> = ({ initialX, initialY, boundaryX, boundaryY, ringColor, id }) => {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const circleRadius = (window.innerHeight / 100 * 50) / 2;
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const getRandomDirection = (): number => (Math.random() > 0.5 ? 1 : -1);

  // useEffect(() => {
  //   const handleMouseMove = (e: MouseEvent) => {
  //     setMousePos({ x: e.clientX, y: e.clientY });
  //   };
  //
  //   window.addEventListener("mousemove", handleMouseMove);
  //
  //   return () => {
  //     window.removeEventListener("mousemove", handleMouseMove);
  //   };
  // }, []);

  useEffect(() => {
    let x = initialX - circleRadius;
    let y = initialY - circleRadius;
    let dx = getRandomDirection() * (Math.random() + 0.5) / 2;
    let dy = getRandomDirection() * (Math.random() + 0.5) / 2;

    const moveSpotlight = () => {
      if (spotlightRef.current === null) return;

      const distanceToMouse = Math.sqrt(
        Math.pow(x - mousePos.x, 2) + Math.pow(y - mousePos.y, 2)
      );

      if (distanceToMouse < 100) {
        dx = -dx;
        dy = -dy;
      }

      if (x < boundaryX[0] || x > boundaryX[1]) dx = -dx;
      if (y < boundaryY[0] || y > boundaryY[1]) dy = -dy;

      x += dx;
      y += dy;

      spotlightRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      requestAnimationFrame(moveSpotlight);
    };

    moveSpotlight();
  }, [boundaryX, boundaryY, circleRadius, initialX, initialY, mousePos.x, mousePos.y]);

  return (
    <div
      id={`${id}`}
      ref={spotlightRef}
      className="w-[70vw] h-[70vw] rounded-full absolute"
      style={{
        willChange: 'transform',
        pointerEvents: 'none',
        left: `0px`,
        top: `0px`,
        backgroundColor: ringColor,
        opacity: '0.05',
        filter: 'blur(100px)',
      }}
    ></div>
  );
};

export default Spotlight;
