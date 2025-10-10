import { db, users } from "./index";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

async function seed() {
  console.log("🌱 Seeding database...");

  const admins = [
    {
      email: "brock@costudy.co",
      name: "Brock Nelson",
      password: "ChangeMe123!", // CHANGE THIS IMMEDIATELY
    },
    {
      email: "henry@costudy.co",
      name: "Henry Kaufman",
      password: "ChangeMe123!", // CHANGE THIS IMMEDIATELY
    },
  ];

  for (const admin of admins) {
    // Check if user already exists
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, admin.email))
      .limit(1);

    if (existingUser) {
      console.log(`✓ User ${admin.email} already exists, skipping...`);
      continue;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(admin.password, 10);

    // Create user
    await db.insert(users).values({
      email: admin.email,
      name: admin.name,
      password: hashedPassword,
    });

    console.log(`✓ Created admin user: ${admin.email}`);
    console.log(`  Default password: ${admin.password}`);
    console.log(`  ⚠️  CHANGE THIS PASSWORD IMMEDIATELY AFTER FIRST LOGIN!`);
  }

  console.log("\n✅ Seeding complete!");
  console.log("\n📝 Next steps:");
  console.log("1. Login to /admin/login with one of the admin accounts");
  console.log("2. Change your password immediately");
  console.log("3. Delete or comment out the default passwords in seed.ts");
}

seed()
  .catch((error) => {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
