'use client';

import styled, { keyframes } from 'styled-components';
import { TbReload } from 'react-icons/tb';
import {
  ReactNode,
  useEffect,
  useCallback,
  useRef,
  useState,
  TouchEvent
} from 'react';

enum scrollStateType {
  start,
  move,
  end
}

export function PullToRefreshView({
  children,
  onRefresh = function() {}
}: {
  children: ReactNode;
  onRefresh?: () => void;
}) {
  const scrollYRef = useRef<number>(0);
  const scrollStateRef = useRef<scrollStateType>(scrollStateType.end);
  const [ startY, setStartY ] = useState<number>(0);
  const [ scrollY, setScrollY ] = useState<number>(scrollYRef.current);

  useEffect(() => {
    tick();
  }, []);

  const handleTouchStart = useCallback((evt: TouchEvent) => {
    setStartY(evt.touches[0].clientY);
    scrollStateRef.current = scrollStateType.start;
  }, []);

  const handleTouchMove = useCallback((evt: TouchEvent) => {
    if (evt.touches[0].clientY - startY < 0) {
      return;
    }

    const scrollRate = 10;

    scrollYRef.current = Math.max(Math.sqrt((evt.touches[0].clientY - startY) * scrollRate), 0);
    scrollStateRef.current = scrollStateType.move;
    setScrollY(scrollYRef.current);
  }, [startY]);

  const handleTouchEnd = useCallback(() => {
    const limitScrollY = 40;
    scrollStateRef.current = scrollStateType.end;

    if (limitScrollY <= scrollY) {
      onRefresh();
    }
  }, [scrollY]);

  const tick = useCallback(() => {
    if (scrollStateRef.current === scrollStateType.end) {
      const scrollRate = .9;

      scrollYRef.current = scrollYRef.current * scrollRate;

      if (Math.abs(scrollYRef.current) < 1) {
        scrollYRef.current = 0;
      }

      setScrollY(scrollYRef.current);
    }

    requestAnimationFrame(tick);
  }, [scrollY]);

  return (
    <Wrapper
      onTouchStart={ handleTouchStart }
      onTouchMove={ handleTouchMove }
      onTouchEnd={ handleTouchEnd }
    >
      <div style={{ transform: `translateY(${ scrollY }px)` }}>{ children }</div>
      <p style={{
        opacity: Math.min(scrollY, 1),
        transform: `translateY(${ Math.min(scrollY, 40) }px)`
      }}>
        <TbReload />
      </p>
    </Wrapper>
  );
}

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div`
  position: fixed;
  top: 0; bottom: 0;
  left: 0; right: 0;
  
  > div {
    position: relative;
    width: 100%;
    height: 100%;
  }

  > p {
    position: absolute;
    top: 16px;
    left: 0; right: 0;
    font-size: 32px;
    text-align: center;
    transition: opacity .2s ease-in-out;

    svg {
      color: #424242;
      animation: ${ rotate } .8s linear infinite;
    }
  }
`;
