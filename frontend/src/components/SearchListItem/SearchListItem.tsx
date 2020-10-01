import React from 'react';
import './SearchListItem.scss';
import { Item } from '../../store/modules/searchResult';

interface SearchListItemProps {
	movie: Item;
}

const SearchListItem = ({movie}: SearchListItemProps) => {
	const makeActorList = () => {
		let actor = movie.actor.replace(/\|/gi, ", ").slice(0,-2);
		return (
			<span dangerouslySetInnerHTML={{__html: actor}}/>
		)
	};
	return (
		<li className="movie clearFix">
			<a target="_blank" href={movie.link} rel="noopener noreferrer">
				{movie.image !== "" ? <div className="image"><img src={movie.image} alt="영화 포스터" /></div> : <div className="image noimage"><span /></div>}
				<div className="info">
					<div className="clearFix">
						<h2 dangerouslySetInnerHTML={{__html: movie.title}} /><span className="pubDate"> (<span dangerouslySetInnerHTML={{__html: movie.pubDate}} />)</span>
					</div>
					<div className="userRating">
						<i className="momentum-icon momentum-icon-star" />
						<span className="score" dangerouslySetInnerHTML={{__html: movie.userRating}}/>
					</div>
					<div className="actor">
						{makeActorList()}
					</div>
				</div>
			</a>
		</li>
	)
}

export default SearchListItem;