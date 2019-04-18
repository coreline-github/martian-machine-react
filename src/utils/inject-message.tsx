import React from 'react';

export const MessageContext = React.createContext('');

export interface InjectMessageProps {
  message?: string;
}

export function injectMessage<T>(Component: (props: T & InjectMessageProps) => any) {
  return (props: T) => {
    return (
      <MessageContext.Consumer>
        {message => <Component {...props} message={message} />}
      </MessageContext.Consumer>
    );
  }
}
