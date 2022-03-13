import React, {Component} from 'react';
import {withRouter, NavLink} from 'react-router-dom';
import styled from 'styled-components';
import imageSrc from '../../static/img/404.png'
import {Button} from 'react-bootstrap';

class CatchErrors extends Component {
  constructor(props) {
    super(props);

    this.state = {hasError: false}
  }

  static getDerivedStateFromError(error, errorInfo) {
    console.log(error);
    console.log(errorInfo);
    return {hasError: true}
  }

  componentDidCatch(error, errorInfo) {
    CatchErrors.getDerivedStateFromError(error, errorInfo);
  }

    goBack = () => {
      const {history} = this.props

      history.push('/');
      window.location.reload();
    }

    render() {
      const {children} = this.props;
      const {hasError} = this.state;

      if (hasError) {
        return (
          <Wrapper>
            <Title>Упс, похоже что то пошло не так!</Title>
            <Image src={imageSrc} />
            <Button onClick={this.goBack}>Назад на главную</Button>
          </Wrapper>
        )
      }

      return children
    }
}

const Title = styled.h1``

const Image = styled.img`
  border-radius: 5px;
  min-width: 300px;
  margin-bottom: 16px;
`

const Wrapper = styled.main`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

export default withRouter(CatchErrors);