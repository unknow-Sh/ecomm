import connectDb from "@/app/lib/dbConnection";
import Product from "@/app/models/Product";
import { mkdir, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export const POST = async (req) => {
  try {
    await connectDb();

    const formData = await req.formData();

    const name = formData.get("name");
    const price = formData.get("price");
    const description = formData.get("description");
    const file = formData.get("imageUrl");

    if (!name || !price || !description || !file) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const uploadDir = path.join(process.cwd(), "public/uploads");
    await mkdir(uploadDir, { recursive: true });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = Date.now() + "_" + file.name;
    const uploadPath = path.join(uploadDir, fileName);

    await writeFile(uploadPath, buffer);
    const parsedPrice = Number(price);
    if (Number.isNaN(parsedPrice)) {
      return NextResponse.json(
        { success: false, message: "Price must be a valid number" },
        { status: 400 }
      );
    }

    const product = await Product.create({
      name,
      price: parsedPrice,
      description,
      imageUrl: `/uploads/${fileName}`,
    });
    return NextResponse.json(
      {
        success: true,
        data: product,
        message: "Product added successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create product",
      },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    await connectDb();
    const products = await Product.find({});
    return NextResponse.json(
      { success: true, data: products },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch products" },
      { status: 500 }
    );
  }
};
