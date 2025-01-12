import { useState } from "react"; // Import React hook for state
import { useContentStore } from "../store/content"; // Import custom store for content type
import Navbar from "../components/Navbar"; // Import Navbar component
import { Search } from "lucide-react"; // Import Search icon
import toast from "react-hot-toast"; // Import toast notifications
import axios from "axios"; // Import axios for HTTP requests
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants"; // Base URL for images
import { Link } from "react-router-dom"; // Import Link for navigation

const SearchPage = () => {
	// State hooks for active tab, search term, and search results
	const [activeTab, setActiveTab] = useState("movie");
	const [searchTerm, setSearchTerm] = useState("");
	const [results, setResults] = useState([]);
	const { setContentType } = useContentStore(); // Access content type from store

	// Change the active tab and update content type
	const handleTabClick = (tab) => {
		setActiveTab(tab);
		tab === "movie" ? setContentType("movie") : setContentType("tv");
		setResults([]); // Clear previous results when tab changes
	};

	// Handle the search functionality
	const handleSearch = async (e) => {
		e.preventDefault();
		try {
			// Make API request based on the search term and active tab
			const res = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`);
			setResults(res.data.content); // Update results with the response data
		} catch (error) {
			// Display error message if search fails
			if (error.response.status === 404) {
				toast.error("Nothing found, make sure you are searching under the right category");
			} else {
				toast.error("An error occurred, please try again later");
			}
		}
	};

	// Return the JSX for the search page
	return (
		<div className='bg-black min-h-screen text-white'>
			<Navbar /> {/* Navbar at the top */}
			<div className='container mx-auto px-4 py-8'>
				{/* Tabs for movie, TV show, and person */}
				<div className='flex justify-center gap-3 mb-4'>
					<button
						className={`py-2 px-4 rounded ${
							activeTab === "movie" ? "bg-red-600" : "bg-gray-800"
						} hover:bg-red-700`}
						onClick={() => handleTabClick("movie")}
					>
						Movies
					</button>
					<button
						className={`py-2 px-4 rounded ${
							activeTab === "tv" ? "bg-red-600" : "bg-gray-800"
						} hover:bg-red-700`}
						onClick={() => handleTabClick("tv")}
					>
						TV Shows
					</button>
					<button
						className={`py-2 px-4 rounded ${
							activeTab === "person" ? "bg-red-600" : "bg-gray-800"
						} hover:bg-red-700`}
						onClick={() => handleTabClick("person")}
					>
						Person
					</button>
				</div>

				{/* Search bar */}
				<form className='flex gap-2 items-stretch mb-8 max-w-2xl mx-auto' onSubmit={handleSearch}>
					<input
						type='text'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)} // Update search term on change
						placeholder={"Search for a " + activeTab}
						className='w-full p-2 rounded bg-gray-800 text-white'
					/>
					<button className='bg-red-600 hover:bg-red-700 text-white p-2 rounded'>
						<Search className='size-6' /> {/* Search icon */}
					</button>
				</form>

				{/* Display search results */}
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
					{results.map((result) => {
						// Skip item if no poster or profile image
						if (!result.poster_path && !result.profile_path) return null;

						// Render movie, TV show, or person based on the active tab
						return (
							<div key={result.id} className='bg-gray-800 p-4 rounded'>
								{activeTab === "person" ? (
									// If searching for a person
									<div className='flex flex-col items-center'>
										<img
											src={ORIGINAL_IMG_BASE_URL + result.profile_path}
											alt={result.name}
											className='max-h-96 rounded mx-auto'
										/>
										<h2 className='mt-2 text-xl font-bold'>{result.name}</h2>
									</div>
								) : (
									// If searching for a movie or TV show
									<Link
										to={"/watch/" + result.id} // Link to the content's watch page
										onClick={() => {
											setContentType(activeTab); // Set content type when clicked
										}}
									>
										<img
											src={ORIGINAL_IMG_BASE_URL + result.poster_path}
											alt={result.title || result.name}
											className='w-full h-auto rounded'
										/>
										<h2 className='mt-2 text-xl font-bold'>{result.title || result.name}</h2>
									</Link>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};
export default SearchPage;
