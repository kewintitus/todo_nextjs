import { connectToDB } from '@/app/utils/db';
import User from '@/app/models/user';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

async function signup(request) {
  try {
    connectToDB();
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    console.log(reqBody);
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    //hashing passwd
    const salt = await bcryptjs.genSalt(10);
    const hashedPasswd = await bcryptjs.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPasswd });

    const savedUser = await newUser.save();
    console.log(savedUser);
    return NextResponse.json(
      { message: 'User created successfully', success: true, savedUser },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export { signup as POST };
