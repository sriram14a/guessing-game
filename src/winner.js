import { useEffect, useState } from "react";
import "./App.css";
import { API } from "./source";

export function Winner(){
  const [winner, setWinner] = useState([]);
  const [Top, setTop] = useState([]);


    const getDetails = () => {
        fetch(`${API}/user/userdetails`, {
          method: "GET",
        })
          .then((data) => data.json())
          .then((st) => setWinner(st.data))


      };
    
      useEffect(() => getDetails(), []);
      
      function handlewin(){
        const win = Math.min(...winner.map((val) => val.guess));
        const top = [];
      for (let i = 0; i < winner.length; i++) {
        if (winner[i].guess === win) {
          top.push(winner[i]);
        }
      }
      return setTop(top)
      }
      
    return(
<div>
<div >
          <h3 onLoad={()=>handlewin}>Top Guess</h3>
          {Top.map((val) => (
            <div>
              <h3 className="winner">Name:{val.name}</h3>{" "}
              <h3 className="winner">No of guess:{val.guess}</h3>
            </div>
          ))}
        </div>
</div>

    )
}