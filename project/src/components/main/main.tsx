import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MainEmpty from '../main-empty/main-empty';
import Sorting from '../sorting/sorting';
import LocationList from '../location-list/location-list';
import OfferList from '../offer-list/offer-list';
import Map from '../map/map';
import Header from '../header/header';
import LoadingScreen from '../loading-screen/loading-screen';
import { selectLocation } from '../../store/app-state/selectors';
import { selectOffers } from '../../store/main-data/selectors';
import { fetchOffersAction } from '../../store/api-actions';

function Main(): JSX.Element {
  const city = useSelector(selectLocation);
  const offers = useSelector(selectOffers(city.name));
  const [activeCardId, setActiveCardId] = useState(Infinity);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOffersAction());
  }, [dispatch]);

  if (!offers) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationList />
          </section>
        </div>
        <div className="cities">
          {offers && (
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {offers ? offers.length : 0} places to stay in {city.name}
                </b>
                <Sorting />
                <OfferList offers={offers} setActiveCardId={setActiveCardId} />
              </section>
              <div className="cities__right-section">
                <Map offers={offers} selectedPoint={activeCardId} />
              </div>
            </div>
          )}
          {!offers && <MainEmpty />}
        </div>
      </main>
    </>
  );
}

export default Main;
