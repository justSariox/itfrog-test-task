import { Schema } from "mongoose"

export const CitySchema: Schema = new Schema({
    name: { type: "String", required: true},
    description: { type: "String", required: true }
})
