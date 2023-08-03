'use client';
import {bitable, TableMeta} from '@base-open/web-api';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {TableParser} from '../utils/BaseSchema/tableParser';
import {DataWriter} from '../utils/BaseSchema/dataWriter';
import {Toaster} from 'sonner';
import Chat from './chat';
export default function App() {

    return (
        <div>
            <Toaster />
            <Chat/>
        </div>
    );
}
