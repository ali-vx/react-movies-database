import { useEffect, useState, useRef } from "react";
import Movie from "./components/movie";

const FEATURED_API =
	"https://api.themoviedb.org/3/discover/movie?api_key=31b3afc035368d5441c7200a0ccf13c9&language=en-US&sort_by=popularity.desc&page=1";

const SEARCH_API =
	"https://api.themoviedb.org/3/search/movie?api_key=31b3afc035368d5441c7200a0ccf13c9&query=";

function App() {
	const [movies, setMovies] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");

	const searhBar = useRef(null);

	useEffect(() => {
		getMovies(FEATURED_API);
	}, []);

	const getMovies = (API) => {
		fetch(API)
			.then((res) => res.json())
			.then((data) => {
				setMovies(data.results);
			});
	}

	const handleOnSubmit = (e) => {
		e.preventDefault();
		getMovies(SEARCH_API+searchTerm);
		setSearchTerm("");
		searhBar.current.blur();
	};

	const handleOnChange = (e) => {
		setSearchTerm(e.target.value);
	};

	return (
	<>
		<header>
			<form onSubmit={handleOnSubmit}>
				<input 
				className="search" 
				type="search" 
				placeholder="Search..." 
				value={searchTerm} 
				onChange={handleOnChange}
				ref={searhBar} />
			</form>
			</header>
		<div className="movie-container">
			{movies.length > 0 &&
				movies.map((movie) => <Movie key={movie.id} {...movie} />)}
		</div>
	</>
	);
}

export default App;
