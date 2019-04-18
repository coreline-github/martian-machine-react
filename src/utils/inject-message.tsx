import React, { useContext } from 'react';

export const MessageContext = React.createContext('');

export interface InjectMessageProps {
  message?: string;
}

export function injectMessage<T>(Component: (props: T & InjectMessageProps) => any) {
  return (props: T) => {
    const message = useContext(MessageContext);

    return (
      <Component {...props} message={message} />
    );
  }
}
