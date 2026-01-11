import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import auth from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { provider } from '../config/firebase';
function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); 


    const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
    } catch (err) {
      console.error(err);
    }
}
      useEffect(()=>{
            auth.onAuthStateChanged(function (user) {
      if (user) {
        navigate("/home")
      }
      
    })
        },[])
    const handleSubmit = (e) => {
        e.preventDefault();


      

        // Check if the passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        createUserWithEmailAndPassword(auth,email,password).then((res)=>{
        console.log(res)
    }).catch((err)=>{
        console.log(err)
    })

        // Simulate user registration process
        console.log('User registered:', { email, password });
        // After registration, redirect to the login page
        navigate('/login'); // Replace '/login' with your login page route
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="p-10 bg-white rounded-lg shadow-lg" style={{ width: "70%" }}>
                <h2 className="text-2xl font-bold mb-5 text-gray-800">Sign In</h2>
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
                <div className="mb-4">
                    <label className="block text-gray-700">Confirm Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="mt-1 p-2 w-full border rounded"
                    />
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>
                <p className='text-blue-600 cursor-pointer my-2' onClick={() => navigate("/login")}> Already have an account? Login here</p>
                <button type="submit" onClick={handleSubmit} className="bg-orange-400 text-white py-2 px-4 rounded hover:bg-orange-600 transition duration-200 ease-in-out">
                    Register
                </button><br></br>
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
            
             <div>
      
    </div>
        </div>
    );
}

export default Signup;
