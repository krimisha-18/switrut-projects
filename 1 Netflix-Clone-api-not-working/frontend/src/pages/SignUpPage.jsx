import { useState } from "react"; // Import useState for managing state
import { Link } from "react-router-dom"; // Import Link for navigation
import { useAuthStore } from "../store/authUser"; // Import auth store for signup function

const SignUpPage = () => {
	// Get email from URL search parameters if available
	const { searchParams } = new URL(document.location);
	const emailValue = searchParams.get("email");

	// State hooks for email, username, and password
	const [email, setEmail] = useState(emailValue || ""); // Initialize email with value from URL or empty string
	const [username, setUsername] = useState(""); // Initialize username
	const [password, setPassword] = useState(""); // Initialize password

	const { signup, isSigningUp } = useAuthStore(); // Get signup function and loading state from auth store

	// Handle the signup process
	const handleSignUp = (e) => {
		e.preventDefault(); // Prevent form submission
		signup({ email, username, password }); // Call signup with email, username, and password
	};

	// Return the JSX for the sign up page
	return (
		<div className='h-screen w-full hero-bg'>
			{/* Header with logo and navigation */}
			<header className='max-w-6xl mx-auto flex items-center justify-between p-4'>
				<Link to={"/"}> {/* Link to home page */}
					<img src='/netflix-logo.png' alt='logo' className='w-52' />
				</Link>
			</header>

			{/* Sign up form container */}
			<div className='flex justify-center items-center mt-20 mx-3'>
				<div className='w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md'>
					<h1 className='text-center text-white text-2xl font-bold mb-4'>Sign Up</h1>

					{/* Sign up form */}
					<form className='space-y-4' onSubmit={handleSignUp}>
						{/* Email input */}
						<div>
							<label htmlFor='email' className='text-sm font-medium text-gray-300 block'>
								Email
							</label>
							<input
								type='email'
								className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
								placeholder='Your Email'
								id='email'
								value={email} // Set email value
								onChange={(e) => setEmail(e.target.value)} // Update email state on change
							/>
						</div>

						{/* Username input */}
						<div>
							<label htmlFor='username' className='text-sm font-medium text-gray-300 block'>
								Username
							</label>
							<input
								type='text'
								className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
								placeholder='Your Name'
								id='username'
								value={username} // Set username value
								onChange={(e) => setUsername(e.target.value)} // Update username state on change
							/>
						</div>

						{/* Password input */}
						<div>
							<label htmlFor='password' className='text-sm font-medium text-gray-300 block'>
								Password
							</label>
							<input
								type='password'
								className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
								placeholder='Password is 6 Characters'
								id='password'
								value={password} // Set password value
								onChange={(e) => setPassword(e.target.value)} // Update password state on change
							/>
						</div>

						{/* Sign up button */}
						<button
							className='w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700'
							disabled={isSigningUp} // Disable button while signing up
						>
							{isSigningUp ? "Loading..." : "Sign Up"} {/* Show loading text while signing up */}
						</button>
					</form>

					{/* Link to sign-in page */}
					<div className='text-center text-gray-400'>
						Already a member?{" "}
						<Link to={"/login"} className='text-red-500 hover:underline'>
							Sign in
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
export default SignUpPage;
