import { Box, Center, Flex, GridItem, Image, Spacer, useColorModeValue } from "@chakra-ui/react";
import weatherSrc from "./WeatherSrc";

const Forecast = ({ data, isActive, onClick}) => {
    // console.log(data)
  const {
    main: { temp, humidity },
    weather,
    wind: { speed },
    rain,
    clouds: { all },
    dt
  } = data;
  const bg = useColorModeValue('rgba(0, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.6)' );
  const bg_box = useColorModeValue('rgba(68, 105, 149, 0.6)', 'rgba(108, 138, 177, 0.6)')
  const bg_icon = useColorModeValue('black', 'white')
  const color = useColorModeValue('black', 'white')
  const utcDate = new Date(dt * 1000); 
  const timezone = 25200 
  // Calculate the local time by adding the timezone offset (in seconds, convert to milliseconds)
  const localTime = new Date(utcDate.getTime() + timezone * 1000);

  // Format the local time
  const year = localTime.getUTCFullYear();
  const month = localTime.toLocaleString('id-ID', { month: 'long' });
  const day = localTime.getUTCDate();
  const hour = localTime.getUTCHours();
  const minute = localTime.getUTCMinutes();
  const second = localTime.getUTCSeconds();

  // Format the date and time manually
  const formattedDate = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    

  const getDayName = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
    return date.toLocaleDateString("id-ID", { weekday: "long" }); // Get the day name
  };

  const imgSrc = weatherSrc(weather[0].icon)

  return (
      <Box color={'white'} textShadow={'0 0 20px black'} onClick={onClick} overflow='hidden' cursor="pointer" bg={isActive ? bg_box : bg} h={140} w='150px' borderRadius={'lg'} p={2} textAlign={'center'}>
        <Center fontSize={'14'}>
          <Box textTransform={'capitalize'}>
          {formattedDate}
          </Box>
          
        </Center>
        <Center pt={'2'}>
         <Image 
            src={imgSrc}
            alt={'property.imageAlt'} 
            W={50} 
            h={50}/>
        </Center>
        <Box pt={1} fontSize={'xs'}>{(temp - 273.15).toFixed(0)} °C</Box>
        {/* <Box pt={2} textTransform={'capitalize'} fontSize={12}>{weather[0].description}</Box> */}
      </Box>
  );
};

export default Forecast