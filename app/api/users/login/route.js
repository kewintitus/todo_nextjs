import { connectToDB } from '@/app/utils/db';
import User from '@/app/models/user';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const loginUserRoute = async (request) => {
  try {
    await connectToDB();
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log('request body', reqBody);
    const user = await User.findOne({ email });
    if (!user) {
      console.log('Asda');
      return NextResponse.json(
        { error: 'user does not exist' },
        { status: 400 }
      );
    }

    console.log('asdasd', user);

    // console.log('adsa', user);

    const validPasswd = await bcryptjs.compare(password, user.password);
    if (!validPasswd) {
      return NextResponse.json({ error: 'Invalid Password' }, { status: 400 });
    }
    console.log('Valid Passwd', validPasswd);
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: '1d',
    });
    const response = NextResponse.json({
      message: 'Login successful',
      success: true,
    });
    response.cookies.set('token', token, {
      httpOnly: true,
    });
    return response;
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
};

export { loginUserRoute as POST };
