import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import * as React from 'react'
import theme from './Theme'

import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react'
import { NotificationAPIProvider, NotificationPopup } from '@notificationapi/react';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App>
      </App>
    </ChakraProvider>
  </StrictMode>
)
