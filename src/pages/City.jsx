import { Box, 
    Button, 
    Center, Link as ChakraLink ,
    Container, Flex, Image, Input, Select, Spinner, VStack } from "@chakra-ui/react"
import React, { useEffect, useState, Component} from 'react';
import CityWeather from '../components/City'
import axios from 'axios';
import wallpaperSrc from "../components/WallpaperSrc";
import { Link as ReactRouterLink } from 'react-router-dom'
import { ArrowBackIcon } from "@chakra-ui/icons";
import ForecastHour from '../components/ForecastHour';

const city = (location) => {
    console.log(location)
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedRegency, setSelectedRegency] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [idProvince, setIdProvince] = useState('');
  const [idRegency, setIdRegency] = useState();
  const [provinces, setProvinces] = useState([]);
  const [regencies, setRegencies] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [isActive, setisActive] = useState(0);
  const [cityData, setCityData] = useState('Pontianak');
  const [cityname, setCityname] = useState('');
  const API_KEY = 'edb32554617dc90bd210361b92a7796a'; // Replace with your API key
  

  const fetchWeatherData = async (city) => {
        setLoading(true);
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=id`;

        try {
            const response = await axios.get(API_URL);
            setWeatherData(response.data);
            setError(null);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

  useEffect(() => {
    const fetchWeatherData = async (location) => {
      if (!location) return;
      setLoading(true);
      try {
        const response = await axios.get(
          "https://api.openweathermap.org/data/2.5/forecast",
          {
            params: {
              q: `${location}`,
              appid: `${API_KEY}`,
              lang: 'id',
            }
          }
        );

        const weatherList = response.data.list;
        setCityData(response.data.city);
        console.log(cityData)
        // Filter the data to get the first 5 entries (5-day forecast)
        const fiveDayForecast = weatherList.filter((_, index) => index % 8 === 0); // Every 8th entry for 5 days
        setForecastData(fiveDayForecast);
        console.log(fiveDayForecast)
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedDistrict) {
      fetchWeatherData(selectedDistrict);
      console.log(selectedDistrict)
      return;
    } else if (selectedRegency) {
      fetchWeatherData(selectedRegency);
      console.log(selectedRegency)
      return;
    } else if (selectedProvince) {
      fetchWeatherData(selectedProvince); 
      console.log(selectedProvince)
      return;
    }
    fetchWeatherData();
  }, [selectedDistrict, selectedRegency, selectedProvince]);

  const fetchWeather = async (city) => {
      setLoading(true);
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&lang=id`;
      try {
          const response = await axios.get(url);
          setForecast(response.data.list.slice(0, 3)); 
          setError(null);
      } catch (error) {
          console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
  };
  const handleBox = (index) => {
    setisActive(index)
    setWeatherData(forecast[index])
    setCityData(cityData)
    CityWeather(cityData)
    console.log(Weather)
  }
  const imgSrc = wallpaperSrc(weatherData?.weather[0].icon)

  const basicBoxStyles = {
    color: 'white',
    minH : '100%',
    width: '100vw',
    height: '100vh',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    textShadow: '0 0 20px black',
    fontWeight: 'bold',
    fontSize: '20px',
    backgroundImage: `url(${imgSrc})`,
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  }
  const container = {
    position: 'relative',
    overflow: 'hidden',
    height: '100vh',
  }
  const imgcontainer = {
      width: '100%',
      height: '100%',
      position: 'absolute', 
      pt: '100px',
      top: '50%',
      left: '50%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      zIndex: -1,
      backgroundImage: `url(${imgSrc})`,
      transform: 'translate(-50%, -50%)',
  }
  const handleInputChange = (event) => {
      setCityname(event.target.value);
};

useEffect(() => {
    fetchWeatherData(cityData);
    fetchWeather(cityData);
}, [cityData]);


const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
        fetchWeatherData(cityname);
        setCityData(cityname)
        setCityname(''); // Clear input after fetching
    }
};

    return(
        <Box sx={basicBoxStyles} overflow={'hidden'} pos={'relative'}>
            <ChakraLink as={ReactRouterLink} to='/'>
                <ArrowBackIcon w={'50px'} h={'50px'} color={'white'} p={'2'} borderBottomRightRadius={'5px'} bg={'rgba(0, 0, 0, 0.4)'} cursor={'pointer'}/>
            </ChakraLink>
            <Box pb={10}>
            <Center> 
                <Input 
                    value={cityname}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    w={'300px'}
                    textAlign={'center'} 
                    variant='flushed' 
                    placeholder="Cari Kota" 
                    borderColor={"white"} 
                    color={"white"} 
                    fontWeight={"bold"}
                    bg={'rgba(0, 0, 0, 0)'} borderRadius={5}
                /> 
            </Center>
            </Box>
            <Box>
              {loading ? (
                <Box>Loading...</Box> // You can replace this with a Spinner
            ) : error ? (
                <Box>Error fetching weather data: {error.message}</Box>
            ) : (
                weatherData && <CityWeather data={weatherData} cityName={cityData}/>  
            )}
            <Flex overflowX={'scroll'} sx={{
              "::-webkit-scrollbar": {
                display: "none",
              },
            }}maxW='100%' borderRadius={5} p={2} h={170} pt={2} templateColumns='repeat(5, 2fr)' gap={2}>
                {forecast.map((data, index) => (
                  <ForecastHour key={index} data={data} cityName={cityData} isFirst={index === 0} isActive={isActive === index} onClick={() => handleBox(index)} />
                ))}
              </Flex>
            </Box>
            
    </Box>
    ) 

}

export default city