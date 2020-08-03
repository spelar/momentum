import React from 'react';
import { Link } from 'react-router-dom';
import './RandomImage.scss';

export interface RandomImageProps {
	randomImage: string;
}

const RandomImage = ({randomImage}: RandomImageProps) => {
  return (
    <div className="randomImage">
      <div className="image">
        <img src={randomImage} alt="영화 포스터" />
      </div>
      <div className="dim">

      </div>
      <div className="titleWrap">
        <h1 className="title">
          관심있는 영화와 책을 <br />
          검색해 보세요 !
        </h1>
        <Link to="/search" className="start">시작하기</Link>
      </div>
    </div>
  )
}

export default RandomImage;
