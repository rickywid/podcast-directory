import crypto from 'crypto'

const APIKEY = 'UYZAVB4P2CHHZERSY2U3'
const SECRETKEY = 'bBFrTEfGFwX6D#5HUnzrzPnw73NwxVnFTaGmkqS3'
const authDate = Math.floor(Date.now() / 1000).toString()
const authString = `${APIKEY}${SECRETKEY}${authDate}`

const hash = crypto.createHash('sha1')
hash.update(authString)

const hashHeader = hash.digest('hex')

export const headers = {
    "User-Agent": "SuperPodcastPlayer/1.3",
    "X-Auth-Key": APIKEY,
    "X-Auth-Date": authDate,
    "Authorization": hashHeader
  }

