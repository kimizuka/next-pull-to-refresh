'use client';

import styled from 'styled-components';
import { PullToRefreshView } from '@/components/elements/PullToRefreshView';
import { useCallback, useEffect, useRef, useState } from 'react';

export function IndexPageTemplate() {
  const [ text, setText ] = useState('Pull to Refresh');
  const timerRef = useRef<number>(-1);

  const handleRefresh = useCallback(() => {
    window.clearTimeout(timerRef.current);
    window.setTimeout(() => {
      setText('Pull to Refresh');
    }, 1000);
    setText('Refreshed!');
  }, []);

  return (
    <div>
      <PullToRefreshView onRefresh={ handleRefresh }>
        <Content>{ text }</Content>
      </PullToRefreshView>
    </div>
  )
}

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  color: white;
  background: black;
`;