import type { NextApiRequest, NextApiResponse } from 'next'
import { headers } from '../../utils/headers'
import { ROOTURL } from '../../consts'

type Data = {
  trending: any,
  categories: any
  randomEps: any,
  randomEps2: any,
  randomEps3: any,
  recentEps: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const data = await Promise.all([
    fetch(`${ROOTURL}/podcasts/trending?pretty&max=21`, { headers }),
    fetch(`${ROOTURL}/categories/list?pretty`, { headers }),
    fetch(`${ROOTURL}/episodes/random?max=7&cat=video+games`, { headers }),
    fetch(`${ROOTURL}/episodes/random?max=7&cat=science`, { headers }),
    fetch(`${ROOTURL}/episodes/random?max=7&cat=technology`, { headers }),
    fetch(`${ROOTURL}/recent/feeds?max=21`, { headers })
  ]).then(async (values) => {
    const trending = await values[0].json()
    const categories = await values[1].json()
    const randomEps = await values[2].json()
    const randomEps2 = await values[3].json()
    const randomEps3 = await values[4].json()
    const recentEps = await values[5].json()

    res.status(200).json({
      trending,
      categories,
      randomEps,
      randomEps2,
      randomEps3,
      recentEps
    })
  })
}
