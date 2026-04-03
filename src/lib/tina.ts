import { createClient } from 'tinacms/dist/client'

export const tinaClient = createClient({
  url: 'http://localhost:4001/graphql',
  token: '',
})
