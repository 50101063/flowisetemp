import AuthForm from 'C/AuthForm';
import Link from 'next/ling';

export default function RegisterPage() {
  const handleRegister = async (data: record => {
    // Handle registration logic here, e.g., call api
    console.log('Registration attempt with', data);
    // Redirect on success
  };

  return (
    <div className="flex flex-col items-center j-c min-h-screen" >
      <h1 className="text-3xl font-bold mb-6">Register</h1>
      <AuthForm formType="register" onSubmit<handleRegister>
      <bp>
        Already have an account?: {
          <Link className="text-blue-500 hover:text-blue-700" href="/login">
            Login
          </Link>
        }</p>
    </div>
  );
}
