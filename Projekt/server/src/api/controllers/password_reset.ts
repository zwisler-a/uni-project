import { Response, Request, NextFunction } from 'express';
import bcrypt from 'bcrypt';

import { User, USER_CREATE, USER_PATCH } from '../models/user';
import { UserModel } from '../../database/models/user';
import jsonwebtoken, { TokenExpiredError } from 'jsonwebtoken';


export async function receivingResetRequest(req: Request, res: Response) {
    const emailAddress = req.body.email;
    const users: User[] = await UserModel.getAll();

    if (users.filter(user => user.email === emailAddress).length < 1) {
        // if the email address is does not belong to any user the frontend gets no information about that
        // that way it is not possible to check for attackers which emails are registered
        res.status(200).send({});
    } else {
        const user = users.filter(user => user.email === emailAddress)[0];

        const payload = {
            id: user.id,
            email: emailAddress
        };
        // the secret contains the hash of the former password, thus it is not possible to use the same reset link again after password reset
        const secret = user.password + user.id + user.companyId;
        // the token expires after half an hour
        const token = generateToken(secret, '0.5h', payload);
        // TODO remove the resetLink from the body, because now it is just for presentation, but shall only be send via email later
        res.status(200).send({resetLink: '/resetpassword/' + payload.id + '/' + token});
    }
}


export async function validate(req: Request, res: Response) {
    const token = req.body.token;
    const users: User[] = await UserModel.getAll();

    const user = users.filter(user => user.id === Number.parseInt(req.body['id']))[0];

    const secret = user.password + user.id + user.companyId;


    jsonwebtoken.verify(token, secret, function (err: Error, data: any) {
        if (err) {
            // TODO try to get it working with status code 400
            res.status(200).json({success: false, message: 'Password reset token is invalid or expired'});
        } else {
            res.status(200).json({success: true, username: user.name});
        }
    });
}


export async function reset(req: Request, res: Response) {
    let user: User = USER_PATCH.validate(req.body);

    if (req.body['pass1'] == req.body['pass2']) {
        user.password = req.body['pass1'];
    }
    user.email = 'test@gmail.com';
    user.id = 3;
    const id: number = Number.parseInt(req.body['id']);
    console.log(user);

    try {
        // UserModel.update(id, user);
        user = await UserModel.update(id, user);
    } catch (e) {
        console.log('Fehler: ' + e);
    }


    res.status(200).send();

}

function generateToken(secret: any, expiresIn: string, payload: any = {}) {
    return jsonwebtoken.sign(payload, secret, {expiresIn});
}

