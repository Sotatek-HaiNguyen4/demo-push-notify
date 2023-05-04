/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import logo from './logo.svg';
import usePushNotifications from './usePushNotifications';
import './App.css';
import AddToHomeScreen from '@ideasio/add-to-homescreen-react';
import Notify from './Notify';
import axios from 'axios';
import { useState } from 'react';
import IconLine from '../src/image/icon-line.png'
import GoogleMapReact from 'google-map-react';
import Marker from '../src/image/Marker';
import IconShop from '../src/image/icon-shop-location.png'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const defaultProps = {
  center: {
    lat: 21.0243911,
    lng: 105.789737
  },
  zoom: 15
};

function App() {
  const [inforUser, setInforUser] = useState();
  const [accessToken, setAccessToken] = useState('');
  const [myLocation, setmyLocation] = useState({
    lat: '',
    lng: ''
  });

  const {
    userConsent,
    pushNotificationSupported,
    userSubscription,
    onClickAskUserPermission,
    onClickSusbribeToPushNotification,
    onClickSendSubscriptionToPushServer,
    pushServerSubscriptionId,
    onClickSendNotification,
    error,
    loading,
  } = usePushNotifications();

  const Loading = ({ loading }) =>
    loading ? <div className='app-loader'>Please wait, we are loading something...</div> : null;
  const Error = ({ error }) =>
    error ? (
      <section className='app-error'>
        <h2>{error.name}</h2>
        <p>Error message : {error.message}</p>
        <p>Error code : {error.code}</p>
      </section>
    ) : null;

  const isConsentGranted = userConsent === 'granted';

  useEffect(() => {
    if (pushNotificationSupported && !isConsentGranted) {
      onClickAskUserPermission()
    }
  }, [pushNotificationSupported, isConsentGranted])

  useEffect(() => {
    if (pushNotificationSupported && isConsentGranted && !userSubscription) {
      onClickSusbribeToPushNotification()
    }
  }, [pushNotificationSupported, isConsentGranted, userSubscription]);

  useEffect(() => {
    if (userSubscription && !pushServerSubscriptionId) {
      onClickSendSubscriptionToPushServer()
    }
  }, [userSubscription, pushServerSubscriptionId]);

  // check router
  const pathname = window.location.pathname
  const search = window.location.search;

  useEffect(() => {
    const checkIndexOfCode = search.indexOf('code=')
    const codeKey = search.slice(checkIndexOfCode + 5, checkIndexOfCode + 25)
    // alert(`keyCode: ${codeKey}`)

    if (!codeKey || codeKey.length !== 20) return

    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', codeKey);
    params.append('client_id', '1660979956');
    params.append('redirect_uri', 'https://boisterous-snickerdoodle-2897e7.netlify.app/callback');
    params.append('client_secret', '0e98c077d063b3eb88dada5a6ac50701');

    const callApiToken = async () => {
      try {
        const dataPost = await axios.post('https://api.line.me/oauth2/v2.1/token', params);
        if (dataPost?.data?.access_token) {
          setAccessToken(dataPost?.data?.access_token)
          callApiInfo(dataPost?.data?.access_token)
        }
      } catch (error) {
        console.log('error: ', error);
      }
    }

    callApiToken()


    const callApiInfo = async (token) => {
      try {
        const dataInfo = await axios.get('https://api.line.me/oauth2/v2.1/userinfo', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        setInforUser(dataInfo?.data)

        console.log('dataInfo: ', dataInfo);
      } catch (error) {
        console.log('error: ', error);
      }
    }
  }, [window.location.search]);

  const callApiLogout = () => {
    const params = new URLSearchParams();
    params.append('client_id', '1660979956');
    params.append('client_secret', '0e98c077d063b3eb88dada5a6ac50701');
    params.append('access_token', accessToken);

    const handleRemoveToken = async () => {
      try {
        const dataAfterRemove = await axios.post('https://api.line.me/oauth2/v2.1/revoke', params);
        console.log('dataAfterRemove: ', dataAfterRemove);
        setInforUser(null)
      } catch (error) {
        console.log('error: ', error);
      }
    }

    handleRemoveToken()
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);

  const successCallback = (position) => {
    console.log(position);
    setmyLocation({
      lat: position?.coords?.latitude,
      lng: position?.coords?.longitude
    })
  };

  const errorCallback = (error) => {
    console.log(error);
  };


  return (
    <div>
      {
        pathname === '/notify' ? <Notify /> : <div className='App'>

          <h1>Hello: {inforUser?.name}</h1>

          {
            !inforUser &&
            <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '20px' }}>
              <h3>Login with: </h3> <a href="https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1660979956&redirect_uri=https://boisterous-snickerdoodle-2897e7.netlify.app/callback&state=12345abcde&scope=profile%20openid&nonce=09876xyz&disable_ios_auto_login=true&disable_auto_login=true"> <img src={IconLine} style={{ cursor: "pointer", marginLeft: '10px' }} alt='icon' width={70} height={70} />  </a>
            </div>

          }

          {
            inforUser && <h3 onClick={callApiLogout}>Logout now</h3>
          }

          <AddToHomeScreen skipFirstVisit={false} displayPace={0} mustShowCustomPrompt={true} />

          <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: "AIzaSyDHJ5HoRYVIAGVVoazzq3fptE67yu291kY" }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
            >
              <AnyReactComponent
                lat={myLocation.lat}
                lng={myLocation.lng}
                text={<Marker />}
              />
              <AnyReactComponent
                lat={21.020333}
                lng={105.790111}
                text={<><img src={IconShop} width={30} alt='' /></>}
              />
              <AnyReactComponent
                lat={21.019997}
                lng={105.791839}
                text={<><img src={IconShop} width={30} alt='' /></>}
              />
              <AnyReactComponent
                lat={21.020924}
                lng={105.791308}
                text={<><img src={IconShop} width={30} alt='' /></>}
              />
            </GoogleMapReact>
          </div>

          <header className='App-header'>
            <img src={logo} className='App-logo' alt='logo' />
            <Loading loading={loading} />

            <p>Push notification are {!pushNotificationSupported && 'NOT'} supported by your device.</p>

            <p>
              User consent to recevie push notificaitons is <strong>{userConsent}</strong>.
            </p>

            <Error error={error} />

            <button
              disabled={!pushNotificationSupported || isConsentGranted}
              onClick={onClickAskUserPermission}>
              {isConsentGranted ? 'Consent granted' : ' Ask user permission'}
            </button>
            {/* <span>{isConsentGranted ? 'Consent granted' : ' Ask user permission'}</span> */}

            <button
              disabled={!pushNotificationSupported || !isConsentGranted || userSubscription}
              onClick={onClickSusbribeToPushNotification}>
              {userSubscription ? 'Push subscription created' : 'Create Notification subscription'}
            </button>
            {/* <span>{userSubscription ? 'Push subscription created' : 'Create Notification subscription'}</span> */}


            <button
              disabled={!userSubscription || pushServerSubscriptionId}
              onClick={onClickSendSubscriptionToPushServer}>
              {pushServerSubscriptionId
                ? 'Subscrption sent to the server'
                : 'Send subscription to push server'}
            </button>
            {/* <span>
              {pushServerSubscriptionId
                ? 'Subscrption sent to the server'
                : 'Send subscription to push server'}
            </span> */}

            {pushServerSubscriptionId && (
              <div>
                <p>The server accepted the push subscrption!</p>
                <button onClick={onClickSendNotification}>Send a notification</button>
              </div>
            )}
          </header>
        </div>
      }

    </div>

  );
}

export default App;
