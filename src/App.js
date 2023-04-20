import React, { useEffect } from 'react';
import logo from './logo.svg';
import usePushNotifications from './usePushNotifications';
import './App.css';
import AddToHomeScreen from '@ideasio/add-to-homescreen-react';

function App() {
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
    loading
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

    if (pushNotificationSupported && isConsentGranted && !userSubscription) {
      onClickSusbribeToPushNotification()
    }

    if (userSubscription && !pushServerSubscriptionId) {
      onClickSendSubscriptionToPushServer()
    }

  }, [pushNotificationSupported, isConsentGranted, userSubscription, pushServerSubscriptionId])


  return (
    <div className='App'>
      <AddToHomeScreen skipFirstVisit={false} displayPace={0} mustShowCustomPrompt={true} />
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <Loading loading={loading} />

        <p>Push notification are {!pushNotificationSupported && 'NOT'} supported by your device.</p>

        <p>
          User consent to recevie push notificaitons is <strong>{userConsent}</strong>.
        </p>

        <Error error={error} />

        {/* <button
          disabled={!pushNotificationSupported || isConsentGranted}
          onClick={onClickAskUserPermission}>
          {isConsentGranted ? 'Consent granted' : ' Ask user permission'}
        </button> */}
        <span>{isConsentGranted ? 'Consent granted' : ' Ask user permission'}</span>

        {/* <button
          disabled={!pushNotificationSupported || !isConsentGranted || userSubscription}
          onClick={onClickSusbribeToPushNotification}>
          {userSubscription ? 'Push subscription created' : 'Create Notification subscription'}
        </button> */}
        <span>{userSubscription ? 'Push subscription created' : 'Create Notification subscription'}</span>


        {/* <button
          disabled={!userSubscription || pushServerSubscriptionId}
          onClick={onClickSendSubscriptionToPushServer}>
          {pushServerSubscriptionId
            ? 'Subscrption sent to the server'
            : 'Send subscription to push server'}
        </button> */}
        <span>
          {pushServerSubscriptionId
            ? 'Subscrption sent to the server'
            : 'Send subscription to push server'}
        </span>

        {pushServerSubscriptionId && (
          <div>
            <p>The server accepted the push subscrption!</p>
            <button onClick={onClickSendNotification}>Send a notification</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
