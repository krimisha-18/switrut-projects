import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";

const useGetTrendingContent = () => {
	// State to store trending content
	const [trendingContent, setTrendingContent] = useState(null);
	// Get content type (movie or tv show)
	const { contentType } = useContentStore();

	useEffect(() => {
		// Fetch trending content based on content type (movie/tv show)
		const getTrendingContent = async () => {
			const res = await axios.get(`/api/v1/${contentType}/trending`);
			setTrendingContent(res.data.content);
		};

		getTrendingContent();
	}, [contentType]); // Run when content type changes

	return { trendingContent }; // Return trending content
};

export default useGetTrendingContent;
