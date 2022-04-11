import { useEffect, useState } from "react";
import Movie from "./components/movie";

const FEATURED_API =
	"https://api.themoviedb.org/3/discover/movie?api_key=31b3afc035368d5441c7200a0ccf13c9&language=en-US&sort_by=popularity.desc&page=1";

const SEARCH_API =
	"http://api.themoviedb.org/3/search/movie?api_key=31b3afc035368d5441c7200a0ccf13c9&query=";

function App() {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		fetch(FEATURED_API)
			.then((res) => res.json())
			.then((data) => {
				setMovies(data.results);
			});
	}, []);

	return (
		<div className="movie-container">
			{movies.length > 0 &&
				movies.map((movie) => <Movie key={movie.id} {...movie} />)}
		</div>
	);
}

export default App;
