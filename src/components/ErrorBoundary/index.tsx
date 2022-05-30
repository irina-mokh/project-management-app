import React, { ErrorInfo } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';

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
    <Box
      sx={{
        margin: '0 auto',
        border: '3px solid red',
        maxWidth: '50%',
        minWidth: '300px',
        textAlign: 'center',
        backgroundColor: 'white',
      }}
    >
      <h2>{t('errorBoundaryHeader')}</h2>
      <p>{t('errorBoundaryMessage')}</p>
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
