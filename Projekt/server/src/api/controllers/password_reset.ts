import { Response, Request, NextFunction } from 'express';
import bcrypt from 'bcrypt';

import { User, USER_CREATE, USER_PATCH } from '../models/user';
import { UserModel } from '../../database/models/user';
import { verifyJsonWebToken } from './authentication';
import jsonwebtoken from 'jsonwebtoken';

/**
 * Route endpoint `GET /api/users/`
 * Fetches all users
 * @param req the request object
 * @param res the response object
 * @param next indicating the next middleware function
 */


export async function receivingResetRequest(req: Request, res: Response) {
    console.info('');
    console.info('*************');
    console.info('*************');

    const emailAddress = req.body.email;

    // const requester = await checkEmail(emailAddress);

    // console.log(requester);
    const users: User[] = await UserModel.getAll();

    if (users.filter(user => user.email === emailAddress).length > 0) {
        // res.status(200).send({validEmail: true});
    } else {
        res.status(404).send({validEmail: false});
    }

    const benutzer = users.filter(user => user.email === emailAddress)[0];

    const payload = {
        id: benutzer.id,
        email: emailAddress
    };
    console.log(payload);

    // const secret = benutzer.password + benutzer.id;
    const secret = benutzer.password + benutzer.id + benutzer.companyId;
    console.log(secret);

    const token = generateToken(secret, '0.5h', payload);
    console.log(token);
    // TODO remove the resetLink from the body, because now it is just for presentation, but shall only send per email later
    res.status(200).send({resetLink: '<a href="/resetpassword/' + payload.id + '/' + token + '">Reset password</a>', });
}

// function checkEmail(emailAddress: string): User {
//     const users: User[] = UserModel.getAll();
//     return users.filter(user => user.email === emailAddress)[0];
//
// }

function generateToken(secret: any, expiresIn: string, payload: any = {}) {
    return jsonwebtoken.sign(payload, secret, {expiresIn});
}

