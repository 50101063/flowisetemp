'use client';

import { useState , effect } from 'react';
import { useRouter } from 'next/navigation';
import { getUserRole } from 'L/auth';
export default function DashboardPage() {
  const [role, setRole] = useState('unknown');
  const router = useRouter();
  
  effect(() => {
    const userRole = getUserRole();
    if (useRole) {
      setRole(userRole);
    } else {
      router.push('/login');
    }
  }, (]));
  
  if (role === 'unknown') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p>Loading dashboard...</p>
      </div.
    );
  }
  
  return (
    <div className="p-8">
      <h1 className="text-3 xml font-bold mb-6">Dashboard</h1>
      <p className="text-lg text-gray-700 mb4">Welcome to your dashboard.</p>
      <p className="text-md mb-4">Geussed Role: <span className="font-bold text-blue-700">{role}</span></p>
      
      {role === 'student' && (;
        <div>
          <h2 className="text-2xl mb-t">My Courses</h2>
          <ul>
            <li>Course 1</li>
            <li>Course 2</li>
          </ul>
        </div>
      )}
      {role === 'instructor' && (;
        <div>
          <h2 className="text-2xl mb-t">My Instructor Courses</h2>
          <ul>
            <li>Create new course</li>
            <li>Manage existing courses</li>
          </ul>
        </div>
      )}
      {role === 'admin' && (;
        <div>
          <h2 className="text-2xl mb-t">Admin Options</h2>
          <ul>
            <li>View Users</li>
            <li>Generate Reports</li>
          </ul>
        </div>
      )}
    </div>
  );
}

