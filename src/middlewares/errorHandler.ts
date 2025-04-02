import { Request, Response, NextFunction } from 'express'
import logger from '../utils/logger'

export function errorHandler(err: Error, _: Request, res: Response, __: NextFunction) {
    logger.error(err.message, err)
    res.status(500).json({ error: 'Error interno del servidor' })
}
