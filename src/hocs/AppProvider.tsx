import { createContext, useState } from 'react';

type AppContextValue = {
  openErrorDialog: boolean;
  errorMessage: string | null;
  showErrorDialog: (arg: string) => void;
  closeErrorDialog: () => void;
};

type AppProviderProps = {
  children?: React.ReactNode;
};

export const AppContext = createContext<AppContextValue>({
  openErrorDialog: false,
  errorMessage: null,
  showErrorDialog: (message: string) => {},
  closeErrorDialog: () => {},
});

export const AppProvider = (props: AppProviderProps) => {
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const showErrorDialog = (message: string) => {
    setErrorMessage(message);
    setOpenErrorDialog(true);
  };
  const closeErrorDialog = () => {
    setErrorMessage(null);
    setOpenErrorDialog(false);
  };

  const value = {
    openErrorDialog,
    errorMessage,
    showErrorDialog,
    closeErrorDialog,
  } as AppContextValue;

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};
