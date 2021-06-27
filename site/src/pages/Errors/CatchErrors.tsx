import React, { Component, ErrorInfo } from 'react';

class CatchErrors extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error, errorInfo: ErrorInfo) {
    console.log(error);
    console.log(errorInfo);
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    CatchErrors.getDerivedStateFromError(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          Упс, похоже что то пошло не так!
        </div>
      )
    }

    return this.props.children
  }
}

export default CatchErrors;