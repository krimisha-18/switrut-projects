import { Link } from "react-router-dom"; // Import Link for navigation
import Navbar from "../../components/Navbar"; // Import Navbar component
import { Info, Play } from "lucide-react"; // Import icons from lucide-react
import useGetTrendingContent from "../../hooks/useGetTrendingContent"; // Custom hook to fetch trending content
import { MOVIE_CATEGORIES, ORIGINAL_IMG_BASE_URL, TV_CATEGORIES } from "../../utils/constants"; // Constants for categories and image URL
import { useContentStore } from "../../store/content"; // Store for content type (movie or tv)
import MovieSlider from "../../components/MovieSlider"; // Import MovieSlider component to show content categories
import { useState } from "react"; // Import useState for image loading state

const HomeScreen = () => {
	// Get trending content and content type from hooks
	const { trendingContent } = useGetTrendingContent();
	const { contentType } = useContentStore();
	const [imgLoading, setImgLoading] = useState(true); // Track if the image is still loading

	// If trending content is not loaded, show a loading screen
	if (!trendingContent)
		return (
			<div className='h-screen text-white relative'>
				<Navbar />
				{/* Shimmer background while loading */}
				<div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer' />
			</div>
		);

	// If trending content is loaded, display the home screen with the content
	return (
		<>
			<div className='relative h-screen text-white '>
				<Navbar /> {/* Display Navbar */}

				{/* Show loading shimmer if image is still loading */}
				{imgLoading && (
					<div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center shimmer -z-10' />
				)}

				{/* Background image */}
				<img
					src={ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path} // Set image source
					alt='Hero img'
					className='absolute top-0 left-0 w-full h-full object-cover -z-50'
					// Set loading state to false when image is loaded
					onLoad={() => {
						setImgLoading(false);
					}}
				/>

				{/* Background overlay */}
				<div className='absolute top-0 left-0 w-full h-full bg-black/50 -z-50' aria-hidden='true' />

				{/* Content description */}
				<div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32'>
					<div
						className='bg-gradient-to-b from-black via-transparent to-transparent 
					absolute w-full h-full top-0 left-0 -z-10'
					/>

					<div className='max-w-2xl'>
						<h1 className='mt-4 text-6xl font-extrabold text-balance'>
							{trendingContent?.title || trendingContent?.name}
						</h1>
						<p className='mt-2 text-lg'>
							{/* Display year and age rating */}
							{trendingContent?.release_date?.split("-")[0] ||
								trendingContent?.first_air_date.split("-")[0]}{" "}
							| {trendingContent?.adult ? "18+" : "PG-13"}
						</p>

						{/* Display brief overview */}
						<p className='mt-4 text-lg'>
							{trendingContent?.overview.length > 200
								? trendingContent?.overview.slice(0, 200) + "..."
								: trendingContent?.overview}
						</p>
					</div>

					{/* Buttons to play or get more info */}
					<div className='flex mt-8'>
						<Link
							to={`/watch/${trendingContent?.id}`} // Navigate to content watch page
							className='bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded mr-4 flex
							 items-center'
						>
							<Play className='size-6 mr-2 fill-black' /> {/* Play icon */}
							Play
						</Link>

						<Link
							to={`/watch/${trendingContent?.id}`} // Navigate to content watch page for more info
							className='bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded flex items-center'
						>
							<Info className='size-6 mr-2' /> {/* Info icon */}
							More Info
						</Link>
					</div>
				</div>
			</div>

			{/* Content categories */}
			<div className='flex flex-col gap-10 bg-black py-10'>
				{/* Render movie or tv sliders based on content type */}
				{contentType === "movie"
					? MOVIE_CATEGORIES.map((category) => <MovieSlider key={category} category={category} />)
					: TV_CATEGORIES.map((category) => <MovieSlider key={category} category={category} />)}
			</div>
		</>
	);
};
export default HomeScreen;
