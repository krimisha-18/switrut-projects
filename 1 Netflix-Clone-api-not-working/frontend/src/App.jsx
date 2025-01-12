import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import WatchPage from "./pages/WatchPage";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authUser";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import SearchPage from "./pages/SearchPage";
import SearchHistoryPage from "./pages/SearchHistoryPage";
import NotFoundPage from "./pages/404";

function App() {
	// Get user data and loading state from the auth store
	const { user, isCheckingAuth, authCheck } = useAuthStore();

	// Check authentication status on mount
	useEffect(() => {
		authCheck();
	}, [authCheck]);

	// Show loader if authentication status is still being checked
	if (isCheckingAuth) {
		return (
			<div className='h-screen'>
				<div className='flex justify-center items-center bg-black h-full'>
					<Loader className='animate-spin text-red-600 size-10' />
				</div>
			</div>
		);
	}

	return (
		<>
			{/* Define Routes for the app */}
			<Routes>
				{/* Home page route */}
				<Route path='/' element={<HomePage />} />
				{/* Login page route, redirects to home if user is already logged in */}
				<Route path='/login' element={!user ? <LoginPage /> : <Navigate to={"/"} />} />
				{/* SignUp page route, redirects to home if user is already signed up */}
				<Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to={"/"} />} />
				{/* Watch page, only accessible to logged-in users */}
				<Route path='/watch/:id' element={user ? <WatchPage /> : <Navigate to={"/login"} />} />
				{/* Search page, only accessible to logged-in users */}
				<Route path='/search' element={user ? <SearchPage /> : <Navigate to={"/login"} />} />
				{/* Search history page, only accessible to logged-in users */}
				<Route path='/history' element={user ? <SearchHistoryPage /> : <Navigate to={"/login"} />} />
				{/* Catch-all for unknown pages */}
				<Route path='/*' element={<NotFoundPage />} />
			</Routes>
			{/* Footer component */}
			<Footer />

			{/* Toaster for notifications */}
			<Toaster />
		</>
	);
}

export default App;
