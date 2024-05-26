import { useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';

interface AppDataRequest {
  category: string;
  name: string;
  props: Record<string, unknown>;
}

const useSocket = (clientuid: string) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const initializeSocket = async () => {
      /*const generateKey = async (): Promise<string> => {
        const str = new TextEncoder().encode((new Date()).toISOString().substring(0, 15)); // encode as (utf-8) Uint8Array
        const hashBuffer = createHash('sha256').update(str).digest('hex');
        const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
        const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join(""); // convert bytes to hex string
        return hashHex;
      };*/

      const key = 'ada8bc995cdfb9eba62690f233485915';

      console.log(key);
      
      const socket = io('https://supervisorplus.com', {
        reconnection: false,
        reconnectionAttempts: 1100,
        reconnectionDelay: 2000,
        reconnectionDelayMax: 5000,
        randomizationFactor: 0.5,
        query: {
          token: 123123123,
          clientuid,
          key,
          manual: true,
        },
      });

      socket.on('connect', () => {
        console.log('SOCKETIO CONNECTED');

        const appDataRequest: AppDataRequest = {
          category: 'appCalls',
          name: 'appData',
          props: {},
        };

        socket.emit('request__fromclient', appDataRequest, (response: any) => {
          console.log({ socketioMsg: 'appData', response });
        });

        console.log('SEND AppState ACTIVE to the server');
        socket.emit('appStateChanged', { state: 'ACTIVE' });

        socket.emit('appCurrentsChanged', {
          contentId: 308,
          plantId: 10,
          unitId: 0,
        });
      });

      socket.on('connect_error', (error) => {
        console.log('index.js. Socket "connect_error" event', error);
      });

      socket.on('error', (error) => {
        console.log('Socket "error" event', error);
      });

      socket.on('disconnect', (reason) => {
        if (reason === 'io server disconnect') {
          console.log('DEV_MSG. io server disconnect:', reason);
        } else if (reason === 'transport close') {
          console.log('DEV_MSG. Потеря подключения с сервером:', reason);
        } else { // 'io client disconnect'
          console.log('DEV_MSG. Socket is disconnected by client:', reason);
        }
      });

      socket.on('action', (data) => {
        console.log({ socketEvent: 'action', data });
      });

      socket.on('data', (data, fn) => {
        console.log({ socketEvent: 'data', data });
        fn('Got it!');
      });

      socket.on('test', (data) => {
        console.log({ socketEvent: 'test', data });
      });

      socket.open();

      socketRef.current = socket;

      return () => {
        socket.close();
      };
    };

    initializeSocket();
  }, [clientuid]);

  return socketRef.current;
};

export default useSocket;