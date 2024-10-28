import mongoose, { Schema, Document, Model} from 'mongoose';
interface template{
    templateName: string,
    templateBucket: string,
}
const templateSchema = new Schema(
    {
        templateName: {
            type: String,
            required: true,
        },
        templateBucket: {
            type: String,
            required: true,
        }
    }
)
templateSchema.virtual('id').get(function idToString(){
    return this._id.toHexString();
})
templateSchema.set('toJSON',{
    virtuals: true,
})
const templateModel = mongoose.model<template>('template',templateSchema);
export { templateModel };