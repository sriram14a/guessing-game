import { useEffect, useState } from "react";
import "./App.css";
import { API } from "./source";

export function Winner() {
  const [winner, setWinner] = useState([]);
  const [Top, setTop] = useState([]);


  useEffect(() => {
   fetch(`${API}/user/winner`, {
      method: "GET",
    }) .then((data) => data.json())
    .then((tchdata) => {
      setWinner(tchdata)})  
  }, []);

  function handleWinner(){
    const top = [];
    const win = Math.min(...winner.map((val) => val.guess))
    for (let i = 0; i < winner.length; i++) {
      
      if (winner[i].guess === win) {
        top.push(winner[i]);
      }

    }return setTop(top);
    
  }
  
  useEffect(() => handleWinner(), [winner]);

  return (
    <div>
      <div>
        <h3>Top Guess</h3>
        {Top.map((val) => (
          <div key={val._id}>
            <h3 >Name:{"  "}<span className="winner" >{val.name}</span></h3>{" "}
            <h3>No of guess:{"  "}<span className="winner" >{val.guess}</span></h3>
          </div>
        ))}
      </div>
    </div>
  );
}
