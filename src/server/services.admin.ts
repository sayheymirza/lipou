import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IAdminSchema } from './interfaces';
import { Database } from './core';

class Admin {
  public database = new Database<IAdminSchema>('admin.json');

  constructor() {}

  public login(username: string, password: string) {
    const users = this.database.select();

    const user = users.find((item) => item['username'] == username);

    if (!user) {
      return {
        status: false,
        code: 400,
        error: 1,
        message: 'User not found',
      };
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return {
        status: false,
        code: 400,
        error: 2,
        message: 'User with bad password',
      };
    }

    const token = jwt.sign(
      {
        username: user.username,
        role: 'admin',
      },
      process.env['JWT_HASH'] ?? 'JWT_HASH'
    );

    return {
      status: true,
      code: 200,
      error: -1,
      message: 'Hello user',
      data: {
        token,
        user: {
          fullname: user.fullname,
          username: user.username,
        },
      },
    };
  }

  public create(fullname: string, username: string, password: string) {
    // check user with that username is exists or not
    const users = this.database.select();

    if (users.findIndex((item) => item['username'] == username) != -1) {
      return {
        status: false,
        code: 400,
        error: 1,
        message: 'User with this username exists',
        data: {
          username,
        },
      };
    }

    const data = this.database.insert({
      fullname,
      username,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    });

    return {
      status: true,
      code: 200,
      error: -1,
      message: 'New user is here',
      data,
    };
  }

  public list() {
    const users = this.database.select();

    return {
      status: true,
      code: 200,
      error: -1,
      message: 'List of users',
      data: users.map((item) => ({
        fullname: item.fullname,
        username: item.username,
      })),
    };
  }
}

export const admin = new Admin();
