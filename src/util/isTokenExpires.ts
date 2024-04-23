import jwt, { JwtPayload } from 'jsonwebtoken';

export default function isTokenExpired(token: string): boolean {
    try {
        const decoded = jwt.decode(token, { complete: true }) as { payload: JwtPayload };

        // Extract expiration time from the decoded token
        const expirationTime = decoded.payload.exp as number;

        // Compare expiration time with current time (in seconds)
        const currentTime = Math.floor(Date.now() / 1000);

        // Token is considered expired if expiration time is in the past
        return expirationTime < currentTime;
    } catch (error) {
        // If decoding fails or expiration time is missing, token is considered expired
        return true;
    }
}