import React from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { Box, Heading, Center, Link } from '@chakra-ui/react'

import { useNetworksQuery } from '../queries.js'

export function NetworksPage (props) {
  const { isLoading, isError, data, error } = props

  if (data) {
    return (
      <Box p='8'>
        <Link color='blue' as={NavLink} to='/'>Status</Link>
        <pre>{JSON.stringify(data, 0, 2)}</pre>
      </Box>
    )
  }

  if (isLoading) {
    return (
      <Center p='8'>
        <Heading>Loading...</Heading>
      </Center>
    )
  }
  if (isError) {
    return (
      <Center p='8'>
        <pre>{error.message}</pre>
      </Center>
    )
  }
}

function NetworksPageData () {
  const { networkId } = useParams()

  const { isLoading, isError, data, error } = useNetworksQuery()

  return (
    <NetworksPage
      data={data}
      isError={isError}
      isLoading={isLoading}
      error={error}
      networkId={networkId}
    />
  )
}

export default NetworksPageData
