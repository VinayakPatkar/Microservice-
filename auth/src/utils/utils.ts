import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
async function generateToken() {
    return crypto.randomBytes(20).toString('hex');
}
async function generateTokenAndExpiry(type: string){
    switch (type) {
        case 'verification':
            const verifyToken = await generateToken();
            const EMAIL_VERIFY_TOKEN_EXPIRY_TIME = Date.now() + 3600000 * 24;
            return { verifyToken, EMAIL_VERIFY_TOKEN_EXPIRY_TIME };
        case 'resetpassword':
            const resetToken = await generateToken();
            const RESET_PASSWORD_TOKEN_EXPIRY_TIME = Date.now() + 3600000 * 24;
            return { resetToken, RESET_PASSWORD_TOKEN_EXPIRY_TIME };
    }
}
function checkPasswordStrength(password: string) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
        return { isStrong: false, message: 'Password must be at least 8 characters long.' };
    }
    if (!hasUpperCase) {
        return { isStrong: false, message: 'Password must contain at least one uppercase letter.' };
    }
    if (!hasLowerCase) {
        return { isStrong: false, message: 'Password must contain at least one lowercase letter.' };
    }
    if (!hasNumbers) {
        return { isStrong: false, message: 'Password must contain at least one number.' };
    }
    if (!hasSpecialChars) {
        return { isStrong: false, message: 'Password must contain at least one special character.' };
    }

    return { isStrong: true, message: 'Password is strong.' };
}
async function generateJWTToken(payload: any){
    try {
        const token = jwt.sign(payload, "secretkey")
        return token
    } catch (error) {
        console.error(error);
        return;
    }
}
export { generateTokenAndExpiry, checkPasswordStrength, generateJWTToken }