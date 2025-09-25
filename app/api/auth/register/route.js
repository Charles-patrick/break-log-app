import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

export async function POST(request) {
  const { email, code } = await request.json();

  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();

    const pendingUser = await db.collection("pendingRegistrations").findOne({ email });

    if (!pendingUser) {
      client.close();
      return NextResponse.json({ message: "No pending registration found" }, { status: 404 });
    }

    const now = new Date();

    if (pendingUser.verificationExpires <= now) {
      client.close();
      return NextResponse.json({ message: "Verification code expired" }, { status: 400 });
    }

    if (pendingUser.verificationCode !== code) {
      client.close();
      return NextResponse.json({ message: "Invalid verification code" }, { status: 400 });
    }

    if (pendingUser.verificationCode === code && pendingUser.verificationExpires > now) {
      const hashedPassword = await bcrypt.hash(pendingUser.password, 10);

      await db.collection("employees").insertOne({
        name: pendingUser.name,
        email: pendingUser.email,
        idCard: pendingUser.idCard,
        password: hashedPassword,
        createdAt: new Date(),
        isVerified: true,
        verifiedAt: new Date(),
      });

      // Remove from pendingRegistrations
      await db.collection("pendingRegistrations").deleteOne({ email });

      client.close();
      return NextResponse.json({ message: "Email verified and account created" }, { status: 200 });
    }

    client.close();
    return NextResponse.json({ message: "Verification failed" }, { status: 400 });
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}