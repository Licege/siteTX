import React, { Component } from 'react';

class CatchErrors extends Component {
    constructor(props) {
        super(props);

        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error, errorInfo) {
        console.log(error);
        console.log(errorInfo);
        return { hasError: true }
    }

    componentDidCatch(error, errorInfo) {
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