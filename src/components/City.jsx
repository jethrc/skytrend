import { Input, VStack, Box, Center, Flex, Image, useColorModeValue, background, Spacer } from "@chakra-ui/react";

const Weather = ({data, cityName}) =>{ 
    const {
        name,
        main: { temp, humidity },
        weather,
        wind: { speed },
        rain,
        clouds: { all },
        dt,
        city,                        
        timezone  
    } = data;

    console.log(cityName)

    const color = useColorModeValue('white', '#white')

    const getDayName = (timestamp) => {
        const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
        return date.toLocaleDateString("id-ID", { weekday: "long" }); // Get the day name
    };

    return (
        <Box overflow={'hidden'} pos={'relative'} bg={'transparent'}>
        <VStack>
          <Box w='100%' h='auto' display={{ md: 'flex' }}>
            <Flex minWidth='max-content' alignItems='center' gap='2' justifyContent={'space-between'}>
                <Box bg={'rgba(0, 0, 0, .6)'} borderRadius={5} p={3} color={color} fontSize={'2xl'} fontWeight='bold' textTransform={'capitalize'}>
                  {cityName}
                </Box>

                <Box bg={'rgba(0, 0, 0, .6)'} borderRadius={5} p={3} pl={8} color={color} fontSize={'2xl'} fontWeight='bold' >
                {getDayName(dt)}
                </Box>
            </Flex>
          </Box>
          
        <Box h={'250px'} justifyContent={'space-between'}>

        </Box>
          <Box bg={'rgba(0, 0, 0, .6)'} borderRadius={5} w={'100%'} h='auto' display="flex" alignItems="center">
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
    )
}

export default Weather