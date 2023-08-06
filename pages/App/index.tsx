import React from 'react';
import Chat from './chat';
import {Toaster} from 'sonner';

export default function App() {
    return (
        <>
            <Chat/>
            <Toaster position="top-center" duration={1200}/>
        </>
    );
}
