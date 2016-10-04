import { BrowserPolicy } from 'meteor/browser-policy-common';

export default function () {
  BrowserPolicy.framing.disallow();
  BrowserPolicy.content.disallowEval();
  BrowserPolicy.content.allowFontDataUrl();
  BrowserPolicy.content.allowSameOriginForAll();

  // commonly used services
  BrowserPolicy.content.allowOriginForAll('fonts.googleapis.com');
}
