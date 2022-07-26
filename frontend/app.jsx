import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import theme from './theme.js'
import Layout from './layout/index.jsx'
import Hello from './routes/Hello.jsx'
import Networks from './routes/Networks.jsx'

const queryClient = new QueryClient()

export default function App () {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ChakraProvider theme={theme}>
        <Router>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Hello />} />
              <Route path='/network' element={<Networks />} />
              <Route
                path='*'
                element={
                  <main style={{ padding: '1rem' }}>
                    <p>There's nothing here!</p>
                  </main>
                }
              />
            </Route>
          </Routes>
        </Router>
      </ChakraProvider>
    </QueryClientProvider>
  )
}
