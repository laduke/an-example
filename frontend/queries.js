import { useQuery } from '@tanstack/react-query'

import { getNetworks, getStatus } from './service/zerotier-one-api.js'

export function useNetworksQuery () {
  const query = useQuery(['networks'], getNetworks, {
    refetchInterval: 3 * 1000,
    refetchIntervalInBackground: false
  })

  return query
}

export function useStatusQuery () {
  const query = useQuery(['status'], getStatus, {
    refetchInterval: 3 * 1000,
    refetchIntervalInBackground: false
  })

  return query
}
