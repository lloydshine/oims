import { LoginForm } from "@/components/forms/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex h-screen">
      <LoginForm />
      <div className="flex-1 bg-primary flex items-center justify-center p-32">
        <h1 className="text-7xl font-black">
          OFFICE OF STUDENT AFFAIRS AND SERVICES
        </h1>
      </div>
    </main>
  );
}
