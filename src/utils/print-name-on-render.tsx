import React, { createContext } from 'react';

export const MessageContext = createContext('missing message :(');

export interface IPrintNameProps {
  message?: string;
}

export function printNameOnRender<T>(WrappedComponent: (props: T & IPrintNameProps) => any, componentName: string) {
  return (props: T & IPrintNameProps) => {
    console.log(`${props.message} ${componentName}`);

    return <WrappedComponent {...props} />;
  }
}
