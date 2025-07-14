//importing .env file
import dotenv from "dotenv"
dotenv.config()
export const db_name = process.env.DB_NAME
export const db_host = process.env.DB_HOST
export const db_port = process.env.DB_PORT
export const db_password = process.env.DB_PASSWORD
export const db_user = process.env.DB_USER
export const port = process.env.PORT
export const secrete_key = process.env.TOKEN_VERIFICATION_KEY