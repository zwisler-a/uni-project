import { Response, Request, NextFunction } from 'express';
import bcrypt from 'bcrypt';

import { User, USER_CREATE, USER_PATCH } from '../models/user';
import { UserModel } from '../../database/models/user';
import jsonwebtoken, { TokenExpiredError } from 'jsonwebtoken';


export async function receivingResetRequest(req: Request, res: Response) {
    console.info('');
    console.info('*************');
    console.info('*************');

    const emailAddress = req.body.email;

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

    const secret = benutzer.password + benutzer.id + benutzer.companyId;
    console.log(secret);

    const token = generateToken(secret, '2400h', payload);
    console.log(token);
    // TODO remove the resetLink from the body, because now it is just for presentation, but shall only send per email later
    res.status(200).send({resetLink: '/resetpassword/' + payload.id + '/' + token});
    // res.status(200).send({resetLink: '<a href="/resetpassword/' + payload.id + '/' + token + '">Reset password</a>'});
}

export async function validate(req: Request, res: Response) {
    const token = req.body.token;
    const users: User[] = await UserModel.getAll();

    const benutzer = users.filter(user => user.id === 2)[0];

    const secret = benutzer.password + benutzer.id + benutzer.companyId;


    jsonwebtoken.verify(token, secret, function (err: Error, data: any) {
        if (err) {
            // TODO try to get it working with status code 400
            res.status(200).json({message: 'Password reset token is invalid or expired', success: false});
        } else {
            res.status(200).json({success: true});
        }
    });
}

export async function reset(req: Request, res: Response) {
    console.log(req.body);
    let user: User = USER_PATCH.validate(req.body);
    // let user: User = {
    //     password: req.body['pass1']
    // };
    user.name = 'Hugo';
    user.companyId = 666;
    user.email = 'abc@def.gh';
    user.email = 'test@gmail.com';
    user.password = req.body['pass1'];

    user = await UserModel.update(2, user);

    res.status(200).send(user);

}

function generateToken(secret: any, expiresIn: string, payload: any = {}) {
    return jsonwebtoken.sign(payload, secret, {expiresIn});
}

