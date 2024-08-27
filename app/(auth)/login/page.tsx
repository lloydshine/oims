import { LoginForm } from "@/components/forms/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex h-screen">
      <LoginForm />
      <div className="flex-1 bg-primary md:flex items-center p-5 hidden">
        <h1 className="text-7xl font-black text-white w-[500px]">
          OFFICE OF STUDENT AFFAIRS AND SERVICES
        </h1>
      </div>
    </main>
  );
}
