import { toast } from 'react-toastify'


// const callSuccessToast = (message: string) => {
//     toast.success(message)
// }
//
// const callSuccessToast = (message: string) => {
//     toast.success(message)
// }

const commonOptions = {
    hideProgressBar: true
}

const callCustomizedToast = (type: 'success'|'error') => (message: string) => {
    toast[type](message, { ...commonOptions })
    // switch (type) {
    //     case 'success':
    //         return callSuccessToast(message)
    //     case 'error':
    //         return
    // }
}

export default {
    success: callCustomizedToast('success'),
    error: callCustomizedToast('error')
}