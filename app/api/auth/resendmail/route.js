import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { sendWelcomeEmail } from "@/lib/emailService";

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request) {
  const { email, name } = await request.json();
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();

    const pendingUser = await db.collection("pendingRegistrations").findOne({ email });

      if (!pendingUser) {
        client.close();
        return NextResponse.json({ message: "No pending registration found for retry" }, { status: 404 });
      }
      const newCode = generateCode();
      const newExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min
      await db.collection("pendingRegistrations").updateOne(
        { email }, 
        {
            $set: {
      verificationCode: newCode,
      verificationExpires: newExpiry,
      updatedAt: new Date(),
            }
          })

    await sendWelcomeEmail(email, name, newCode);

    client.close();

    return NextResponse.json(
      { message: "New Verification code sent", email },
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
