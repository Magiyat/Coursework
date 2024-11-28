interface Props {
    openWinnerModal: boolean;
}

function WinnerModal({ openWinnerModal }: Props) {
    if (!openWinnerModal) {
        return null;
    }

    return (
        <div className="winnerModal">
            <div className="modalBg" />

            <div className="modalContent">
                <h4 className="title">Ураа победа!</h4>
            </div>
        </div>
    );
}

export default WinnerModal;
