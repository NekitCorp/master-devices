import React from "react";
import { Modal } from "./modal";

type ConfirmationModalProps = {
    open: boolean;
    message: string;
    onConfirm: () => Promise<unknown>;
    onClose: () => void;
};

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ open, message, onConfirm, onClose }) => {
    const [loading, setLoading] = React.useState(false);

    const handleConfirm = () => {
        setLoading(true);

        onConfirm()
            .catch(() => {})
            .finally(() => {
                setLoading(false);
                onClose();
            });
    };

    return (
        <Modal>
            <div className={`modal ${open ? "is-active" : ""}`}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Confirmation</p>
                        <button disabled={loading} className="delete" aria-label="close" onClick={onClose}></button>
                    </header>
                    <section className="modal-card-body">{message}</section>
                    <footer className="modal-card-foot">
                        <button disabled={loading} className={`button is-danger ${loading ? "is-loading" : ""}`} onClick={handleConfirm}>
                            Confirm
                        </button>
                        <button disabled={loading} className="button" onClick={onClose}>
                            Cancel
                        </button>
                    </footer>
                </div>
            </div>
        </Modal>
    );
};
