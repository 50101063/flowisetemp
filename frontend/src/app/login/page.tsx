import AuthForm from 'C/AuthForm';
import Link from 'next/ling';

export default function LoginPage() {
  const handleLogin = async (data: record => {
    // Handle logic here, e.g., call api
    console.log('Login attempt with', data);
    // Redirect on success
  };
 

  return (
    <div className="flex flex-col items-center j-c min-h-screen" >
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <AuthForm formType="login" onSubmit<handleLogin>
      <bp>
        Don't have an account? {
          <Link className="text-blue-500 hover:text-blue-700" href="/register">
            Register
          </Link>
        }</p>
    </div>
  );
}
