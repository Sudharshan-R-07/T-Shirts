import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { provider } from '../config/firebase';

function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err,seterr]=useState()

const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
      alert("Login Sucessfully")
    } catch (err) {
      console.error(err);
    }
}

    useEffect(() => {
        window.scrollTo(0, 0);
        auth.onAuthStateChanged(function (user) {
      if (user) {
        navigate("/home")
      }
      
    })
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();

        // Simulate login process
        signInWithEmailAndPassword(auth,email,password).then((res)=>{
            console.log(res)
              navigate('/login');
        }).catch((error)=>{
            seterr("Error,Try Again")
        })
      
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="p-10 bg-white rounded-lg shadow-md" style={{ width: "75%" }}>
                <h2 className="text-2xl font-bold mb-5 text-gray-800">Login</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 p-2 w-full border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 p-2 w-full border rounded"
                    />
                </div>
                <p className='text-red-600 cursor-pointer my-2'>{err}</p>
                <p className='text-blue-600 cursor-pointer my-2' onClick={() => navigate("/signup")}>New user? Register here</p>
                <button type="submit" onClick={handleLogin} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 ease-in-out">
                    Login
                </button>
                <button
  className="flex items-center gap-3 px-4 py-2 border rounded-lg shadow-sm mt-11 hover:bg-gray-100 transition"
 onClick={googleLogin}>
  <svg
    className="w-5 h-5"
    viewBox="0 0 48 48"
  >
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.7 1.22 9.2 3.6l6.9-6.9C35.9 2.4 30.4 0 24 0 14.6 0 6.5 5.4 2.6 13.2l8 6.2C12.4 13.1 17.7 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.1 24.6c0-1.8-.2-3.5-.5-5.1H24v9.7h12.4c-.6 3.1-2.4 5.7-5.1 7.5l7.9 6.1c4.6-4.2 7.3-10.4 7.3-18.2z"/>
    <path fill="#FBBC05" d="M10.6 28.3c-1-3.1-1-6.5 0-9.6l-8-6.2C-1.3 18.5-1.3 29.5 2.6 35.5l8-6.2z"/>
    <path fill="#34A853" d="M24 48c6.4 0 11.9-2.1 15.9-5.7l-7.9-6.1c-2.2 1.5-5 2.4-8 2.4-6.3 0-11.6-3.6-14.3-8.8l-8 6.2C6.5 42.6 14.6 48 24 48z"/>
  </svg>

  <span className="font-medium text-gray-700">
    Sign in with Google
  </span>
</button>
            
            </form>
        </div>
    );
}

export default Login;
