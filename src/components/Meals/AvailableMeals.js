import { useEffect,useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";



const AvailableMeals = () => {
  const [meals,setMeals] = useState([])
  const [isLoading,setIsLoading] = useState(true)

  useEffect(()=>{
    
    const fetchMeals = async ()=>{
      const response = await fetch('https://react-http-2956c-default-rtdb.firebaseio.com/meals.json')
      const responseData = await response.json()

      const loadedMeals = []
      for(const key in responseData){
        loadedMeals.push({
          id:key,
          name:responseData[key].name,
          description:responseData[key].description,
          price:responseData[key].price,
        })
      }
      setMeals(loadedMeals)
      setIsLoading(false)
    }

    fetchMeals()
  },[])

  if (isLoading){
    return(
      <section className={classes.MealsLoading}>
        <p>
          Loading....
        </p>
      </section>
    )
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    ></MealItem>
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
