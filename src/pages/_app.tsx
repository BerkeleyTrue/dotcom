import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import { Fonts } from '../components/Fonts';

import theme from '../theme'

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Fonts />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App
