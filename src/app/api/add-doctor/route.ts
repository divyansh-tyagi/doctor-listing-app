import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Doctor from '@/models/Doctor';

export async function POST(request: Request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const doctor = new Doctor(body);
    await doctor.save();

    return NextResponse.json(doctor, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}