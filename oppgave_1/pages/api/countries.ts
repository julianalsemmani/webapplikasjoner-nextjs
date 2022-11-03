// TODO: Her er det bugs
/* 
  CHANGES DONE
  > return status set to 200 instead of 404
  > made response types
  > now imports data from ../../data

  SUGGESTIONS
  > import data(countries) from /data?
*/

import type { NextApiRequest, NextApiResponse } from 'next'
import { countries } from '../../data'

type ResponseDataTypes = {
  success: boolean
  data: Record<string, string>
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseDataTypes>
) {
  const country = countries[Math.floor(Math.random() * countries.length)]

  return res.status(200).json({ success: true, data: country })
}
