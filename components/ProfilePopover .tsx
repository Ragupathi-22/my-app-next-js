'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';
import { assets } from "@/assets/assets";
import { encryptData } from '@/utils/encryption';
import Link from 'next/link';
// import { X } from "lucide-react";

export default function ProfilePopover({ isMobile = false }: { isMobile?: boolean }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const siteUrl = process.env.NEXT_PUBLIC_WC_SITE_URL;
  const popoverRef = useRef(null);
  const { userData, setUserData, getCartCount, popOverOpen, setPopOverOpen } = useAppContext();


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !(popoverRef.current as any).contains(event.target)) {
        setPopOverOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);



  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${siteUrl}/wp-json/jwt-auth/v1/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }),
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('jwtToken', data.token);
        const userInfo = {
          name: data.user_display_name,
          email: data.user_email,
          password
        };
        const encryptedUser = encryptData(userInfo);
        localStorage.setItem('token', encryptedUser);
        setUserData(userInfo);
        setPopOverOpen(false);
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${siteUrl}/wp-json/custom/v1/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, email, username: name }),
      });
      const data = await response.json();
      if (data.success) {
        await handleLogin();
      } else {
        throw new Error(data.message || 'Registration failed');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative inline-block text-left" ref={popoverRef}>
      {!isMobile && (
        <button onClick={() => setPopOverOpen(!popOverOpen)} className="flex items-center gap-2 hover:text-gray-900 transition">
          <Image src={assets.user_icon} alt="Profile" width={32} height={32} className="rounded-full object-cover" />
        </button>
      )}

      {popOverOpen && (
        <div
          className={`z-40 ${
            isMobile
              ? 'fixed inset-0 bg-white p-6 overflow-auto'
              : 'absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg p-4 animate-fade-in'
          }`}
        >
          {isMobile && (
            <div className="flex justify-end mb-2">
              <button onClick={() => setPopOverOpen(false)}>
                '✖' 
              </button>
            </div>
          )}

          {!userData ? (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">{isRegistering ? 'Register' : 'Login'}</h3>

              {isRegistering && (
                <input type="text" className="w-full p-2 border rounded" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
              )}
              <input type="email" className="w-full p-2 border rounded" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="password" className="w-full p-2 border rounded" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                className={`w-full ${
                  isRegistering ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
                } text-white py-2 rounded`}
                onClick={isRegistering ? handleRegister : handleLogin}
                disabled={loading}
              >
                {loading ? (isRegistering ? 'Registering...' : 'Logging in...') : isRegistering ? 'Register' : 'Login'}
              </button>

              <div className="text-sm text-center text-gray-500">
                {isRegistering ? (
                  <>
                    Already have an account?{' '}
                    <button onClick={() => setIsRegistering(false)} className="text-blue-600 hover:underline">
                      Login
                    </button>
                  </>
                ) : (
                  <>
                    New here?{' '}
                    <button onClick={() => setIsRegistering(true)} className="text-blue-600 hover:underline">
                      Register
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 border-b pb-3">
                <Image src={assets.user_icon} alt="User" width={40} height={40} className="rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-gray-900">{userData.name}</p>
                  <p className="text-sm text-gray-500">{userData.email}</p>
                </div>
              </div>

              <div className="mt-3 flex flex-col gap-2 text-sm text-gray-700">
                <Link href="/cart" className="flex items-center gap-2 hover:text-blue-600 cursor-pointer">
                  🛒 <span>Cart ({getCartCount()})</span>
                </Link>
                <div
                  onClick={() => {
                    localStorage.removeItem('jwtToken');
                    localStorage.removeItem('token');
                    setUserData(null);
                    setPopOverOpen(false);
                  }}
                  className="flex items-center gap-2 hover:text-red-600 cursor-pointer"
                >
                  🔓 <span>Logout</span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
