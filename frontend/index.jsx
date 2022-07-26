import React from 'react'
import { createRoot } from 'react-dom/client'
import { ColorModeScript } from '@chakra-ui/react'

import theme from './theme.js'
import App from './app.jsx'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </>
)
