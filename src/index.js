import ErrorBoundary from 'components/common/ErrorBoundary/ErrorBoundary';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App';
import { AuthProvider, NoteProvider, SideDrawerProvider, TagProvider } from './providers';
import reportWebVitals from './reportWebVitals';
import './styles/index.css';

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        {(user) => (
          <NoteProvider user={user}>
            <TagProvider user={user}>
              <SideDrawerProvider>
                <App />
              </SideDrawerProvider>
            </TagProvider>
          </NoteProvider>
        )}
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
