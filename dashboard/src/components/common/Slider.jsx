import React from 'react'

export default class Slider extends React.Component {
  constructor( props ) {
    super(props)
    this.state = {
      currentSlide: 0,
      animating: false,
      animatingType: 'to',
      nextSlide: '',
    }
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypress)
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypress)
  }

    keypress = ( e ) => {
      switch (e.keyCode) {
      case 39:

        break
      case 37:

        break
      default:
        return
      }
    }

    getPrevSlideNumber = () => {
      if (this.state.currentSlide === 0) return this.props.slides.length - 1
      else return this.state.currentSlide - 1
    }

    getNextSlideNumber = () => {
      if (this.state.currentSlide === this.props.slides.length - 1) return 0
      else return this.state.currentSlide + 1
    }

    toSlide = ( next ) => {
      return () => {
        this.setState({
          animating: true,
          animatingType: 'to',
          nextSlide: next,
        }, () => {
          setTimeout(() => {
            this.setState({
              currentSlide: next,
              animating: false,
            })
          }, 500)
        })
      }
    }

    toPrevSlide = () => {
      let prev = this.getPrevSlideNumber()
      this.setState({
        animating: true,
        animatingType: 'prev',
        prevSlide: prev,
      }, () => {
        setTimeout({
          currentSlide: prev,
          animating: false,
        }, 500)
      })
    }

    toNextSlide = () => {
      let next = this.getNextSlideNumber()
      this.setState({
        animating: true,
        animatingType: 'next',
        nextSlide: next,
      }, () => {
        setTimeout(() => {
          this.setState({
            activeSlide: next,
            animating: false,
          })
        }, 500)
      })
    }

    renderSlide = ( slide, key ) => {
      return <li key={key}
                 onClick={this.toSlide(key)}
                 className={`ImageSlider-PreviewsList-Item ${key === this.state.currentSlide ? 'ImageSlider-PreviewsList-Item_active' : ''}`}>
        {slide}
      </li>
    }

    render() {
      let {
        className,
        slides = [],
        previews = [],
      } = this.props

      let {
        currentSlide,
        animating,
        animatingType,
        nextSlide,
      } = this.state

      return (
        <div className={`ImageSlider ${className || ''}`}>
          <div className={`ImageSlider-Body ${animating ? 'animating_' + animatingType : ''}`}>
            {slides.length > 1 ?
              <div className='ImageSlider-Body-ArrowPrev' onClick={this.toPrevSlide}/> : null}
            <div className='ImageSlider-Body-Item ImageSlider-Body-Item_active'>
              {slides[currentSlide]}
            </div>
            <div className='ImageSlider-Body-Item ImageSlider-Body-Item_next'>
              {slides[nextSlide]}
            </div>
            {slides.length > 1 ?
              <div className="ImageSlider-Body-ArrowNext" onClick={this.toNextSlide}/> : null}
          </div>
          {slides.length > 1 ? <ul className='ImageSlider-PreviewsList'>
            {previews.map(( item, key ) => this.renderSlide(item, key))}
          </ul> : null}
        </div>
      )
    }

}
