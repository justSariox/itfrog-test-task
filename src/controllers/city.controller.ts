import {checkSchema, param, validationResult} from 'express-validator'

import {Request, Response, Router} from 'express'

import { createCity, deleteCity, getAllCities, getCityById, updateCity } from "../services/city.service";
import { cityValidationSchema } from "../validation-schemas/city.validation";

const router = Router()


router.get('/', async (req: Request, res: Response) => {
    try {
        const cities = await getAllCities()
        res.status(200).json(cities)

    } catch (e) {
        res.status(500).json({ message: "something went wrong"})
    }
})

router.get('/:id', param('id', 'id must be mongoId').isMongoId(), async (req: Request, res: Response) => {
    const id = req.params.id

    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({message: "Bad request", errors: errors.array()})
        }

        const city = await getCityById(id)

        res.status(200).json(city)
    } catch (e) {
        res.status(500).json({ message: "something went wrong"})
    }
})

router.post('/', checkSchema(cityValidationSchema, ['body']), async (req: Request, res: Response) => {
    const body = req.body

    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({message: "Bad request", errors: errors.array()})
        }

        const city = await createCity(body)

        res.status(200).json(city)
    } catch (e) {
        res.status(500).json({ message: "something went wrong"})
    }
})

router.delete('/:id', param('id', '').isMongoId(), async (req: Request, res: Response) => {
    const id = req.params.id

    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({message: "Bad request", errors: errors.array()})
        }

        const city = await deleteCity(id)

        if (!city) {
            res.status(404).json({message: "city not found"})
        }

        res.status(200).json(city)
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: "something went wrong"})
    }
})

router.patch('/:id', param('id', '').isMongoId(), checkSchema(cityValidationSchema, ['body']), async (req: Request, res: Response) => {
    const id = req.params.id
    const body = req.body

    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({message: "Bad request", errors: errors.array()})
        }

        const city = await updateCity(id, body)

        if (!city) {
            return res.status(404).json({ message: 'City not found'});
        }

        res.status(200).json(city)
    } catch (e) {
        res.status(500).json({ message: "something went wrong"})
    }
})

export { router }