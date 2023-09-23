import User from '@/app/models/user';
import { connectToDB } from '@/app/utils/db';
import { NextResponse } from 'next/server';

const { getDataFromToken } = require('@/app/helpers/getDataFromToken');

// const getToken

const checkUser = async (request) => {
  try {
    connectToDB();
    const uid = await getDataFromToken(request);
    const user = await User.findOne({ _id: uid }).select('-password');
    return NextResponse.json({ message: 'user found', data: user });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};

export { checkUser as GET };
