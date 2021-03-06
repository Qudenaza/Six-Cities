import { useState, FormEvent, ChangeEvent } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import ReviewRating from '../review-rating/review-rating';
import { postCommentAction } from '../../../store/api-actions';
import { ThunkAppDispatch } from '../../../types/action';
import { toast } from 'react-toastify';

const ratings = [
  {
    id: 5,
    title: 'perfect',
  },
  {
    id: 4,
    title: 'good',
  },
  {
    id: 3,
    title: 'not bad',
  },
  {
    id: 2,
    title: 'badly',
  },
  {
    id: 1,
    title: 'terribly',
  },
];

function ReviewForm(): JSX.Element {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [disabledStatus, setDisabledStatus] = useState(false);
  const params = useParams<{ id: string }>();

  const dispatch = useDispatch<ThunkAppDispatch>();

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    setDisabledStatus(true);

    dispatch(
      postCommentAction(+params.id, {
        comment,
        rating,
      }),
    )
      .then(() => {
        setRating(0);
        setComment('');
        setDisabledStatus(false);
      })
      .catch(() => {
        setDisabledStatus(false);
        toast.error('Не удалось отправить отзыв. Попробуйте еще раз.');
      });
  };

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    setRating(+evt.target.value);
  };

  const handleReviewChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating" onChange={handleRatingChange}>
        {ratings.map((data) => (
          <ReviewRating key={data.id} ratingData={data} isChecked={data.id === rating} isDisabled={disabledStatus} />
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        value={comment}
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleReviewChange}
        maxLength={300}
        disabled={disabledStatus}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" disabled={comment.length < 50 || rating === 0}>
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
