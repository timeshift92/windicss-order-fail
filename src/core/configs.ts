import { hasuraAdminPass } from "@/../.env";
export const host = 'http://dc.uzcloud.uz'
// export const host = 'https://tscorp-graphql.herokuapp.com'
export const graphUrl = `${host}/v1/graphql`
export const graphQuery = `${host}/v1/query`

export const serverUrl = 'http://localhost:3001'
export const storageUrl = 'http://localhost:5050'


export const adminPass = hasuraAdminPass
