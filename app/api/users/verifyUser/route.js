import User from '@/app/models/user';
import { NextResponse } from 'next/server';

export const verifyUser = async (request) => {
  try {
    const reqBody = await request.json;
    const { token } = reqBody;
    console.log(token);
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid Token' }, { status: 400 });
    }
    console.log(user);
    user?.isVerified = true;
    user?.verifyToken = undefined
    user.verifyTokenExpiry = undefined

    await user.save()

    return NextResponse.json({
        message: "Email verified successfully", 
        success: true
    })
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
};

export { verifyUser as POST };
