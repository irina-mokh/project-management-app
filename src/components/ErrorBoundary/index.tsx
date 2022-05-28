import React, { ErrorInfo } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { routes } from 'routes';

interface IErrorBoundary {
  children: JSX.Element[] | JSX.Element;
}

interface IErrorMessage {
  error: Error;
  errorInfo: ErrorInfo;
}

interface IErrorBoundaryState {
  error: null | Error;
  errorInfo: null | ErrorInfo;
}

function ErrorMessage(props: IErrorMessage) {
  const { t } = useTranslation();
  const { error, errorInfo } = props;

  return (
    <Box>
      <h2>{t('errorBoundaryHeader')}</h2>
      <p>{t('errorBoundaryMessage')}</p>
      <Button>
        <Link to={routes.welcome.path}>{t('returnStartPage')}</Link>
      </Button>
      <details style={{ whiteSpace: 'pre-wrap' }}>
        {error.toString()}
        <br />
        {errorInfo.componentStack}
      </details>
    </Box>
  );
}

export class ErrorBoundary extends React.Component<IErrorBoundary, IErrorBoundaryState> {
  constructor(props: IErrorBoundary) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  componentWillUnmount() {
    this.setState({
      error: null,
      errorInfo: null,
    });
  }

  render() {
    const { error, errorInfo } = this.state;

    if (error && errorInfo) {
      return <ErrorMessage error={error} errorInfo={errorInfo} />;
    }

    return this.props.children;
  }
}
