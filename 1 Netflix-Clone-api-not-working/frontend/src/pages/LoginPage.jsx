import { useState } from "react"; // Import useState for handling form input
import { Link } from "react-router-dom"; // Import Link for navigation
import { useAuthStore } from "../store/authUser"; // Import auth store to manage login

const LoginPage = () => {
	// State hooks for email and password input
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// Destructure login function and loading state from auth store
	const { login, isLoggingIn } = useAuthStore();

	// Handle form submission and trigger login function
	const handleLogin = (e) => {
		e.preventDefault();
		login({ email, password });
	};

	return (
		<div className='h-screen w-full hero-bg'>
			{/* Navbar with logo */}
			<header className='max-w-6xl mx-auto flex items-center justify-between p-4'>
				<Link to={"/"}> {/* Link to the homepage */}
					<img src='/netflix-logo.png' alt='logo' className='w-52' /> {/* Netflix logo */}
				</Link>
			</header>

			{/* Login form container */}
			<div className='flex justify-center items-center mt-20 mx-3'>
				<div className='w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md'>
					<h1 className='text-center text-white text-2xl font-bold mb-4'>Login</h1> {/* Login heading */}

					{/* Form with email and password inputs */}
					<form className='space-y-4' onSubmit={handleLogin}>
						<div>
							<label htmlFor='email' className='text-sm font-medium text-gray-300 block'>Email</label>
							<input
								type='email'
								className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
								placeholder='Your Email ID'
								id='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)} // Update email state
							/>
						</div>

						<div>
							<label htmlFor='password' className='text-sm font-medium text-gray-300 block'>Password</label>
							<input
								type='password'
								className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
								placeholder='Password is 6 Characters'
								id='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)} // Update password state
							/>
						</div>

						{/* Submit button with loading state */}
						<button
							className='w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700'
							disabled={isLoggingIn} // Disable button while logging in
						>
							{isLoggingIn ? "Loading..." : "Login"} {/* Show loading text if logging in */}
						</button>
					</form>
					{/* Link to sign up page */}
					<div className='text-center text-gray-400'>
						Don't have an account?{" "}
						<Link to={"/signup"} className='text-red-500 hover:underline'>
							Sign Up
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
export default LoginPage;
