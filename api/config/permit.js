import { Permit } from "permitio"
import dotenv from 'dotenv'

dotenv.config()
export const permitObject = new Permit({
    // in production, you might need to change this url to fit your deployment
    pdp: 'https://cloudpdp.api.permit.io',
    // your api key
    token: process.env.PERMIT_TOKEN,
})