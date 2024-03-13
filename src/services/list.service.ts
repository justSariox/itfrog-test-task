import { model } from 'mongoose'
import { ListSchema } from "../models/list";

const List = model('List', ListSchema)


interface ListRequest {
    fullName: string,
    shortName: string,
    color: string
    cities: string[]
}

export const getAllLists = async () => {
    return List.find().populate("cities")
};

export const getListById = (id: string) => {
    return List.findById(id)
};

export const createList = (body: ListRequest) => {

    return List.create(body)

}

export const updateList = (id: string, body: ListRequest) => {
    return List.findByIdAndUpdate(id, body)
};

export const deleteList = (id: string) => {
    return List.findByIdAndDelete(id)
}