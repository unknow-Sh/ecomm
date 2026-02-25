import connectDb from "@/app/lib/dbConnection";
import User from "@/app/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const POST = async (req, res) => {
  try {
    await connectDb();
    const body = await req.json();
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide all the fields",
        },
        { status: 400 }
      );
    }
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    const comparePassword = await bcrypt.compare(password, findUser.password);
    if (!comparePassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials",
        },
        { status: 401 }
      );
    }

    const token = jwt.sign({ id: findUser._id }, "Shobhit", {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",
        user: {
          id: findUser._id,
          name: findUser.name,
          email: findUser.email,
        },
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;  
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
};
