// import { NextResponse } from "next/server";
// import { MongoClient } from "mongodb";

// export async function POST(request) {
//   const { email, code } = await request.json();

//   try {
//     const client = await MongoClient.connect(process.env.MONGODB_URI);
//     const db = client.db();
    
//     const user = await db.collection("employees").findOne({ email });
    
//     if (!user) {
//       client.close();
//       return NextResponse.json(
//         { message: "User not found" },
//         { status: 404 }
//       );
//     }

//     // Check if code matches and hasn't expired
//     const now = new Date();
//     if (user.verificationCode === code && user.verificationExpires > now) {
//       // Mark user as verified
//       await db.collection("employees").updateOne(
//         { email },
//         { 
//           $set: { 
//             isVerified: true,
//             verifiedAt: new Date()
//           },
//           $unset: {
//             verificationCode: "",
//             verificationExpires: ""
//           }
//         }
//       );

//       client.close();
//       return NextResponse.json({
//         message: "Email verified successfully",
//         user: {
//           id: user._id,
//           name: user.name,
//           email: user.email,
//           idCard: user.idCard
//         }
//       });
//     } else {
//       client.close();
//       return NextResponse.json(
//         { message: "Invalid or expired verification code" },
//         { status: 400 }
//       );
//     }
    
//   } catch (error) {
//     console.error("Verification error:", error);
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }