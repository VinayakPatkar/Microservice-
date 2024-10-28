import { NextFunction, Request, Response } from "express";

import { userModel } from "../models";
import { checkPasswordStrength, generateAccountVerificationEmailTemplate, generateJWTToken, generateResetPasswordEmailTemplate, generateTokenAndExpiry } from "../utils";
import mail from "../utils/mail";

export function userResponse(user: any){
    return {
        _id: user._id,
        email: user.email,
        name: user.name
    }
}
export function generatePayload(user: any){
    return {
        _id: user.id
    }
}
export const usersignup = async( req: Request, res: Response, next: NextFunction ) : Promise<any> => {
    try{
        const { name, email, password } = req.body;
        if( !name || !email || !password){
            return res.status(422).json({message: "Fill all the details"});
        }
        const emailLowerCase = email.toLowerCase();
        const passwordCheck = checkPasswordStrength(password);
        if(!passwordCheck.isStrong){
            return res.status(422).json({message: passwordCheck.message});
        }
        const existingUser = await userModel.findOne({email: emailLowerCase});
        if(existingUser){
            return res.status(422).json({error: "Email is in use"});
        }
        const { verifyToken, EMAIL_VERIFY_TOKEN_EXPIRY_TIME} = await generateTokenAndExpiry("verification");
        const newUser = new userModel({
            name: name,
            email: emailLowerCase,
            password: password,
            verifyEmailToken: verifyToken,
            verifyEmailExpires: EMAIL_VERIFY_TOKEN_EXPIRY_TIME
        })
        await newUser.save();
        const verificationLink =  `http://localhost:8000/auth/verify?v=${verifyToken}`;
        const htmltemplate = generateAccountVerificationEmailTemplate(verificationLink, newUser.name);
        const mailOptions = {
            to: newUser.email,
            subject: 'Verification',
            html: htmltemplate
        }
        try {
            await mail.send(mailOptions);
            return res.status(201).json({message: "New user Created.", user: userResponse(newUser)})
        } catch (error) {
            console.error(error);
            return res.status(400).json({message: "Could not send the mail"})
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).json({err: error});
    }
};

export const verifyEmail = async(req: Request, res: Response, next: NextFunction) : Promise<any> => {
    try {
        const verifyToken = req.query.v;
        const user = await userModel.findOne({
            verifyEmailToken: verifyToken,
            verifyEmailExpires: { $gt: new Date() }
        });
        if(!user){
            return res.status(401).json({
                message: "Token incorrect or expired"
            })
        }
        user.isEmailVerified = true;
        user.verifyEmailExpires = null;
        user.verifyEmailToken = null;
        await user.save();
        return res.status(200).json({message: "Verified Email Successfully"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({err: error});
    }
}
export const loginUser = async( req: Request, res: Response, next: NextFunction ): Promise<any> => {
    try {
        const { email, password } = req.body;
        const userFound = await userModel.findOne({ email: email});
        if(!userFound){
            return res.status(404).json({message: "Email not found"});
        }
        const passwordCheck = await userFound.comparePassword(password);
        if(!passwordCheck){
            return res.status(200).json({message: "Invalid credentials"});
        }
        const token = await generateJWTToken(generatePayload(userFound));
        return res.status(200).cookie('token',token, {httpOnly: true}).json({message: "logged in"})
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Server Error"});
    }
}
export const sendVerificationEmail = async(req: Request, res: Response, next: NextFunction) : Promise<any> => {
    try {
        const { _id } = req.user;
        const user = await userModel.findOne({_id: _id})
        if(!user){
            return res.status(200).json({message: "Verification mail sent if email exists"});
        }
        if(user.isEmailVerified){
            return res.status(200).json({message: "Email already verified"});
        }
        const { verifyToken, EMAIL_VERIFY_TOKEN_EXPIRY_TIME} = await generateTokenAndExpiry("verification");
        const verificationLink =  `http://localhost:8000/auth/verify?v=${verifyToken}`;
        const htmltemplate = generateAccountVerificationEmailTemplate(verificationLink, user.name);
        const mailOptions = {
            to: user.email,
            html: htmltemplate
        }
        try {
            await mail.send(mailOptions);
            return res.status(200).json({message: "Mail sent if user exists"});
        } catch (error) {
            console.error(error);
            return res.status(400).json({message: "Could not send the mail"});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({err: error});
    }
}
export const resetpasswordreqbyemail = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email: email });

        if (!user) {
            return res.status(200).json({ message: "Reset link sent if email exists" });
        }

        const { resetToken, RESET_PASSWORD_TOKEN_EXPIRY_TIME } = await generateTokenAndExpiry("resetpassword");
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = RESET_PASSWORD_TOKEN_EXPIRY_TIME;

        await user.save();

        const resetLink = `http://localhost:8000/auth/reset?r=${resetToken}`;
        const htmlTemplate = generateResetPasswordEmailTemplate(resetLink, user.name);

        const mailOptions = {
            to: user.email,
            subject: 'Reset Password',
            html: htmlTemplate,
        };

        try {
            await mail.send(mailOptions);
            return res.status(200).json({ message: "Sent the reset password email" });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ message: "Could not send the mail" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ err: error });
    }
};

export const resetpassword = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const r = req.query.r as string;
        const { newPassword } = req.body;

        const user = await userModel.findOne({
            resetPasswordToken: r,
            resetPasswordExpires: { $gt: new Date() },
        });

        if (!user) {
            return res.status(400).json({ message: "URL incorrect or expired" });
        }
        user.password = newPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        
        await user.save();

        return res.status(200).json({ message: "Successfully changed the password" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ err: error });
    }
};


export const protectedd = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    return res.status(200).json({message: "no"})
}