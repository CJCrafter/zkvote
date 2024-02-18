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

        let checkvalid = await fetch('http://localhost:3001/api/getTicket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ addr: voterid })
        });

        console.log(checkvalid.status)
        console.log(checkvalid);

        if (checkvalid.status === 200) {
            let data = await checkvalid.json();
            console.log(data);
            res.status(200).json(data);
        } else {
            console.log(checkvalid.status);
            res.status(400).json({ message: "Invalid Voter" });
        }


    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
