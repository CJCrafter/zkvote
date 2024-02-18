// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log("HANDLING")
  if (req.method === "POST") {
    const { voterid } = req.body;
    console.log(voterid);
    
    let checkvalid = await fetch('http://localhost:3001/api/checkvalidvoter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ addr: voterid })
    });

    console.log(checkvalid.status)

    if (checkvalid.status === 200) {
      res.status(200).json({ message: "Valid voter" });
    } else {
      console.log(checkvalid.status);
      res.status(400).json({ message: "Invalid voter" });
    }


  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
