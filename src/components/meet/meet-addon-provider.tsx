'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import {usePathname, useRouter} from 'next/navigation';

declare global {
  interface Window {
    MeetAddon: any;
  }
}

interface MeetAddonContextType {
  isAddon: boolean;
  meetingInfo: any | null;
  addonState: any | null;
  startCollaboration: () => void;
  setAddonState: (state: string) => void;
}

const MeetAddonContext = createContext<MeetAddonContextType | undefined>(
  undefined
);

export const MeetAddonProvider = ({children}: {children: React.ReactNode}) => {
  const [isAddon, setIsAddon] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);
  const [session, setSession] = useState<any | null>(null);
  const [meetingInfo, setMeetingInfo] = useState<any | null>(null);
  const [addonState, setAddonState] = useState<any | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAddon = async () => {
      if (typeof window.MeetAddon === 'undefined') {
        setIsAddon(false);
        return;
      }
      setIsAddon(true);
      try {
        const session = await window.MeetAddon.createAddonSession({
          cloudProjectNumber: 0, // Replace with your project number
        });
        setSession(session);
        setSdkReady(true);
      } catch (e) {
        console.error('Failed to create addon session', e);
      }
    };
    checkAddon();
  }, []);

  useEffect(() => {
    if (!sdkReady || !session) return;

    const getInfo = async () => {
      const info = await session.getMeetingInfo();
      setMeetingInfo(info);
    };
    getInfo();

    const collaboration = session.getCollaboration();
    const handleStateUpdate = (newState: string) => {
      try {
        const parsedState = JSON.parse(newState);
        setAddonState(parsedState);
        if (parsedState.page && parsedState.page !== pathname) {
          router.push(parsedState.page);
        }
      } catch (e) {
        console.warn('Could not parse addon state:', newState);
      }
    };

    collaboration.on('stateUpdated', handleStateUpdate);
    // Set initial state
    handleStateUpdate(collaboration.getState());

    return () => {
      collaboration.off('stateUpdated', handleStateUpdate);
    };
  }, [sdkReady, session, router, pathname]);

  const startCollaboration = useCallback(async () => {
    if (!sdkReady || !session) return;
    try {
      await session.getCollaboration().start();
    } catch (e) {
      console.error('Failed to start collaboration', e);
    }
  }, [sdkReady, session]);

  const setAddonStateInternal = useCallback(
    (state: string) => {
      if (!sdkReady || !session) return;
      try {
        session.getCollaboration().setState(state);
      } catch (e) {
        console.error('Failed to set addon state', e);
      }
    },
    [sdkReady, session]
  );

  const value = {
    isAddon,
    meetingInfo,
    addonState,
    startCollaboration,
    setAddonState: setAddonStateInternal,
  };

  return (
    <MeetAddonContext.Provider value={value}>
      {children}
    </MeetAddonContext.Provider>
  );
};

export const useMeetAddon = () => {
  const context = useContext(MeetAddonContext);
  if (context === undefined) {
    throw new Error('useMeetAddon must be used within a MeetAddonProvider');
  }
  return context;
};
