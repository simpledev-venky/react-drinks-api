import React, { useState, useEffect } from "react";

const Drinks = () => {
  const [drinksData, setDrinksData] = useState([]);
  const [userInput, setUserinput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError,setIsError] = useState({status:false,msg:""})

  const URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`;

  const fetchDrinks = async (apiurl) => {
    setLoading(true);
    setIsError({status:false,msg:""})
    try {
      const response = await fetch(apiurl);
      const { drinks } = await response.json();
      console.log(drinks);
      setDrinksData(drinks);
      setLoading(false);
    setIsError({status:false,msg:""})
   if(!drinks){
throw new Error("data not found")
}
    } catch (error) {
      console.log(error || "something went wrong");
      setLoading(false);
    setIsError({status:true,msg:error.message ||"something went wrong"})
    }
  };

  useEffect(() => {
    const correctUrl = `${URL}${userInput}`
    fetchDrinks(correctUrl);
  }, [userInput]);
  return (
    <>
    <header>Wandel's Ultimate Drinks Destination</header>
      <h2>{loading && "loading...."}</h2>
      <h2>{isError.status && isError.msg}</h2>
      <div className="input">
      <input
        type="text"
        onChange={(e) => {
          setUserinput(e.target.value);
        }}
        value={userInput}
        placeholder="search your fav drink...."
      />
      </div>
      <hr />
      <ul className="drinks-container">
      {!loading && !isError.status &&
        drinksData.map((eachDrink) => {
          const { strDrink, strDrinkThumb, idDrink } = eachDrink;
          return (
            <li key={idDrink} className="each-drink">
              <img src={strDrinkThumb} alt={strDrink} />
              <h2>{strDrink}</h2>
            </li>
          );
        })}
      </ul>
      
    </>
  );
};
export default Drinks
