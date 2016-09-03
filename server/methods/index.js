import accounts from './accounts';
import profiles from './profiles';
import messaging from './messaging';
import feed from './feed';
import betaSignup from './beta_signup';

export default function(){
  accounts();
  profiles();
  messaging();
  feed();
  betaSignup();
}
