// components/ErrorBoundary.tsx
'use client';

import React from 'react';

interface Props {
  children: React.ReactNode;
  FallbackComponent: React.ComponentType<{
    error: Error;
    resetErrorBoundary: () => void;
  }>;
  onError?: (error: Error, info: React.ErrorInfo) => void;
  onReset?: () => void;
}

interface State {
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // 记录错误信息
    console.error('Error caught by boundary:', error, info);

    // 调用自定义错误处理
    if (this.props.onError) {
      this.props.onError(error, info);
    }

    // 可以在这里发送错误报告到监控服务
    // reportErrorToService(error, info);
  }

  resetErrorBoundary = () => {
    this.setState({ error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    const { error } = this.state;
    const { children, FallbackComponent } = this.props;

    if (error) {
      return (
        <FallbackComponent
          error={error}
          resetErrorBoundary={this.resetErrorBoundary}
        />
      );
    }

    return children;
  }
}

export default ErrorBoundary;
