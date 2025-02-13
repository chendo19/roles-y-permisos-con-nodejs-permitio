import { useToast } from 'vue-toast-notification'
const $toast = useToast()

export const handleToast = ({type, messages}) => {
    if (typeof messages === 'object' && Object.keys(messages).length) {
        for (const [key, value] of Object.entries(messages)) {
            for (const a of value) {
                $toast.open({
                    type,
                    message: a,
                    duration: 2500
                })
            }
        }
    }

    if (typeof messages === 'string' && messages !== '') {
        $toast.open({
            type,
            message: messages,
            duration: 2500
        })
    }
}