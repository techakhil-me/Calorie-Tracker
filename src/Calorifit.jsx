import React, { useState, useEffect } from "react";
import "./Calorifit.css";
import Card from "./components/Card";
import Popup from "./components/Popup";
import { CSSTransition } from "react-transition-group";
import { CircleProgress } from "react-gradient-progress";

function Calorifit() {
  const [popup, setPopup] = useState(false);
  const [items, setItem] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  useEffect(() => {
    if (localStorage.getItem("totalCalories")) {
      setTotalCalories(parseFloat(localStorage.getItem("totalCalories")));
      setItem(JSON.parse(localStorage.getItem("cards")));
    }
  }, []);

  return (
    <div className="Calorifit">
      <img
        src="https://general.stdcdn.com/topgrill.svg"
        alt=""
        className="topgrill"
      />
      <img
        src="https://general.stdcdn.com/speaker.svg"
        alt=""
        className="speaker"
      />
      <div className={popup ? "container blur" : "container"}>
        <div className="top__background"></div>

        <img
          src="https://general.stdcdn.com/calorifit_logo.svg"
          alt=""
          className="brand_logo"
        />
        <div className="date">Sunday 23 July</div>
        <div className="greeting">Good Morning</div>
        <a href="https://github.com/techakhil-me/" className="github_icon" target="_blank" rel="noreferrer">
          <img src="https://general.stdcdn.com/github.svg" alt="" />
        </a>
        <a
          href="https://www.linkedin.com/in/techakhil/"
          className="linkedin_icon"
          target="_blank" rel="noreferrer"
        >
          <img src="https://general.stdcdn.com/linkedin.svg" alt="" />
        </a>
        <div className="curve"></div>
        {/* hero circle */}
        <div className="gradient_bar">
          <CircleProgress
            fontSize="0px"
            percentage={(totalCalories / 2500) * 100}
            width="160"
            primaryColor={["#8B35F8", "#865291"]}
            strokeWidth="10"
          />
        </div>
        <div className="hero__circle"></div>
        <div className="total_calories">{totalCalories}</div>
        <div className="total_calories__title">calories</div>
        <div className="total_calories__sub">more to go</div>
        {/* end hero circle */}
        <div className="item_container">
          {items.length ? (
            ""
          ) : (
            <img
              style={{ width: "80%", justifySelf: "center" }}
              src="https://general.stdcdn.com/goeat.svg"
              alt="go eat"
            />
          )}
          {items.map((item, key) => (
            <Card
              name={item.name}
              calories={item.calories}
              imgSrc={item.imgSrc}
              key={item.id}
              id={item.id}
              items={items}
              setItem={setItem}
              setPopup={setPopup}
              totalCalories={totalCalories}
              setTotalCalories={setTotalCalories}
            />
          ))}
        </div>
      </div>
      <CSSTransition
        in={Boolean(popup)}
        timeout={500}
        classNames="popup"
        unmountOnExit
      >
        <Popup
          setPopup={setPopup}
          popup={popup}
          items={items}
          setItem={setItem}
          totalCalories={totalCalories}
          setTotalCalories={setTotalCalories}
        />
      </CSSTransition>
      <div
        className={popup ? "add_item blur" : "add_item"}
        onClick={() => setPopup(true)}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 8.33331V31.6666"
            stroke="#E1E1E1"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.33337 20H31.6667"
            stroke="#E1E1E1"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <img
        src="https://general.stdcdn.com/topgrill.svg"
        alt=""
        className="bottomgrill"
      />
      <div className="shadow__inset"></div>
    </div>
  );
}

export default Calorifit;
