import { Link } from "react-router-dom"; // Import Link for navigation

const NotFoundPage = () => {
	return (
		<div
			className='min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-white' // Full-screen container with background image
			style={{ backgroundImage: `url('/404.png')` }} // Set custom background image for the 404 page
		>
			<header className='absolute top-0 left-0 p-4 bg-black w-full '> {/* Navbar with logo */}
				<Link to={"/"}> {/* Link to navigate to home page */}
					<img src='/netflix-logo.png' alt='Netflix' className='h-8' /> {/* Netflix logo */}
				</Link>
			</header>
			<main className='text-center error-page--content z-10'>
				{/* Main content of the 404 page */}
				<h1 className='text-7xl font-semibold mb-4'>Lost your way?</h1> {/* Error heading */}
				<p className='mb-6 text-xl'>
					Sorry, we can't find that page. You'll find lots to explore on the home page. {/* Error message */}
				</p>
				<Link to={"/"} className='bg-white text-black py-2 px-4 rounded'> {/* Link to go back to the homepage */}
					Netflix Home
				</Link>
			</main>
		</div>
	);
};
export default NotFoundPage;
