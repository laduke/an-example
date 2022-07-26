import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'system',
  useSystemColorMode: true
}

const theme = extendTheme(
  { config },
  withDefaultColorScheme({ colorScheme: 'cyan' })
)

export default theme
