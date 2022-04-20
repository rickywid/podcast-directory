import type { NextApiRequest, NextApiResponse } from 'next'
import { ROOTURL } from '../../consts'
import { headers } from '../../utils/headers'

type Data = {
    data: any
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    const list = JSON.parse(req.body.list)

    await Promise.all(
        list.map(async (url: string) => {
            return fetch(`${ROOTURL}/podcasts/byfeedurl?url=${url}&pretty`, { headers })
                .then(v => v.json())
        })
    ).then(async (values: any) => {
        values = values.map((v: any) => v.feed)
        res.status(200).json({ data: values })
    })
}
