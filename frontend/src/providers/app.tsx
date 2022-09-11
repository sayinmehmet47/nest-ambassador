import { Button } from '@material-ui/core';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { store } from '../redux/store';

const ErrorFallback = () => {
  return (
    <div
    //   className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
    //   role="alert"
    >
      <h2 className="">Ooops, something went wrong :( </h2>
      <Button variant="contained" onClick={() => window.location.assign(window.location.origin)}>
        Refresh
      </Button>
    </div>
  );
};

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HelmetProvider>
          <Provider store={store}>
            <Router>{children}</Router>
          </Provider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
