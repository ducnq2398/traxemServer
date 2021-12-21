import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose'

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    userId?: string;

    @Prop()
    email?: string;

    @Prop()
    phone?: number;

    @Prop()
    company?: string;

    @Prop()
    password?: string;

    @Prop()
    avatar?: string;

    @Prop()
    address?: string;

    @Prop([String])
    action?: [String]
}

export const UserSchema = SchemaFactory.createForClass(User)