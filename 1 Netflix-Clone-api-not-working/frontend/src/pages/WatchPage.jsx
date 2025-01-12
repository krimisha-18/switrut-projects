import { useEffect, useRef, useState } from "react"; // Import React hooks for state and effects
import { Link, useParams } from "react-router-dom"; // Import for routing and accessing URL params
import { useContentStore } from "../store/content"; // Import content store for content type
import axios from "axios"; // Import axios for making API requests
import Navbar from "../components/Navbar"; // Import Navbar component
import { ChevronLeft, ChevronRight } from "lucide-react"; // Import icons for navigation
import ReactPlayer from "react-player"; // Import ReactPlayer for video playback
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../utils/constants"; // Import image URLs constants
import { formatReleaseDate } from "../utils/dateFunction"; // Import function to format dates
import WatchPageSkeleton from "../components/skeletons/WatchPageSkeleton"; // Import loading skeleton component

const WatchPage = () => {
	const { id } = useParams(); // Get the content ID from URL
	const [trailers, setTrailers] = useState([]); // State to store trailers
	const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0); // State for the index of the current trailer
	const [loading, setLoading] = useState(true); // State for loading status
	const [content, setContent] = useState({}); // State for content details
	const [similarContent, setSimilarContent] = useState([]); // State for similar content
	const { contentType } = useContentStore(); // Get content type (movie or TV show)

	const sliderRef = useRef(null); // Reference to the slider for scrolling

	// Fetch trailers from API when the component loads
	useEffect(() => {
		const getTrailers = async () => {
			try {
				const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`); // Fetch trailers
				setTrailers(res.data.trailers); // Set trailers in state
			} catch (error) {
				if (error.message.includes("404")) {
					setTrailers([]); // No trailers found
				}
			}
		};

		getTrailers();
	}, [contentType, id]); // Dependency array: run effect when contentType or id changes

	// Fetch similar content from API
	useEffect(() => {
		const getSimilarContent = async () => {
			try {
				const res = await axios.get(`/api/v1/${contentType}/${id}/similar`); // Fetch similar content
				setSimilarContent(res.data.similar); // Set similar content in state
			} catch (error) {
				if (error.message.includes("404")) {
					setSimilarContent([]); // No similar content found
				}
			}
		};

		getSimilarContent();
	}, [contentType, id]); // Dependency array: run effect when contentType or id changes

	// Fetch content details from API
	useEffect(() => {
		const getContentDetails = async () => {
			try {
				const res = await axios.get(`/api/v1/${contentType}/${id}/details`); // Fetch content details
				setContent(res.data.content); // Set content in state
			} catch (error) {
				if (error.message.includes("404")) {
					setContent(null); // Content not found
				}
			} finally {
				setLoading(false); // Set loading to false after fetching data
			}
		};

		getContentDetails();
	}, [contentType, id]); // Dependency array: run effect when contentType or id changes

	// Handle trailer navigation (next and previous)
	const handleNext = () => {
		if (currentTrailerIdx < trailers.length - 1) setCurrentTrailerIdx(currentTrailerIdx + 1); // Move to next trailer
	};
	const handlePrev = () => {
		if (currentTrailerIdx > 0) setCurrentTrailerIdx(currentTrailerIdx - 1); // Move to previous trailer
	};

	// Scroll the similar content slider left or right
	const scrollLeft = () => {
		if (sliderRef.current) sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" });
	};
	const scrollRight = () => {
		if (sliderRef.current) sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" });
	};

	// Show skeleton loader while loading data
	if (loading)
		return (
			<div className='min-h-screen bg-black p-10'>
				<WatchPageSkeleton /> {/* Display loading skeleton */}
			</div>
		);

	// Show error message if content not found
	if (!content) {
		return (
			<div className='bg-black text-white h-screen'>
				<div className='max-w-6xl mx-auto'>
					<Navbar /> {/* Display Navbar */}
					<div className='text-center mx-auto px-4 py-8 h-full mt-40'>
						<h2 className='text-2xl sm:text-5xl font-bold text-balance'>Content not found 😥</h2> {/* Error message */}
					</div>
				</div>
			</div>
		);
	}

	// Return the main WatchPage JSX
	return (
		<div className='bg-black min-h-screen text-white'>
			<div className='mx-auto container px-4 py-8 h-full'>
				<Navbar /> {/* Display Navbar */}

				{/* Trailer navigation buttons */}
				{trailers.length > 0 && (
					<div className='flex justify-between items-center mb-4'>
						<button
							className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${currentTrailerIdx === 0 ? "opacity-50 cursor-not-allowed " : ""}`}
							disabled={currentTrailerIdx === 0} // Disable if it's the first trailer
							onClick={handlePrev} // Go to previous trailer
						>
							<ChevronLeft size={24} />
						</button>

						<button
							className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${currentTrailerIdx === trailers.length - 1 ? "opacity-50 cursor-not-allowed " : ""}`}
							disabled={currentTrailerIdx === trailers.length - 1} // Disable if it's the last trailer
							onClick={handleNext} // Go to next trailer
						>
							<ChevronRight size={24} />
						</button>
					</div>
				)}

				{/* Video player to show current trailer */}
				<div className='aspect-video mb-8 p-2 sm:px-10 md:px-32'>
					{trailers.length > 0 && (
						<ReactPlayer
							controls={true}
							width={"100%"}
							height={"70vh"}
							className='mx-auto overflow-hidden rounded-lg'
							url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`} // URL for the current trailer
						/>
					)}

					{/* Message if no trailers available */}
					{trailers?.length === 0 && (
						<h2 className='text-xl text-center mt-5'>
							No trailers available for{" "}
							<span className='font-bold text-red-600'>{content?.title || content?.name}</span> 😥
						</h2>
					)}
				</div>

				{/* Movie details (title, release date, overview, poster) */}
				<div className='flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto'>
					<div className='mb-4 md:mb-0'>
						<h2 className='text-5xl font-bold text-balance'>{content?.title || content?.name}</h2>
						<p className='mt-2 text-lg'>
							{formatReleaseDate(content?.release_date || content?.first_air_date)} |{" "}
							{content?.adult ? <span className='text-red-600'>18+</span> : <span className='text-green-600'>PG-13</span>}
						</p>
						<p className='mt-4 text-lg'>{content?.overview}</p>
					</div>
					<img
						src={ORIGINAL_IMG_BASE_URL + content?.poster_path}
						alt='Poster image'
						className='max-h-[600px] rounded-md'
					/>
				</div>

				{/* Display similar content */}
				{similarContent.length > 0 && (
					<div className='mt-12 max-w-5xl mx-auto relative'>
						<h3 className='text-3xl font-bold mb-4'>Similar Movies/Tv Shows</h3>

						<div className='flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group' ref={sliderRef}>
							{similarContent.map((content) => {
								if (content.poster_path === null) return null;
								return (
									<Link key={content.id} to={`/watch/${content.id}`} className='w-52 flex-none'>
										<img
											src={SMALL_IMG_BASE_URL + content.poster_path}
											alt='Poster path'
											className='w-full h-auto rounded-md'
										/>
										<h4 className='mt-2 text-lg font-semibold'>{content.title || content.name}</h4>
									</Link>
								);
							})}

							{/* Arrow buttons for scrolling similar content */}
							<ChevronRight
								className='absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 text-white rounded-full'
								onClick={scrollRight} // Scroll right
							/>
							<ChevronLeft
								className='absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 text-white rounded-full'
								onClick={scrollLeft} // Scroll left
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default WatchPage; 
