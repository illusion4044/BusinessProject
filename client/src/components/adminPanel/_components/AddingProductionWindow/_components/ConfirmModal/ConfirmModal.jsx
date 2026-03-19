import '../ConfirmModal/ConfirmModal.css'

export default function ConfirmModal({ text, onConfirm, onCancel }) {
    return (
        <div className="modalOverlay">
            <div className="modalWindow">
                <h3>{text}</h3>

                <div className="modalButtons">
                    <button className="cancelBtn" onClick={onCancel}>
                        Скасувати
                    </button>

                    <button className="deleteBtn" onClick={onConfirm}>
                        Видалити
                    </button>
                </div>
            </div>
        </div>
    );
}