import { Outlet } from 'react-router-dom';
import AuthListener from './components/authListener';
import { DarkModeProvider } from './hooks/useDarkMode';

function App() {
	return (
		<DarkModeProvider>
			<AuthListener>
				<Outlet />
			</AuthListener>
		</DarkModeProvider>
	);
}

export default App;
