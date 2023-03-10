/*
 *  Load the google fonts.
 *  See https://github.com/typekit/webfontloader
 */
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Roboto:400,700,i4', 'Varela Round'],
    api: 'https://fonts.googleapis.cn/css'
  },
  timeout: 1500,
});
