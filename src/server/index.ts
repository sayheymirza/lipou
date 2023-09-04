import { Router } from 'express';
import middlewares from './middlewares';
import controllers from './controllers';
import validators from './validators';

const router = Router();

// auth
/**
 * @swagger
 * /auth/login:
 *  post:
 *      summary: Admin Login
 *      tags:
 *          - Admin
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                          password:
 *                              type: string
 */
router.post(
    '/auth/login',
    middlewares.validate(validators.admin.login),
    controllers.admin.login
);

// admin
router.post(
    '/admin/admin/create',
    middlewares.auth('admin'),
    middlewares.validate(validators.admin.create),
    controllers.admin.create
);
router.get(
    '/admin/admin/list',
    middlewares.auth('admin'),
    controllers.admin.list
);

export default router;
