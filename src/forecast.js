 const API_KEY = 'DcqmW9EmvIy8AqrV3GF2iiGUNB16843Z'
 const RESOURCE_URL ='https://dataservice.accuweather.com/'

 
// Get city info and location Key 
export const getCity = async (city) => 
{
    const baseUrl = RESOURCE_URL+'locations/v1/cities/search';
    const query = `?apikey=${API_KEY}&q=${city}`;

    const response = await fetch(baseUrl + query)
    const data = await response.json();
    
    return data[0].Key;
}

// Get Weather Info
export const getWeather = async (location_key) =>{
    const baseUrl = RESOURCE_URL + 'forecasts/v1/daily/1day/';
    const query = `${location_key}?apikey=${API_KEY}&details=true&metric=true`;
    console.log(query)
    const response = await fetch(baseUrl + query)
    const data = await response.json();

    return data;
}




