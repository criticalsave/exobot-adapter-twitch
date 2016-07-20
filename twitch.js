require("source-map-support").install();
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("@exoplay/exobot"),require("tmi.js")):"function"==typeof define&&define.amd?define(["@exoplay/exobot","tmi.js"],e):"object"==typeof exports?exports["twitch.js"]=e(require("@exoplay/exobot"),require("tmi.js")):t["twitch.js"]=e(t["@exoplay/exobot"],t["tmi.js"])}(this,function(t,e){return function(t){function e(o){if(n[o])return n[o].exports;var i=n[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,e,n){Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=2)}([function(t,e){t.exports=require("@exoplay/exobot")},function(t,e){t.exports=require("tmi.js")},function(t,e,n){"use strict";function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function r(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var c=n(1),s=c&&c.__esModule?function(){return c["default"]}:function(){return c};n.d(s,"a",s);var u=n(0),a=u&&u.__esModule?function(){return u["default"]}:function(){return u};n.d(a,"a",a),n.d(e,"EVENTS",function(){return f}),n.d(e,"TwitchAdapter",function(){return p});var h=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),l=function d(t,e,n){null===t&&(t=Function.prototype);var o=Object.getOwnPropertyDescriptor(t,e);if(void 0===o){var i=Object.getPrototypeOf(t);return null===i?void 0:d(i,e,n)}if("value"in o)return o.value;var r=o.get;if(void 0!==r)return r.call(n)},f={connecting:"twitchConnecting",connected:"twitchConnected",logon:"twitchLogon",disconnected:"twitchDisconnected",reconnect:"twitchReconnect",chat:"twitchChat",emoteonly:"twitchEmoteonly",join:"twitchJoin",part:"twitchPart",mods:"twitchMods",notice:"twitchNotice",ping:"twitchPing",pong:"twitchPong",roomstate:"twitchRoomstate",slowmode:"twitchSlowmode",subscribers:"twitchSubscribers",subscription:"twitchSubscription",timeout:"twitchTimeout",whisper:"twitchWhisper"},p=function(t){function e(t){var n=t.username,r=t.oauthPassword,c=t.channels,s=void 0===c?[]:c;o(this,e);var u=i(this,Object.getPrototypeOf(e).apply(this,arguments));return w.call(u),u.username=n,u.oauthPassword=r,u.channels=s,u}return r(e,t),h(e,[{key:"register",value:function(t){var n=this;l(Object.getPrototypeOf(e.prototype),"register",this).apply(this,arguments);var o=this.username,i=this.oauthPassword,r=this.channels;return o&&i?(r.length||t.log.critical("No channels passed to Twitch adapter to connect to."),this.client=new s.a.client({channels:r,identity:{username:o,password:i},options:{debug:!0},secure:!0,reconnect:!0,logger:{info:t.log.info.bind(t.log),warn:t.log.warning.bind(t.log),error:t.log.error.bind(t.log)},connection:{cluster:"aws"}}),this.client.connect(),void Object.keys(f).forEach(function(t){var e=n[f[t]];n.client.on(t,function(){return e.apply(void 0,arguments)}),n.client.on(t,function(){for(var e,o=arguments.length,i=Array(o),r=0;r<o;r++)i[r]=arguments[r];(e=n.bot.emitter).emit.apply(e,["twitch-"+t].concat(i))})})):void t.log.error("username and oauthPassword are required to connect to Twitch.")}},{key:"send",value:function(t){return this.bot.log.debug("Sending "+t.text+" to "+t.channel),t.whisper?this.client.whisper(t.user.name,t.text):void this.client.say(t.channel,t.text)}}]),e}(u.Adapter),w=function(){var t=this;this.twitchConnecting=function(){t.status=u.Adapter.STATUS.CONNECTING},this.twitchConnected=function(){t.status=u.Adapter.STATUS.CONNECTED,t.bot.emitter.emit("connected",t.id),t.bot.log.notice("Connected to Twitch.")},this.twitchLogon=function(){t.status=u.Adapter.STATUS.CONNECTED,t.bot.log.notice("Successfully logged on to Twitch.")},this.twitchDisconnected=function(){t.status=u.Adapter.STATUS.DISCONNECTED,t.bot.log.warning("Disconnected from Twitch.")},this.twitchReconnect=function(){t.status=u.Adapter.STATUS.RECONNECTING,t.bot.log.notice("Reconnecting to Twitch.")},this.twitchChat=function(e,n,o){if(n.username!==t.username){var i=new u.User(n.username);t.receive({user:i,text:o,channel:e})}},this.twitchEmoteonly=function(){},this.twitchJoin=function(e,n){if(n===t.username){var o=new u.User(n);return t.enter({user:o,channel:e})}},this.twitchPart=function(e,n){if(n===t.username){var o=new u.User(n);return t.leave({user:o,channel:e})}},this.twitchPing=function(){t.ping()},this.twitchWhisper=function(e,n){if(e.username!==t.username){var o=new u.User(e.username);t.receiveWhisper({user:o,text:n,channel:e.username})}},this.twitchPong=function(){},this.twitchRoomstate=function(){},this.twitchSlowmode=function(){},this.twitchSubscribers=function(){},this.twitchSubscription=function(){},this.twitchTimeout=function(){},this.twitchMods=function(){},this.twitchNotice=function(){}}}])});
//# sourceMappingURL=twitch.js.map