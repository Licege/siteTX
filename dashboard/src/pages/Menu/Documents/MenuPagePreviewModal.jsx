import React, {useCallback, useEffect} from 'react'
import {Modal} from 'react-bootstrap'
import styled from 'styled-components'

const MenuPagePreviewModal = ({pages, activeIndex, onClose, onChangeIndex}) => {
  const isOpen = activeIndex !== null && activeIndex !== undefined
  const page = isOpen ? pages[activeIndex] : null
  const hasPrev = activeIndex > 0
  const hasNext = activeIndex < pages.length - 1
  const hasNavigation = pages.length > 1

  const goPrev = useCallback(() => {
    if (hasPrev) onChangeIndex(activeIndex - 1)
  }, [activeIndex, hasPrev, onChangeIndex])

  const goNext = useCallback(() => {
    if (hasNext) onChangeIndex(activeIndex + 1)
  }, [activeIndex, hasNext, onChangeIndex])

  useEffect(() => {
    if (!isOpen) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'ArrowLeft') goPrev()
      if (event.key === 'ArrowRight') goNext()
    }

    window.addEventListener('keydown', onKeyDown)

    return () => window.removeEventListener('keydown', onKeyDown)
  }, [goNext, goPrev, isOpen])

  if (!page) return null

  return (
    <Modal show={isOpen} onHide={onClose} centered size="lg" dialogClassName="menu-page-preview-modal">
      <Modal.Header closeButton>
        <Modal.Title>
          {hasNavigation ? `Страница ${activeIndex + 1} из ${pages.length}` : 'Предпросмотр'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PreviewWrap>
          {hasNavigation && hasPrev && (
            <NavButton type="button" onClick={goPrev} aria-label="Предыдущая страница">
              ‹
            </NavButton>
          )}
          <PreviewImage src={page.previewUrl} alt="" />
          {hasNavigation && hasNext && (
            <NavButton type="button" $right onClick={goNext} aria-label="Следующая страница">
              ›
            </NavButton>
          )}
        </PreviewWrap>
      </Modal.Body>
    </Modal>
  )
}

const PreviewWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  background: #1a1a1a;
  border-radius: 6px;
`

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 75vh;
  object-fit: contain;
`

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  ${({$right}) => ($right ? 'right: 12px;' : 'left: 12px;')}
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  color: #222;
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
  z-index: 1;

  &:hover {
    background: #fff;
  }
`

export default MenuPagePreviewModal
