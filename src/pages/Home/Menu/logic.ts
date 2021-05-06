import { useGlobalDeliverySettings } from '../../../redux/hooks/bucket.hooks'
import { useModalActions } from '../../../redux/hooks/app.hooks'
// @ts-ignore
import pdfMenu from '../../../temp/tri_holma_menu.pdf'

export const usePdfMenuLogic = () => {
  const { pdfMenuSrc } = useGlobalDeliverySettings()
  const { showModal } = useModalActions()

  const showPDFMenu = () => showModal('PDF_VIEWER', { src: pdfMenu })

  return { pdfMenuSrc: pdfMenu, showPDFMenu }
}