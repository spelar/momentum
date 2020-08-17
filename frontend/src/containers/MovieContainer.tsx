import React from 'react';
import Header from '../components/Header/Header';

export interface MovieContainerProps {}

const MovieContainer = (props: MovieContainerProps) => {
	return (
		<Header type='movie' />
	)
}

export default MovieContainer;