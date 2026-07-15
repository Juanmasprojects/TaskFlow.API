//Toast with a timer that disappears after 3 seconds
import React, { useEffect } from 'react' 

function Toast({ toast, setToast }) {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [toast, setToast])

    if (!toast) return null

    return (
        <div className={`toast ${toast.type}`}>
            {toast.message}
        </div>
    )
}

export default Toast





