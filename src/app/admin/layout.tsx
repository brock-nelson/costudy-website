import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminNav from "@/components/admin/AdminNav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Redirect to login if not authenticated
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminNav session={session} />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
