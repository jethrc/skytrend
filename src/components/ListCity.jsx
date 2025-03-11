import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Card, CardBody, CardFooter, Center, Flex, Heading, Image, Stack, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import weatherSrc from './WeatherSrc';
import { IoLocationOutline } from 'react-icons/io5';

const ListCity = ({cities, onCityClick, activeCityIndex, allWeatherData}) => {

  const [weatherData, setWeatherData] = useState([]);
  const [selectedCityWeather, setSelectedCityWeather] = useState(null);
  const [error, setError] = useState('');
  const API_KEY = 'edb32554617dc90bd210361b92a7796a'; // Replace with your OpenWeather API key
  const fetchWeatherData = async () => {
    try {
      // const city = cities[activeCityIndex]
      // console.log(city)
      // const responses = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=id`)
      setWeatherData(allWeatherData[activeCityIndex]);
    } catch (err) {
      console.log(err)
      setError('Error fetching weather data');
    }
  };
  // Fetch weather data for all cities on component mount
  useEffect(() => {
    fetchWeatherData();
  }, [cities, API_KEY]);

  const bg = useColorModeValue('linear-gradient(to bottom, #57c1eb 0%,#246fa8 100%)', 'linear-gradient(to bottom, #1e528e 0%,#728a7c 50%,#e9ce5d 100%)')
  const bg_icon = useColorModeValue('black', 'white')
  const color = useColorModeValue('white', '#white')
 
  const getFormattedDate = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
    return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }); // Return formatted date
  };

  
  const getDayName = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
    return date.toLocaleDateString("id-ID", { weekday: "long" }); // Get the day name
  };


  return (
    <Box>
        {allWeatherData.map((cityWeather, index) => (
            <Box 
            key={index} 
            onClick={() => onCityClick(cityWeather, index)} 
            style={{ cursor: 'pointer', margin: '10px 0', borderRadius: '10px', overflow: 'hidden',transition: 'background 0.3s', backgroundColor: activeCityIndex === index ? '#2d91c2' : '#1e528e',}} 
            h='120' 
            w='100%'
        >
            <Box w='100%' h='auto' display={{ md: 'flex' }}>
                <Flex 
                    minWidth='max-content' 
                    alignItems='center' 
                    gap='2' 
                    justifyContent='space-between'
                >
                    <Box p={3} textTransform='capitalize' color={color} fontSize='xl' display={'flex'} alignItems={'center'} fontWeight='bold'>
                    <IoLocationOutline /> {cityWeather.name}
                    </Box>
                    {/* Uncomment this if you want to display the day name */}
                    {/* <Box p={3} pl={8} color={color} fontSize='2xl' fontWeight='bold'>
                        {getDayName(cityWeather.dt)}
                    </Box> */}
                </Flex>
            </Box>

            <Box w='100px' h='auto' position='absolute' right='0'>
                <Image 
                    src={weatherSrc(cityWeather.weather[0].icon)} 
                    alt='Weather icon' 
                    width={{ base: '50%', sm: '50%', md: '70%' }} 
                    height={{ base: '50%', sm: '50%', md: '70%' }} 
                />
            </Box>
            
            <Box w='100%' h='auto' display="flex" alignItems="center">
                <Box pl='5' fontSize='2xl' fontWeight='bold' color={color}>
                    {((cityWeather.main.temp)- 273.15).toFixed(0)} °C
                </Box>
                <VStack align='start' spacing={0}>
                    <Box color={color} fontWeight='bold' textAlign='left' paddingLeft={5} fontSize='sm'>
                        <Box fontSize={'xs'}>
                          {getDayName(cityWeather.dt)}, {getFormattedDate(cityWeather.dt)}
                        </Box>
                        <Box textTransform='capitalize' color={color} fontWeight={'bold'}>
                          {cityWeather.weather[0].description}
                        </Box>
                    </Box>
                </VStack>
                
            </Box>
        </Box>
        ))}

      {error && <p>{error}</p>}
    </Box>
  );
};

export default ListCity;
