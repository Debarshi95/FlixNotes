import React from 'react';
import Typography from 'components/common/Typography/Typography';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      error: null,
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line no-console
    console.log(error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <div className="w-full p-1 h-screen d-flex flex-col items-center content-center">
          <Typography variant="p" size="md" align="center">
            Oops! Something went wrong...
          </Typography>
        </div>
      );
    }
    return children;
  }
}

export default ErrorBoundary;
