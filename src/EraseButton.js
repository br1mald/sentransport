import "./EraseButton.css";

function EraseButton({ onEffacer }) {
  return (
    <div>
      <button onClick={() => onEffacer("")} className="effacer">
        Effacer
      </button>
    </div>
  );
}

export default EraseButton;
