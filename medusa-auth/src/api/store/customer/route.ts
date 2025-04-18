import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"



export async function GET(req: MedusaRequest, res: MedusaResponse) {
    res.status(200).json({ message: "Hello world!" })
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
    res.status(200).json({ message: "Hello world!" })
}