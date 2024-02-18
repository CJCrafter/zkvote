// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    console.log("HANDLING")
    if (req.method === "POST") {
        const { ticket, candidate } = req.body;

        let checkvalid = await fetch('http://localhost:3001/api/votechain', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ vote: candidate, ticket: JSON.stringify(ticket)})
        });

        console.log(checkvalid.status)
        console.log(checkvalid);

        if (checkvalid.status === 200) {
            res.status(200).json(
                { message: "Vote casted" }
            );
        } else {
            console.log(checkvalid.status);
            console.log(checkvalid);
            res.status(400).json({ message: "Invalid Voter" });
        }

    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
