import { useState, useEffect } from 'react';
import { AbsoluteCenter, Box, Center, Container, Flex, Grid, GridItem, Image, SimpleGrid, Spacer, VStack, useColorModeValue } from '@chakra-ui/react'
import weatherSrc from './WeatherSrc';


const Weather = ({ data, cityName}) => {
  console.log("Weather ", data, cityName)
  const {
    main: { temp, humidity },
    weather,
    wind: { speed },
    rain,
    clouds: { all },
    dt,
    city,                        
    timezone  
  } = data;

  // console.log(cityName)



  const bg = useColorModeValue('#6C8AB1', '#446795')
  const bg_icon = useColorModeValue('black', 'white')
  const color = useColorModeValue('white', '#white')
  const utcDate = new Date(dt * 1000); 

  // Calculate the local time by adding the timezone offset (in seconds, convert to milliseconds)
  const localTime = new Date(utcDate.getTime() + timezone * 1000);

  // Format the local time
  const year = localTime.getUTCFullYear();
  const month = localTime.toLocaleString('en-US', { month: 'long' });
  const day = localTime.getUTCDate();
  const hour = localTime.getUTCHours();
  const minute = localTime.getUTCMinutes();
  const second = localTime.getUTCSeconds();

  // Format the date and time manually
  const formattedDate = `${month} ${day}, ${year} at ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
  const getDayName = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
    return date.toLocaleDateString("id-ID", { weekday: "long" }); // Get the day name
  };

  const imgSrc = weatherSrc(weather[0].icon)
  const bgs = useColorModeValue('rgba(68, 105, 149, 0)', 'rgba(108, 138, 177, 0)' );
  return (
    <Box maxW='100%' minH={'500px'} overflow='hidden'>
      <Box h={'auto'} w='100%'>
        <VStack>
          <Box w='100%' h='auto' display={{ md: 'flex' }}>
            <Flex minWidth='max-content' alignItems='center' gap='2' justifyContent={'space-between'}>
                <Box bg={'rgba(0, 0, 0, .6)'} borderRadius={5} p={3} color={color} fontSize={'2xl'} fontWeight='bold'>
                  {cityName}
                </Box>

                <Box p={3} pl={8} color={color} fontSize={'2xl'} fontWeight='bold' bg={'rgba(0, 0, 0, .6)'} borderRadius={5}>
                  {getDayName(dt)}
                </Box>
            </Flex>
          </Box>

          <Box>
            <Center>
              <Image 
                  src={imgSrc}
                  alt={'property.imageAlt'} 
                  width={{ base: '70%', sm: '50%', md: '25%' }}
                  height={{ base: '70%', sm: '50%', md: '25%' }}
                  />
            </Center>
          </Box>
          <Box bg={'rgba(0, 0, 0, .6)'} borderRadius={5} w={'100%'} h='auto' display="flex" alignItems="center" >
            <Box float='left' pl='5' fontSize={'44'} fontWeight='bold' color={color}>{(temp - 273.15).toFixed(0)} °C</Box>
              <VStack>
              <Box color={color} fontWeight='bold' textAlign={'left'} p='5' fontSize={'sl'}>
                <Box textTransform={'capitalize'}>
                {weather[0].description}</Box>
                <Box>
                Kelembaban {humidity}%</Box>
                </Box>
              </VStack>
            </Box>
          <Box>
          </Box>
        </VStack>
      </Box>
      
      {/* <p>Temperature: {(temp - 273.15).toFixed(0)} °C</p>
      <p>Humidity: {humidity} %</p>
      <p>Wind Speed: {speed} m/s</p>
      <p>Rain: {rain?.['1h'] ? rain['1h'] : 0} mm</p>
      <p>Cloud Coverage: {all} %</p>
      <p>Date: {formattedDate}</p> */}
      
  </Box>
  );
};
export default Weather;