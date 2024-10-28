import mongoose, { Schema, Document } from 'mongoose';


interface DocumentDB extends Document {
    userID: string;
    templates: mongoose.Types.ObjectId[];
}


const documentSchema = new Schema<DocumentDB>(
    {
        userID: {
            type: String,
            required: true,
            unique: true,
        },
        templates: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "template", 
            },
        ],
    },
    { timestamps: true } 
);

const documentModel = mongoose.model<DocumentDB>('document', documentSchema);

export { DocumentDB, documentModel };
