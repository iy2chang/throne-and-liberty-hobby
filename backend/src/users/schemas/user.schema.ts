import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ default: false })
  isAdmin: boolean;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({
    type: [String],
    enum: [
      'Battleweaver',
      'Berserker',
      'Cavalier',
      'Crusader',
      'Darkblighter',
      'Disciple',
      'Infiltrator',
      'Invocator',
      'Liberator',
      'Paladin',
      'Ranger',
      'Ravager',
      'Scropian',
      'Seeker',
      'Sentinel',
      'SpellBlade',
      'Templar',
      'Warden',
      'Outrider',
      'Gladiator',
      'Scout',
      'Enigma',
      'Raider',
    ],
    default: [],
  })
  class: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
