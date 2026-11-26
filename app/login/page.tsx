import type { Metadata } from "next";
import LoginForm from "@/components/login-form";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to manage sacrament meeting schedules, agendas, and assignments for Los Ficus Ward.",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Sacrament Meetings
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access the administration area.
          </p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}
