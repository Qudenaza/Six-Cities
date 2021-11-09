import { NameSpace } from '../root-reducer';
import { State } from '../../types/state';
import { Offer } from '../../types/types';

export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.MainData].isDataLoaded;
export const getOffers = (city: string) => (state: State): Offer[] => state[NameSpace.MainData].offers[city];