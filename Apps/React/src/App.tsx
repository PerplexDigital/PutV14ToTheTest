import React, { useEffect, useRef, useState } from 'react';
import { UMB_CURRENT_USER_CONTEXT } from '@umbraco-cms/backoffice/current-user';
import { UUIBoxElement } from '@umbraco-cms/backoffice/external/uui';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { UMB_NOTIFICATION_CONTEXT, UmbNotificationContext } from '@umbraco-cms/backoffice/notification';

interface Props {
  mountElem: HTMLElement;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'uui-box': React.DetailedHTMLProps<any, any>;
    }
  }
}

const ReactApp: React.FC<Props> = ({ mountElem }) => {
  const rootElement = useRef<HTMLDivElement>(null);
  const [username, setUsername] = useState<string>('');

  const [notificationInstance, setNotificationInstance] = useState<UmbNotificationContext>();

  useEffect(() => {
    const host = (mountElem.getRootNode() as any).host as UmbLitElement;

    host.consumeContext(UMB_CURRENT_USER_CONTEXT, (context) => {
      context.currentUser.subscribe((user) => {
        setUsername(user?.name ?? '');
      });
    });

    host.consumeContext(UMB_NOTIFICATION_CONTEXT, (instance) => {
      setNotificationInstance(instance);
    })
  }, [mountElem]);

  function sendNotification() {
    notificationInstance?.peek("positive", {
      data: {
        message: "Wow, I sent a notification from within a React sapp",
      }
    })
  }

  return (
    <div ref={rootElement}>
      <uui-box headline={`Hello ${username} from React!`} headline-variant="h5">
      <svg width="200px" height="200px" viewBox="-10.5 -9.45 21 18.9" style={{ color: '#58c4dc' }} fill="#58c4dc" xmlns="http://www.w3.org/2000/svg" ><circle cx="0" cy="0" r="2" fill="currentColor"></circle><g stroke="currentColor" strokeWidth="1" fill="none"><ellipse rx="10" ry="4.5"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse></g></svg>

        <p>
          This is a UUI Box element. Unfortunately, it doesn’t work to use
          uui-button element, for example, because the extension of UmbElement
          causes issues within React.
        </p>

        <button onClick={() => { sendNotification() }}>Notification</button>
      </uui-box>
    </div>
  );
};


export default ReactApp;
