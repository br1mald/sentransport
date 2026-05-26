import "./RechargerButton.css";

function RechargerButton({ onRecharger }) {
  return (
    <button onClick={() => onRecharger()} className="recharger">
      Recharger
    </button>
  );
}

export default RechargerButton;
