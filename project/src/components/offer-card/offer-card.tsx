import { useState, MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { selectAuthorizationStatus } from '../../store/user-process/selectors';
import { AuthorizationStatus, AppRoute } from '../../const';
import { Offer } from '../../types/types';
import browserHistory from '../../browser-history';
import { calculateRating } from '../../utils/common';
import { postFavoriteStatusAction } from '../../store/api-actions';
import { removeFromFavorites } from '../../store/action';

type Props = {
  offer: Offer;
  isNearby: boolean;
  isFavoritePage?: boolean;
  onMouseEnter?: (id: number) => void;
};

function OfferCard({ offer, isNearby, isFavoritePage = false, onMouseEnter }: Props): JSX.Element {
  const authorizationStatus = useSelector(selectAuthorizationStatus);
  const [isFavorite, setIsFavorite] = useState(offer.isFavorite ? 1 : 0);

  const dispatch = useDispatch();

  const handleMouseEnter = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();

    if (onMouseEnter) {
      onMouseEnter(offer.id);
    }
  };

  const handleFavoriteButtonClick = () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      browserHistory.push(AppRoute.SignIn);

      return;
    }

    if (isFavorite) {
      dispatch(removeFromFavorites(offer.id));
    }

    setIsFavorite(isFavorite ? 0 : 1);

    dispatch(postFavoriteStatusAction(offer.id, isFavorite ? 0 : 1));
  };

  return (
    <article
      className={cn('place-card', {
        'near-places__card': isNearby,
        // prettier-ignore
        'favorites__card': isFavoritePage,
        'cities__place-card': !isNearby && !isFavoritePage,
      })}
      onMouseEnter={handleMouseEnter}
    >
      {offer.isPremium && !isNearby && !isFavoritePage && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div
        className={cn('place-card__image-wrapper', {
          'near-places__image-wrapper': isNearby,
          'favorites__image-wrapper': isFavoritePage,
          'cities__image-wrapper': !isNearby && !isFavoritePage,
        })}
      >
        <Link to={`/offer/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={isFavoritePage ? '150' : '260'}
            height={isFavoritePage ? '110' : '200'}
            alt="Place"
          />
        </Link>
      </div>
      <div className={cn('place-card__info', { 'favorites__card-info': isFavoritePage })}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={cn('button', 'place-card__bookmark-button', {
              'place-card__bookmark-button--active': isFavorite,
            })}
            onClick={handleFavoriteButtonClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: calculateRating(offer.rating) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">
          {Array.isArray(offer.type)
            ? offer.type.map((item) => item[0].toUpperCase() + item.slice(1)).join(', ')
            : offer.type[0].toUpperCase() + offer.type.slice(1)}
        </p>
      </div>
    </article>
  );
}

export default OfferCard;
