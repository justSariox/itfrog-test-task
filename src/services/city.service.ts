import { model } from 'mongoose'
import { CitySchema } from "../models/city";

const City = model('City', CitySchema)
export const getAllCities = async () => {
    return City.find()
};

export const getCityById = (id: string) => {
    return City.findById(id)
};

export const createCity = (body: {name: string, description: string}) => {
    return City.create(body)

}

export const updateCity = (id: string, body: {name: string, description: string}) => {
    return City.findByIdAndUpdate(id, body)
};

export const deleteCity = (id: string) => {
    return City.findByIdAndDelete(id)
}