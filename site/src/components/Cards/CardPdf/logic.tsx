import { useModalActions } from '../../../redux/hooks/app.hooks'

export const useCardPDFLogic = (pdfSrc: string) => {
  const { showModal } = useModalActions()

  const showPDF = () => showModal('PDF_VIEWER', { src: pdfSrc })

  return { showPDF }
}