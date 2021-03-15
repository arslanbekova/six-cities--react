import React from 'react';
import PropTypes from 'prop-types';
import Header from '../header/header';
import ReviewsList from '../reviews-list/reviews-list';
import CommentForm from '../comment-form/comment-form';
import Map from '../map/map';
import OffersListNear from '../offers-list-near/offers-list-near';
import {connect} from 'react-redux';
import {offerTypes, reviewTypes} from '../../prop-types/prop-types';
import {setRating} from '../../utils/general';

const Room = (props) => {
  const {reviews, offers, authorizationStatus, offer} = props;

  const nearPlaces = offers.slice(0, 3);
  const separatedDescription = offer.description.split(`.`).slice(0, -1);

  return (
    <div className="page">
      <Header/>
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {offer.images.map((image) =>
                <div className="property__image-wrapper" key={image}>
                  <img className="property__image" src={image} alt="Photo studio"/>
                </div>)}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {offer.isPremium && <div className="property__mark">
                <span>Premium</span>
              </div>}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {offer.title}
                </h1>
                <button className="property__bookmark-button button" type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: setRating(offer)}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {offer.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {offer.bedrooms}
                </li>
                <li className="property__feature property__feature--adults">
                  {offer.maxAdults}
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{offer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {offer.goods.map((good) =>
                    <li className="property__inside-item" key={good}>
                      {good}
                    </li>
                  )}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="property__user-name">
                    {offer.host.name}
                  </span>
                </div>
                <div className="property__description">
                  {separatedDescription.map((sentence) =>
                    <p className="property__text" key={sentence}>
                      {sentence + `.`}
                    </p>
                  )}
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                <ReviewsList reviews={reviews}/>
                {authorizationStatus && <CommentForm/>}
              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map offers={nearPlaces}/>
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersListNear offers={nearPlaces}/>
          </section>
        </div>
      </main>
    </div>
  );
};

Room.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape(reviewTypes)).isRequired,
  offers: PropTypes.arrayOf(PropTypes.shape(offerTypes)).isRequired,
  authorizationStatus: PropTypes.bool.isRequired,
  offer: PropTypes.shape(offerTypes).isRequired
};

const mapStateToProps = (state) => {
  return {
    offers: state.offers,
    reviews: state.reviews,
    authorizationStatus: state.authorizationStatus,
    offer: state.offer
  };
};

export {Room};
export default connect(mapStateToProps)(Room);
