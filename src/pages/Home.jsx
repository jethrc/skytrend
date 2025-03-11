import React, { useEffect, useState, Component} from 'react';
import Weather from '../components/Weather';
import Forecast from '../components/Forecast';
import City from '../components/City'
import axios from 'axios';
import ListCity from '../components/ListCity'
import OneSignal from 'react-onesignal';
import addNotification from 'react-push-notification';

import { 
  Box, 
  Select, 
  useDisclosure, 
  Grid, 
  GridItem, 
  Spinner, 
  useColorMode,
  Switch,
  Stack,
  useColorModeValue,
  Flex,
  Button} from '@chakra-ui/react'

import Header from '../components/Header'; 
import wallpaperSrc from '../components/WallpaperSrc';

const ibukotaIndonesia = [
  "Banda Aceh",
  "Denpasar",
  "Pinang",
  "Serang",
  "Palangkaraya",
  "Samarinda",
  "Banjarmasin",
  "Pontianak",
  "Gorontalo",
  "Jakarta",
  "Jambi",
  "Semarang",
  "Surabaya",
  "Bandung",
  "Bandar Lampung",
  "Ambon",
  "Kupang",
  "Mataram",
  "Jayapura",
  "Manokwari",
  "Pekanbaru",
  "Palembang",
  "Padang",
  "Kendari",
  "Makassar",
  "Manado",
  "Bengkulu",
];

