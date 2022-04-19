import type { NextApiRequest, NextApiResponse } from 'next'
import { ROOTURL } from '../../consts'
import { headers } from '../../utils/headers'

type Data = {
    data: any
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    fetch(`${ROOTURL}/podcasts/byfeedurl?url=${req.body.feedUrl}&pretty`, { headers })
    .then(res => {
        return res.json()
    }).then(data => {
        res.status(200).json({ data })
    })
}
