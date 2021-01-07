import React from 'react';
import Header from '../components/Header/Header';
import { Helmet } from 'react-helmet';

export interface MovieContainerProps {}

const MovieContainer = (props: MovieContainerProps) => {
	return (
		<>
			<Helmet>
				 <title>영화 검색</title>
			</Helmet>
			<Header />
		</>
	)
}

export default MovieContainer;