import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  const sql = neon(`${process.env.DATABASE_URL}`);
  try {
    const { name, email, clerkId } = await request.json();

    if (!name || !email || !clerkId) {
      return Response.json({ error: "필수항목을 입력하세요" }, { status: 400 });
    }

    const response = await sql`
INSERT INTO users (
      name,
      email,
      clerk_id
      ) VALUES (
            ${name},
            ${email},
            ${clerkId}
            )
            `;
    return new Response(JSON.stringify({ data: response }), { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
