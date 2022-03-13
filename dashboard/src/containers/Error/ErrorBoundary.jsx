import React from 'react'

export default class ErrorBoundary extends React.Component {
    state = {
      hasError: false,
    }

    goMain = () => {
      this.props.history.push('/')
    }

    componentDidCatch( error, errorInfo ) {
      console.log('error', error)
      console.log('info', errorInfo)
      this.setState({hasError: true})
    }

    render() {
      if (this.state.hasError) {
        return (
          <div>
            <p>Непредвиденные обстоятельства ...</p>
            <button onClick={this.goMain}>Вернуться на главную</button>
          </div>
        )
      }

      return this.props.children
    }
}
