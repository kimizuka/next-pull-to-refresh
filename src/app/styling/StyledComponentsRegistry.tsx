'use client';

import React, { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

export function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ styledComponentsStyleSheet ] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();

    // ts: Property 'clearTag' does not exist on type 'ServerStyleSheet'
    // @ts-ignore
    styledComponentsStyleSheet.instance.clearTag();

    return <>{ styles }</>;
  });

  if (typeof window !== 'undefined') return <>{children}</>;

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      { children as React.ReactElement }
    </StyleSheetManager>
  );
}