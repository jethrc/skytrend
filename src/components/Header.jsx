import React from 'react';
import { 
    Box, 
    Button, 
    Drawer, 
    DrawerBody, 
    DrawerCloseButton, 
    DrawerContent, 
    DrawerFooter, 
    DrawerHeader, 
    DrawerOverlay, 
    Grid, 
    GridItem,
    useColorModeValue,
    useColorMode,
    useDisclosure, 
    Switch,
    Flex,
    Spacer} from "@chakra-ui/react"

import { HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link } from '@chakra-ui/react'

function Header(){
    const bg = useColorModeValue('#bbs', '#ffs')
    const bg_icon = useColorModeValue('black', 'white')
    const color = useColorModeValue('#bbs', '#ffs')
    const { toggleColorMode } = useColorMode()
    const btnRef = React.useRef()
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    return(
        <GridItem pl='0' bg={bg} area={'header'} >
            <Box boxShadow='md'>
            <Flex templateColumns='repeat(5, 1fr)' gap={4}>
                <GridItem colSpan={2} h='100%' color={color}>
                    <Button ref={btnRef} colorScheme={color} onClick={onOpen}>
                        <HamburgerIcon color={bg_icon}/>
                    </Button>
                    SkyTrend
                </GridItem>
                <Spacer/>
                <GridItem colStart={4} colEnd={6} h='100%' bg={bg}>
                        <Box float='right' padding='1' paddingRight='5'>
                        <SunIcon color={bg_icon}/>
                        <Switch colorScheme='blue' bg={bg} size='lg' onChange={toggleColorMode}/>
                        <MoonIcon color={bg_icon}/>
                    </Box>
                </GridItem>
            </Flex>
            </Box>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>SkyTrend</DrawerHeader>

                <DrawerBody>
                

                <Link href='/'>
                    <Box borderBottom={'1px'} textAlign={'center'} p={'5'}>
                        Home
                    </Box>
                </Link>
                <Link href='/city'>
                    <Box borderBottom={'1px'} textAlign={'center'} p={'5'}>
                        Search City
                    </Box>
                </Link>
                <Link href='/about'>
                    <Box borderBottom={'1px'} textAlign={'center'} p={'5'}>
                        About Us
                    </Box>
                </Link>
                </DrawerBody>

                <DrawerFooter>
                    
                </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </GridItem>
    )
}

export default Header