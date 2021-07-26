import React,{useState, useEffect} from "react";
import "./Popup.css";
import { v1 as uuidv1 } from 'uuid';
function Popup({ popup, setPopup, setItem, items, totalCalories, setTotalCalories }) {

  const tempItem = items.findIndex((item)=>item.id===popup);
  
  const [itemName, setItemName] = useState(tempItem!==-1 ? items[tempItem].name : "");
  const [caloriesCount, setCaloriesCount] = useState(tempItem!==-1 ? items[tempItem].calories : "");
 

  const  handleSubmit = async (e) => {    
    e.preventDefault();
    if (itemName && caloriesCount){
    setPopup(false)
    if (tempItem!==-1){
      let total_calories = totalCalories - items[tempItem].calories
      if (items.[tempItem].name !== itemName){
        fetch(`https://customsearch.googleapis.com/customsearch/v1?cx=da450330847f9c64a&fileType=png&num=3&q=${itemName}%20food&searchType=image&key=AIzaSyBc_uQZ_a-AwMWHmQK8zlMQDooZWFH8XTA`)
        .then((res) => res.json())
        .then((data) => {
        items[tempItem].imgSrc = data.items[2].link
        items[tempItem].name = itemName
      items[tempItem].calories = caloriesCount
      setItem([...items])
      setTotalCalories(total_calories+caloriesCount)
      localStorage.setItem('cards',JSON.stringify(items));
      localStorage.setItem('totalCalories',total_calories+caloriesCount);
    })
      }
      

    }
    else {
      fetch(`https://customsearch.googleapis.com/customsearch/v1?cx=da450330847f9c64a&fileType=png&num=3&q=${itemName}%20food&searchType=image&key=AIzaSyBc_uQZ_a-AwMWHmQK8zlMQDooZWFH8XTA`)
    .then((res) => res.json())
    .then((data) => {
      setItem([...items, { id: uuidv1(),name: itemName, calories: caloriesCount, imgSrc:data.items[2].link }])
      setTotalCalories(totalCalories+caloriesCount)
      localStorage.setItem('cards',JSON.stringify([...items, { id: uuidv1(),name: itemName, calories: caloriesCount, imgSrc:data.items[2].link }]));
      localStorage.setItem('totalCalories',totalCalories+caloriesCount);
    })
      
    }
      
    }
      
  };

  return (
    <div className="Popup">
      <form className="Popup__container" onSubmit={handleSubmit}>
        <div className="foodname_title">What did you eat ?</div>
        <input
          type="text"
          className="foodname_input"
          name="foodname"
          id="foodname"
          defaultValue={itemName}
          placeholder="name"
          required
          autoComplete="off"
          onChange={(e) => {
            setItemName(e.target.value);
         
          }}
        />
        <div className="caloriescount_title">How much calories it has ?</div>
        <input
          type="number"
          className="caloriescount_input"
          name="calories"
          id="calories"
          defaultValue={caloriesCount}
          required
          autoComplete="off"
          placeholder="calories"
          onChange={(e) => {
            setCaloriesCount(parseFloat(e.target.value));
          }}
        />
        <div className="close_popup" onClick={() => setPopup(false)}>
          CLOSE
        </div>
        <button className="add_button" type="submit">
          <svg
            width="26"
            height="26"
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
          <span>{tempItem!==-1 ? "DONE":"ADD"}</span>
        </button>
      </form>
    </div>
  );
}

export default Popup;
