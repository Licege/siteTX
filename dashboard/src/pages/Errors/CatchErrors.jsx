import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import imageSrc from '../../static/img/404.png'

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
                <Wrapper>
                    <Title>Упс, похоже что то пошло не так!</Title>
                    <Image src={imageSrc} />
                    <NavLink to='/'><h2>Назад на главную</h2></NavLink>
                </Wrapper>
            )
        }

        return this.props.children
    }
}

const Title = styled.h1``

const Image = styled.img`
  border-radius: 5px;
  min-width: 300px;
`

const Wrapper = styled.main`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

export default CatchErrors;