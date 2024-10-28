import { NextFunction, Request, Response } from "express";

import { documentModel, templateModel } from "../models";

export const uploadtemplate = async( req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        const documentAvailable = documentModel.findOne({userID: user._id});
        if(!documentAvailable){
            const newdocument = new documentModel({userID: user._id, })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Server Error"});
    }
}