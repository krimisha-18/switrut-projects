import { useAuthStore } from "../../store/authUser"; // Importing auth store to get user info
import AuthScreen from "./AuthScreen"; // Import AuthScreen for unauthenticated users
import HomeScreen from "./HomeScreen"; // Import HomeScreen for authenticated users

const HomePage = () => {
	// Get user from auth store
	const { user } = useAuthStore();

	// If the user is logged in, show HomeScreen, else show AuthScreen
	return <>{user ? <HomeScreen /> : <AuthScreen />}</>;
};

export default HomePage;
