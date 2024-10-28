import { NextFunction, Request, Response } from "express";
import { extractInfoFromJWT } from "../utils";

export const protect = (req: Request, res: Response, next: NextFunction): any=> {
    try {
        const token = req.headers.cookie.substring(6);
        const data = extractInfoFromJWT(token);
        req.user = data
        next();
    } catch (error) {
        return res.status(403).json({message: "Access Forbidden"});
    }
}