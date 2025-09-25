import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { sendWelcomeEmail } from "../../../../lib/emailService";

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request) {
  const { name, email, idCard, password, isRetry } = await request.json();
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();

    // Check if user already exists in employees or pendingRegistrations
    const existingUser = await db.collection("employees").findOne({ $or: [{ idCard }, { email }] });
    const pendingUser = await db.collection("pendingRegistrations").findOne({ email });

    if (isRetry) {
      if (!pendingUser) {
        client.close();
        return NextResponse.json({ message: "No pending registration found for retry" }, { status: 404 });
      }
      const newCode = generateCode();
      const newExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min
      await db.collection("pendingRegistrations").updateOne(email, {
      verificationCode: newCode,
      verificationExpires: newExpiry,
      updatedAt: new Date(),
    });

    await sendWelcomeEmail(email, name, newCode);

    client.close();

    return NextResponse.json(
      { message: "Verification code sent", email },
      { status: 201 }
    );
    }

    if (existingUser || pendingUser) {
      client.close();
      return NextResponse.json(
        { message: "User with this ID card or email already exists or is pending verification" },
        { status: 409 }
      );
    }

    const verificationCode = generateCode();
    const verificationExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    // Store registration data temporarily
    await db.collection("pendingRegistrations").insertOne({
      name,
      email,
      idCard,
      password, // hash after verification
      verificationCode,
      verificationExpires,
      createdAt: new Date(),
    });

    await sendWelcomeEmail(email, name, verificationCode);

    client.close();

    return NextResponse.json(
      { message: "Verification code sent", email },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}