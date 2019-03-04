import { Response, Request } from 'express';

import { User, USER_PATCH } from '../models/user';
import { UserModel } from '../../database/models/user';
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export async function receivingResetRequest(req: Request, res: Response) {
    const emailAddress = req.body.email;
    const users: User[] = await UserModel.getAll();

    if (users.filter(user => user.email === emailAddress).length < 1) {
        // if the email address is does not belong to any user the frontend gets no information about that
        // this way it is not possible to check for attackers which emails are registered
        return res.status(200).send({});
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

        const resetLink = req.body.baseURL + 'password/' + payload.id + '/' + token;

        // TODO remove the resetLink from the body later, because now it is just for presentation, but shall only be send via email later
        res.status(200).send({resetLink: '/resetpassword/' + payload.id + '/' + token});

        sendResetLinkViaEmail(emailAddress, user.name, resetLink);
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
        user.password = await bcrypt.hash(req.body['pass1'], 12);
    } else {
        return res.status(409).send;
    }
    const id: number = Number.parseInt(req.body['id']);
    console.log(user);
    try {
        user = await UserModel.update(id, user);
    } catch (e) {
        console.log(e);
    }

    sendConfirmationEmail(user.email, user.name);
    res.status(200).send();
}

function generateToken(secret: any, expiresIn: string, payload: any = {}) {
    return jsonwebtoken.sign(payload, secret, {expiresIn});
}

function sendResetLinkViaEmail(recipient: string, username: string, resetLink: string) {
    sendMail(recipient, 'Password help has arrived!', getResetLinkMailTemplate(username, resetLink));
}

function sendConfirmationEmail(recipient: string, username: string) {
    sendMail(recipient, 'Your Password has been changed.', getPasswordResetConfirmationTemplate(username));
}

function sendMail(recipient: string, subject: string, template: string) {
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        port: 25,
        auth: {
            user: 'akbsender@gmail.com',
            pass: '52323000'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailData = {
        from: '"ak18b" <akbsender@gmail.com>',
        to: 'akbreceiver@gmail.com',
        subject: subject + ' for ' + recipient,
        html: template
    };

    transporter.sendMail(mailData, (error: any, info: any) => {
        if (error) {
            return console.log(error);
        }
        // console.log(info);
    });
}

function getResetLinkMailTemplate(username: string, resetLink: string): string {
    return '<h3>Dear ' + username + ',</h3>' +
        '<p>You requested for a password reset, kindly use this <a href="' + resetLink + '">link</a>' +
        ' to reset your password</p>' +
        '<p>This password reset is only valid for the next 30 minutes.</p>';
}

function getPasswordResetConfirmationTemplate(username: string): string {
    return '<h3>Dear ' + username + ',</h3> ' +
        '<p>Your password has been successful reset, you can now login with your new password.</p>';
}
