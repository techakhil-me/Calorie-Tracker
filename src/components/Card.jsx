import React from "react";
import "./Card.css";

function Card({
  id,
  calories = "68",
  name = "burger",
  setPopup,
  items,
  setItem,
  totalCalories,
  setTotalCalories,
  imgSrc
}) {
  const handleBurn = (e) => {
    setTotalCalories(
      totalCalories - items.find((item) => item.id === id).calories
    );
    items = items.filter((item) => item.id !== id);
    setItem([...items]);
    localStorage.setItem("cards", JSON.stringify(items));
    localStorage.setItem(
      "totalCalories",
      totalCalories - items.find((item) => item.id === id).calories
    );
  };
  return (
    <div className="Card">
      <div className="Card__container">
        <div className="calories">{calories}</div>
        <div className="calories__title">calories</div>
        <img src={imgSrc} alt="" className="item_image" />
        <div className="item_name">{name}</div>
        <div className="change_item" onClick={() => setPopup(id)}>
          CHANGE
        </div>
        <div
          className="calorie_adjective"
          style={{
            color: calories > 460 ? "red" : calories > 140 ? "green" : "yellow"
          }}
        >
          {calories > 460 ? "Too Fat" : calories > 140 ? "Perfect" : "Too Low"}
        </div>
        <div className="delete" onClick={handleBurn}>
          BURN{" "}
          <svg
            className="burn_icon"
            width="9"
            height="12"
            viewBox="0 0 9 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.83003 1.47039C6.11356 1.71271 6.32445 2.03343 6.60071 2.28288C6.94239 2.6036 7.16049 3.00984 7.44401 3.37333C7.93836 4.10742 8.37455 4.8914 8.59991 5.74665C8.83255 6.33107 8.8689 6.96538 8.85436 7.59257C8.8689 8.16274 8.70896 8.72578 8.44717 9.23893C7.99652 10.0158 7.18229 10.5361 6.33165 10.814C5.27025 11.0635 4.09981 11.1062 3.07476 10.6644C2.70393 10.4648 2.28235 10.3294 1.98429 10.0158C1.29365 9.45987 0.893812 8.55473 1.02467 7.6781C1.22822 6.11726 2.18057 4.77736 3.19835 3.62277C3.29286 3.79382 3.21282 3.99338 3.27832 4.17156C3.36556 4.5493 3.50368 4.94841 3.79448 5.21924C4.1507 4.89853 4.5288 4.57781 4.83414 4.2072C5.11039 3.80808 5.33568 3.3662 5.43019 2.89581C5.45207 2.29713 5.51023 1.66995 5.27752 1.09978L5.29933 1C5.51743 1.09978 5.65556 1.30647 5.83003 1.47039Z"
              fill="#E1E1E1"
              stroke="#E1E1E1"
              strokeWidth="0.0938"
            />
          </svg>
        </div>
        <div className="Card_shadow_inset"></div>
      </div>
    </div>
  );
}

export default Card;
