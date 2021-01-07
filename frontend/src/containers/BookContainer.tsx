import React from 'react';
import Header from '../components/Header/Header';
import { Helmet } from 'react-helmet';

export interface BookContainerProps {}

const BookContainer = (props: BookContainerProps) => {
	return (
		<>
			<Helmet>
				 <title>책 검색</title>
			</Helmet>
			<Header />
		</>
	)
}

export default BookContainer;