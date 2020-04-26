import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/modules';
import RandomImage from '../components/atoms/RandomImage/RandomImage';
import { getRandomImage } from '../store/modules/randomImages';
import { randomImageLength } from '../store/modules/randomImages';

export interface RandomImageContainerProps {}

const RandomImageContainer = (props: RandomImageContainerProps) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getRandomImage(Math.floor(Math.random() * randomImageLength)));
	},[dispatch]);
	const randomImages = useSelector((state:RootState) => state.randomImages.toJS());

	return (
		<RandomImage randomImage={randomImages.randomImage}/>
	)
}

export default RandomImageContainer;
