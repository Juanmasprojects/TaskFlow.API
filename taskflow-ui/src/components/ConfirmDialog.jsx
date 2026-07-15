import { useState } from "react"

function ConfirmDialog({ confirmDialog, setConfirmDialog }) {

    const [isProcessing, setIsProcessing] = useState(false)

    if (!confirmDialog) {
        return null
    }
    return (
        <div className="confirm-overlay">
            <div className="confirm-dialog">
                <h3>{confirmDialog.title}</h3>
                <p>{confirmDialog.message}</p>
                <div className="confirm-buttons">
                    <button onClick={() => setConfirmDialog(null)}>No</button>
                    <button 
                        disabled={isProcessing} 
                        onClick={async () => {
                        try {
                        setIsProcessing(true)
                        await confirmDialog.onConfirm()
                        setConfirmDialog(null)
                        }
                        finally {
                            setIsProcessing(false)
                        }
                    }}>{isProcessing ? "Deleting..." : "Yes"}</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDialog
