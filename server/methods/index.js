import accounts from './accounts.js';
import profiles from './profiles.js';
import messaging from './messaging.js';
import feed from './feed';

export default function(){
  accounts();
  profiles();
  messaging();
  feed();
}
