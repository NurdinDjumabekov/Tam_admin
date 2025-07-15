import * as React from 'react';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

///// components
import AddBoxIcon from '@mui/icons-material/AddBox';
import { load } from '@2gis/mapgl';
import MainCard from 'ui-component/cards/MainCard';

///// helpers
import { myAlert } from 'helpers/myAlert';

///// style
import './style.scss';

////// fns
import { editCoordinatesApartmnentReq } from 'store/reducers/apartmentsSlice';
import Titles from 'common/Titles/Titles';

const CrudCoordinatesPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const mapRef = useRef(null);
  const circleRef = useRef(null);
  const markerRef = useRef(null);

  const keyMap = import.meta.env.VITE_MAP_KEY;

  useEffect(() => {
    let mapInstance;

    load().then((mapglAPI) => {
      const startCenter =
        location?.state?.latitude && location?.state?.longitude
          ? [Number(location.state.longitude), Number(location.state.latitude)]
          : [74.6122, 42.8746];

      mapInstance = new mapglAPI.Map('map-container', {
        center: startCenter,
        zoom: 13,
        key: keyMap
      });

      mapRef.current = mapInstance;

      // --- Добавляем начальный маркер
      if (location?.state?.latitude && location?.state?.longitude) {
        const lat = Number(location.state.latitude);
        const lon = Number(location.state.longitude);
        markerRef.current = new mapglAPI.Marker(mapInstance, {
          coordinates: [lon, lat]
        });
      }
      // --- Клик по карте — создаём/перемещаем маркер
      mapInstance.on('click', (e) => {
        const [lon, lat] = e.lngLat;

        if (markerRef.current) {
          markerRef.current.destroy();
        }

        markerRef.current = new mapglAPI.Marker(mapInstance, {
          coordinates: [lon, lat]
        });
      });

      // --- Кнопка "Моё местоположение"
      const controlContent = `
        <div class="buttonRoot" id="find-me">
          <button class="button" title="Моё местоположение">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
              <path fill="currentColor" d="M17.89 26.27l-2.7-9.46-9.46-2.7 18.92-6.76zm-5.62-12.38l4.54 1.3 1.3 4.54 3.24-9.08z"/>
            </svg>
          </button>
        </div>
      `;

      const control = new mapglAPI.Control(mapInstance, controlContent, {
        position: 'centerRight'
      });

      const button = control.getContainer().querySelector('#find-me');
      if (button) {
        button.addEventListener('click', () => geoFindMe(mapInstance, mapglAPI));
      }
    });

    return () => {
      mapRef.current?.destroy();
      mapRef.current = null;
      circleRef.current?.destroy();
      circleRef.current = null;
      markerRef.current?.destroy();
      markerRef.current = null;
    };
  }, [location?.state?.latitude, location?.state?.longitude]);

  const geoFindMe = (mapInstance, mapglAPI) => {
    if (!navigator.geolocation) {
      myAlert('Геолокация не поддерживается вашим браузером');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const center = [pos.coords.longitude, pos.coords.latitude];

        mapInstance.setCenter(center);
        mapInstance.setZoom(16);

        if (circleRef.current) circleRef.current.destroy();

        circleRef.current = new mapglAPI.CircleMarker(mapInstance, {
          coordinates: center,
          radius: 14,
          color: '#0088ff',
          strokeWidth: 4,
          strokeColor: '#ffffff',
          stroke2Width: 6,
          stroke2Color: '#0088ff55'
        });
      },
      () => {
        myAlert('Не удалось определить местоположение');
      }
    );
  };

  const saveCoordinates = async () => {
    if (markerRef.current) {
      const coords = markerRef.current.getCoordinates();
      const send = {
        guid_apartment: location.state?.guid_apartment,
        longitude: coords?.[0],
        latitude: coords?.[1]
      };
      const result = await dispatch(editCoordinatesApartmnentReq(send)).unwrap();
      if (result.res == 1) {
        myAlert(result.mes);
        navigate(-1);
      } else {
        myAlert(result.mes, 'error');
      }
    } else {
      myAlert('Сначала выберите точку на карте');
    }
  };

  return (
    <div className="map_data">
      <MainCard
        title={
          <div className="headerActionsStandart">
            <Titles title={location?.state?.address} />
            <button onClick={saveCoordinates} className="standartBtn">
              Сохранить
            </button>
          </div>
        }
        sx={{ height: '100%', '& > div:nth-of-type(2)': { height: 'calc(100% - 68px)', padding: 1 } }}
        contentSX={{ padding: 0 }}
      >
        <div className="crud_apartment_page__inner">
          <div style={{ width: '100%', height: '100%' }}>
            <MapWrapper />
          </div>
        </div>
      </MainCard>
    </div>
  );
};

export default CrudCoordinatesPage;

const MapWrapper = React.memo(
  () => <div id="map-container" style={{ width: '100%', height: '100%' }} />,
  () => true
);
