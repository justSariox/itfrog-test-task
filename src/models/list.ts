import { Schema } from "mongoose"

export const ListSchema: Schema = new Schema({
    fullName: { type: "String", required: true },
    shortName: { type: "String", required: true },
    color: { type: "String", required: true },
    cities: [{ type: Schema.Types.ObjectId, ref: "City" }]
})
