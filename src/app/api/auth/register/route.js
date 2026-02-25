import connectDb from "@/app/lib/dbConnection";
import User from "@/app/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req) => {
  try {
    await connectDb();
    const body = await req.json();
    const { name, email, password } = body;
    if (!name || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide all the fields",
        },
        { status: 400 }
      );
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is already registered",
        },
        { status: 409 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
        message: "Registration successful",
      },
      { status: 201 }
    );
  } catch (error) {
    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is already registered",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Registration failed",
      },
      { status: 500 }
    );
  }
};
