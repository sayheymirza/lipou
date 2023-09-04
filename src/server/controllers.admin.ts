import {  Request, Response } from 'express';
import { admin } from './services';

const create = async (req: Request, res: Response) => {
    try {
        const {
            fullname,
            username,
            password,
        } = req.body;

        return admin.create(
            fullname,
            username,
            password
        )
    } catch (error) {
        return {
            status: false,
            code: 500,
            error: 500,
            message: 'Internal Server Error'
        }
    }
}

const login = async (req: Request, res: Response) => {
    try {
        const {
            username,
            password,
        } = req.body;

        return admin.login(
            username,
            password
        )
    } catch (error) {
        return {
            status: false,
            code: 500,
            error: 500,
            message: 'Internal Server Error'
        }
    }
}

const list = async (req: Request, res: Response) => {
    try {
        return admin.list();
    } catch (error) {
        return {
            status: false,
            code: 500,
            error: 500,
            message: 'Internal Server Error'
        }
    }
}

export default {
    create,
    login,
    list,
}