/** Response of the '/api/authenticate' request */
export interface AuthenticateResponse {
    /** short lived JWT */
    short: string;
    /** Long lived JWT */
    long: string;
}
