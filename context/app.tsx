import { createContext, useContext, useState } from 'react';

type AppWrapperProps = {
    children: React.ReactNode,
}

type AppState = {
    offCanvasOpen: boolean,
    setOffCanvasOpen: Function,
    issueModalOpen: boolean,
    setIssueModalOpen: Function,
}

let state: AppState = {
    offCanvasOpen: true,
    setOffCanvasOpen(value: boolean) { },
    issueModalOpen: false,
    setIssueModalOpen(value: boolean) { },
};

const AppContext = createContext(state);

export function AppWrapper({ children }: AppWrapperProps) {
    const [offCanvasOpen, setOffCanvasOpen] = useState(false);
    const [issueModalOpen, setIssueModalOpen] = useState(false);

    const appState: AppState = {
        offCanvasOpen,
        setOffCanvasOpen,
        issueModalOpen,
        setIssueModalOpen,
    };

    return (
        <AppContext.Provider value={appState}>
            { children }
        </AppContext.Provider>
    )
}

export function useAppContext() {
    return useContext(AppContext);
}