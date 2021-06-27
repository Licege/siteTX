import { toast, Slide } from 'react-toastify'

const commonOptions = {
  hideProgressBar: true
}

const callCustomizedToast = (type: 'success'|'error') => (message: string) => {
  toast[type](message, { ...commonOptions, autoClose: 2500, transition: Slide })
}

export default {
  success: callCustomizedToast('success'),
  error: callCustomizedToast('error')
}