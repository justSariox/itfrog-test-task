import {Request, Response, Router} from 'express'
import { createList, deleteList, getAllLists, getListById, updateList } from "../services/list.service";
import {checkSchema, validationResult, param} from "express-validator";
import {listValidationSchema} from "../validation-schemas/list.validation";

const router = Router()


router.get('/', async (req: Request, res: Response) => {
    try {
        const lists = await getAllLists()
        res.status(200).json(lists)

    } catch (e) {
        res.status(500).json({ message: "something went wrong"})
    }
})

router.get('/:id', param('id', '').isMongoId(), async (req: Request, res: Response) => {
    const id = req.params.id

    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({message: "Bad request", errors: errors.array()})
        }

        const list = await getListById(id)


        if (!list) {
            return res.status(404).json({ message: 'List not found'});
        }

        res.status(200).json(list)
    } catch (e) {
        res.status(500).json({ message: "something went wrong"})
    }
})

router.post('/', checkSchema(listValidationSchema, ['body']), async (req: Request, res: Response) => {
    const body = req.body

    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({message: "Bad request", errors: errors.array()})
        }

        const list = await createList(body)

        res.status(200).json(list)
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

        const list = await deleteList(id)

        if (!list) {
            return res.status(404).json({ message: 'List not found'});
        }

        res.status(200).json(list)
    } catch (e) {
        res.status(500).json({ message: "something went wrong"})
    }
})

router.patch('/:id', param('id', '').isMongoId(), checkSchema(listValidationSchema, ['body']) , async (req: Request, res: Response) => {
    const id = req.params.id
    const body = req.body

    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({message: "Bad request", errors: errors.array()})
        }

        const list = await updateList(id, body)

        if (!list) {
            return res.status(404).json({ message: 'List not found'});
        }

        res.status(200).json(list)
    } catch (e) {
        res.status(500).json({ message: "something went wrong"})
    }
})

export { router }