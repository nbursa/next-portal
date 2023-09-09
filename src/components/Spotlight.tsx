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
  ringSize: number;
};

const StyledSpotlight = styled.div<StyledSpotlightProps>`
  width: ${props => props.ringSize/2}vw;
  height: ${props => props.ringSize/2}vw;
  border-radius: 50%;
  position: absolute;
  will-change: transform;
  pointer-events: none;
  top: 0;
  left: 0;
  background-color: ${(props) => props.ringColor};
  opacity: 0.05;
  filter: blur(100px);
`;

const Spotlight: React.FC<SpotlightProps> = ({ initialX, initialY, boundaryX, boundaryY, ringColor, ringSize, id }) => {
  const spotlightRef = useRef<HTMLDivElement>(null);

  const getRandomDirection = (): number => (Math.random() > 0.5 ? 1 : -1);
  const getRandomPosition = (min: number, max: number) => Math.random() * (max - min) + min;

  useEffect(() => {
    const circleRadius = ringSize * 1.75;
    let x = initialX - circleRadius;
    let y = initialY - circleRadius;
    let dx = getRandomDirection() * Math.random() / 2;
    let dy = getRandomDirection() * Math.random() / 2;

    const moveSpotlight = () => {
      if (spotlightRef.current === null) return;

      if (x < boundaryX[0] || x > boundaryX[1]) dx = -dx;
      if (y < boundaryY[0] || y > boundaryY[1]) dy = -dy;

      x += dx;
      y += dy;

      spotlightRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      requestAnimationFrame(moveSpotlight);
    };

    moveSpotlight();
  }, [boundaryX, boundaryY, initialX, initialY, ringSize]);

  return (
    <StyledSpotlight
      id={`${id}`}
      ref={spotlightRef}
      ringColor={ringColor}
      ringSize={ringSize}
    ></StyledSpotlight>
  );
};

export default Spotlight;
