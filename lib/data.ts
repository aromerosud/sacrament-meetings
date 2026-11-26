import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function getUserByEmail(email: string) {
  try {
    const users = await sql`
      SELECT
        id,
        name,
        email,
        password_hash AS "passwordHash",
        role
      FROM users
      WHERE email = ${email}
      LIMIT 1
    `;

    return users[0] ?? null;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch user.");
  }
}
