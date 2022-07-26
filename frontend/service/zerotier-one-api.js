import * as one from '../../zerotier-one-api/index.js'

const configuration = new one.Configuration({
  basePath: '/one'
})

export async function getNetworks () {
  const s = new one.NetworkApi(configuration)
  const { data } = await s.getNetworks()
  return data
}

export async function getStatus () {
  const s = new one.StatusApi(configuration)
  const { data } = await s.getStatus()
  return data
}
