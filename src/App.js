import React, { useState } from 'react';
import './App.css';
import { getCity, getWeather } from './forecast.js'
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";

function App() {
  const [imgSrc, setImage] = useState("");
  const [prediction, setPrediction] = useState("");
  const [cityname, setCityName] = useState("");

  const getForecast = async (city) => {
    const key = await getCity(city);
    const weatherData = await getWeather(key);
    
    const temperature = Math.round(weatherData.DailyForecasts[0].Temperature.Maximum.Value)
    let iconNumber = weatherData.DailyForecasts[0].Day.Icon;
    if (iconNumber < 10) {
          iconNumber = "0" + iconNumber;     
    }
    setImage('https://developer.accuweather.com/sites/default/files/' + iconNumber + '-s.png');
    const prediction = weatherData.DailyForecasts[0].Day.ShortPhrase;	
    document.getElementById('showTemperature').innerHTML = temperature + '<sup style = "font-size: 60px;">&#8451</sup>';
    setPrediction(prediction)
  }

  const getTemperature = (e) => {
  const city = document.getElementById('city').value 
  setCityName(city);
  getForecast(city)
}
  return (
    <div className="App my-5 mx-auto" >
    <h1 className = "text-muted text-center my-4">Weather Forecast </h1>
    <div>
    <input type = "text" placeholder = "Enter the name of a city" id = "city" width = "500px" /> 
    <button onClick = {getTemperature}> Show weather info </button>
    </div>
    <div>
      <Card
        raised = {true}
        style={{
          height: 350,
          width: 400,
          backgroundColor: "white",
          borderRadius: 10,
        }}>
          <CardContent>
          <Typography
            style={{ fontSize: 20, fontWeight: 600 }}
            color="textSecondary"
            gutterBottom
            id = 'cityName'
          >{cityname}
          </Typography>
          <Typography
            style={{ fontSize: 120, fontWeight: 600  }}
            color="textSecondary"
            id = 'showTemperature'
          >
          </Typography>
          <CardMedia id="testImage"
            component='img'
            image={imgSrc}
            style={{ height: 70, width: 70 }}/>
          <Typography
            style={{ fontSize: 20, fontWeight: 600 }}
            color="textSecondary"
            gutterBottom
            id = 'showPrediction'
          >{prediction}
          </Typography>
        </CardContent>
      </Card>
      </div> 
    </div>  
  );
}

export default App;
