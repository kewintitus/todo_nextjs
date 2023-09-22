import { NextResponse } from 'next/server';

const logoutUser = async () => {
  try {
    const response = NextResponse.json({
      message: 'Logout successful',
      success: true,
    });
    response.cookies.set('token', '', { httpOnly: true, expires: new Date(0) });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
};

export { logoutUser as GET };
