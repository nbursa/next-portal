import React, {useEffect, useRef} from "react";
import styled from 'styled-components';

type SpotlightProps = {
  id: number,
  initialX: number,
  initialY: number,
  boundaryX: [number, number],
  boundaryY: [number, number],
  ringColor: string,
  ringSize: number
};

type StyledSpotlightProps = {
  ringColor: string;
};

const Spotlight: React.FC<SpotlightProps> = ({ initialX, initialY, boundaryX, boundaryY, ringColor, ringSize,  id }) => {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const circleRadius = ringSize;
  // const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const StyledSpotlight = styled.div<StyledSpotlightProps>`
    width: 70vw;
    height: 70vw;
    border-radius: 50%;
    position: absolute;
    will-change: transform;
    pointer-events: none;
    left: 0;
    top: 0;
    background-color: ${(props) => props.ringColor};
    opacity: 0.05;
    filter: blur(100px);
  `;

  const getRandomDirection = (): number => (Math.random() > 0.5 ? 1 : -1);

  useEffect(() => {
    let x = initialX - circleRadius;
    let y = initialY - circleRadius;
    let dx = getRandomDirection() * (Math.random() + 0.5) / 2;
    let dy = getRandomDirection() * (Math.random() + 0.5) / 2;

    const moveSpotlight = () => {
      if (spotlightRef.current === null) return;

      // const distanceToMouse = Math.sqrt(
      //   Math.pow(x - mousePos.x, 2) + Math.pow(y - mousePos.y, 2)
      // );

      // if (distanceToMouse < 100) {
      //   dx = -dx;
      //   dy = -dy;
      // }

      if (x < boundaryX[0] || x > boundaryX[1]) dx = -dx;
      if (y < boundaryY[0] || y > boundaryY[1]) dy = -dy;

      x += dx;
      y += dy;

      spotlightRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      requestAnimationFrame(moveSpotlight);
    };

    moveSpotlight();
  }, [boundaryX, boundaryY, circleRadius, initialX, initialY]);

  return (
    <StyledSpotlight
      id={`${id}`}
      ref={spotlightRef}
      ringColor={ringColor}
    ></StyledSpotlight>
  );
};

export default Spotlight;
