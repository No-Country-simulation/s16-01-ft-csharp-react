import { createApi } from '@reduxjs/toolkit/query/react';
import { io } from 'socket.io-client';
import { MAIN_API } from '../config/routes_api';

export interface Event<Data> {
  name: string;
  data: Data;
}

export interface Auth {
  serverOffset: number;
}

export const socket = io(MAIN_API, {
  auth: {
    serverOffset: 0,
  },
  transports: ['websocket'],
  ackTimeout: 2000,
  retries: 3,
});

const connected = new Promise<void>((resolve) => {
  socket.on('connect', resolve);
});

export const socketSlice = createApi({
  reducerPath: 'socket',
  baseQuery: async (options: Event<any>) => {
    await connected;
    socket.emit(options.name, ...options.data);
    return { data: options };
  },
  endpoints: (build) => ({
    sendMessage: build.mutation<void, { message: string; clientOffset: number }>({
      query: ({ message, clientOffset }) => ({
        name: '#6CAbaFWVm%t8bS4',
        data: [message, clientOffset],
      }),
    }),
    receiveMessages: build.query<{ message: string; clientOffset: number }[], void>({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(
        _arg,
        { cacheEntryRemoved, updateCachedData, cacheDataLoaded }
      ) {
        await cacheDataLoaded;
        await connected;

        socket.on('#6CAbaFWVm%t8bS4', (message: string, clientOffset: number) => {
          (socket.auth as Auth).serverOffset = clientOffset;
          updateCachedData((draft) => {
            draft.push({ message, clientOffset: clientOffset });
          });
        });
        await cacheEntryRemoved;
        socket.off('#6CAbaFWVm%t8bS4');
      },
    }),
  }),
});

export const { useSendMessageMutation, useReceiveMessagesQuery } = socketSlice;
