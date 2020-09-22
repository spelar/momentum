import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
const RandomImageContainer = lazy(() => import('./containers/RandomImageContainer'));
const SearchContainer = lazy(() => import('./containers/SearchContainer'));
const SearchResultContainer = lazy(() => import('./containers/SearchResultContainer'));
const MovieContainer = lazy(() => import('./containers/MovieContainer'));
const BookContainer = lazy(() => import('./containers/BookContainer'));

const App = () => (
	<Router>
		<Suspense fallback={''}>
			<Switch>
				<Route exact path="/" component={RandomImageContainer} />
				<Route path="/search" component={SearchContainer} />
				<Route path="/searchResult" component={SearchResultContainer} />
				<Route path="/movie" component={MovieContainer} />
				<Route path="/book" component={BookContainer} />
			</Switch>
		</Suspense>
	</Router>
);

export default App;
