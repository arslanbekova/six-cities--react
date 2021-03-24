import React from 'react';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import {setRating} from '../../utils/general';
import {AuthorizationStatus} from '../../utils/const';
import {connect} from 'react-redux';
import {offerTypes} from '../../prop-types/prop-types';
import {addToFavorites} from "../../store/api-actions";
import {ActionCreator} from "../../store/action";
import {PathName, ComponentType, LoadedStatus, FavoriteStatus} from '../../utils/const';

const PlaceCard = (props) => {

  const {offer, cardType, setActiveOffer, authorizationStatus, onAddToFavorites, onOpenOfferPage} = props;
  const history = useHistory();

  const CardSettings = {
    NEAR: {
      cardClass: `near-places__card`,
      imageClass: `near-places__image-wrapper`,
      imageWidth: `260`,
      imageHeight: `200`
    },
    MAIN: {
      cardClass: `cities__place-card`,
      imageClass: `cities__image-wrapper`,
      imageWidth: `260`,
      imageHeight: `200`
    },
    FAVORITES: {
      cardClass: `favorites__card`,
      imageClass: `favorites__image-wrapper`,
      infoContainerClasses: `favorites__card-info`,
      imageWidth: `150`,
      imageHeight: `110`
    }
  };

  const handleFavoriteFlagChange = (activeOffer, card) => {
    if (authorizationStatus === AuthorizationStatus.AUTH) {
      let status;
      if (activeOffer.isFavorite) {
        status = FavoriteStatus.REMOVE;
      } else {
        status = FavoriteStatus.ADD;
      }
      onAddToFavorites(activeOffer.id, status, card);
    } else {
      history.push(PathName.LOGIN);
    }
  };

  const handleOfferPageOpen = () => {
    onOpenOfferPage(offer.id);
    history.push(PathName.OFFER_PAGE + `${offer.id}`);
  };

  const handleActiveOfferSetState = (activeOffer) => {
    if (cardType === ComponentType.MAIN) {
      setActiveOffer(activeOffer);
    }
  };

  return (
    <article className={`${CardSettings[cardType].cardClass} place-card`} onMouseEnter={() => handleActiveOfferSetState(offer)} onMouseOut={() => handleActiveOfferSetState(0)}>
      {offer.isPremium && <div className="place-card__mark">
        <span>Premium</span>
      </div>}
      <div className={`${CardSettings[cardType].imageClass} place-card__image-wrapper`}>
        <a href="#">
          <img className="place-card__image" src={offer.previewImage} width={CardSettings[cardType].imageWidth} height={CardSettings[cardType].imageHeight} alt="Place image"/>
        </a>
      </div>
      <div className={`${CardSettings[cardType].infoContainerClasses} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button ${offer.isFavorite && `place-card__bookmark-button--active`}`} type="button" onClick={() => handleFavoriteFlagChange(offer, cardType)}>
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: setRating(offer.rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name" onClick={handleOfferPageOpen}>
          {offer.title}
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
};

PlaceCard.propTypes = {
  offer: PropTypes.shape(offerTypes).isRequired,
  setActiveOffer: PropTypes.func,
  cardType: PropTypes.string.isRequired,
  authorizationStatus: PropTypes.bool.isRequired,
  onAddToFavorites: PropTypes.func.isRequired,
  onOpenOfferPage: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus
});

const mapDispatchToProps = (dispatch) => ({
  onAddToFavorites(offerId, status, card) {
    dispatch(addToFavorites(offerId, status, card));
  },
  onOpenOfferPage() {
    dispatch(ActionCreator.updateOfferLoadedStatus(LoadedStatus.NOT_LOADED));
  },
});

export {PlaceCard};
export default connect(mapStateToProps, mapDispatchToProps)(PlaceCard);
