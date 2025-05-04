import mongoose, { Schema, Document } from 'mongoose';

export interface IDoctor extends Document {
  name: string;
  specialty: string;
  experience: number;
  location: string;
  languages: string[];
  rating: number;
  price: number;
  availability: string[];
  imageUrl: string;
}

const DoctorSchema: Schema = new Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  experience: { type: Number, required: true },
  location: { type: String, required: true },
  languages: { type: [String], required: true },
  rating: { type: Number, required: true },
  price: { type: Number, required: true },
  availability: { type: [String], required: true },
  imageUrl: { type: String, required: true }
});

export default mongoose.models.Doctor || mongoose.model<IDoctor>('Doctor', DoctorSchema);