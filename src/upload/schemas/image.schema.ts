import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose'

export type UserDocument = Image & Document;

@Schema()
export class Image {
    @Prop()
    userId: string;

    @Prop()
    url: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image)