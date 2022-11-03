// TODO: Her er det bugs
/* 
  CHANGES DONE
  > return status set to 200 instead of 404
  > made response types

  SUGGESTIONS
  > import data(countries) from /data?
*/

import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseDataTypes = {
  success: boolean
  data: Record<string, string>
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseDataTypes>
) {
  // const country = countries[Math.floor(Math.random() * countries.length)]
  const country = { name: 'hello', unicodeFlag: 'hello2' }

  return res.status(200).json({ success: true, data: country })
}