const Home = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [activeCityIndex, setActiveCityIndex] = useState(0);
  const [forecastData, setForecastData] = useState([]);
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
  const [cityData, setCityData] = useState('Banda Aceh');
  const [permission, setPermission] = useState(Notification.permission);

  const [allWeatherData, setAllWeatherData] = useState([]);
  const options = [];
  const API_KEY = 'edb32554617dc90bd210361b92a7796a'; // Replace with your API key
  const API_KEY_LOKASI = 'd3104f73-37dd-5c9b-9e07-90e7ace1'; // Replace with your API key

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  }



  const fetchProvinces = async () => {
    try {
      const response = await axios.get('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json');
      const formattedOptions = response.data.map((province) => ({
        id: province.id,
        value: province.name,
        label: province.name,
      }));
      setProvinces(formattedOptions);
      // console.log(response)
      const defaultProvince = formattedOptions.find(p => p.value === 'KALIMANTAN BARAT');
      if (defaultProvince) {
        setSelectedProvince(defaultProvince.value);
        setIdProvince(defaultProvince.id);
      }
    } catch (error) {
      setError(error);
      console.error('Error fetching provinces:', error);
    }
  };

  const fetchRegencies = async (provinceID) => {
    if (!provinceID) return; // Don't fetch if no province ID is provided
    try {
      const responseRegencies = await axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceID}.json`);
      const formattedOptions = responseRegencies.data.map((regency) => {
        // Remove "Kota" and "Kabupaten" from the name
        const cleanName = regency.name.replace(/Kota\s+/i, '').replace(/Kabupaten\s+/i, '');
        return {
          id: regency.id,
          value: cleanName.trim(),
          label: cleanName.trim(), // Trim any leading/trailing whitespace
        };
      });
      setRegencies(formattedOptions);
      setDistricts([]); 
      setWeatherData(null); 
      const defaultRegency = formattedOptions.find(r => r.value === 'PONTIANAK');
      if (defaultRegency) {
        setSelectedRegency(defaultRegency.value);
        setIdRegency(defaultRegency.id);
      }
    } catch (error) {
      setError(error);
      console.error('Error fetching regencies:', error);
    }
  };
  const fetchDistricts = async (regencyID) => {
    if (!regencyID) return;
    try {
        const responseDistricts = await axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${regencyID}.json`);
        const formattedOptions = responseDistricts.data.map((district) => ({
          id: district.id,
          value: district.name,
          label: district.name,
        }));
        setDistricts(formattedOptions);
        // setWeatherData(null); 
        // console.log(responseDistricts)
      } catch (error) {
        setError(error);
        console.error('Error fetching regencies:', error);
      }
    };
    // Function to send notification using OneSignal
    const sendNotification = (weatherData) => {
      OneSignal.push(() => {
        OneSignal.sendSelfNotification(
          `Cuaca Sekarang di ${weatherData.name}`,
          `Suhu: ${weatherData.main.temp}°C, saat ini cuaca sedang ${weatherData.weather[0].description}`,
          `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`,
          'https://sky-trend.web.app'
        );
      });
    };

    // Function to fetch weather and send notification if conditions are met
    const fetchWeatherAndSendNotification = async () => {
      
      // console.log("Weather data", weatherData)
      if (weatherData) {
        // Example: Send notification if temperature is above 30°C or if it’s raining
        // if (weatherData.main.temp > 30 || weatherData.weather[0].main === 'Rain') {

        //   sendNotification(weatherData);
        // }
        sendNotification(weatherData);
      }
    };
  // console.log(provinces)

  const fetchForecastData = async (location) => {
    console.log("forecast ", location)
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
      // console.log(cityData)
      // Filter the data to get the first 5 entries (5-day forecast)
      const fiveDayForecast = weatherList.filter((_, index) => index % 8 === 0); // Every 8th entry for 5 days
      setForecastData(fiveDayForecast);
      // console.log(fiveDayForecast)
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllWeatherData = async () => {
    try {
      const cities = ibukotaIndonesia.map(city=>axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=id`))
      // console.log(cities)
      const responses = await Promise.all(cities)
      setAllWeatherData(responses.map(response => response.data));
    } catch (err) {
      console.log(err)
      setError('Error fetching weather data');
    }
  };
  useEffect(() => {
    fetchAllWeatherData()
    fetchProvinces()
    fetchRegencies(idProvince)
    fetchForecastData(selectedRegency)
    const fetchWeatherData = async (location, city) => {
      if (!location) return; // Don't fetch if no location is selected
      setLoading(true);
      const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&lang=id`;
      try {
        const response = await axios.get(API_URL);
        setWeatherData(response.data);
        // console.log("Weater response", response.data)
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    // Determine the location based on the user's selection
    if (selectedDistrict) {
      fetchWeatherData(selectedDistrict);
      // console.log(selectedDistrict)
      return;
    } else if (selectedRegency) {
      fetchWeatherData(selectedRegency);
      // console.log(selectedRegency)
      return;
    } else if (selectedProvince) {
      fetchWeatherData(selectedProvince); 
      // console.log(selectedProvince)
      return;
    }
    self.addEventListener('push', function(event) {
      console.log("Push", event)
      const notificationData = event.data.json();
      console.log(notificationData)
      const { title, body, icon } = notificationData.notification;
    
      const options = {
        body,
        icon,
        data: notificationData,
      };
    
      event.waitUntil(self.registration.showNotification(title, options));
    });

    // Set interval to check weather every 5 minutes
    const intervalId = setInterval(() => {
      fetchWeatherAndSendNotification();
    }, (1 * 60 * 1000)/2);  // Check every 5 minutes

    return () => clearInterval(intervalId);
    
  }, [selectedDistrict, selectedRegency, selectedProvince]);

  const handleBox = (index) => {
    setisActive(index)
    setWeatherData(forecastData[index])
    setCityData(cityData)
    Weather(cityData)
    // console.log(Weather)
  }

  const handleCityClick = (cityWeather, index) => {
    // console.log(cityWeather.name," Ini", index)
    setCityData(cityWeather)
    fetchForecastData(cityWeather.name)
    // console.log("Handle", cityData)
    setWeatherData(allWeatherData[index])
    setActiveCityIndex(index)
};

  const imgSrc = wallpaperSrc(weatherData?.weather[0].icon)

 
  const basicBoxStyles = {
    color: 'white',
    minH : '700px',
    width: '100vw',
    height: '100vh',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    // textShadow: '10px 10px 20px black',
    fontWeight: 'bold',
    fontSize: '20px',
    backgroundImage: `url(${imgSrc})`,
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  }

 
    return (
        <Grid
  templateAreas={`"header header"
                  "main main"
                  "footer footer"`}
  gridTemplateRows={'50px 1fr 30px'}
  gridTemplateColumns={'150px 1fr'}
  h='100vh'
  gap='1'
  fontWeight='bold' 
>
  <Header/>
  <GridItem p='2' area={'main'}>
    <Box maxW='100%' maxH='400px' borderRadius={5} p={2} sx={basicBoxStyles}>
  {loading ? (
        <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
      ) : error ? (
        <p>Error fetching weather data: {error.message}</p>
      ) : (
        weatherData && <Weather data={weatherData} cityName={cityData?.name}/>  
      )}
      <Flex overflowX={'scroll'} sx={{
      "::-webkit-scrollbar": {
        display: "none",
      },
    }}maxW='100%' borderRadius={5} p={2} h={170} pt={2} templateColumns='repeat(5, 2fr)' gap={2}>
        {forecastData.map((data, index) => (
          <Forecast key={index} data={data} isFirst={index === 0} isActive={isActive === index} onClick={() => handleBox(index)} />
        ))}
      </Flex>
  </Box>
  <Box>
  <ListCity cities={ibukotaIndonesia} onCityClick={handleCityClick} activeCityIndex={activeCityIndex} allWeatherData={allWeatherData}/>
  </Box>
  </GridItem>
  {/* <GridItem pl='2' bg='blue.300' area={'footer'}>
    Footer
  </GridItem> */}
 

</Grid>
    )
}

export default Home