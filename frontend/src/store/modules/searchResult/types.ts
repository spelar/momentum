import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type SearchResultAction = ActionType<typeof actions>;

export interface Movie {
	actor: string;
	director: string;
	image: string;
	link: string;
	pubDate: string;
	subtitle: string;
	title: string;
	userRating: string;
}