
(function() {
String.prototype.startsWith = function(str)
{return (this.match("^"+str)==str)}
if (!("classList" in document.documentElement) && Object.defineProperty && typeof HTMLElement !== 'undefined') {
Object.defineProperty(HTMLElement.prototype, 'classList', {
get: function() {
var self = this;
function update(fn) {
return function(value) {
var classes = self.className.split(/\s+/),
index = classes.indexOf(value);
fn(classes, index, value);
self.className = classes.join(" ");
}
}
var ret = {
add: update(function(classes, index, value) {
~index || classes.push(value);
}),
remove: update(function(classes, index) {
~index && classes.splice(index, 1);
}),
toggle: update(function(classes, index, value) {
~index ? classes.splice(index, 1) : classes.push(value);
}),
contains: function(value) {
return !!~self.className.split(/\s+/).indexOf(value);
},
item: function(i) {
return self.className.split(/\s+/)[i] || null;
}
};
Object.defineProperty(ret, 'length', {
get: function() {
return self.className.split(/\s+/).length;
}
});
return ret;
}
});
}
if (!("getBoundingClientRectRigth" in document.documentElement) && Object.defineProperty && typeof HTMLElement !== 'undefined') {
Object.defineProperty(HTMLElement.prototype, 'getBoundingClientRectRigth', {
get: function() { return function() {
if (this.getBoundingClientRect){
var rect = this.getBoundingClientRect();
if (this.x && this.y){
var scroll_top = imonomy.utils.getScrollTop();
rect.top = scroll_top - this.y;
}
return rect;
} else {
return undefined;
}
}
}
});
}
if (!("watchatt" in document.documentElement) && Object.defineProperty && typeof HTMLElement !== 'undefined') {
Object.defineProperty(HTMLElement.prototype, "watchatt", {
enumerable: false
, configurable: true
, writable: false
, value: function (prop, handler) {
var
oldval = this[prop]
, newval = oldval
, getter = function () {
return newval;
}
, setter = function (val) {
oldval = newval;
return newval = handler.call(this, prop, oldval, val);
}
;
if (delete this[prop]) { // can't watch constants
Object.defineProperty(this, prop, {
get: getter
, set: setter
, enumerable: true
, configurable: true
});
}
}
});
}
function imonomy_prevent_change(prop, oldval, val){
if (this && (this.allow_change || val == "about:blank")){
this.allow_change = false;
return val;
} else{
return oldval;
}
}
if (!window.getZIndex) {
window.getZIndex = function(elem) {
function internalgetZIndex(elem){
var z_index = window.getComputedStylePropertyValue(elem, 'z-index');
if (isNaN(z_index) && (elem != document.documentElement) && elem.parentNode && typeof(elem.parentNode.tagName) != "undefined") return internalgetZIndex(elem.parentNode);
if (isNaN(parseInt(z_index))) {z_index = 0} // if the the return z-index is auto it means that no z-index have been set on its parent
return z_index;
}
function childgetZIndex(elem){
var z_index = window.getComputedStylePropertyValue(elem, 'z-index');
z_index = parseInt(z_index);
if (isNaN(z_index)) {z_index = 0;}
var child_zindex = 0;
if (elem.childNodes){
for(var i=0; i<elem.childNodes.length; i++) {
child_zindex = childgetZIndex(elem.childNodes[i]);
if (child_zindex > z_index){
z_index = child_zindex
}
}
}
return z_index;
}
up_zindex = internalgetZIndex(elem);
down_zindex = childgetZIndex(elem);
return Math.max(up_zindex, down_zindex);
};
}
if (!window.getElementPosition) {
function internalgetElementPosition(elem){
var element_position = window.getComputedStylePropertyValue(elem, 'position');
if (element_position != 'fixed' && (elem != document.documentElement) && elem.parentNode && typeof(elem.parentNode.tagName) != "undefined") return internalgetElementPosition(elem.parentNode);
return element_position;
}
window.getElementPosition = function(elem) {
return internalgetElementPosition(elem);
};
}
if (!Array.prototype.indexOf) {
Array.prototype.indexOf = function (obj, fromIndex) {
if (fromIndex == null) {
fromIndex = 0;
} else if (fromIndex < 0) {
fromIndex = Math.max(0, this.length + fromIndex);
}
for (var i = fromIndex, j = this.length; i < j; i++) {
if (this[i] === obj)
return i;
}
return -1;
};
}
if (!window.getComputedStyle) {
window.getComputedStyle = function(el, pseudo) {
this.el = el;
this.getPropertyValue = function(prop) {
var re = /(\-([a-z]){1})/g;
if (prop == 'float') prop = 'styleFloat';
if (re.test(prop)) {
prop = prop.replace(re, function () {
return arguments[2].toUpperCase();
});
}
return el.currentStyle[prop] ? el.currentStyle[prop] : null;
}
return this;
}
}
if (!window.getComputedStylePropertyValue){
function getCamelCasedCssProperty(cssProperty){
var camelcase = cssProperty.replace(/\-([a-z]){1}/g, function (g) { return g.toUpperCase() });
return camelcase;
}
window.getComputedStylePropertyValue = function(el,cssProperty){
if(!window.getComputedStyle){
if(document.defaultView && document.defaultView.getComputedStyle){
return document.defaultView.getComputedStyle.getPropertyValue(cssProperty); // chrome + firefox
}
else{
var camelCasedCssProperty = getCamelCasedCssProperty(cssProperty); // transforme for IE syntax from "margin-top" to "margainTop"
var style_ie8 = window.getComputedStyle(el); // IE8
if (style_ie8.getPropertyValue(camelCasedCssProperty)) {
return html_style.getPropertyValue(camelCasedCssProperty);
}
else{
if(el.currentStyle){ // IE9
return el.currentStyle(camelCasedCssProperty);
}
else{
if (el.style[camelCasedCssProperty].length > 0){ // IE10
return el.style[camelCasedCssProperty];
}
else return 0;
}
}
}
}
else{
if (el.nodeType == 1){
var comp_style = window.getComputedStyle(el);
if (comp_style){
return comp_style.getPropertyValue(cssProperty);
}
}
return null;
}
}
}
String.prototype.trim = function () {
return this.replace(/^\s*|\s*$/g, '');
},
String.prototype.truncate = function (limit) {
var bits, i;
bits = this.split('');
if (bits.length > limit) {
for (var i = bits.length - 1; i > -1; --i) {
if (i > limit) {
bits.length = i;
}
else if (' ' === bits[i]) {
bits.length = i;
break;
}
}
bits.push('...');
}
return bits.join('');
};
//(function(){
if (window.imonomy){
// do nothing_
} else{
window.imonomy = {};
}
imonomy.utils = {
calcTimeDuration: function(){
if (imonomy.preload){
var fromTime = imonomy.preload.trackServe_time;
}else{
return 'null';
}
var toTime = new Date();
var resultInms = toTime - fromTime ;
if(resultInms !== undefined){
return resultInms;
}else{
return 'null';
}
},
getVideoByObjectData: function(optional_els){
var videos = [];
var words = ["acudeoplayer","videoPlayer","jwplayer","flowplayer","tremormedia.com","player.swf"];
for (var i = 0; i < optional_els.length; i++) {
optional_el = optional_els[i];
if (optional_el){
var data = null;
if (optional_el.data){
data = optional_el.data;
} else{
if (optional_el.attributes["flashvars"]){
data = optional_el.attributes["flashvars"].value;
}
}
if (data != null){
for (var j = 0; j < words.length; j++) {
var word = words[j];
if (data.indexOf(word)>-1){
videos[videos.length] = optional_el;
continue;
}
}
}
}
}
return videos;
},
getVideoPlayers: function(){
optional_el = document.getElementsByTagName("object");
var video_el = imonomy.utils.getVideoByObjectData(optional_el);
optional_el = document.getElementsByTagName("embed");
video_el = video_el.concat(imonomy.utils.getVideoByObjectData(optional_el));
var html5_video = document.getElementsByTagName("video");
for (var i = 0; i < html5_video.length; i++) {
video_el[video_el.length] = html5_video[i];
}
var iframe_video = document.getElementsByTagName("iframe");
for (var i = 0; i < iframe_video.length; i++) {
var url = iframe_video[i].src;
if (typeof (url) != 'undefined' && url != null && url.length > 0){
if (url.indexOf("youtube.com/") != -1 || url.indexOf("playwire.com") != -1){
video_el[video_el.length] = iframe_video[i];
}
}
}
return video_el;
},
get_use_img: function(img){
var use_img = img;
if (img.tagName != "IMG"){
if (img.use_img){
use_img = img.use_img
} else{
var internal_images = img.getElementsByTagName("img");
if (internal_images.length == 1){
var internal_size = imonomy.image._getImgSize(internal_images[0]);
if (internal_size[0] > 40 && internal_size[1] > 40){
use_img = internal_images[0];
}
} else if (internal_images.length > 1){
var max_size_img = 1;
var index_img = -1;
for (var i = 0; i < internal_images.length; i++) {
var internal_size = imonomy.image._getImgSize(internal_images[i]);
var size_img = internal_size[0] * internal_size[1];
if (size_img > max_size_img) {
max_size_img = size_img;
index_img = i;
}
}
if (index_img > -1){
use_img = internal_images[index_img];
}
}
img.use_img = use_img;
}
}
return use_img;
},
isHomePage: function(){
return document.location != null && (document.location.pathname == "/" || document.location.pathname == "/index.php") && document.location.search == "";
},
getElementTopLeft: function(id) {
var size = imonomy.image._getImgSize(id);
imgWidth = size[0]; imgHeight = size[1]; imgTop = size[2]; imgLeft = size[3]; imgPos = size[4];
return { top: imgTop, left: imgLeft };
},
keywords_words: null,
keywords_words_usemeta: true,
protocol: function(){
var protocol = "http:";
if (window.location != null){
protocol = window.location.protocol;
if (protocol.indexOf("http") < 0){
protocol = "http:"
}
}
return protocol;
},
isAdultContent: function(){
return false;
},
injectStyle: function(data) {
// fix ie bug with stylesheets
if (imonomy.utils.isIE() && document.styleSheets && document.styleSheets.length > 30){
function getStyleSheet () {
var styleSheets = document.styleSheets;
for (var j = 0; j < styleSheets.length; j++){
var styleSheet = styleSheets[j];
if (styleSheet.cssText.length < 1000){
return styleSheet;
}
}
return null;
};
var styleSheet = getStyleSheet();
if (styleSheet != null){
styleSheet.cssText = styleSheet.cssText+ " " +data;
}
} else {
var s = document.createElement('style');
s.setAttribute('type', 'text/css');
if (s.styleSheet) { s.styleSheet.cssText = data; }
else {
var st = document.createTextNode(data);
s.appendChild(st); }
if (s) {
var e_s = document.getElementsByTagName('head');
if (e_s && e_s.length > 0) {
if (typeof(document) != 'undefined' && typeof(document.location) != 'undefined' && document.location.host == 'happilyblended.com'){
e_s = document.getElementsByTagName('style');
e_s[0].innerHTML = e_s[0].innerHTML + data;
} else{
e_s[0].appendChild(s);
}
}
}
}
},
setFrameCode: function(unit_code, unit_data, frame_container, frame, append_container, wrap_code, force_frame){
var unit_format = unit_data.format;
var curr_test = unit_data.curr_test;
var cid = unit_data.cid;
var curr_tier = unit_data.curr_tier;
var curr_unit_id = unit_data.unit_id;
var origin_unit_code = unit_code;
var unit_format_layout = "300x250";
if (unit_format && unit_format != "") {
if (unit_format == "1") unit_format_layout = "300x250";
else if (unit_format == "2") unit_format_layout = "468x60";
else if (unit_format == "3") unit_format_layout = "234x60";
else if (unit_format == "4") unit_format_layout = "600x95";
else if (unit_format == "5") unit_format_layout = "240x150";
else if (unit_format == "6") unit_format_layout = "728x90";
else if (unit_format == "7") unit_format_layout = "video";
else if (unit_format == "8") unit_format_layout = "320x50";
else unit_format_layout = unit_format;
}
if (imonomy.settings.unit_macros && imonomy.settings.unit_macros != "" && origin_unit_code && origin_unit_code != "") {
for (var prop in imonomy.settings.unit_macros) {
if ((frame && (frame.className.indexOf(prop) >= 0 || (frame.product && frame.product.indexOf(prop) >= 0)) || (frame_container && frame_container.className.indexOf(prop) >= 0) || unit_format_layout == prop) && typeof(imonomy.settings.unit_macros[prop]) == 'object') {
var macros_arr = Object.getOwnPropertyNames(imonomy.settings.unit_macros[prop]);
for (var prop_t in macros_arr) {
var code_to_replace = ((imonomy.settings.unit_macros[prop])[macros_arr[prop_t]]);
if (typeof(macros_arr[prop_t]) == 'string' && typeof(code_to_replace) == 'string') {
if (code_to_replace.indexOf("%") >= 0) code_to_replace = decodeURIComponent(code_to_replace);
origin_unit_code = origin_unit_code.replace(new RegExp(macros_arr[prop_t].replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), code_to_replace);
}
}
}
}
}
var width = 301;
var height = 250;
if (unit_data.width){
width = unit_data.width;
}
if (unit_data.height){
height = unit_data.height;
}
if (unit_format == "600x95"){
width = 600;
height = 95;
}
else if (unit_format == "240x75"){
width = 240;
height = 75;
}
else if (unit_format == "240x150"){
width = 240;
height = 150;
}
else if (unit_format == "468x60"){
width = "100%";
height = 126;
}
/*if (console && console.time){
console.time(unit_data.u_id+unit_data.cid);
}*/
if (imonomy.layer.test_iframe_mode()){
if (origin_unit_code != null) {
if (origin_unit_code.length > 0 && origin_unit_code.startsWith(":eval:")){
origin_unit_code = origin_unit_code.replace(":eval:", "")
eval(origin_unit_code);
}
else if(origin_unit_code.indexOf("<sc" + "ript") > -1 || force_frame){
// set fallback information
var location_encoded = document.location + "";
location_encoded = location_encoded.replace(/'/g, " ");
var next_tier = "1";
if (curr_tier){
next_tier = (curr_tier+1).toString()
}
var unit_code = "<sc" + "rip" + "t type='text/javascr" + "ipt'>" +
"var w = window; w.va_terms = '';" +
"w.va_keywords = '" + imonomy.page.keywords().replace(/'/g, " ") + "';" +
"w.va_sid = '" + imonomy.layer.get_sid() + "';" +
"w.va_isps = " + imonomy.layer.shopping_site() +";" +
"w.va_time_preload = '" + imonomy.preload.trackServe_time +"';" +
"w.va_allow_ttkaen = '" + imonomy.settings.time_taken +"';" +
"w.va_sum_ttkan_fromX = 0;" +
"w.va_x_taken = new Date();" +
"w.va_format = '" + unit_format + "';" +
"w.va_use_frame = true;" +
"w.va_cid = '" + cid + "';" +
"w.va_next_tier = " + next_tier + ";" +
"w.va_curr_test = " + curr_test + ";" +
"w.va_url = '" + location_encoded +"';" +
"w.va_domain = '" + imonomy.page.domain() +"';" +
"w.va_title = '" + document.title.replace(/'/g, " ") +"';" +
"w.va_ref = '" + document.referrer.replace(/'/g, " ") +"';";
if (imonomy.settings&& imonomy.settings.quality_type){
unit_code = unit_code + "w.va_quality_type = '"+imonomy.settings.quality_type+"';";
}
if (imonomy.settings && imonomy.settings.unit_macros){
var code_to_propagate = imonomy.settings.unit_macros;
for (var prop in code_to_propagate) {
if (typeof(code_to_propagate[prop]) == 'object') {
var macros_arr = Object.getOwnPropertyNames(code_to_propagate[prop]);
for (var prop_t in macros_arr) {
code_to_replace = ((code_to_propagate[prop])[macros_arr[prop_t]]);
if (typeof(macros_arr[prop_t]) == 'string' && typeof(code_to_replace) == 'string') {
if (code_to_replace.indexOf("'") >= 0 || code_to_replace.indexOf('"') >= 0) {
((code_to_propagate[prop])[macros_arr[prop_t]]) = encodeURIComponent(code_to_replace);
}
}
}
}
}
unit_code = unit_code + "w.va_unit_macros = '" + JSON.stringify(code_to_propagate) + "';";
var product_str = "";
if (frame && frame.className) product_str = frame.className;
if (frame && frame.product) product_str += "-" + frame.product;
if (frame_container && frame_container.className) product_str += "-" + frame_container.className;
unit_code = unit_code + "w.va_frame_class = '" + product_str + "';";
}
if (imonomy.settings&& imonomy.settings.unit_wait_for_onload){
unit_code = unit_code + "w.va_waitforload = "+imonomy.settings.unit_wait_for_onload+";";
}
if (imonomy.preload){
if (imonomy.preload.over_cap){
unit_code = unit_code + "w.va_over_cap = true;";
} else{
unit_code = unit_code + "w.va_over_cap = false;";
}
}
var sub_id = imonomy.layer.get_sub_id();
if (sub_id != ''){
unit_code = unit_code + "w.va_subid = '" + sub_id + "';";
}
var unit_marker = imonomy.layer.unit_marker();
if (unit_marker != ''){
unit_code = unit_code + "w.va_unit_marker = '" + unit_marker + "';";
}
if (imonomy.settings.shopping_agresive && imonomy.layer.shopping_site()){
unit_code = unit_code + "w.va_xtra_info = '12';";
}
if (imonomy.preload && imonomy.preload.search_term_to_use != null){
unit_code = unit_code + "w.va_serach_terms = '" + imonomy.preload.search_term_to_use + "';"
}
if (curr_unit_id && curr_unit_id != null){
unit_code = unit_code + "w.va_curr_unit_id = '" + curr_unit_id +"';"
}
unit_code = unit_code + "w.va_image = true;" +
"</sc"+"ript>" + origin_unit_code
unit_code = unit_code.replace(/\$\$va_format\$\$/g, unit_format);
unit_code = unit_code.replace(/\$\$va_terms\$\$/g, imonomy.page.keywords().replace(/'/g, " "));
if (imonomy.preload && imonomy.preload.search_term_to_use != null){
unit_code = unit_code.replace(/\$\$va_search_terms\$\$/g, imonomy.preload.search_term_to_use);
unit_code = unit_code.replace(/%24%24va_search_terms%24%24/g, imonomy.preload.search_term_to_use);
} else{
unit_code = unit_code.replace(/\$\$va_search_terms\$\$/g, imonomy.page.keywords().replace(/'/g, " "));
unit_code = unit_code.replace(/%24%24va_search_terms%24%24/g, imonomy.page.keywords().replace(/'/g, " "));
}
unit_code = unit_code.replace(/\$\$va_keywords\$\$/g, imonomy.page.keywords().replace(/'/g, " "));
unit_code = unit_code.replace(/\$\$va_sid\$\$/g, imonomy.layer.get_sid());
unit_code = unit_code.replace(/\$\$va_url\$\$/g, escape(document.location));
unit_code = unit_code.replace(/\$\$va_domain\$\$/g, escape(imonomy.page.domain()));
unit_code = unit_code.replace(/\$\$va_title\$\$/g, document.title.replace(/'/g, " "));
unit_code = unit_code.replace(/\$\$va_cid\$\$/g, cid);
unit_code = unit_code.replace(/\$\$va_image\$\$/g, "true");
var next_tier = "1";
if (imonomy.settings.curr_tier){
next_tier = (imonomy.settings.curr_tier+1).toString()
}
unit_code = unit_code.replace(/\$\va_next_tier\$\$/g, next_tier);
unit_code = unit_code.replace(/\$\va_curr_test\$\$/g, curr_test);
if (curr_unit_id && curr_unit_id != null){
unit_code = unit_code.replace(/\$\$va_curr_unit_id\$\$/g, curr_unit_id);
} else{
unit_code = unit_code.replace(/\$\$va_curr_unit_id\$\$/g, "");
}
if (wrap_code){
unit_code = "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\"><html xmlns=\"http://www.w3.org/1999/xhtml\"><head></head><body style='overflow: hidden;margin: 0px;'>"+unit_code +"</body></html>"
}
//imonomy.layer.layer_width = width+10; bug with location of tip
//imonomy.layer.layer_height = height+39;
if (frame == null){
frame = document.createElement('iframe');
if (frame.watchatt){
frame.watchatt('src',imonomy_prevent_change);
}
if(frame_container.className == "imonomy_footer"){
frame.className = 'footer_frame';
}else{
frame.className = 'flip_frame';
}
if ((imonomy.settings.use_sandbox_iframes && !imonomy.utils.isMobile()) || (imonomy.utils.isMobile() && imonomy.settings.use_sandbox_iframes_mobile)){
frame.setAttribute('sandbox','allow-pointer-lock allow-same-origin allow-scripts allow-popups');
}
frame_container.appendChild(frame);
}
imonomy.layer.set_iframe(frame, unit_code, width, height);
} else {
if (origin_unit_code != null && origin_unit_code.length > 0){
if (append_container){
var container_div = document.createElement('div');
container_div.className = "fyva_container";
container_div.innerHTML = origin_unit_code;
frame_container.appendChild(container_div);
} else{
frame_container.innerHTML = origin_unit_code;
}
}
}
}
} else{
var curr_unit_id = null;
if (window.va_curr_unit_id){
curr_unit_id = window.va_curr_unit_id;
}
if (curr_unit_id != 993 && curr_unit_id != 999 && curr_unit_id != 998 && curr_unit_id != 997 && curr_unit_id != 994){
var params = '';
var tr = "0";
if (origin_unit_code != null && origin_unit_code.length > 0){
// = document.getElementById("imonomy_layer_frame_c")
if (origin_unit_code.startsWith(":eval:")){
origin_unit_code = origin_unit_code.replace(":eval:", "")
eval(origin_unit_code);
return;
}
}
var sub_id = imonomy.layer.get_sub_id();
var sub_id_str = "";
if (sub_id != ''){
sub_id_str = "&subid=" + sub_id;
}
var unit_marker = imonomy.layer.unit_marker();
if (unit_marker != ''){
sub_id_str = sub_id_str + "&um=" + unit_marker;
}
var macros_prms = "";
var product_frame = "";
if (imonomy.settings && imonomy.settings.unit_macros){
macros_prms = "&macros=" + encodeURIComponent(JSON.stringify(imonomy.settings.unit_macros));
product_frame = "&product_frame=";
if (frame && frame.className) product_frame += frame.className;
if (frame && frame.product) product_frame += "-" + frame.product;
if (frame_container && frame_container.className) product_frame += "-" + frame_container.className;
}
var unit_code_url = imonomy.utils.protocol() +'//srv.imonomy.com/internal/serve?rf=framede&format=' + unit_format +'&img=true&tr=' + tr + '&sid=' + imonomy.layer.get_sid() + '&cid=' + cid + '&isps=' + imonomy.layer.shopping_site() + '&terms=' + escape(imonomy.page.keywords().replace(/'/g, " ")) + '&keywords='+escape(imonomy.page.keywords())+'&dm=' + escape(imonomy.page.domain()) + '&ttl=' + document.title.replace(/'/g, " ") + sub_id_str + macros_prms + product_frame;
if (curr_unit_id != null){
unit_code_url = unit_code_url + '&uid=' + curr_unit_id;
}
if (frame == null){
frame = document.createElement('iframe');
frame.className = 'flip_frame';
if ((imonomy.settings.use_sandbox_iframes && !imonomy.utils.isMobile()) || (imonomy.utils.isMobile() && imonomy.settings.use_sandbox_iframes_mobile)){
frame.setAttribute('sandbox','allow-pointer-lock allow-same-origin allow-scripts allow-popups');
}
frame_container.appendChild(frame);
}
//ifrm = document.getElementById("imonomy_layer_frame")
imonomy.layer.set_iframe(frame, null, width, height);
frame.setAttribute("src", unit_code_url);
if (frame.watchatt){
frame.watchatt('src',imonomy_prevent_change);
}
}
}
},
setCookie: function(c_name,value,exmilisec, path, cross_domain)
{
var exdate= null;
if (exmilisec != null){
exdate=new Date();
exdate.setTime(exdate.getTime() + exmilisec);
}
var c_value=escape(value) + ((exmilisec==null) ? "" : "; expires="+exdate.toUTCString())+ ((path==null || typeof(path) == 'undefined') ? "" : "; path="+path);
document.cookie=c_name + "=" + c_value;
if (cross_domain){
var exmin = exmilisec/1000/60;
var params = "exp="+exmin+"&ap=false&nm="+c_name+"&vl=" + escape(value);
imonomy.preload.injectScript(imonomy.utils.protocol() +'//srv.imonomy.com/cookies/create.js?' + params);
}
},
/* Get cookie by its name */
getCookie : function(c_name) {
if (document.cookie.length > 0) {
var c_start = document.cookie.indexOf(c_name + "=");
if (c_start != -1) {
c_start = c_start + c_name.length + 1;
c_end = document.cookie.indexOf(";", c_start);
if (c_end == -1) c_end = document.cookie.length;
return unescape(document.cookie.substring(c_start, c_end));
}
}
return "";
},
browser : {
browser_type: "",
version_id: "",
type: function(){
if (this.browser_type == "")
this.browser_type = this.searchString(this.dataBrowser) || "Unknown-Browser";
return this.browser_type;
},
version: function(){
if (this.version_id == "")
this.version_id = this.searchVersion(navigator.userAgent)
|| this.searchVersion(navigator.appVersion);
return this.version_id;
},
searchString: function(data) {
for (var i = 0; i < data.length; i++) {
var dataString = data[i].string;
var dataProp = data[i].prop;
this.versionSearchString = data[i].versionSearch || data[i].identity;
if (dataString) {
if (dataString.indexOf(data[i].subString) != -1)
return data[i].identity;
}
else if (dataProp)
return data[i].identity;
}
},
searchVersion: function(dataString) {
var index = dataString.indexOf(this.versionSearchString);
if (index == -1) {
index = dataString.indexOf("rv"); // for IE 11 version search
if (index == -1) return;
return parseFloat(dataString.substring(index + 3)); // 3 represnt the length of the string "rv" + 1
}
return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
},
dataBrowser: [
{
string: navigator.vendor,
subString: "Apple",
identity: "Safari"
},
{
prop: window.opera,
identity: "Opera"
},
{
string: navigator.userAgent,
subString: "Firefox",
identity: "Firefox"
},
{
string: navigator.userAgent,
subString: "MSIE",
identity: "Explorer",
versionSearch: "MSIE"
},
{
string: navigator.userAgent,
subString: "Trident",
identity: "Explorer",
versionSearch: "MSIE"
},
{
string: navigator.userAgent,
subString: "Chrome",
identity: "Chrome"
}
]
},
isRTL: function ()
{
styleProp = 'direction';
el = 'imonomy_layer';
var x = document.getElementById(el) || document.body;
if (x.currentStyle)
var y = x.currentStyle[styleProp];
else if (window.getComputedStyle)
var y = document.defaultView.getComputedStyle(x,null).getPropertyValue(styleProp);
return y == 'rtl';
},
isIE: function(){
return imonomy.utils.browser.type() == "Explorer";
},
isAndroid: function() {
return navigator.userAgent.match(/Android/i);
},
isBlackBerry: function() {
return navigator.userAgent.match(/BlackBerry/i);
},
isiOS: function() {
return navigator.userAgent.match(/iPhone|iPad|iPod/i);
},
isOperaMobile: function() {
return navigator.userAgent.match(/Opera Mini/i);
},
isWindowsMobile: function() {
return navigator.userAgent.match(/IEMobile/i);
},
isMobile: function() {
return (imonomy.utils.isAndroid() || imonomy.utils.isBlackBerry() || imonomy.utils.isiOS() || imonomy.utils.isOperaMobile() || imonomy.utils.isWindowsMobile());
},
hasClass: function(el, cssClass, check_parent) {
var has_class = el.className && new RegExp("(^|\\s)" + cssClass + "(\\s|$)").test(el.className);
if (!has_class && check_parent && el.parentNode){
has_class = imonomy.utils.hasClass(el.parentNode, cssClass, check_parent);
}
return has_class;
},
isDescendantFromId: function(el, id) {
var has_id = el.id == id;
if (!has_id && el.parentNode){
has_id = imonomy.utils.isDescendantFromId(el.parentNode, id);
}
return has_id;
},
unbind: function (event, action, element) {
if (element == null){
return;
}
if (element.removeEventListener) {
element.removeEventListener(event, action, false);
// Bad citizens.
} else if (element.detachEvent) {
element.detachEvent('on'+event, action);
} else{
if (event == 'mousedown'){
element.onmousedown = null;
} else if (event == 'mouseenter'){
element.onmouseenter = null;
} else if (event == 'mouseleave'){
element.onmouseleave = null;
} else if (event == 'mouseout'){
element.onmouseout = null;
} else if (event == 'mouseover'){
element.omouseover = null;
}
}
},
bind: function (event, action, element) {
if (element == null){
return;
}
var action_func = null;
if (event == 'mouseenter' || event == 'mouseover'){
action_func = function(){action(element)};
} else if (event == 'mouseleave' || event == 'mouseout'){
action_func = function(e){action(e, element)};
} else {
action_func = action
}
if (element.addEventListener) {
element.addEventListener(event, action_func, false);
// Bad citizens.
} else if (element.attachEvent) {
element.attachEvent('on'+event, action_func);
} else{
if (event == 'mousedown'){
element.onmousedown = action_func;
} else if (event == 'mouseenter'){
element.onmouseenter = action_func;
} else if (event == 'mouseleave'){
element.onmouseleave = action_func;
} else if (event == 'mouseout'){
element.onmouseout = action_func;
} else if (event == 'mouseover'){
element.omouseover = action_func;
}
}
},
easing: {
linear: function(progress) {
return progress;
},
quadratic: function(progress) {
return Math.pow(progress, 2);
},
swing: function(progress) {
return 0.5 - Math.cos(progress * Math.PI) / 2;
},
circ: function(progress) {
return 1 - Math.sin(Math.acos(progress));
},
back: function(progress, x) {
return Math.pow(progress, 2) * ((x + 1) * progress - x);
},
bounce: function(progress) {
for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
if (progress >= (7 - 4 * a) / 11) {
return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
}
}
},
elastic: function(progress, x) {
return Math.pow(2, 10 * (progress - 1)) * Math.cos(20 * Math.PI * x / 3 * progress);
}
},
animate_interval: function(options, start) {
var timePassed = new Date - start;
if (typeof(options.duration) == 'undefined'){
return;
}
var progress = timePassed / options.duration;
if (progress > 1 || progress == Number.NaN || typeof(progress) == 'undefined') {
progress = 1;
} else if (progress < 1){
} else{
progress = 1;
}
options.progress = progress;
options.counter = options.counter + 1;
var delta = options.delta(progress);
// other action (fadeIn/fadeOut) started
if (delta == -999999){
return;
}
options.step(delta);
if (progress == 1) {
options.complete();
} else{
if (options.counter < 2000){
setTimeout(function() { imonomy.utils.animate_interval(options, start)}, options.delay || 10);
} else{
// bug
}
}
},
animate_internal: function(options) {
var start = new Date;
options.counter = 1;
setTimeout(function() {imonomy.utils.animate_interval(options, start)}, options.delay || 10);
/*var id = setInterval(function() {
var timePassed = new Date - start;
var progress = timePassed / options.duration;
if (progress > 1) {
progress = 1;
}
options.progress = progress;
var delta = options.delta(progress);
options.step(delta);
if (progress == 1) {
clearInterval(id);
options.complete();
}
}, options.delay || 10);*/
},
animate_left: function(element, from_location, to_location, time) {
options = {
duration: time,
complete: function() {
}};
var to = (to_location - from_location) > 0 ? 1 : 0
imonomy.utils.animate_internal({
duration: options.duration,
delta: function(progress) {
//progress = this.progress;
return imonomy.utils.easing.swing(progress);
},
complete: options.complete,
step: function(delta) {
if (from_location < 0){
delta = delta * -1;
}
element.style.left = (from_location + (delta * (from_location - to_location))) + 'px';
}
});
},
animate_right: function(element, from_location, to_location, time) {
options = {
duration: time,
complete: function() {
}};
var to = (to_location - from_location) > 0 ? 1 : 0
imonomy.utils.animate_internal({
duration: options.duration,
delta: function(progress) {
//progress = this.progress;
return imonomy.utils.easing.swing(progress);
},
complete: options.complete,
step: function(delta) {
element.style.right = (from_location + (delta * (to_location - from_location))) + 'px';
}
});
},
elements_action: {},
fadeOut: function(element, options) {
// need to find a way to tell the fadeIn to stop action
imonomy.utils.elements_action[element] = "fadeOut";
if (options == "fast")
options = {
duration: 300,
complete: function() {
}};
if (options == "normal")
options = {
duration: 800,
complete: function() {
}};
var to = 1;
imonomy.utils.animate_internal({
duration: options.duration,
delta: function(progress) {
if (imonomy.utils.elements_action[element] != "fadeOut"){
return -999999;
}
//progress = this.progress;
return imonomy.utils.easing.swing(progress);
},
complete: options.complete,
step: function(delta) {
element.style.opacity = to - delta;
if (element.style.opacity == 0){
element.style.display = "none";
}
}
});
},
fadeIn: function(element, options, complete) {
// need to find a way to tell the fadeOut to stop action
imonomy.utils.elements_action[element] = "fadeIn";
element.style.opacity = 0;
if (element.style.display == "none"){
element.style.display = "block";
}
var to = 0;
if (options == "fast")
options = {
duration: 300,
complete: function() {
if (complete){
complete();
}
}};
if (options == "normal")
options = {
duration: 800,
complete: function() {
if (complete){
complete();
}
}};
imonomy.utils.animate_internal({
duration: options.duration,
delta: function(progress) {
if (imonomy.utils.elements_action[element] != "fadeIn"){
return -999999;
}
//progress = this.progress;
return imonomy.utils.easing.swing(progress);
},
complete: options.complete,
step: function(delta) {
element.style.opacity = to + delta;
}
});
},
getDocHeight: function () {
var D = document;
return Math.max(
D.body.scrollHeight, D.documentElement.scrollHeight,
D.body.offsetHeight, D.documentElement.offsetHeight,
D.body.clientHeight, D.documentElement.clientHeight
); },
getHeight: function () {
//var body = document.body,
// html = document.documentElement;
if (window.innerHeight){
return window.innerHeight
} else{
return document.body.clientHeight;
}
//Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight)
},
getWidth: function () {
var d = document,
m = "clientWidth";
return Math.max(d.documentElement[m], d.body[m]) || 0
},
getScrollTop: function () {
var d = document,
m = "scrollTop";
return window.pageYOffset || d.documentElement[m] || d.body[m] || 0
},
getScrollLeft: function () {
var d = document,
m = "scrollLeft";
return window.pageXOffset || d.documentElement[m] || d.body[m] || 0
},
issue_unit_request: function(base_url, unit_cap, use_image){
if (document.location.search.indexOf("noserve") > -1){
return;
}
var params = (document.charset ? '&charset='+document.charset : (document.characterSet ? '&charset='+document.characterSet : ''));
if (document.context) {
params = params + "&context=" + escape(document.context);
}
if(imonomy.settings && imonomy.settings.time_taken){
var timetaken = imonomy.utils.calcTimeDuration();
if (timetaken){
var preload_base = parseInt(imonomy.preload.trackServe_time);
var request_base = new Date().getTime();
var base_result = request_base - preload_base;
params = params + "&timepreload=" + preload_base + "&ptaken=" + base_result + "&ttaken=" + timetaken + "&ttkan_x=0&sum_ttkan_x=0";
}
}
if(base_url.indexOf("987") > -1){
params = params + "&or=true";
}
if (imonomy.preload){
params = params + "&ttl=" + escape(imonomy.preload.title());
}
if (document.referrer){
params = params + "&referer=" + escape(document.referrer);
}
if (imonomy.settings&& imonomy.settings.quality_type){
params = params + "&cqt=" + imonomy.settings.quality_type;
}
var sub_id = imonomy.layer.get_sub_id();
var sub_id_str = "";
if (sub_id != ''){
sub_id_str = "&subid=" + sub_id;
}
if (!imonomy.settings || !imonomy.settings.whitelist_site){
var is_adult = imonomy.page.isContainsBlackListWord();
if (is_adult){
params = params + "&adl=true";
}
}
var unit_marker = imonomy.layer.unit_marker();
if (unit_marker != ''){
sub_id_str = sub_id_str + "&um=" + unit_marker;
}
params = params + "&loc=" + escape(window.location) + "&dm=" + escape(window.location.host)+sub_id_str;
var search_term = ""
if (imonomy.preload && imonomy.preload.search_term_to_use && imonomy.preload.search_term_to_use != null){
search_term = "&st=" + imonomy.preload.search_term_to_use;
}
var over_cap = "";
if (imonomy.preload){
if (imonomy.preload.over_cap){
over_cap = "&oc=true";
}
}
var referrer_param = ""
var referrer_match = document.referrer.match('http[s]?://([a-zA-Z0-9-_\.]+)(:[0-9]+)?');
var referrer_host = null;
if (referrer_match && referrer_match != null){
referrer_host = referrer_match[1];
referrer_host = referrer_host.replace("www.", "")
}
if (referrer_host != null){
referrer_param = "&dr=" + referrer_host;
}
var httpsite = "false";
if(location.protocol == "https:"){
httpsite = "true";
}
unit_code_url = base_url + '&sid=' + imonomy.layer.get_sid() + '&terms=' + escape(imonomy.page.keywords().replace(/'/g, " ")) + '&httpsite='+httpsite+ '&keywords='+escape(imonomy.page.keywords())+'&dm=' + escape(imonomy.page.domain()) + search_term + over_cap + referrer_param+ params;
if (use_image){
unit_code_url = unit_code_url + "&rim=true"
imonomy.utils.injectImage(unit_code_url);
} else{
imonomy.utils.injectScript(unit_code_url);
}
},
injectScript: function(url, onload) {
setTimeout(function(){
var script = document.createElement('sc' + 'ript');
script.async = true;
script.setAttribute('type', 'text/jav' + 'ascri' + 'pt');
script.type = 'text/jav' + 'ascri' + 'pt';
script.src = url;
if (onload){
imonomy.utils.bind('load', onload, script);
}
if (document.body) {
document.body.appendChild(script);
} else {
var hs = document.getElementsByTagName('head');
if (hs && hs.length > 0) {
var h = hs[0]
h.appendChild(script);
}
}
}, 0);
},
injectImage: function(url){
var img = document.createElement("img");
img.setAttribute('src',url);
img.setAttribute('width','0px');
img.setAttribute('height','0px');
img.className = 'imonomy_trk_img';
document.body.appendChild(img);
}
};


imonomy.slider = {
slider_width: 301,
slider_height: 288,
set_location_interval: 500,
scroll_timer: null,
scroll_interval: 100,
slider_hide_delay: 1000,
scroll_element_selector: ".MoreLink, .comments, #comments, #comment, .comment, #comment-list, #commentList, #disqus_thread, .yarpp-related",
scroll_in_action_timer: null,
set_gray_lock_counter: true,
imageHandled: 0,
request_hook: [],
elements_action: {},
refresh_timer: false,
sliderInview_Shown: false,
animate_interval: function(options, start) {
var timePassed = new Date - start;
if (typeof(options.duration) == 'undefined'){
return;
}
var progress = timePassed / options.duration;
if (progress > 1 || progress == Number.NaN || typeof(progress) == 'undefined') {
progress = 1;
} else if (progress < 1){
} else{
progress = 1;
}
options.progress = progress;
options.counter = options.counter + 1;
var delta = options.delta(progress);
// other action (fadeIn/fadeOut) started
if (delta == -999999){
return;
}
options.step(delta);
if (progress == 1) {
options.complete();
} else{
if (options.counter < 2000){
setTimeout(function() { imonomy.slider.animate_interval(options, start)}, options.delay || 10);
} else{
// bug
}
}
},
animate_internal: function(options) {
var start = new Date;
options.counter = 1;
setTimeout(function() {imonomy.slider.animate_interval(options, start)}, options.delay || 10);
},
fadeOut: function(element, options) {
// need to find a way to tell the fadeIn to stop action
imonomy.slider.elements_action[element] = "fadeOut";
if (options == "fast")
options = {
duration: 300,
complete: function() {
}};
if (options == "normal")
options = {
duration: 800,
complete: function() {
}};
var to = 1;
imonomy.slider.animate_internal({
duration: options.duration,
delta: function(progress) {
if (imonomy.slider.elements_action[element] != "fadeOut"){
return -999999;
}
//progress = this.progress;
return imonomy.utils.easing.swing(progress);
},
complete: options.complete,
step: function(delta) {
element.style.opacity = to - delta;
if (element.style.opacity == 0){
element.style.display = "none";
}
}
});
},
fadeIn: function(element, options) {
// need to find a way to tell the fadeOut to stop action
imonomy.slider.elements_action[element] = "fadeIn";
element.style.opacity = 0;
if (element.style.display == "none"){
element.style.display = "block";
}
var to = 0;
if (options == "fast")
options = {
duration: 300,
complete: function() {
}};
if (options == "normal")
options = {
duration: 800,
complete: function() {
}};
imonomy.slider.animate_internal({
duration: options.duration,
delta: function(progress) {
if (imonomy.slider.elements_action[element] != "fadeIn"){
return -999999;
}
//progress = this.progress;
return imonomy.utils.easing.swing(progress);
},
complete: options.complete,
step: function(delta) {
element.style.opacity = to + delta;
}
});
},
refresh_requested: false,
request_refresh: function(st){
if (imonomy.slider.refresh_requested){
return;
}
imonomy.slider.refresh_requested = true;
imonomy.layer.generic_refresh_counter += 1;
// this hsould be call after the current ad was shown (shown is counter only after 5 sec of shown)
imonomy.slider.request_hook_slider_action(true);
},
refresh_replace_on_content_ready: function(){
var is_loaded = imonomy.layer.checkIframeContent(imonomy.slider.refresh_frame);
if (is_loaded[0]){
// should replace the ads (make frame invisible and refresh visible)
imonomy.slider.slider_frame.className = '';
imonomy.slider.slider_frame.style.display = 'none';
imonomy.slider.slider_frame = imonomy.slider.refresh_frame;
imonomy.slider.slider_frame.style.display = 'block';
imonomy.slider.refresh_requested = false;
} else {
var product = imonomy.slider.refresh_frame.product;
var index = imonomy.slider.refresh_frame.index;
setTimeout(function() {
imonomy.layer.productCounter[product] = parseInt(imonomy.layer.productCounter[product]) + 1;
imonomy.slider.refresh_replace_on_content_ready();
}, 400);
}
},
request_hook_slider_action: function(is_refresh){
var cid = "imonomy_slider";
if (is_refresh){
cid = cid + "_rf";
}
//auto passback variables
if(!imonomy.layer.sliderAutopass_inited){
imonomy.layer.elementsCounter["slider"] = [];
imonomy.layer.productCounter["slider"] = [];
imonomy.layer.sliderAutopass_inited = true;
}
imonomy.layer.elementsCounter["slider"] = 0;
imonomy.layer.productCounter["slider"] = 0;
// check if bind on show or if there is a scroll
// if not set timer to test again
// base on the image size
var unit_format = '1';
// TBD!! use mobile unit_format and width and heigth on mobile
if (imonomy.utils.isMobile()){
// check screen resolution for small device use mobile small strip
unit_format = '8';
imonomy.slider.slider_width = 320;
imonomy.slider.slider_height = 70;
}
var unit_code_url = imonomy.utils.protocol() +'//srv.imonomy.com/internal/serve?v=2&format=' + unit_format + '&img=true&cid=' + cid + '&isps=' + imonomy.layer.shopping_site() + '&rdn=imonomy_image_$$fid$$&fid=0&cb=imonomy.slider.hook_slider_action($$fid$$, imonomy_image_$$fid$$, '+is_refresh+')';
imonomy.utils.issue_unit_request(unit_code_url);
imonomy.slider.start = new Date().getTime();
imonomy.layer.incPassbackCounter("slider");
},
hook_slider_action: function(index, unit_data,is_refresh){
if (unit_data.validate_blacklist && !imonomy.settings.whitelist_site){
if (imonomy.page.isContainsBlackListWord()){
imonomy.tracker.reportBlackList("slider", unit_data.unit_id);
return;
} else{
imonomy.tracker.reportNoneBlackList();
}
}
if (is_refresh){
imonomy.slider.refresh_frame = document.createElement('iframe');
if (imonomy.slider.refresh_frame.watchatt){
imonomy.slider.refresh_frame.watchatt('src',imonomy_prevent_change);
}
if ((imonomy.settings.use_sandbox_iframes && !imonomy.utils.isMobile()) || (imonomy.utils.isMobile() && imonomy.settings.use_sandbox_iframes_mobile)){
imonomy.slider.refresh_frame.setAttribute('sandbox','allow-pointer-lock allow-same-origin allow-scripts allow-popups');
}
imonomy.slider.refresh_frame.className = "imonomy_slider_frame";
imonomy.slider.refresh_frame.style.display = 'none';
imonomy.slider.refresh_frame.product = "slider";
var slider_container = document.getElementById("imonomy_slider_frame_c");
slider_container.appendChild(imonomy.slider.refresh_frame);
imonomy.utils.setFrameCode(unit_data.html, unit_data, slider_container, imonomy.slider.refresh_frame, false, false, true);
}
if (is_refresh){
imonomy.slider.refresh_replace_on_content_ready();
} else {
//////////////////////
imonomy.utils.setFrameCode(unit_data.html,unit_data,document.getElementById("imonomy_slider_frame_c"), document.getElementById("imonomy_slider_frame"), false, true);
//////////////////////
}
},
hideInternal: function(check){
if (check && !imonomy.slider.should_hide)
return;
imonomy.slider.mode = "hidden";
if (imonomy.slider.visible){
imonomy.slider.visible = false;
imonomy.slider.fadeOut(document.getElementById('imonomy_slider'), "normal");
}
},
hide: function(force){
if (imonomy.slider.refresh_timer){
clearTimeout(imonomy.slider.refresh_timer);
}
if (force){
imonomy.slider.hideInternal();
imonomy.slider.hide_permanent = true;
//set cookie to prevent showing in the next 2 days
imonomy.utils.setCookie("imonomy_lock_time", "all", imonomy.settings.close_lock_time, '/');
} else{
var hide_delay = imonomy.slider.layer_hide_delay;
// make it hide faster on mobile
if (imonomy.utils.isMobile())
hide_delay = imonomy.slider.layer_hide_delay / 2.5;
imonomy.slider.should_hide = true;
setTimeout(function() {if (imonomy.slider.scroll_in_action){ return; } imonomy.slider.hideInternal(true); }, imonomy.slider.slider_hide_delay);
}
},
loaded_ad_id: undefined,
show: function(sender){
imonomy.slider.should_hide = false;
if (imonomy.utils.isAdultContent()){
return;
}
if (imonomy.slider.hide_permanent){
return;
}
if (imonomy.slider.visible){
return;
}
if(!imonomy.slider.sliderInview_Shown){
imonomy.page.trackServ(983, "ImageOnView", "imonomy_slider");
imonomy.slider.sliderInview_Shown = true;
}
if (!imonomy.slider.isContentLoaded()){
imonomy.layer.productCounter["slider"] = parseInt(imonomy.layer.productCounter["slider"]) + 1;
return;
}
imonomy.slider.visible = true;
imonomy.slider.ever_shown = true;
if (typeof(sender) == 'undefined' && typeof(imonomy.layer.track_show_scroll) == 'undefined'){
imonomy.page.trackServ(985, "shown", "imonomy_slider", undefined, imonomy.slider.loaded_ad_id);
imonomy.layer.track_show_scroll = false;
}
imonomy.slider.init();
document.getElementById("imonomy_slider").style.display = "none";
if (imonomy.settings.cornner_side == "left"){
imonomy.slider.slider_obj.style.right = 'auto';
} else{
imonomy.slider.slider_obj.style.left = 'auto';
}
imonomy.slider.slider_obj.style.top = 'auto';
if(imonomy.settings.use_sticky){
imonomy.slider.slider_obj.style.bottom = "120px"
}else{
imonomy.slider.slider_obj.style.bottom = "16px";
}
imonomy.slider.slider_obj.style.position= 'fixed';
if (document.doctype == null && imonomy.utils.isIE()){
imonomy.slider.slider_obj.style.position= 'absolute';
imonomy.slider.slider_obj.style.top= (document.body.scrollTop + 30) + "px";
}
// show loader (until fully loaded)
imonomy.slider.slider_obj.style.display = "block";
var slider_body = document.getElementById('imonomy_slider_window_body');
if (slider_body != null){
var tmp_slider_width = 0;
if (slider_body.style.width != ""){
tmp_slider_width = parseInt(slider_body.style.width.replace("px", ""))
}
if (tmp_slider_width > imonomy.slider.slider_width){
imonomy.slider.slider_width = tmp_slider_width;
}
}
var slider_element = document.getElementById('imonomy_slider');
slider_element.style.width = imonomy.slider.slider_width + "px";
slider_element.style.height = imonomy.slider.slider_height + "px";
slider_element.style.display = "block";
imonomy.slider.fadeIn(slider_element, "fast");
if (imonomy.settings.cornner_side == "left"){
// make is hide faster on mobile
var left_pedding = 30;
if (imonomy.utils.isMobile()){
left_pedding = 9;
}
var slider_left = left_pedding;
if (imonomy.utils.isRTL()){
slider_left = left_pedding;
}
imonomy.slider.slider_obj.style.left = "-" + imonomy.slider.slider_width + "px";
imonomy.utils.animate_left(imonomy.slider.slider_obj, -imonomy.slider.slider_width, slider_left, 800);;
} else {
imonomy.slider.slider_obj.style.right = "-1px";
// make is hide faster on mobile
var right_pedding = 30;
if (imonomy.utils.isMobile()){
right_pedding = 9;
}
var slider_rigth = right_pedding;
if (imonomy.utils.isRTL()){
slider_rigth = right_pedding;
}
imonomy.slider.slider_obj.style.right = "-" + imonomy.slider.slider_width + "px";
imonomy.utils.animate_right(imonomy.slider.slider_obj, -imonomy.slider.slider_width, slider_rigth, 800);;
}
// to fix a bug that animate is not working (http://il.msn.com/?rd=1&ucc=IL&dcc=IL&opt=0)
if (document.getElementById('imonomy_slider').style.opacity == 0){
document.getElementById('imonomy_slider').style.opacity = 1;
}
imonomy.layer.setLockCounter();
if (imonomy.settings.gray_list_behavior && imonomy.slider.set_gray_lock_counter){
imonomy.slider.set_gray_lock_counter = false;
try{
var gray_list_history = imonomy.settings.gray_list_history;
if (gray_list_history && gray_list_history.length > 0){
if (gray_list_history == "--"){
gray_list_history = "";
}
var curr_date = new Date();
if (!gray_list_history || gray_list_history.length == 0){
gray_list_history = curr_date.toUTCString() + "$$" + curr_date.toUTCString() + "$$1";
} else{
lock_counter_splited = gray_list_history.split("$$");
var lock_date = new Date(lock_counter_splited[1]);
view_counter = parseInt(lock_counter_splited[2]);
if (curr_date.getTime()-lock_date.getTime() > 24*40*60*1000){
gray_list_history = curr_date.toUTCString() + "$$" + curr_date.toUTCString() + "$$1";
} else{
gray_list_history = curr_date.toUTCString() + "$$" + lock_counter_splited[1] + "$$" + (view_counter+1);
}
}
var params = "exp=7200000&nm=imonomy_gry_lock_count&vl=" + escape(gray_list_history);
imonomy.preload.injectScript(imonomy.utils.protocol() +'//srv.imonomy.com/cookies/create.js?' + params);
}
} catch(e){
}
if (imonomy.layer.generic_refresh_counter < imonomy.settings.generic_refresh_count && !imonomy.slider.ad_refuse_refresh){
imonomy.slider.refresh_timer = setTimeout(function() {
imonomy.slider.request_refresh();
}, imonomy.settings.time_to_refresh);
}
}
},
scroll: function(){
if (!imonomy.slider.inited)
return;
clearTimeout(imonomy.slider.scroll_timer);
// ked when the window is scrolled.
var scropTop = document.documentElement.scrollTop || document.body.scrollTop;
var nVScroll = scropTop;
nVScroll = nVScroll + imonomy.utils.getHeight();
var scroll_pos_to_show = imonomy.settings.scroll_pos_to_show * imonomy.utils.getDocHeight();
scroll_pos_to_show = Math.min(scroll_pos_to_show,4000 * imonomy.settings.scroll_pos_to_show);
if (imonomy.slider.scroll_element_selector != null){
}
if ((imonomy.settings.bind_on_show && scropTop == 0) || ((scropTop > 0 || scroll_pos_to_show == 0) && nVScroll > scroll_pos_to_show)){
clearTimeout(imonomy.slider.scroll_in_action_timer);
imonomy.slider.scroll_in_action = true;
imonomy.slider.scroll_in_action_timer = setTimeout(function() { imonomy.slider.scroll_in_action = false;}, 800);
imonomy.slider.show();
} else {
if (!imonomy.settings.bind_on_show || (imonomy.settings.bind_on_show && scropTop > 0)){
if (imonomy.slider.cornnerHovered){
imonomy.slider.tryHide();
} else{
imonomy.slider.hide(false);
}
}
}
},
bind_scroll_check_interval: 10,
bindScroll: function(){
function check_loaded(){
if (!imonomy.slider.isContentLoaded()){
setTimeout(function() {
imonomy.layer.productCounter["slider"] = parseInt(imonomy.layer.productCounter["slider"]) + 1;
check_loaded();
}, 400);
}
}
if ((Math.random()*100) < 5){
imonomy.page.monitor_slider_time = true;
check_loaded();
}
// hook on show and scroll
if (imonomy.settings.bind_on_show){
//imonomy.settings.bind_scroll = false;
setTimeout(function() { imonomy.slider.show_on_show(); }, 1800);
}
function imonomy_on_scroll(oEvent) {
if(imonomy.settings.use_sticky || imonomy.settings.my_sticky_mobile){
imonomy.sticky.bindScroll();
}
clearTimeout(imonomy.slider.scroll_timer);
imonomy.slider.scroll_timer = setTimeout(function() { imonomy.slider.scroll(); }, imonomy.slider.scroll_interval);
}
if(window.addEventListener){
window.addEventListener('scroll', imonomy_on_scroll, false);
}else if (window.attachEvent){
el.attachEvent('onscroll', imonomy_on_scroll)
}else{
window.onscroll = imonomy_on_scroll;
}
window.onblur = function() { if ((imonomy.slider.bind_scroll || imonomy.slider.bind_on_show) && imonomy.slider.visible){
imonomy.slider.show_onfocus=true;
imonomy.slider.hideInternal(); } };
window.onfocus = function() {
setTimeout(function() {
if (imonomy.slider.show_onfocus) {
imonomy.slider.show();
imonomy.slider.show_onfocus=false;
}
}, 200);
};
},
init: function(){
if (imonomy.settings.validate_blacklist){
if (imonomy.page.isContainsBlackListWord()){
imonomy.tracker.reportBlackList("init", "");
return;
} else{
imonomy.tracker.reportNoneBlackList();
}
}
if (imonomy.slider.inited == true) return;
// set frame for layer
var style = imonomy.settings.layer_style;
var html = imonomy.settings.layer_html;
html = html.replace("$$unit_mark$$", imonomy.layer.unit_marker());
html = html.replace("$$unit_marker_url$$", imonomy.layer.unit_marker_url());
imonomy.utils.injectStyle(style);
imonomy.utils.injectStyle(".imonomy_slider_frame_c{display: block !important}");
var html_element=document.createElement("div");
html_element.id = "imonomy_slider";
html_element.className = "imonomy_layer";
html_element.style.width = imonomy.slider.slider_width;
html = html.replace('id="imonomy_layer_frame_c"','id="imonomy_slider_frame_c"');
var slider_frame_id = 'id="imonomy_slider_frame"';
if ((imonomy.settings.use_sandbox_iframes && !imonomy.utils.isMobile()) || (imonomy.utils.isMobile() && imonomy.settings.use_sandbox_iframes_mobile)){
slider_frame_id = slider_frame_id + ' sandbox="allow-pointer-lock allow-same-origin allow-scripts allow-popups" ';
}
html = html.replace('id="imonomy_layer_frame"',slider_frame_id);
html = html.replace('id="imonomy_layer_close"','id="imonomy_slider_close"');
html = html.replace('id="imonomy_layer_header"','id="imonomy_slider_header"');
html = html.replace('id="imonomy_layer_window_body"','id="imonomy_slider_window_body"');
html = html.replace('id="imonomy_layer_window"','id="imonomy_slider_window"');
html = html.replace('id="imonomy_arr_0"','id="imonomy_slider_arr_0"');
html = html.replace('id="imonomy_arr_1"','id="imonomy_slider_arr_1"');
html_element.innerHTML = html;
document.body.appendChild(html_element);
var layer_header = document.getElementById("imonomy_slider_header");
layer_header.style.marginBottom = "1px";
imonomy.slider.slider_obj = document.getElementById("imonomy_slider");
imonomy.slider.slider_obj.product = "slider"
imonomy.slider.slider_frame = document.getElementById("imonomy_slider_frame");
imonomy.slider.slider_frame.product = "slider";
// check for scrolls if no scrolls show on show
if (imonomy.utils.getDocHeight() <= imonomy.utils.getHeight()) {
return;
imonomy.settings.bind_on_show = true;
setTimeout(function() { imonomy.slider.request_hook_slider_action(); }, 9800);
} else {
imonomy.slider.request_hook_slider_action();
}
var layer_window_body = document.getElementsByClassName("imonomy_layer_window_body")[0];
if(imonomy.utils.isMobile() && layer_window_body != null){
layer_window_body.setAttribute('style', 'width:322px !important; height:82px;');
}else if(layer_window_body != null){
layer_window_body.setAttribute('style', 'width:302px !important; height:283px;');
}
var close_element = document.getElementById('imonomy_slider_close');
if (close_element.addEventListener) {
close_element.addEventListener('click', function(e){imonomy.slider.hide(true);}, false);
} else if (close_element.attachEvent) {
close_element.attachEvent('onclick', function(){imonomy.slider.hide(true);});
}
var arrow_element = document.getElementById("imonomy_slider_arr_0");
var arrow_element_back = document.getElementById("imonomy_slider_arr_1");
arrow_element.style.display = "none";
arrow_element_back.style.display = "none";
// load configuration
//if (typeof(imonomy_header_background) != 'undefined'){
// imonomy.slider.header_background = imonomy_header_background;
//}
/*var header_backgrounds = imonomy.slider.header_background.split("$");
var header_element = document.getElementById('imonomy_slider_header');
if (typeof(header_element) != 'undefined'){
if (imonomy.utils.isIE()){
header_element.style.background = header_backgrounds[0];
} else {
header_element.style.background = ""
for (var i = 0; i < header_backgrounds.length; i++) {
header_element.style.background = header_element.style.background + header_backgrounds[i];
}
}
if (typeof(imonomy_header_text_color) != 'undefined'){
imonomy.slider.header_text_color = imonomy_header_text_color;
}
if (typeof(imonomy_min_bottom_space) != 'undefined'){
imonomy.slider.min_bottom_space = imonomy_min_bottom_space;
}
header_element.style.color = imonomy.slider.header_text_color;
}*/
imonomy.slider.inited = true;
if (imonomy.settings.bind_on_show){
//imonomy.settings.bind_scroll = false;
setTimeout(function() { imonomy.slider.show_on_show(); }, 1800);
}
imonomy.slider.bindScroll();
},
show_on_show: function(){
if (!imonomy.slider.ever_shown){
imonomy.slider.show();
setTimeout(function() { imonomy.slider.show_on_show(); }, 1800);
}
},
isContentLoaded: function(){
if (imonomy.slider.is_content_loaded == null){
var frame_c = document.getElementById("imonomy_slider_frame_c");
frame_c.product = "slider";
var is_loaded = imonomy.layer.checkElementContent(frame_c);
if ( is_loaded[0] || is_loaded[1]){
imonomy.slider.is_content_loaded = is_loaded[0];
if (is_loaded.length > 2){
imonomy.slider.loaded_ad_id = is_loaded[2];
}
if (imonomy.page.monitor_slider_time) {
var now = new Date().getTime();
var from_slider = now - imonomy.slider.start;
var from_start = now - imonomy.page.start;
imonomy.page.trackServ(984, "loaded", "imonomy_slider" + is_loaded[0], from_start + "_" +from_slider );
}
if (is_loaded.length > 3){
frame_c.ad_refuse_refresh = is_loaded[3];
}
if (!is_loaded[0]){
imonomy.layer.checkPassbackCode(frame_c.product);
}
return is_loaded[0];
}
return false;
}else{
return imonomy.slider.is_content_loaded;
}
}
}



imonomy.flip = {
imageHandled: 0,
indication_location_interval: 500,
indication_location: "right",
show_flip_internal: function(st, force){
if (typeof(this.track_show_flip) == 'undefined'){
imonomy.page.trackServ(985, "shown", st.cid, undefined, st.loaded_ad_id);
this.track_show_flip = false;
}
if (force){
st.flip.className = "flip";
st.flip.classList.add('flip_now')
} else{
st.flip.className = "flip";
}
if (!st.use_css3) {
st.back_complete = false;
st.front_complete = true;
st.flipper('front');
}
imonomy.layer.setLockCounter();
imonomy.layer.checkCrCap(st.flip_frame_container);
},
show_flip: function(st, force){
if (st.in_action || (st.img && st.img.dont_flip || st.force_hide)){
return;
}
if(imonomy.settings.flip_times_limit && (st.flip_times_count >= imonomy.settings.flip_times_limit)){
st.force_hide = true;
return;
}
st.flip_times_count ++;
st.in_action = true;
try{
st.shown = true;
st.front.className = "flip_front_c flip_card";
st.back.className = "back_container flip_back_c flip_card";
st.flip.style.top = imonomy.utils.getElementTopLeft(st.img).top+'px';
st.flip.style.left = imonomy.utils.getElementTopLeft(st.img).left+'px';
if (st.src != st.img2.src){
st.img2.src = st.src;
st.img3.src = st.src;
imonomy.flip.set_flip_locations(st);
}
var handle_position = false;
if (st.div2.offsetHeight > 0 && (st.h - st.div2.offsetHeight)/2 +'px' != st.back_elements.style.paddingTop){
st.back_elements.style.paddingTop = (st.h - st.div2.offsetHeight)/2 +'px';
}
if (st.div2.offsetWidth > 0 && (st.w - st.div2.offsetWidth)/2 +'px' != st.back_elements.style.marginLeft){
st.back_elements.style.marginLeft = (st.w - st.div2.offsetWidth)/2 +'px';
} else{
handle_position = true;
st.flip.style.visibilety = 'hidden';
}
st.flip.style.display = 'block';
if (handle_position){
var div_width = 300;
var div_height = 250;
if (st.div2.offsetHeight > 0){
div_height = st.div2.offsetHeight;
}
if (st.div2.offsetWidth > 0){
div_width = st.div2.offsetWidth;
}
if (div_height > 0 && (st.h - div_height)/2 +'px' != st.back_elements.style.paddingTop){
var padding_top = (st.h - div_height);
if (padding_top < 20 && padding_top > 10){
padding_top = 20;
}
st.back_elements.style.paddingTop = Math.abs(st.h - div_height)/2 +'px';
}
if (div_width > 0 && (st.w - div_width)/2 +'px' != st.back_elements.style.marginLeft){
st.back_elements.style.marginLeft = (st.w - div_width)/2 +'px';
}
st.flip.style.visibilety = 'visible';
setTimeout(function() { imonomy.flip.show_flip_internal(st, force); }, 40);
} else{
imonomy.flip.show_flip_internal(st, force);
}
}
finally {
setTimeout(function() { st.in_action = false; }, 50);
}
},
hide_flip: function(st, force){
if (st.in_action){
return;
}
if (force){
st.force_hide = force
}
st.in_action = true;
try{
st.flip.classList.remove('flip_now');
//st.flip.className = "flip";
if (!st.use_css3) {
if(st.back_complete==true && st.front_complete==true){
st.back_complete = false;
st.flipper('back');
}
} else {
// check is has show now class if so remove
function internal_check(check_el, recheck) {
var style = window.getComputedStyle(check_el.fliper, null);
if (style && (style.transform == "none" || style.webkitTransform == 'none')){
check_el.flip.style.display = 'none';
} else {
if (recheck < 3 ){
setTimeout(function(){ internal_check(check_el, recheck+1)}, 400);
}
}
}
setTimeout(function() { internal_check(st, 0) } , 900);
}
}
finally{
setTimeout(function() { st.in_action = false; }, 940);
}
},
imageMouseEnter: function(st){
if (st.flip_back_now)
return;
imonomy.flip.show_flip(st);
},
imageMouseOut: function(e, st){
st.flip_back_now = false;
},
flipMouseOut: function(e_m, st){
if ((typeof(e_m) != 'undefined') && ((typeof(e_m.toElement) != 'undefined') || typeof(e_m.relatedTarget) != 'undefined')) {
if (st && st.flip.getBoundingClientRectRigth){
var rect = st.flip.getBoundingClientRectRigth();
if (typeof(rect) != "undefined"){
if ((e_m.clientX > rect.left && e_m.clientX < rect.right && e_m.clientY > rect.top && e_m.clientY < rect.bottom) ||(rect.left == 0 && rect.right == 0 && rect.top ==0 && rect.bottom == 0)){
var image_element = e_m.toElement || e_m.relatedTarget;
/*
// unbind other elements(wibiya click to share. for example)
imonomy.utils.unbind('mouseover', null, image_element);
imonomy.utils.unbind('mouseout', null, image_element);
imonomy.utils.unbind('mouseenter', null, image_element);
imonomy.utils.unbind('mouseleave', null, image_element);
// bind to mouse enter
imonomy.utils.bind('mouseover', imonomy.layer.mouseEnter, image_element);
imonomy.utils.bind('mouseout', imonomy.layer.mouseLeave, image_element);
imonomy.utils.bind('mouseenter', imonomy.layer.mouseEnter, image_element);
imonomy.utils.bind('mouseleave', imonomy.layer.mouseLeave, image_element);
*/
return;
}
}
}
}
st.flip_back_now = false;
imonomy.flip.hide_flip(st);
},
in_action: false,
showNow: function(st){
imonomy.flip.show_flip(st, true);
imonomy.utils.unbind('mouseout', null, st.flip);
imonomy.utils.unbind('mouseleave', null, st.flip);
imonomy.utils.unbind('mouseover', null, st.flip);
imonomy.utils.unbind('mouseenter', null, st.flip);
},
hideNow: function(st){
imonomy.flip.hide_flip(st);
imonomy.utils.bind('mouseout', function(e){ imonomy.flip.flipMouseOut(e, st); }, st.flip);
imonomy.utils.bind('mouseleave', function(e){ imonomy.flip.flipMouseOut(e, st); }, st.flip);
},
flipTimer: function(st){
// make sure image visible on screen
//force flip
if (!st.shown){
var shown = imonomy.image._getImgSize(st)[4];
if (shown){
imonomy.flip.showNow(st);
} else {
setTimeout(function() { imonomy.flip.flipTimer(st); }, imonomy.settings.flip_timer);
}
}
},
setIndicationLocation: function(img){
var click_indecation_id = img.cioi;
if (click_indecation_id == null)
return;
var click_indecation = document.getElementById(click_indecation_id);
if (img.force_hide){
click_indecation.style.display = 'none';
return;
}
var use_img = imonomy.utils.get_use_img(img);
var shown = true;
var imgLeft;
var imgTop;
var imgHeight;
var imgWidth;
var size = imonomy.image._getImgSize(use_img);
imgWidth = size[0]; imgHeight = size[1]; imgTop = size[2]; imgLeft = size[3]; shown = size[4];
var font_size = 25;
if (imgWidth > 180) font_size = 28;
if (imgWidth > 300) font_size = 30;
if (imgWidth > 400) font_size = 32;
if (imgWidth > 600) font_size = 35;
var paddingSize = imgHeight / 8 - font_size / 2;
var clickToShareHeight = imgHeight / 4 - paddingSize;
var imageCoverHeight = imgHeight - clickToShareHeight;
//global.page_extra_offset = click_indecation.offset().top;
var click_indecation_parent = click_indecation.parent;
if (typeof(click_indecation_parent) == 'undefined' || (click_indecation_parent.style.position != "relative" && getComputedStyle(click_indecation_parent, null).position != "relative")) {
if (imgTop < 0)
imgTop = 0
if (imgHeight > 0)
imgTop = imgTop + 15;
else
imgTop = imgTop + 15;
click_indecation.style.top = imgTop + 'px';
var left = 0;
if (imgWidth > 0 && imonomy.flip.indication_location == "right"){
left = imgLeft + imgWidth - font_size -10;
}
else{
left = imgLeft + 10;
}
click_indecation.style.left = left + 'px';
}
click_indecation.style.width = font_size + 'px';
click_indecation.style.height = font_size + 'px';
click_indecation.style.position = "absolute";
if (shown){
click_indecation.style.display = "block";
} else{
click_indecation.style.display = "none";
}
setTimeout(function() { imonomy.flip.setIndicationLocation(img); }, imonomy.flip.indication_location_interval);
},
drawIndication: function(image_element, hover_only){
var img = image_element;
imonomy.flip.imageHandled = imonomy.flip.imageHandled + 1;
var click_indecation_id = 'imonomy_indic_' + imonomy.flip.imageHandled;
img.cioi = click_indecation_id;
var indic_class = "";
if (typeof(hover_only) != 'undefined' && hover_only == true){
indic_class = "indic_hover_only"
}
var click_indecation = document.createElement('a');
click_indecation.href = "#";
click_indecation.title = "imonomy - flip to discover.";
click_indecation.className = indic_class;
click_indecation.innerHTML = '<img id="' + click_indecation_id + '" src="data:image/png;base64,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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADEwMjQw"' +
' title="" class="imonomy_indic" style="display: block;right:auto !important; z-index:490">';
img.click_indecation = click_indecation;
document.body.appendChild(click_indecation);
//parent.append(click_indecation_html);
//image.indication_images.append(image_element)
imonomy.flip.setIndicationLocation(img)
},
supports_css3: function() {
var j = navigator.userAgent.match(/MSIE/) || navigator.userAgent.match(/Trident/);
if (j) {
return false;
} else{
var b = document.body || document.documentElement;
var s = b.style;
var p = 'transition';
if(typeof s[p] == 'string') {return true; }
v = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'],
p = p.charAt(0).toUpperCase() + p.substr(1);
for(var i=0; i<v.length; i++) {
if(typeof s[v[i] + p] == 'string') { return true; }
}
return false;
}
},
mouseEnterLeave: function(elem, type, method) {
var mouseEnter = type === 'mouseenter',
ie = mouseEnter ? 'fromElement' : 'toElement',
method2 = function (e) {
e = e || window.event;
var target = e.target || e.srcElement,
related = e.relatedTarget || e[ie];
if ((elem === target || imonomy.flip.contains(elem, target)) &&
!contains(elem, related)) {
method();
}
};
type = mouseEnter ? 'mouseover' : 'mouseout';
imonomy.flip.addEvent(type,elem, method2);
return method2;
},
contains: function (container, maybe) {
return container.contains ? container.contains(maybe) :
!!(container.compareDocumentPosition(maybe) & 16);
},
addEvent: function(evnt, elem, func) {
if (elem.addEventListener)
elem.addEventListener(evnt,func,true);
else if (elem.attachEvent) {
elem.attachEvent("on"+evnt, func);
}
else {
elem[evnt] = func;
}
},
request_hook: [],
request_hook_flip_action: function(image_element){
var img_index = imonomy.flip.request_hook.length;
image_element.bindToProduct = true;
imonomy.flip.request_hook[img_index] = image_element;
var cid = "imonomy_flip";
if (image_element.channel_cid){
cid = cid + image_element.channel_cid
}
image_element.cid = cid;
//auto passback variables
if(!imonomy.layer.flipAutopass_inited){
imonomy.layer.elementsCounter["flip"] = [];
imonomy.layer.productCounter["flip"] = [];
imonomy.layer.flipAutopass_inited = true;
}
imonomy.layer.elementsCounter["flip"][img_index] = 0;
imonomy.layer.productCounter["flip"][img_index] = 0;
var unit_code_url = imonomy.utils.protocol() +'//srv.imonomy.com/internal/serve?v=2&format=1&img=true&cid=' + cid + '&isps=' + imonomy.layer.shopping_site() + '&rdn=imonomy_image_$$fid$$&fid=' + img_index +'&cb=imonomy.flip.hook_flip_action($$fid$$, imonomy_image_$$fid$$, '+img_index+')';
imonomy.utils.issue_unit_request(unit_code_url);
imonomy.layer.incPassbackCounter("flip");
imonomy.flip.check_flipInview(image_element);
},
check_flipInview: function(st){
clearTimeout(st.check_inview_timer);
var size = imonomy.image._getImgSize(st);
var shown = size[4];
if (shown){
imonomy.page.trackServ(983, "ImageOnView", st.cid);
} else{
st.check_inview_timer = setTimeout(function() {
imonomy.flip.check_flipInview(st); },
imonomy.flip.set_location_interval);
}
},
flip_back: function(sender){
var st = this.st;
st.flip_back_now = true;
st.force_hide = true;
if (imonomy.settings.hide_on_flip_back){
this.st.img.dont_flip = true;
imonomy.utils.unbind('mouseover', null, this.st.img);
imonomy.utils.unbind('mouseenter', null, this.st.img);
imonomy.utils.unbind('mouseout', null, this.st.img);
imonomy.utils.unbind('mouseleave', null, this.st.img);
}
if (!st.use_css3) {
imonomy.utils.unbind('mouseover', null, this.st.flip);
imonomy.utils.unbind('mouseenter', null, this.st.flip);
this.st.flipper('back');
} else{
st.flip.classList.remove('flip')
this.st.flip.classList.add('flip_back_now');
//this.st.back.classList.add('back_nohover');
//this.st.front.classList.add('front_nohover');
//this.st.back.classList.remove('flip_back_c');
//this.st.front.classList.remove('flip_front_c');
}
return false;
},
set_flip_locations: function(st){
clearTimeout(st.set_flip_locations_timer);
var orig_img = imonomy.utils.get_use_img(st)
var copy_img = imonomy.utils.get_use_img(st.img2)
if (orig_img.src != copy_img.src){
copy_img.src = orig_img.src;
var copy_img2 = imonomy.utils.get_use_img(st.img3)
copy_img2.src = orig_img.src;
}
/* image size */
var img_style = (st.img.currentStyle || window.getComputedStyle(st.img, null));
st.img2.style.width = img_style.width;
if (st.use_css3){
st.img2.style.maxWidth = img_style.maxWidth;
st.img3.style.maxWidth = img_style.maxWidth;
}
else{
st.img2.style.maxWidth = 'none';
st.img3.style.maxWidth = 'none';
}
st.img2.style.position = "relative";
////////////////////////////////////////////////////////////////////////////
// TBD check if/why we need to set teh top and left with st.style.top/left
//////////////////////////////////////////////////////////////////////////////
st.img2.style.top ="";
st.img2.style.left ="";
st.img2.style.right ="";
st.img2.style.bottom ="";
st.img2.style.height = img_style.height;
st.img2.style.maxHeight = img_style.maxHeight;
st.img3.style.width = img_style.width;
st.img3.style.height = img_style.height;
st.img3.style.maxHeight = img_style.maxHeight;
st.size = imonomy.image._getImgSize(st.img)
st.w = st.size[0];
st.h = st.size[1];
st.top_ = st.img.offsetTop;
st.left_ = st.img.offsetLeft;
if (st.w > 600)
st.fliper.style.transition = "all " + st.h /1000 + "s ease 0.6s";
st.flip.style.width = st.w+'px';
st.flip.style.height = st.h+'px';
st.flip.style.top = imonomy.utils.getElementTopLeft(st.img).top+'px';
st.flip.style.left = imonomy.utils.getElementTopLeft(st.img).left+'px';
st.back.style.width = st.w+'px';
st.back.style.height = st.h+'px';
st.front.style.width = st.w+'px';
st.front.style.height = st.h+'px';
st.flip.style.perspective = (Math.max(st.h, st.w) * 2 + Math.abs(st.h - st.w)) + "px";
st.flip.style.transform = "perspective(" + (Math.max(st.h, st.w) * 2 + Math.abs(st.h - st.w)) + "px";
// check if the image is visible (if not hide the flip)
var shown = st.size[4];
if (!shown){
st.flip.style.display = 'none';
}
st.set_flip_locations_timer = setTimeout(function() { imonomy.flip.set_flip_locations(st); }, imonomy.flip.indication_location_interval);
},
hook_flip_action: function(index, unit_data, img_index){
if (unit_data.validate_blacklist && !imonomy.settings.whitelist_site){
if (imonomy.page.isContainsBlackListWord()){
imonomy.tracker.reportBlackList("flip", unit_data.unit_id);
return;
} else{
imonomy.tracker.reportNoneBlackList();
}
}
var st = imonomy.flip.request_hook[index];
st.img = imonomy.flip.request_hook[index];
if(typeof st.img == 'undefined' || typeof index == 'undefined' || index < -1){
return;
}
st.flip_times_count = 0;
st.index = img_index;
st.product = "flip";
/* speed animation and control*/
st.speed = 25;
st.front_complete = false;
st.back_complete = false;
st.flip_frame_container = document.createElement('div');
st.flip_frame_container.className = 'flip_frame_container imonomy_no_layer';
st.flip_frame_container.product = st.product;
st.flip_frame_container.index = st.index;
st.flip_actions = document.createElement('div');
st.flip_actions.className = "flip_actions";
st.unit_marking = document.createElement('a');
st.unit_marking.className = "flip_unit_marking";
st.unit_marking.id = "flip_unit_marking";
st.unit_marking.innerHTML = imonomy.layer.unit_marker(); //"Advertisement";
if (st.unit_marking.innerHTML == ""){
st.unit_marking.innerHTML = "Advertisement";
}
st.unit_marking.st = st;
st.unit_marking.target = '_blank';
st.unit_marking.href = imonomy.layer.unit_marker_url();
st.flip_actions.style.width = "98%";
st.flip_actions.appendChild(st.unit_marking);
st.flip_back_a = document.createElement('span');
st.flip_back_a.className = "flip_back_x";
st.flip_back_a.id = "flip_back_x";
st.flip_back_a.innerHTML = "&#10006;";
st.flip_back_a.st = st;
st.flip_actions.appendChild(st.flip_back_a);
st.flip_back = document.createElement('span');
st.flip_back.className = "flip_back";
st.flip_back.id = "flip_back";
st.flip_back.innerHTML = imonomy.texts.flip_back;
st.flip_back.st = st;
st.flip_actions.appendChild(st.flip_back);
st.flip_back.onclick = imonomy.flip.flip_back;
st.flip_back.st = st;
st.flip_back_a.onclick = imonomy.flip.flip_back;
st.flip_back_a.st = st;
div_element = st.flip_frame_container;
st.div = div_element;
st.flip_frame_container.appendChild(st.flip_actions);
/* clone */
st.img2 = st.img.cloneNode(true);
st.img2.className = st.img.className + " imonomy_no_layer"
st.img3 = st.img.cloneNode(true);
st.img3.className = st.img.className + "imonomy_no_layer"
st.div2 = st.div; //st.div.cloneNode(true);
//st.div3 = st.div.cloneNode(true);
/* flip container */
st.flip = document.createElement('div');
st.flip.className = 'flip';
st.flip.style.position = 'absolute';
st.flip.style.margin = '0px';
st.flip.style.padding = '0px';
st.flip.style.display = 'none';
imonomy.utils.bind('mouseover', function(flip){flip.hover=true;}, st.flip);
imonomy.utils.bind('mouseenter', function(flip){flip.hover=true;}, st.flip);
imonomy.utils.bind('mouseout', function(flip){flip.hover=false;}, st.flip);
imonomy.utils.bind('mouseleave', function(flip){flip.hover=false;}, st.flip);
imonomy.utils.bind('mouseout', function(flip){st.flip.hover=false;}, st.img2);
imonomy.utils.bind('mouseleave', function(flip){st.flip.hover=false;}, st.img2);
/* front */
st.fliper = document.createElement('div');
st.fliper.className = 'fliper';
imonomy.utils.bind('mouseout', function(flip){st.flip.hover=false;}, st.fliper);
imonomy.utils.bind('mouseleave', function(flip){st.flip.hover=false;}, st.fliper);
st.front = document.createElement('div');
st.front.className = 'flip_front_c flip_card';
document.body.appendChild(st.flip);
//st.img.parentNode.insertBefore(st.flip,st.img);
st.flip.appendChild(st.fliper);
st.fliper.appendChild(st.front);
imonomy.utils.bind('mouseout', function(flip){st.flip.hover=false;}, st.front);
imonomy.utils.bind('mouseleave', function(flip){st.flip.hover=false;}, st.front);
/* back */
st.back = document.createElement('div');
st.back.className = 'back_container flip_back_c flip_card';
st.fliper.appendChild(st.back);
imonomy.utils.bind('mouseout', function(flip){st.flip.hover=false;}, st.back);
imonomy.utils.bind('mouseleave', function(flip){st.flip.hover=false;}, st.back);
st.back_elements = document.createElement('div');
st.back_elements.className = '';
st.back.appendChild(st.back_elements);
imonomy.flip.set_flip_locations(st);
/* animate */
st.animate = function (opts) {
count=0;
var id = setInterval(function() {
count = count+10;;
var progress = count / opts.duration
if (progress > 1) progress = 1
var delta = opts.delta(progress)
opts.step(delta)
if (progress == 1) {
clearInterval(id);
opts.complete();
}
}, opts.delay || 10)
}
var flip_z_index = "9997";
imonomy.utils.injectStyle('.flip_unit_marking:hover {opacity:1;}.flip_unit_marking {opacity:0.6; float:left;font-family:Helvetica, arial, sans-serif; color: #FFFFFF !important; cursor: pointer; font-size: 12px; font-weight: bold; text-shadow: 2px 2px 4px #000000; text-decoration: none !important;} .fliper{overflow: visible !important;} .flip_actions {height: 10px; position: absolute; right: 5px; top: 5px;}.imonomy_flip_powered {clear: both;float: left;}.card img {left:0 !important; top:0 !important} .flip_frame_container {float: left} .flip_frame_container img{width: auto} .flip_back:visited {color: #000000 !important; background-color: transparent !important;}.flip_back { float:right; cursor: pointer; color: #000000 !important; background-color: transparent !important; font-size: 11px; margin-right:5px; text-decoration: underline; line-height:11px; } .flip_back_x:visited {color: #000000; } .flip_back_x { float:right; cursor: pointer; border: 1px solid #000000; border-radius: 3px; color: #000000; font-size: 9px; height: 11px; line-height: 10px; width: 13px; text-decoration: none;} .flip { z-index: ' + flip_z_index+ '; border:none; position: absolute; background-color: #E8E9E3; }')
st.use_css3 = (unit_data.html.indexOf("object") < 0) && imonomy.flip.supports_css3();
if (!st.use_css3) {
imonomy.utils.injectStyle('.flip .flip_back_c{ position: absolute; top: 0px; left: 0px; z-index: 0; width: 100%; height: 100%;}.flip .flip_front_c{ position: absolute; top: 0px; left: 0px; z-index: 2147483647; width: 100%; height: 100%;}.flip .half{ position: absolute; top: 0px; z-index: 2147483647; width: 50%; height: 100%; overflow: hidden;}.flip .left{ left: 0px; width: 50%; height: 100%; z-index: 2147483647; overflow: hidden;}.flip .right{ right: 0px; width: 50%; height: 100%; overflow: hidden;}.flip .wrapper{ width: 100%; height: 100%; }.flip .flip_back_c .wrapper{ z-index: 2147483647; text-align: center;}');
/* front left-right */
st.flip.style.overflow = "hidden";
st.left_f = document.createElement('div');
st.left_f.className = 'left half';
st.left_f_wrapper = document.createElement('div');
st.left_f_wrapper.className = 'wrapper';
st.front.appendChild(st.left_f);
st.left_f.appendChild(st.left_f_wrapper);
st.left_f_wrapper.appendChild(st.img2);
st.right_f = document.createElement('div');
st.right_f.className = 'right half';
st.right_f_wrapper = document.createElement('div');
st.right_f_wrapper.className = 'wrapper';
st.front.appendChild(st.right_f);
st.right_f.appendChild(st.right_f_wrapper);
st.right_f_wrapper.appendChild(st.img3);
st.right_f_wrapper.style.marginLeft = -st.w/2+'px';
/* back left-right */
st.back.className += ' wrapper';
}else{
st.front.appendChild(st.img2);
}
st.back_elements.appendChild(st.div2);
st.back_elements.style.paddingTop = (st.h - st.div2.offsetHeight)/2 +'px';
st.back_elements.style.marginLeft = (st.w - st.div2.offsetWidth)/2 +'px';
// set frame code....
imonomy.utils.setFrameCode(unit_data.html, unit_data, st.flip_frame_container, null, true, true);
st.type = null;
st.flipper = function (type){
if (st.type == type)
return;
st.type = type;
if(type=='front'){
st.flip.style.display = 'block';
st.animate({
delay: st.speed,
duration: 100,
delta: function(p) {return p*p},
step: function(delta) {
num = (delta*st.w/2);
st.left_f_wrapper.style.marginLeft = num +'px';
st.right_f_wrapper.style.marginLeft = -st.w/2-num +'px';
},
complete: function (){
st.back.style.marginLeft = st.w/2 +'px';
//st.right_b_wrapper.style.marginLeft = -st.w +'px';
st.back_elements.style.display = 'block';
st.front.style.display = 'none';
st.animate({
delay: st.speed,
duration: 100,
delta: function(p) {return p*p},
step: function(delta) {
num = (delta*st.w/2);
st.back.style.marginLeft = (st.w/2)-num + 'px';//st.w/2-num +'px';
//st.right_b_wrapper.style.marginLeft = -st.w+num +'px';
},
complete: function (){
st.back_complete = true;
}
})
}
})
}else{
st.animate({
delay: st.speed,
duration: 100,
delta: function(p) {return p*p},
step: function(delta) {
num = (delta*st.w/2);
st.back.style.marginLeft = num +'px';
//st.right_b_wrapper.style.marginLeft = -st.w/2-num +'px';
},
complete: function (){
st.left_f_wrapper.style.marginLeft = st.w/2 +'px';
st.right_f_wrapper.style.marginLeft = -st.w +'px';
st.back_elements.style.display = 'none';
st.front.style.display = 'block';
st.animate({
delay: st.speed,
duration: 100,
delta: function(p) {return p*p},
step: function(delta) {
num = (delta*st.w/2);
st.left_f_wrapper.style.marginLeft = st.w/2-num +'px';
st.right_f_wrapper.style.marginLeft = -st.w+num +'px';
},
complete: function (){
st.front_complete = false;
st.flip.style.display = 'none';
}
})
}
})
}
}
if (st.use_css3) {
imonomy.utils.injectStyle('.back_container {box-sizing:unset !important; width: 100%; background: #E8E9E3; border: 1px solid #999999; height: 100%;} .flip { -webkit-perspective: 1000; -moz-perspective: 1000; perspective: 1000; background-color: white; } .flip:hover .fliper, .flip.hover .fliper, .flip_now .fliper { -webkit-transform: rotateY(180deg); -moz-transform: rotateY(180deg); -ms-filter: "FlipH"; transform: rotateY(180deg); } .flip_back_now .fliper {-webkit-transform: rotateY(360deg); -moz-transform: rotateY(360deg); -ms-filter: "FlipH"; transform: rotateY(360deg);} .flip_back_c { position: absolute; top: 0px; left: 0px; z-index: 9999; } .fliper { -webkit-transition: 0.6s; -webkit-transform-style: preserve-3d; -moz-transition: 0.6s; -moz-transform-style: preserve-3d; transition: 0.6s; transform-style: preserve-3d; position: relative; } .flip_front_c, .flip_back_c { -webkit-backface-visibility: hidden; -moz-backface-visibility: hidden; backface-visibility: hidden; } .flip_front_c { position: absolute; top: 0; left:0; overflow: hidden; z-index: 2; } .flip_back_c { text-align: center; -webkit-transform: rotateY(180deg); -moz-transform: rotateY(180deg); transform: rotateY(180deg); } .flip .back_nohover { width: 100%; height: 100%; z-index: 2147483600; text-align:center; transform:rotateY(180deg) } .flip .front_nohover{ position: absolute; top: 0px; left: 0px; z-index: 2147483647; transform:rotateY(180deg); } .flip .back_nohver{ width: 100%; height: 100%; z-index: 2147483600; -webkit-transform: rotateY(-180deg); -ms-transform: rotateY(-180deg); -moz-transform: rotateY(-180deg); transform: rotateY(-180deg); text-align: center;} ')
}
imonomy.flip.hook_on_content_ready(st);
return this;
},
isContentLoaded: function(st){
if (!st.is_content_loaded){
var is_loaded = imonomy.layer.checkElementContent(st.flip_frame_container);
if ( is_loaded[0] || is_loaded[1]){
st.is_content_loaded = is_loaded[0];
if (is_loaded.length > 2){
st.loaded_ad_id = is_loaded[2];
}
if (is_loaded.length > 3){
st.ad_refuse_refresh = is_loaded[3];
}
if (!is_loaded[0]){
imonomy.layer.checkPassbackCode(st.product);
}
return is_loaded[0];
}
return false;
}else{
return st.is_content_loaded;
}
},
hook_on_content_ready: function(st){
if (imonomy.flip.isContentLoaded(st)){
imonomy.flip.drawIndication(st.img, false);
imonomy.utils.bind('mouseover', imonomy.flip.imageMouseEnter, st.img);
imonomy.utils.bind('mouseenter', imonomy.flip.imageMouseEnter, st.img);
imonomy.utils.bind('mouseout', imonomy.flip.imageMouseOut, st.img);
imonomy.utils.bind('mouseleave', imonomy.flip.imageMouseOut, st.img);
imonomy.utils.bind('mouseover', function(e){
if (!st.use_css3) {
if(st.back_complete==false && st.front_complete==false){
st.back_complete = false;
st.front_complete = true;
st.flipper('front');
}
} else{
st.flip.style.display = 'block';
}}, st.flip);
imonomy.utils.bind('mouseenter', function(e){
if (!st.use_css3) {
if(st.back_complete==false && st.front_complete==false){
st.back_complete = false;
st.front_complete = true;
st.flipper('front');
}
} else{
st.flip.style.display = 'block';
} }, st.flip);
imonomy.utils.bind('mouseout', function(e){ imonomy.flip.flipMouseOut(e, st); }, st.flip);
imonomy.utils.bind('mouseleave', function(e){ imonomy.flip.flipMouseOut(e, st); }, st.flip);
if (imonomy.settings.flip_timer_first > -1){
setTimeout(function() { imonomy.flip.flipTimer(st); }, imonomy.settings.flip_timer_first);
}
} else {
setTimeout(function() {
imonomy.layer.productCounter[st.product][st.index] = parseInt(imonomy.layer.productCounter[st.product][st.index]) + 1;
imonomy.flip.hook_on_content_ready(st);
}, 400);
}
}
}

imonomy.sticky = {
refresh_requested: false,
stickyInview_Shown: false,
sticky_Shown: false,
refresh_timer: false,
sticky_trackServed: false,
allow_cap_inc: true,
cap_counter: 0,
request_refresh: function(){
if (imonomy.sticky.refresh_requested){
return;
}
imonomy.sticky.refresh_requested = true;
imonomy.layer.generic_refresh_counter += 1;
// this hsould be call after the current ad was shown (shown is counter only after 5 sec of shown)
imonomy.sticky.request_hook_sticky_action(true);
},
refresh_replace_on_content_ready: function(){
var is_loaded = imonomy.layer.checkIframeContent(imonomy.sticky.refresh_frame);
if (is_loaded[0]){
// should replace the ads (make frame invisible and refresh visible)
imonomy.sticky.sticky_footer_frame.className = '';
imonomy.sticky.sticky_footer_frame.style.display = 'none';
imonomy.sticky.sticky_footer_frame = imonomy.sticky.refresh_frame;
imonomy.sticky.sticky_footer_frame.style.display = 'block';
imonomy.sticky.refresh_requested = false;
} else {
setTimeout(function() {
imonomy.layer.productCounter["sticky"] = parseInt(imonomy.layer.productCounter["sticky"]) + 1;
imonomy.sticky.refresh_replace_on_content_ready();
}, 400);
}
},
request_hook_sticky_action: function(is_refresh){
var cid = "imonomy_sticky";
if (is_refresh){
cid = cid + "_rf";
}
//auto passback variables
if(!imonomy.layer.stickyAutopass_inited){
imonomy.layer.elementsCounter["sticky"] = [];
imonomy.layer.productCounter["sticky"] = [];
imonomy.layer.stickyAutopass_inited = true;
}
imonomy.layer.elementsCounter["sticky"] = 0;
imonomy.layer.productCounter["sticky"] = 0;
var unit_format = '6';
if (imonomy.utils.isMobile()){
unit_format = '8';
}
var unit_code_url = imonomy.utils.protocol() +'//srv.imonomy.com/internal/serve?v=2&format=' + unit_format + '&img=true&cid=' + cid + '&isps=' + imonomy.layer.shopping_site() + '&rdn=imonomy_image_$$fid$$&fid=0&cb=imonomy.sticky.hook_sticky_action($$fid$$, imonomy_image_$$fid$$, '+is_refresh+')';
imonomy.layer.incPassbackCounter("sticky");
imonomy.utils.issue_unit_request(unit_code_url);
},
hook_sticky_action: function(index, unit_data, is_refresh){
if (unit_data.validate_blacklist && !imonomy.settings.whitelist_site){
if (imonomy.page.isContainsBlackListWord()){
imonomy.tracker.reportBlackList("sticky", unit_data.unit_id);
return;
} else{
imonomy.tracker.reportNoneBlackList();
}
}
if (is_refresh){
imonomy.sticky.refresh_frame = document.createElement('iframe');
if (imonomy.sticky.refresh_frame.watchatt){
imonomy.sticky.refresh_frame.watchatt('src',imonomy_prevent_change);
}
imonomy.sticky.refresh_frame.className = "imonomy_sticky_frame";
imonomy.sticky.refresh_frame.style.display = 'none';
if ((imonomy.settings.use_sandbox_iframes && !imonomy.utils.isMobile()) || (imonomy.utils.isMobile() && imonomy.settings.use_sandbox_iframes_mobile)){
imonomy.sticky.refresh_frame.setAttribute('sandbox','allow-pointer-lock allow-same-origin allow-scripts allow-popups');
}
imonomy.sticky.refresh_frame.product = "sticky";
imonomy.sticky.sticky_footer.appendChild(imonomy.sticky.refresh_frame);
imonomy.utils.setFrameCode(unit_data.html,unit_data,imonomy.sticky.refresh_frame, imonomy.sticky.refresh_frame, false, false, true);
}
if (is_refresh){
imonomy.sticky.refresh_replace_on_content_ready();
} else {
imonomy.utils.setFrameCode(unit_data.html,unit_data,imonomy.sticky.sticky_footer, imonomy.sticky.sticky_footer_frame, false, true, true);
}
},
init: function(){
if (imonomy.settings.validate_blacklist){
if (imonomy.page.isContainsBlackListWord()){
imonomy.tracker.reportBlackList("init", "");
return;
} else{
imonomy.tracker.reportNoneBlackList();
}
}
if (imonomy.sticky.inited == true) return;
imonomy.sticky.inited = true;
var footer_width = '100%';
if (imonomy.utils.isMobile()){
footer_width = window.screen.width + 'px';
}
imonomy.utils.injectStyle('.sticky_actions{position: absolute; top: 2px; right: 5px; cursor: pointer; font-size: 1em;} .imonomy_footer {z-index: 999999; position: fixed; bottom: 0; height: 106px; width: ' + footer_width + '; display:none; margin-left: auto; margin-right: auto; background: rgba(208, 195, 195, 0.35); } .imonomy_powered_sticky{height: 16px; opacity:0.6; font-family:Helvetica, arial, sans-serif; color: #FFFFFF !important; cursor: pointer; font-size: 12px; font-weight: bold; text-shadow: 2px 2px 4px #000000; text-decoration: none !important; width: 728px; display:block; margin-left: auto; margin-right: auto;}.close_x:hover{border-radius:50%} .close_x {line-height:10px;border:1px solid;color:#FFFFFF; font-family:Helvetica, arial, sans-serif; cursor: pointer; font-size: 12px; margin-left: 4px; text-shadow: 2px 2px 4px #000000; float:right; } .sticky_actions .close_x {} .imonomy_sticky_frame{max-width:100% !important; height:auto !important; display: block; margin-left: auto !important; margin-right: auto !important; padding-bottom: 6px !important; } @media screen and (max-width: 700px) {.powered{font-size: 12px; } .imonomy_footer{height: 65px;} } @media screen\0 {.powered{font-family: none; } }');
imonomy.sticky.sticky_footer = document.createElement('div');
imonomy.sticky.sticky_footer.className = 'imonomy_footer';
document.body.appendChild(imonomy.sticky.sticky_footer);
var unit_marking = document.createElement('a');
unit_marking.className = "imonomy_powered_sticky";
unit_marking.id = "imonomy_powered_sticky";
unit_marking.innerHTML = imonomy.layer.unit_marker(); //"Advertisement";
if (unit_marking.innerHTML == ""){
unit_marking.innerHTML = "Advertisement";
}
unit_marking.target = '_blank';
unit_marking.href = imonomy.layer.unit_marker_url();
imonomy.sticky.sticky_footer.appendChild(unit_marking);
imonomy.sticky.sticky_footer_frame = document.createElement('ifr'+'ame');
if (imonomy.sticky.sticky_footer_frame.watchatt){
imonomy.sticky.sticky_footer_frame.watchatt('src',imonomy_prevent_change);
}
imonomy.sticky.sticky_footer_frame.className = "imonomy_sticky_frame";
if ((imonomy.settings.use_sandbox_iframes && !imonomy.utils.isMobile()) || (imonomy.utils.isMobile() && imonomy.settings.use_sandbox_iframes_mobile)){
imonomy.sticky.sticky_footer_frame.setAttribute('sandbox','allow-pointer-lock allow-same-origin allow-scripts allow-popups');
}
imonomy.sticky.sticky_footer_frame.product = "sticky";
imonomy.sticky.sticky_footer.appendChild(imonomy.sticky.sticky_footer_frame);
var actions_container = document.createElement('div');
actions_container.className = "sticky_actions";
var close_x = document.createElement('span');
close_x.className = "close_x";
close_x.id = "close_x";
close_x.innerHTML = "&#10006;";
close_x.onclick = function(){ imonomy.sticky.force_closed = true; imonomy.sticky.move_down(imonomy.sticky.sticky_footer)};
actions_container.appendChild(close_x);
imonomy.sticky.sticky_footer.appendChild(actions_container);
imonomy.sticky.bindScroll(imonomy.sticky.sticky_footer);
imonomy.sticky.request_hook_sticky_action();
// Change width of footer when orientation change
if (imonomy.utils.isMobile()){
window.addEventListener('resize', function(){
imonomy.sticky.sticky_footer.style.width = window.screen.width + 'px';
});
}
},
bindScroll: function(elem){
if(!imonomy.sticky.stickyInview_Shown){
imonomy.page.trackServ(983, "ImageOnView", "imonomy_sticky");
imonomy.sticky.stickyInview_Shown = true;
}
if (!imonomy.sticky.isContentLoaded()){
setTimeout(function(){
imonomy.layer.productCounter["sticky"] = parseInt(imonomy.layer.productCounter["sticky"]) + 1;
imonomy.sticky.bindScroll(elem);
}, 400);
}else{
if(!imonomy.sticky.sticky_footer.firstShown){
imonomy.sticky.sticky_footer.firstShown = true;
imonomy.sticky.move_up(imonomy.sticky.sticky_footer)
}
var viewportElement = document.documentElement;
var position = (window.pageYOffset || viewportElement.scrollTop || 0);
window.onscroll = function (ev) {
if(imonomy.settings.hide_sticky_onscroll){
imonomy.sticky.hideOnscroll();
}
if(imonomy.settings.bind_scroll || imonomy.settings.my_slider_mobile){
imonomy.slider.bindScroll();
}
if (imonomy.sticky.force_closed){return;}
var scroll = (window.pageYOffset || viewportElement.scrollTop || 0);
var scrollHeight = document.body.scrollHeight;
var winheight = window.innerHeight;
winheight = winheight == undefined ? document.documentElement.clientHeight : winheight;
var scrollpoint = window.scrollY;
scrollpoint = scrollpoint == undefined ? window.document.documentElement.scrollTop : scrollpoint;
elem = imonomy.sticky.sticky_footer;
if ((scrollpoint + winheight) >= scrollHeight && (scroll > position)) {
imonomy.sticky.move_down(elem);
}else if(elem.style.bottom == "-120px"){
imonomy.sticky.move_up(elem);
}
position = scroll;
};
}
},
move_down: function(elem){
if (imonomy.sticky.refresh_timer){
clearTimeout(imonomy.sticky.refresh_timer);
}
var bottom = 0;
function frame() {
bottom--;
elem.style.bottom = bottom + 'px';
if (bottom == -120)
clearInterval(id);
}
var id = setInterval(frame, 0.5);
},
move_up: function(elem){
var bottom = -120;
if(!imonomy.sticky.sticky_Shown){
imonomy.page.trackServ(985, "shown", "imonomy_sticky", undefined, imonomy.sticky.loaded_ad_id);
if(imonomy.sticky.allow_cap_inc){
imonomy.sticky.cap_counter++;
imonomy.utils.setCookie("imonomy_sticky_lock_counter", imonomy.sticky.cap_counter, 86400000, '/', true)
}
imonomy.sticky.sticky_Shown = true;
}
function frame() {
bottom++;
elem.style.bottom = bottom + 'px';
imonomy.sticky.sticky_footer.style.display = "block";
if (bottom == 0)
clearInterval(id);
}
var id = setInterval(frame, 0.5);
if (imonomy.layer.generic_refresh_counter < imonomy.settings.generic_refresh_count && !imonomy.sticky.ad_refuse_refresh){
imonomy.sticky.refresh_timer = setTimeout(function() {
imonomy.sticky.request_refresh();
}, imonomy.settings.time_to_refresh);
}
imonomy.layer.setLockCounter();
},
isContentLoaded: function(){
if (imonomy.sticky.is_content_loaded == null){
var frame_c = imonomy.sticky.sticky_footer_frame;
var is_loaded = imonomy.layer.checkContent(frame_c);
if ( is_loaded[0] || is_loaded[1]){
imonomy.sticky.is_content_loaded = is_loaded[0];
if (is_loaded.length > 2){
imonomy.sticky.loaded_ad_id = is_loaded[2];
}
if (!is_loaded[0]){
imonomy.layer.checkPassbackCode(frame_c.product);
}
return is_loaded[0];
}
return false;
}else{
return imonomy.sticky.is_content_loaded;
}
},
hideOnscroll: function(elem){
var ads_elem = document.getElementsByClassName(imonomy.settings.hide_sticky_onscroll)
var sticky_elem = document.getElementsByClassName('imonomy_footer')
divFromTop = window.scrollY + window.innerHeight;
for(var index=0; index < ads_elem.length; index++){
if (ads_elem[index].offsetTop < divFromTop && ads_elem[index].offsetTop + ads_elem[index].offsetHeight + 106 > divFromTop) {
sticky_elem[0].style.visibility = 'hidden';
break;
}else if(ads_elem[index].offsetTop + 106 < divFromTop){
sticky_elem[0].style.visibility = 'visible';
}
}
}
},
imonomy.tracker = {
host: "",
trackPrefix : 'track_',
trackPattern : new RegExp("track_[^\\s]+", "g"),
track_google: false,
track_container_type: null,
track_image_action: null,
track_url: "//a.imonomy.com/action",
track_url_sid: "//a.imonomy.com/action_sid",
session_id: null,
PartnerId: null,
full: false,
full_track_session: null,
perform_session: null,
reportBlackList: function(location, origin){
if (!imonomy.tracker.blocked_reported){
imonomy.tracker.blocked_reported = true;
if ((Math.random()*100) < 5) {
var unit_id = "988";
var blacklist_word = imonomy.page.isContainsBlackListWord(true)
var unit_code_url = imonomy.utils.protocol() +'//srv.imonomy.com/internal/blocked?v=2&format=1&ai=' + unit_id + "&subid=4" + blacklist_word + "&cid="+location + "&ctxu=" + escape(window.location + '');
imonomy.utils.issue_unit_request(unit_code_url);
}
}
},
reportNoneBlackList: function(){
if (!imonomy.tracker.blocked_reported && imonomy.page.WordChecker(imonomy.settings.blacklist_sus_porn,false, false, true)){
imonomy.tracker.blocked_reported = true;
if ((Math.random()*100) < 5) {
var blacklist_word = imonomy.page.WordChecker(imonomy.settings.blacklist_sus_porn,true, false, true)
var unit_code_url = imonomy.utils.protocol() +'//srv.imonomy.com/internal/reporter?v=2&format=1&ai=989&subid=' + blacklist_word;
imonomy.utils.issue_unit_request(unit_code_url, undefined, true);
}
}
},
reportCompPresent: function(){
if (!imonomy.tracker.comp_reported && imonomy.settings.comp_words && imonomy.page.WordChecker(imonomy.settings.comp_words,false, false, true)){
imonomy.tracker.comp_reported = true;
if ((Math.random()*100) < 20) {
var blacklist_word = imonomy.page.WordChecker(imonomy.settings.comp_words,true, false, true)
var unit_code_url = imonomy.utils.protocol() +'//srv.imonomy.com/internal/reporter?v=2&format=1&ai=989&subid=comp_' + blacklist_word;
imonomy.utils.issue_unit_request(unit_code_url, undefined, true);
}
}
},
sessionId: function () {
if (imonomy.tracker.session_id == null){
var session_id = imonomy.utils.getCookie("sessionId");
if (typeof(session_id) != 'undefined' && session_id != null && session_id != ""){
imonomy.tracker.session_id = session_id;
} else {
if (typeof(imonomy.tracker.session_id) == 'undefined' || imonomy.tracker.session_id == null){
var now = new Date()
imonomy.tracker.session_id = Math.random() + now.getTime();
imonomy.utils.setCookie("sessionId", imonomy.tracker.session_id, null, '/');
}
}
}
return imonomy.tracker.session_id;
},
isFullTrackSession: function(){
if (imonomy.tracker.full_track_session == null){
imonomy.tracker.full_track_session = imonomy.utils.getCookie("full") == "true";
}
return imonomy.tracker.full_track_session;
},
getOrSetFullTrackSession: function(){
return false;
if (imonomy.tracker.full_track_session == null){
var full = imonomy.utils.getCookie("full");
if (full == ""){
var random_mode = Math.random();
if (random_mode > 0.96){
full = "true";
} else{
full = "false";
}
imonomy.utils.setCookie("full", full, null, '/');
}
imonomy.tracker.full_track_session = full == "true";
imonomy.tracker.full = imonomy.tracker.full_track_session;
}
return imonomy.tracker.full_track_session;
},
getOrSetPerformSession: function(){
return true;
if (imonomy.tracker.perform_session == null){
var perform_cookie = imonomy.utils.getCookie("perform");
var perform = true;
if (perform_cookie == ""){
if (typeof(imonomy_demo_mode) == 'undefined' && typeof(imonomy_no_ab_test_mode) == 'undefined' && imonomy.tracker.getOrSetFullTrackSession()){
var random_mode = Math.random();
if (random_mode >= 0.5){
perform = false;
}
}
imonomy.utils.setCookie("perform", perform, null, '/');
} else {
perform = perform_cookie == "true";
}
imonomy.tracker.perform_session = perform;
}
return imonomy.tracker.perform_session;
},
track: function (scenario, data, create_sid) {
if (typeof(data) == 'undefined'){
data = '';
}
if (typeof(create_sid) == 'undefined'){
create_sid = false;
}
scenario = imonomy.tracker.trackPrefix + scenario;
var fixed_data = "&sid=" + imonomy.tracker.sessionId() + "&bt=" + imonomy.utils.browser.type() + "&ctxu=" + escape(window.location + '');
if (typeof(imonomy.global_settings) != 'undefined'){
fixed_data = fixed_data + "&pid=" + imonomy.layer.get_sid()
} else {
if (imonomy.tracker.PartnerId != null){
fixed_data = fixed_data + "&pid=" + imonomy.tracker.PartnerId
}
}
if (imonomy.tracker.full){
fixed_data = fixed_data + "&full=true";
}
// inorder to know what was the container and the action while the scenario
if (imonomy.tracker.track_container_type != null)
fixed_data = fixed_data + "&im_cnt=" + imonomy.tracker.track_container_type;
if (imonomy.tracker.track_image_action != null)
fixed_data = fixed_data + "&im_cnt=" + imonomy.tracker.track_image_action;
if (imonomy.tracker.track_google && typeof (_gaq) != 'undefined'){
if (data == '' || data == null || typeof(data) == 'undefined' ){
data = 'Click';
}
_gaq.push(['_trackEvent', scenario, data]);
}
var url = imonomy.tracker.track_url;
if (create_sid){
url = imonomy.tracker.track_url_sid;
}
if (url && url != '') {
source = imonomy.tracker.host;
url += "?source=" + escape(source) + "&scenario=" + escape(scenario) + fixed_data + data;
var script = document.createElement("script");
script.setAttribute("type", "text/javascript");
script.setAttribute("src", url);
script.src = url;
if (document.body) {
document.body.appendChild(script);
}
}
},
track_element_internal: function(element, matches, track_outgoing){
var classesCombined = "";
if (matches != null) {
classesCombined = matches.join("|").replace(imonomy.tracker.trackPrefix, "");
}
try {
var href = element.href;
if (href == null || href == "") {
href = window.location.href;
}
if (classesCombined != "") {
if (classesCombined.indexOf('#') > 0) {
var mySplitResult = classesCombined.split("#");
classesCombined = mySplitResult[0];
label = mySplitResult[1];
}
} else{
classesCombined = "link"
}
var data = 'Click';
if (track_outgoing){
should_track = true;
var dest_url = element.href;
var linkClass = element.className;
var linkHostname = element.hostname;
var host = window.location.host;
var is_outgoing = (linkHostname != host) ? "true" : "false";
data = "&ogl=" + is_outgoing + "&durl=" + escape(dest_url);
}
imonomy.tracker.track(classesCombined, data);
} catch (e) { }
return true;
},
trackElement: function(element, track_outgoing){
var linkClass = element.className;
var linkHostname = element.hostname;
var host = window.location.host;
var should_track = false;
var matches = null;
if (linkClass != null && typeof(linkClass) != 'undefined'){
matches = linkClass.match(imonomy.tracker.trackPattern);
// trck only out gooing links
if (matches != null || linkHostname != host) {
should_track = true;
}
}
if (typeof(track_outgoing) != 'undefined' && track_outgoing){
should_track = true;
}
if (should_track){
if (element.addEventListener) {
element.addEventListener('mousedown', function(e) {imonomy.tracker.track_element_internal(element, matches, track_outgoing)}, false);
// Bad citizens.
} else if (element.attachEvent) {
element.attachEvent('onmousedown', function() {imonomy.tracker.track_element_internal(element, matches, track_outgoing)});
} else{
element.onmousedown = function() {imonomy.tracker.track_element_internal(element, matches, track_outgoing)};
}
}
},
trackLinks: function(jqElement, track_outgoing) {
var selector = null;
if (jqElement == null) {
var elements = document.getElementsByTagName("a");
for (var i = elements.length - 1; i >= 0; i--)
{
imonomy.tracker.trackElement(elements[i], track_outgoing);
}
} else {
selector = jqElement;
selector.each(function () {
imonomy.tracker.trackElement(this, track_outgoing);
});
}
}
}
imonomy.page = {
stop_words : new Array("a","about","above","across","after","afterwards","again","against","all","almost","alone","along","already","also","although","always","am","among","amongst","amoungst","amount","an","and","another","any","anyhow","anyone","anything","anyway","anywhere","are","aren't","around","as","at","be","became","because","become","becomes","becoming","been","before","beforehand","being","below","beside","besides","between","beyond","both","bottom","but","by","call","can","cannot","cant", "can't", "co","con","could","couldnt","de","describe","detail","do","done","down","due","during","each","eg","eight","either",                            "else","elsewhere","empty","enough","etc","even","ever","every","everyone","everything","everywhere","except","few","first","for","former","formerly", "found","from","front","full","further","get", "go","had","has","hasnt","have","he","hence","her","here","hereafter","hereby","herein","hereupon","hers","herself","him","himself","his","how","however","i","ie","if","in","indeed","into","is","isn't","it","its","itself","keep","last","latter","latterly","least","less","made","many","may","me","meanwhile","might","mill","mine","more","moreover","most","mostly","much","must","my","myself","name","namely","neither","never","nevertheless","next","no","nobody","none","noone","nor","not","nothing","now","nowhere","of","off","often","on","once","only","onto","or","other","others","otherwise","our","ours","ourselves","out","over","per","perhaps","rather","re","same","seem","seemed","seeming","seems","serious","several","she","should","since","sincere","so","some","somehow","someone","something","sometime","sometimes","somewhere","still","such","take","than","that","the","their","them","themselves","then","thence","there","thereafter","thereby","therefore","therein","thereupon","these","they","thick","thin","third","this","those","though","through","throughout","thru","thus","to","together","too","top","toward","towards","un","under","until","up","upon","us","very","via","was","we","well","were","what","whatever","when","whence","whenever","where","whereafter","whereas","whereby","wherein","whereupon","wherever","whether","which","while","whither","who","whoever","whole","whom","whose","why","will","with","within","without","would","yet","you","your","yours","yourself","yourselves","com","de","en","la","und","www","",">","|","dont", "didn't", "did", "new", "old","does", "doesn't", "cause", "causes",  "for", "you're", "don't", "don`t", "cancel", "2nd", "it's", "used", "frequent", "things", "list", "best", "news", "pro", "reviews", "review","cheap", "2013","thing", "reason", "reasons", "mean", "means", "matter", "span", "quality", "you", "hey", "you'll", "we'll", "I'll", "+", "i`m", "i'm", ".", ",", "?", "-", "(", ")", ":", "&"),
servLogged: false,
version: 2,
getParameterByName: function(name) {
name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
results = regex.exec(location.search);
return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
},
LogServ: function(){
return;
try{
if (imonomy.page.servLogged){
return;
}
imonomy.page.servLogged = true;
// log only 20%
if ((Math.random()*100) > 20){
return;
}
var please_test = ["googletagservices.com/tag/js/gpt.js", "/doubleclick/dartiframe.html", "google_unit_client","googletag.cmd", "truste.com", "visualrevenue.com", "lingospot.com", "itunes.apple.com" , "outbrain.com", "linkedin.com", "taboola.com", "gravity.com", "nrelate.com", "zedo.com", "wallstcheatsheet.com", "disqus.com", "addthis.com", "nr_related_placeholder"]
network_word = imonomy.page.WordChecker(please_test,true, false, false);
var unit_id = "988";
if (network_word == false){
unit_id = "989";
network_word = "";
}
var unit_code_url = imonomy.utils.protocol() +'//srv.imonomy.com/internal/reporter?v=2&subid=' + network_word + '&format=1&ai=' + unit_id + "&ctxu=" + escape(document.location);
imonomy.utils.issue_unit_request(unit_code_url, undefined, true);
} catch(e){}
},
should_track: null,
trackServ_groups: {},
trackServ: function(track_id, group, cid, sub_id, uid){
if (imonomy.page.should_track == null){
imonomy.page.should_track = true;
}
if (!imonomy.page.should_track){
return;
}
try{
not_first = "false";
if (group){
if (group in imonomy.page.trackServ_groups){
not_first = "true";
} else{
imonomy.page.trackServ_groups[group] = "1";
}
}
if (!cid){
cid = "";
}
if (!sub_id){
sub_id = imonomy.layer.get_sub_id();
}
if (group == "shown" && imonomy.settings.tracking_show_url && imonomy.settings.tracking_show_url != ""){
//imonomy.utils.injectScript(imonomy.settings.tracking_show_url);
imonomy.utils.injectImage(imonomy.settings.tracking_show_url);
}
var unit_code_url = imonomy.utils.protocol() +'//srv.imonomy.com/internal/reporter?v=2&subid=' + sub_id + '&format=0&ai=' + track_id + "&ctxu=" + escape(document.location)+'&fb=' + not_first + "&cid=" + cid + '&cbs=' + Math.random();;
if (uid){
unit_code_url = unit_code_url + "&uid=" + uid;
}
imonomy.utils.issue_unit_request(unit_code_url, undefined, true);
} catch(e){}
},
WordChecker: function(check_list, return_word, return_count, should_split, check_top, doc){
var doc_to_use = document;
if (doc){
doc_to_use = doc;
}
try{
if (typeof(check_list) == 'undefined' || check_list == null){
if (return_word){
return "check_list-na";
} else{
return false;
}
}
var counter = 0;
var splited_blacklist = check_list;
if (should_split){
var splited_blacklist = check_list.split(",");
}
var full_html = doc_to_use.documentElement.outerHTML || new XMLSerializer().serializeToString(doc_to_use.documentElement);
for (var i = 0; i < splited_blacklist.length; i++) {
var str = new RegExp("\\b" + splited_blacklist[i].replace("(", "\\(").replace(")", "\\)").replace(".", "\\.").replace("+", "\\+") + "\\b", "i");
if (str.test(full_html)){
if (return_count){
counter = counter + 1;
} else{
if (return_word){
return splited_blacklist[i];
} else {
return true;
}
}
}
}
if (return_count){
return counter;
} else{
if (check_top & window.top != window){
return imonomy.page.WordChecker(check_list, return_word, return_count, should_split, false, window.top.document)
} else{
if (return_word){
return "na";
} else{
return false;
}
}
}
} catch(e){
if (return_count){
return 1000;
} else{
if (return_word){
return "exception-w-" + e.message;;
} else {
return true;
}
}
}
},
host_blacklisted: null,
blacklisted: null,
isContainsBlackListWord: function(return_word){
try{
if (imonomy.settings.blacklist){
if (imonomy.page.host_blacklisted == null || return_word){
var location_black_words = ["xxx","porn", "fuck", "xvideo", "sex", "shemale","gangbang","blowjob","femdom","cougar","lesbian","boner","tranny", "nude", "bitch", "pussy", "swingers", "hentai", "horny", "playboy", "gloryhole", "cowgirl", "gonzo", "dogging", "naked", "teen"];
var host = document.location + "";
for (var i = 0; i < location_black_words.length; i++) {
var str = new RegExp(location_black_words[i].replace("(", "\\(").replace(".", "\\.").replace("+", "\\+"), "i");
if (str.test(host)){
imonomy.page.host_blacklisted = true;
if (return_word){
return location_black_words[i]+"(d)";
} else {
return true;
}
}
}
var host_black_words = ['xxx', 'porn', 'fuck', 'xvideo', 'sex', 'shemale', 'gangbang', 'blowjob', 'femdom', 'cougar', 'lesbian', 'boner', 'tranny', 'nude', 'bitch', 'pussy', 'swingers', 'hentai', 'horny', 'playboy', 'gloryhole', 'cowgirl', 'gonzo', 'dogging', 'naked', 'xx', '69', 'teen', 'slut', 'gay', 'erotic', 'fetish', 'adult', 'escort', 'asain', 'erotik', 'spank', 'bbw', 'swing', 'erohtica', 'cock', 'busty', 'bdsm', 'babes', 'stripteas', 'naughty', 'seks', 'dominio', 'milf', 'stripper', 'putas', 'bang', 'cheating', 'hookup', 'amateur', 'nipple', 'panties', 'bondage', 'suck', 'hairy', 'boobs', 'whore', 'nudist'];
var host = document.location.host;
if (host && host != null){
for (var i = 0; i < host_black_words.length; i++) {
var str = new RegExp(host_black_words[i].replace("(", "\\(").replace(".", "\\.").replace("+", "\\+"), "i");
if (str.test(host)){
imonomy.page.host_blacklisted = true;
if (return_word){
return host_black_words[i]+"(h)";
} else {
return true;
}
}
}
}
}
if (imonomy.page.host_blacklisted && !return_word)
return imonomy.page.host_blacklisted;
if (document.readyState === "complete" && !return_word){
if (imonomy.page.blacklisted == null){
imonomy.page.blacklisted = imonomy.page.WordChecker(imonomy.settings.blacklist,false, false, true, true);
}
return imonomy.page.blacklisted;
}
return imonomy.page.WordChecker(imonomy.settings.blacklist,return_word, false, true, true);
} else{
return true;
}
if (return_word){
return "blacklist-na";
} else {
return false;
}
} catch(e){
if (return_word){
return "exception-b-" + e.message;
} else {
return true;
}
}
},
getElementsByClassNameIEWay: function(className, checkdoc){
// For IE
if (checkdoc.all) {
var allElements = checkdoc.all;
} else {
var allElements = checkdoc.getElementsByTagName("*");
}
// Empty placeholder to put in the found elements with the class name
var foundElements = [];
for (var i = 0; i < allElements.length; i++) {
if (allElements[i].className == className) {
foundElements[foundElements.length] = allElements[i];
}
}
return foundElements;
},
getElementsByClassName: function(className, checkdoc){
if (typeof(checkdoc) == 'undefined'){
checkdoc = document;
}
if (checkdoc.getElementsByClassName){
try{
return checkdoc.getElementsByClassName(className);
}catch(e){
return imonomy.page.getElementsByClassNameIEWay(className, checkdoc)
}
} else {
return imonomy.page.getElementsByClassNameIEWay(className, checkdoc)
}
},
title: function(){
if (imonomy.site){
var site_title = imonomy.site.title();
if (site_title != null){
return site_title;
}
}
var title_element = imonomy.page.getElementsByClassName('firstHeading');
if (title_element != null && typeof (title_element) != 'undefined' && title_element.length > 0){
title_element = title_element[0].getElementsByTagName("span");
if (title_element != null && typeof (title_element) != 'undefined' && title_element.length > 0){
var title = title_element[0].innerHTML.toLowerCase();
title = title.replace("file:", "");
return title;
}
}
return document.title;
/*var title = "";
// if ('{ { title_selector } }' != "auto_select"){should send an error message
var title_element_for_check = $imoj(".post-title a, .entry-title a, .fw-title a, .blogHeader a");
if (typeof (title_element_for_check) != 'undefined' && title_element_for_check != null && title_element_for_check.length > 1){
for (var i = 0; i < title_element_for_check.length; ++i) {
if (title_element_for_check[i].href == imonomy.page.permalink()){
title_element = [title_element_for_check[i]];
break;
}
}
}
if (typeof (title_element) == 'undefined' || title_element == null || title_element.length == 0 || title_element.length > 1){
title_element = $imoj(".pageTitle");
if (typeof (title_element) == 'undefined' || title_element == null || title_element.length == 0){
title_element = $imoj(".post-title, .entry-title, .fw-title, .blogHeader");
if (typeof (title_element) != 'undefined' && title_element != null && title_element.length > 1){
title_element = null;
}
if (typeof (title_element) == 'undefined' || title_element == null || title_element.length == 0){
h12_title_element = $imoj("h1:not(.w-header-text-container), h2:not(.w-header-text-container)");
if (typeof (h12_title_element) != 'undefined' || h12_title_element != null && h12_title_element.length > 0){
doc_title_text = document.title;
for (var i = 0; i < h12_title_element.length; ++i) {
var text = $imoj(h12_title_element[i]).text();
text= text.replace(String.fromCharCode(160), ' ');
if (doc_title_text.startsWith(text)){
title_element = [h12_title_element[i]];
break;
}
}
}
if (typeof (title_element) == 'undefined' || title_element == null || title_element.length == 0){
title_element = $imoj("h1:not(.w-header-text-container)");
if (typeof (title_element) == 'undefined' || title_element == null || title_element.length == 0 || title_element.length > 1){
title_element = null;
}
}
}
}
}
if (typeof (title_element) != 'undefined' && title_element != null && title_element.length > 0)
title = imonomy.utils.clearText($imoj(title_element[0]).text());
else{
title = document.title;
}
return title*/
},
domain: function(){
var domain = document.location.host;
domain = domain.replace("www.", "")
return domain
},
checkValidContentToUse: function(content){
wordscount = content.split(" ").length;
if (wordscount > 3){
return true;
}
else if (wordscount == 1){
return false;
}
else {
content = content.toLowerCase()
if (content.indexOf("comment") > -1){
return false;
}
if (content.indexOf("share") > -1){
return false;
}
if (content.indexOf("most ") > -1){
return false;
}
if (content.indexOf("popular ") > -1){
return false;
}
if (content.indexOf("more from") > -1){
return false;
}
if (content.indexOf("trending") > -1){
return false;
}
if (content.indexOf(" now") > -1){
return false;
}
if (content.indexOf("today") > -1){
return false;
}
return true;
}
},
page_content: null,
content: function(){
if (imonomy.page.page_content == null){
var content = ""
var content_element = null;
var elements = document.getElementsByTagName('h1');
if (elements.length == 1){
for (var i = 0; i < elements.length; ++i) {
var new_contnet = imonomy.page.getText(elements[i]);
wordscount = new_contnet.split(" ").length;
if (wordscount > 3){
if (imonomy.page.checkValidContentToUse(new_contnet)){
content = content + " " + new_contnet;
}
}
}
}
var elements = document.getElementsByTagName('h2');
if (elements.length < 5){
for (var i = 0; i < elements.length; ++i) {
var new_contnet = imonomy.page.getText(elements[i]);
if (imonomy.page.checkValidContentToUse(new_contnet)){
content = content + " " + new_contnet;
}
}
}
elements = document.getElementsByTagName('h3');
if (elements.length < 5){
for (var i = 0; i < elements.length; ++i) {
var new_contnet = imonomy.page.getText(elements[i]);
if (imonomy.page.checkValidContentToUse(new_contnet)){
content = content + " " + new_contnet;
}
}
}
if (content.length < 10){
elements = document.getElementsByTagName('b');
if (elements.length < 8){
for (var i = 0; i < elements.length; ++i) {
var new_contnet = imonomy.page.getText(elements[i]);
if (imonomy.page.checkValidContentToUse(new_contnet)){
content = content + " " + new_contnet;
}
}
}
}
if (content.length < 10){
elements = document.getElementsByTagName('strong');
if (elements.length < 8){
for (var i = 0; i < elements.length; ++i) {
var new_contnet = imonomy.page.getText(elements[i]);
if (imonomy.page.checkValidContentToUse(new_contnet)){
content = content + " " + new_contnet;
}
}
}
}
if (content.length < 4){
return content;
} else {
imonomy.page.page_content = content.truncate(200);
}
}
return imonomy.page.page_content;
},
metadata: function(name){
var category = null;
g_metadata = document.getElementsByTagName("meta");
var len = g_metadata.length;
for (var i = 0; i < len; i++) {
if (g_metadata[i].name.toLowerCase() == name) {
category = g_metadata[i].content.toLowerCase();
break;
}
}
return category
},
getText: function(element) {
var text = [];
var self = arguments.callee;
var el, els = element.childNodes;
var excluded = {
'noscript': 'noscript',
'script': 'script',
'select': 'select',
'option': 'option',
'textarea': 'textarea',
'style': 'style'
};
var bytes = 0;
/* If working with XML, add nodeType 4 to get text from CDATA nodes */
for (var i = 0, iLen = els.length; i < iLen; i++) {
el = els[i];
/* May need to add other node types here */
if (el.nodeType == 1 && !(el.tagName.toLowerCase() in excluded)) {
if (el.nodeName in {'#text':'','A':'', 'P':'','SPAN':'','OL':'','UL':'','LI':'','EM':'','B':'','STRONG':'','FONT':'','H1':'','H2':'','H3':'','H4':'','H5':'','CENTER':'','BLOCKQUOTE':'', 'I':''}){
text.push(self(el));
}
} else if (el.nodeType == 3) {
/* Deal with extra whitespace and returns in text here. */
text.push(el.data.replace(/\n/g, " "));
} else {
// text.push(el.data);
// writeLog(1,'getText: skip nt='+el.nodeType+' data=['+el.data+']');
}
}
return text.join('');
},
search_term: function(){
var host = imonomy.page.domain();
if (host.indexOf("search.") > -1 || (document.location+"").indexOf("/search") > -1 || (document.location+"").indexOf("?q=") > -1 || (document.location+"").indexOf("&q=") > -1){
var q_val = imonomy.page.getParameterByName("q");
if (q_val != null){
q_val = q_val.trim();
if (q_val.length > 0){
return q_val;
}
}
var input_element = document.getElementsByTagName("input");
if (input_element != null && typeof (input_element) != 'undefined' && input_element.length > 0){
for (var i = 0; i < input_element.length; i++) {
if (typeof (input_element[i]) != 'undefined'){
if ((input_element[i].type == "text" || input_element[i].type == "search")){
var search_term = input_element[i].value;
if (search_term.length > 0 && input_element[i].placeholder != search_term && input_element[i].defaultValue != search_term){
search_term = search_term.trim();
if (search_term.length > 0){
return search_term;
}
}
}
}
}
}
}
return null;
},
keywords: function(){
if (imonomy.utils.keywords_words != null){
return imonomy.utils.keywords_words;
}
var category = null;
var start_i = 0;
var category_element = null;
var auto_select = true;
var keywords = new Array();
var host = imonomy.page.domain();
if (host.indexOf("youtube.com") > -1){
imonomy.utils.keywords_words_usemeta = false;
}
var search_term = imonomy.page.search_term();
if (search_term != null){
if (search_term.split(" ").length < 4){
keywords[keywords.length] = search_term;
}
search_term = search_term.replace(/\./g, " ").replace(/\;/g, " ").replace(/\:/g, " ").replace(/\,/g , " ").replace(/\?/g, " ").replace(/\-/g, " ").replace(/\(/g, " ").replace(/\)/g, " ").replace(/\"/g, " ")
// split text (" " "," "." ";" "?")
var search_term_words = search_term.split(" ");
// for each word check if in stop words
var stop_words = imonomy.page.stop_words;
for (var j = 0; j < search_term_words.length; j++) {
if (stop_words.indexOf(search_term_words[j]) < 0){
keywords[keywords.length] = search_term;
}
}
return keywords.join(", ");
}
else if (host.indexOf("wikipedia") > -1){
category_element = imonomy.page.getElementsByClassName('firstHeading');
if (category_element != null && typeof (category_element) != 'undefined' && category_element.length > 0){
category_element = category_element[0].getElementsByTagName("span");
if (category_element != null && typeof (category_element) != 'undefined' && category_element.length > 0){
keywords[keywords.length] = imonomy.page.getText(category_element[0]).toLowerCase().replace("file:", "").replace(":", " ");
}
}
}
else if (host.indexOf("hotels.com") > -1){
hotel_container = imonomy.page.getElementsByClassName('rd_hotel_header_container');
if (hotel_container != null && typeof (hotel_container) != 'undefined' && hotel_container.length > 0){
category_element = hotel_container[0].getElementsByTagName("h1");
if (category_element != null && typeof (category_element) != 'undefined' && category_element.length > 0){
keywords[keywords.length] = category_element[0].innerHTML.toLowerCase().replace(/(\r\n|\n|\r)/gm,"").replace(/\s+/g," ");
}
}
}
else if (host.indexOf("pinterest.com") > -1){
var h1_elements = document.getElementsByTagName("h1");
if (h1_elements != null && typeof (h1_elements) != 'undefined' && h1_elements.length > 0){
for (var i = start_i; i < h1_elements.length; i++) {
if (typeof (h1_elements[i]) != 'undefined'){
var curr_word = h1_elements[i].innerHTML.toLowerCase();
if (keywords.indexOf(curr_word) < 0){
keywords[keywords.length] = curr_word;
}
}
}
}
var h3_elements = imonomy.page.getElementsByClassName('boardName');
if (h3_elements != null && typeof (h3_elements) != 'undefined' && h3_elements.length > 0){
for (var i = start_i; i < h3_elements.length; i++) {
if (typeof (h3_elements[i]) != 'undefined'){
var curr_word = h3_elements[i].innerHTML.toLowerCase();
if (keywords.indexOf(curr_word) < 0){
keywords[keywords.length] = curr_word;
}
}
}
}
}
else{
var site_keywords = null;
if (imonomy.site){
site_keywords = imonomy.site.keywords();
}
if (site_keywords != null){
for (var i = 0; i < site_keywords.length; i++) {
var curr_word = site_keywords[i];
keywords[keywords.length] = curr_word;
}
} else{
if (category_element == null || typeof (category_element) == 'undefined' || category_element.length == 0){
category_element = imonomy.page.getElementsByClassName('post-labels');
if (category_element == null || typeof (category_element) == 'undefined' || category_element.length == 0){
category_element = imonomy.page.getElementsByClassName('tags');
if (category_element == null || typeof (category_element) == 'undefined' || category_element.length == 0){
category_element = imonomy.page.getElementsByClassName('post-taglist');
}
}
if (category_element != null && typeof (category_element) != 'undefined' && category_element.length > 0){
category_element = category_element[0].getElementsByTagName("a");
}
}
if (category_element != null && typeof (category_element) != 'undefined' && category_element.length > 0){
for (var i = start_i; i < category_element.length; i++) {
if (typeof (category_element[i]) != 'undefined'){
var curr_word = imonomy.page.getText(category_element[i]);
if (keywords.indexOf(curr_word) < 0){
keywords[keywords.length] = curr_word;
}
}
}
}
}
}
//category = imonomy.page.clearText(category);
var max_keywords = 5;
if (keywords.length < max_keywords){
var text = "";
if (host.indexOf("wikipedia") > -1){
var bodyContent = document.getElementById("bodyContent");
if (bodyContent != null && typeof (bodyContent) != 'undefined'){
a_elements = bodyContent.getElementsByTagName("a");
if (a_elements != null && typeof (a_elements) != 'undefined' && a_elements.length > 0){
for (var i = start_i; i < a_elements.length; i++) {
if (typeof (a_elements[i]) != 'undefined'){
if (a_elements[i].href && a_elements[i].href.indexOf("#") == -1 && a_elements[i].href.indexOf("?") == -1 && a_elements[i].href.replace("://","").indexOf(":") == -1 && a_elements[i].href.indexOf("index.php") == -1 && a_elements[i].href.indexOf(document.location) == -1){
if (a_elements[i].innerHTML.indexOf("<") == -1){
text = text + " " + a_elements[i].innerHTML.toLowerCase();
}
}
}
}
}
}
}else if (host.indexOf("pinterest.com") > -1){
a_elements = imonomy.page.getElementsByClassName("pinDescription");
if (a_elements != null && typeof (a_elements) != 'undefined' && a_elements.length > 0){
for (var i = start_i; i < a_elements.length; i++) {
if (typeof (a_elements[i]) != 'undefined'){
text = text + " " + a_elements[i].firstChild.nodeValue.toLowerCase();
}
}
}
} else{
// get title, metadescription, metakeyword, h2, container_text
var meata_keywords = "";
if (imonomy.utils.keywords_words_usemeta){
meata_keywords = imonomy.page.metadata("keywords");
}
var title = imonomy.page.title();
var content = imonomy.page.content();
var text = title + " " + content
if (meata_keywords != null){
text = text + " " + meata_keywords;
}
var meata_description = null;
if (imonomy.utils.keywords_words_usemeta){
meata_description = imonomy.page.metadata("description");
}
if (meata_description != null){
text = text + " " + meata_description;
}
}
text = text.replace(/\./g, " ").replace(/\;/g, " ").replace(/\n/g, " ").replace(/\:/g, " ").replace(/\,/g , " ").replace(/\?/g, " ").replace(/\-/g, " ").replace(/\(/g, " ").replace(/\)/g, " ").replace(/\"/g, " ")
// split text (" " "," "." ";" "?")
text = text.toLowerCase();
var words = text.split(" ");
// for each word check if in stop words
var stop_words = imonomy.page.stop_words;
var start_pair = null;
match_dict = {}
for (var i = 0; i < words.length; i++) {
var word = words[i];
word = word.trim();
// if not in stop words
if (stop_words.indexOf(word) < 0){
// if already start pair
if (start_pair != null){
// make pair and add to dict +2 score
var pair = start_pair + " " + word
if (pair in match_dict){
match_dict[pair] += 1
}
else{
match_dict[pair] = 1.1
}
}
if (word in match_dict){
match_dict[word] += 1
}
else{
match_dict[word] = 1
}
start_pair = word
} else{
start_pair = null;
}
}
function sortObject(obj) {
var arr = [];
for (var prop in obj) {
if (obj.hasOwnProperty(prop)) {
arr.push({
'key': prop,
'value': obj[prop]
});
}
}
arr.sort(function(a, b) { return b.value - a.value; });
//arr.sort(function(a, b) { a.value.toLowerCase().localeCompare(b.value.toLowerCase()); }); //use this to sort as strings
return arr; // returns array
}
match_dict = sortObject(match_dict);
var words_check_count = max_keywords - keywords.length;
if (words_check_count > match_dict.length)
words_check_count = match_dict.length;
for (var i = 0; i < words_check_count; i++) {
var curr_word = match_dict[i].key;
if (curr_word.length > 1 && keywords.indexOf(curr_word) < 0){
keywords[keywords.length] = curr_word;
}
}
// sort dict
// take upto 5 keywords
// if all keywords has value 1 take only from title
}
imonomy.utils.keywords_words = keywords.join(", ")
return imonomy.utils.keywords_words;
}
}
imonomy.image = {
max_size: 850,
share_unit_sizes: ["300_250", "300_239"],
mouse_enter_sender: null,
mouse_enter_timeout : null,
first_hover: true,
current_sender: null, // used in order to avoid hide+show when moving from layer to image
last_current_sender: null,
share_unit_networks_domain : ["googlesyndication.com", "doubleclick.net", "chitika.net", "adbrite.com", "advertising.com", "247realmedia.com", "commission-junction.com", "kanoodle.com", "openx.com", "valueclick.com", "content.yieldmanager.edgesuite.net", "2mdn.net", "mediaplex.com", "serving-sys.com", "BannerSource.asp", "fmpub.net", "adnxs.com", "fastclick.net", "buysellads.com", "solvemedia.com", "linkwi.se", "atwola.com", "shareasale.com", "turn.com", "2mdn.net", "singlehop.com", "tqlkg.com", "glam.com", "ads.yldmgrimg.net", "twitter.com", "cdn.contentclick"],
share_unit_networks_keywords : ["\/linkshare\/", "\/adserv\/", "\/viewad\/", "\/pagead\/", "\/banners\/", "bannerid="],
share_unit_networks_ad_size : [[468,60],[728,90],[336,280],[300,250],[250,250],[728,210],[720,300],[500,350],[550,480],[300,600]], // known units ad sizes
share_offers_networks:["mgid.com", "outbrain.com", "engageya", "contentclick"],
_findPos: function(obj) {
var curleft = curtop = 0;
var cur_height = cur_width = 0;
var chage_left = 0;
// fix bug with offset use only integers with out frec
//if (imonomy.utils.browser.browser_type == "Firefox"){
var rectObject = null;
if (obj.getBoundingClientRectRigth){
rectObject = obj.getBoundingClientRectRigth();
} else{
rectObject = obj.getBoundingClientRect();
}
var viewportElement = document.documentElement;
var docBody = document.body;
var style_body = (docBody.currentStyle || window.getComputedStyle(docBody, null));
curleft = rectObject.left + (window.pageXOffset || viewportElement.scrollLeft || docBody.scrollLeft || 0);
if(imonomy.settings.img_position_fixed){
var current = obj;
while (current.parentNode && current.tagName != "HEADER" && current.tagName != "BODY"){
current = current.parentNode
if(window.getComputedStyle(current, "position").position == "fixed"){
curtop = rectObject.top;
break;
} else{
curtop = rectObject.top + (window.pageYOffset || viewportElement.scrollTop || docBody.scrollTop || 0);
}
}
}else{
curtop = rectObject.top + (window.pageYOffset || viewportElement.scrollTop || docBody.scrollTop || 0);
}
if (style_body && style_body.position == "relative") {
if (!imonomy.utils.isIE() && (imonomy.utils.browser.type() != "Firefox")){ // set viewport per browser type
viewportElement = document.body;
curtop = curtop - (docBody.getBoundingClientRectRigth().top + viewportElement.scrollTop);
curleft = curleft - (docBody.getBoundingClientRectRigth().left + viewportElement.scrollLeft); //need to test this action
} else {
viewportElement = document.documentElement;
curtop = curtop - (docBody.getBoundingClientRectRigth().top + viewportElement.scrollTop);
curleft = curleft - (docBody.getBoundingClientRectRigth().left + viewportElement.scrollLeft); //need to test this action
}
}
cur_width = rectObject.width;
cur_height = rectObject.height;
return {top: curtop, left: curleft , width: cur_width, height: cur_height}
// } else {
// var floor_left = Math.round(rectObject.left)
// if (floor_left != rectObject.left && obj.offsetLeft > 0){
// if (floor_left > rectObject.left){ // check for
// chage_left = (floor_left - rectObject.left);
// } else {
// chage_left = (rectObject.left - floor_left);
// }
// }
// curleft = chage_left;
// if (obj.offsetParent) {
// do {
// curleft += obj.offsetLeft;
// curtop += obj.offsetTop;
// } while (obj = obj.offsetParent);
// }
// var body_computed_style= window.getComputedStyle(document.body, null)
// var computedStylePos = "";
// if (body_computed_style){
// computedStylePos = body_computed_style.position;
// }
// if (!imonomy.utils.isIE() && computedStylePos != 'relative'){
// html_margin_top = window.getComputedStylePropertyValue(document.documentElement, 'margin-top');
// var html_margin_top = parseInt(html_margin_top)
// curtop += html_margin_top;
// }
// }
// }
// catch(e){};
// return { top: curtop, left: curleft };
},
checkParentsFloat: function(img){
var floating = "null";
while(img && img != img.parentElement && img.tagName != "BODY") {
floating = window.getComputedStyle(img, "float").float;
if(floating != "null"){return false};
img = img.parentElement;
}
return true;
},
_getImgSize: function(img, ignore_visibility_forshow){
var pos = imonomy.image._findPos(img),
width = img.clientWidth,
height = img.clientHeight,
left = 0,
top = 0,
border_top = 0,
border_left = 0,
border_bottom = 0,
border_rigth = 0,
isOverflowSetToHidden = false,
style = (img.currentStyle || window.getComputedStyle(img, null))
if(!isNaN(parseInt(style.border))){
border_top = parseInt(style.border);
border_left = parseInt(style.border);
}
if(!isNaN(parseInt(style.borderTop))){
border_top = parseInt(style.borderTop);
} else if(!isNaN(parseInt(style.borderTopWidth))){
border_top = parseInt(style.borderTopWidth);
}
if(!isNaN(parseInt(style.borderLeft))){
border_left = parseInt(style.borderLeft);
} else if(!isNaN(parseInt(style.borderLeftWidth))){
border_left = parseInt(style.borderLeftWidth);
}
if(!isNaN(parseInt(style.borderRigth))){
border_rigth = parseInt(style.borderRigth);
} else if(!isNaN(parseInt(style.borderRightWidth))){
border_rigth = parseInt(style.borderRightWidth );
}
if(!isNaN(parseInt(style.borderBottom))){
border_bottom = parseInt(style.borderBottom);
} else if(!isNaN(parseInt(style.borderBottomWidth))){
border_bottom = parseInt(style.borderBottomWidth );
}
var padding_left = 0;
if(!isNaN(parseInt(style.paddingLeft))){
padding_left = parseInt(style.paddingLeft);
border_left += padding_left;
}
var padding_right = 0;
if(!isNaN(parseInt(style.paddingRight))){
padding_right = parseInt(style.paddingRight);
}
var padding_top = 0;
if(!isNaN(parseInt(style.paddingTop))){
padding_top = parseInt(style.paddingTop);
border_top += padding_top;
}
var padding_bottom = 0;
if(!isNaN(parseInt(style.paddingBottom))){
padding_bottom = parseInt(style.paddingBottom);
}
if(img.style.left){
left = img.style.left;
}
if(img.style.top){
top = img.style.top;
}
var shown = true,
parent = img,
overflow_top = pos.top,
overflow_left = pos.left,
offset = 0,
img_rect = img.getBoundingClientRectRigth(),
img_x = img_rect.left,
img_y = img_rect.top,
img_offsetWidth = img.offsetWidth,
parent_rect = parent.getBoundingClientRectRigth(),
max_width_parent = parent.clientWidth,
parent_x = parent_rect.left,
parent_y = parent_rect.top,
visible_width = parent.clientWidth,
visible_height = parent.clientHeight,
VISIBLE_PADDING = 2,
offset = parent.offsetLeft
while(parent && parent != parent.parentElement) {
if(imonomy.settings.pid == "14567723972" && parent.tagName != "BODY"){
break;
}
if (parent.style.opacity == "0"){
shown = false;
}
if (parent && window.getComputedStyle){
var alignText = "";
var overflow = "";
var computed_style = window.getComputedStyle(parent,null);
if (computed_style != null){
if(parent.parentElement != null){
if(parent.parentElement.tagName == "BODY" && parent.offsetTop < document.body.offsetTop){
shown = false;
}
}
overflow = window.getComputedStyle(parent,null).getPropertyValue("overflow");
if (overflow == "hidden"){
var parent_computed_style = window.getComputedStyle(parent,null)
alignText = parent_computed_style.getPropertyValue("text-align");
float_parent = window.getComputedStyle(parent, "float").float;
///////////////////////////////////////////////////////////////
// TBD should fix bug when overfllow parent is bigger than self
///////////////////////////////////////////////////////////////
if (alignText == 'center') {
pos = imonomy.image._findPos(parent);
}
parent_rect = parent.getBoundingClientRectRigth();
parent_x = parent_rect.left;
parent_y = parent_rect.top;
isOverflowSetToHidden = true;
if (parent.clientWidth > 0 && parent.clientWidth > max_width_parent){
max_width_parent = parent.clientWidth;
}
if (parent.clientWidth > 0 && parent.clientWidth < visible_width){
visible_width = parent.clientWidth;
pos = imonomy.image._findPos(parent);
overflow_left = pos.left;
if(!isNaN(parseInt(parent_computed_style.borderLeft))){
border_left += parseInt(parent_computed_style.borderLeft);
} else if(!isNaN(parseInt(parent_computed_style.borderLeftWidth))){
border_left += parseInt(parent_computed_style.borderLeftWidth);
}
}
if (parent.clientHeight > 0 && parent.clientHeight < visible_height){
visible_height = parent.clientHeight;
pos = imonomy.image._findPos(parent);// set heigth and top with overflow hidden
overflow_top = pos.top;
if(!isNaN(parseInt(parent_computed_style.borderTop))){
border_top += parseInt(parent_computed_style.borderTop);
} else if(!isNaN(parseInt(parent_computed_style.borderTopWidth))){
border_top += parseInt(parent_computed_style.borderTopWidth);
}
}
if (offset + visible_width < 0 || (offset >= parent.offsetWidth && imonomy.image.checkParentsFloat(img))){
shown = false;
}
// a fix for slid galleries when only one image is shown
if (parent_y == img_y && (parent_x + max_width_parent < img_x && img_x > parent_x)){
shown = false;
}
//-- If the target element is to the left of the parent elm
if(offset + img_offsetWidth - VISIBLE_PADDING < parent.scrollLeft){
shown = false;
}
}
}
}
if (parent.offsetParent === parent.parentElement && parent.parentElement != null){
offset = offset + parent.parentElement.offsetLeft;
}
parent = parent.parentElement;
}
if (offset < 0-(visible_width/2)){
shown = false;
}
if(visible_width>img.clientWidth){
visible_width = img.clientWidth;
}
if(visible_height>img.clientHeight){
visible_height = img.clientHeight;
}
if ( (padding_left > 0 || padding_right > 0) && visible_width > width - (padding_left + padding_right) && img.tagName == 'IMG' ){
visible_width = width - (padding_left + padding_right);
}
if ( (padding_top > 0 || padding_bottom > 0) && visible_height > height - (padding_top + padding_bottom) ){
visible_height = height - (padding_top + padding_bottom);
}
var actual_left = overflow_left;
var actual_top = overflow_top;
// if (isOverflowSetToHidden){
// actual_left = overflow_left + border_left ;
// actual_top = overflow_top + border_top;
// } else {
// actual_left = pos.left;
// actual_top = pos.top
// }
if(!ignore_visibility_forshow && window.getComputedStylePropertyValue(img, 'visibility') == 'hidden'){
shown = false;
}
if(!ignore_visibility_forshow && visible_width==0 && visible_height==0){
shown = false;
}
if(left>visible_width){
shown = false;
}
if(top>visible_height){
shown = false;
}
var scroll_left = imonomy.utils.getScrollLeft();
var scroll_top = imonomy.utils.getScrollTop();
var image_portion = visible_height - 150;
if (image_portion < 0) image_portion = visible_height * 0.7
var element_position = window.getElementPosition(img)
if (element_position != 'fixed'){ // check scroll location only when position is not fixed
if(actual_top <= (scroll_top+ imonomy.utils.getHeight()) && (actual_top+image_portion)>=scroll_top){
}else{
shown = false;
}
}
if (visible_width > img.width || pos.width > img.width ){ // check if img has border and padding box inculded (visible_width = img.clintwidth) can set check visible_width - boder = img.width
if (border_left > 0 || border_rigth > 0) {
actual_left = actual_left + border_left;
}
}
if (visible_height > img.height || pos.height > img.height) { //pos.height and pos.width are comming from _findpos function
if (border_top > 0 && border_top != padding_bottom){
actual_top = actual_top + border_top;
}
}
// Fix the pos function to return the inside rect when there is a border (this is border with a fix border (top, left, rigth, bottom))
//if (pos.height > height && border_top != 0) {
// actual_top = actual_top + (pos.height - height)/2;
//}
//if (pos.width > width &ser& border_left != 0) {
// actual_left = actual_left + (pos.width - width)/2;
//}
return [visible_width, visible_height, actual_top, actual_left, shown];
var imgLeft;
var imgPos;
var imgTop;
var imgHeight;
var imgWidth;
if (img) {
imgPos = imonomy.image._findPos(img);
if (typeof(imgPos) != "undefined"){
imgLeft = imgPos.left;
imgTop = imgPos.top;
} else{
imgLeft = img.offsetLeft;
imgTop = img.offsetTop;
/*var rect = img.getBoundingClientRectRigth();
if (typeof(rect) != "undefined"){
imgLeft = rect.left;
imgTop = rect.top;
}*/
}
imgWidth = img.clientWidth;
imgHeight = img.clientHeight;
}
if (typeof(imgWidth) == "undefined"){
if (typeof(img.innerWidth) != 'undefined'){imgWidth = img.innerWidth();
}else {imgWidth = img.clientWidth}
}
if (typeof(imgHeight) == "undefined"){
if (typeof(img.innerHeight) != 'undefined'){imgHeight = img.innerHeight();
} else{imgHeight = img.clientHeight}
}
var parent = img.parentNode;
if (parent && window.getComputedStyle){
var overflow = "";
var computed_style = window.getComputedStyle(parent,null);
if (computed_style != null){
overflow = window.getComputedStyle(parent,null).getPropertyValue("overflow")
}
if (overflow == "hidden"){
parent_width = parent.clientWidth;
if (parent_width < imgWidth){
imgWidth = parent_width;
}
parent_height = parent.clientHeight;
if (parent_height < imgHeight){
imgHeight = parent_height;
}
} else if (parent.nodeName == "A"){
if (parent.clientWidth > 0 && parent.clientWidth < imgWidth){
imgWidth = parent.clientWidth;
}
if (parent.clientHeight > 0 && parent.clientHeight < imgHeight){
imgHeight = parent.clientHeight;
}
}
}
return [imgWidth, imgHeight, imgTop, imgLeft, imgPos]
},
getImageSrc: function(image){
var src = image.getAttribute('data-lazy-src');
if (typeof(src) == 'undefined' || src == null)
src = image.getAttribute('ImageHolder');
if (typeof(src) == 'undefined' || src == null)
src = image.getAttribute('src');
if (typeof(src) == 'undefined' || src == null)
src = image.src;
return src
},
mouseEnter: function(sender){
clearTimeout(imonomy.image.mouse_enter_timeout);
if (imonomy.image.last_current_sender != sender){
if (imonomy.preload){
var value = imonomy.preload.getCookie("imonomy_lpt");
if (value != null){
try{
var splited_value = value.split('$vi$')
if (splited_value.length > 1){
if (splited_value[1] == document.location){
var d = new Date();
var n = d.getTime();
if ((n - parseInt(splited_value[1])) < imonomy.settings.lock_show_between_time){
return false;
}
}
}
}
catch(e){}
}
}
}
if (imonomy.layer.current_mode == "hover" && imonomy.layer.visible && imonomy.image.mouse_enter_sender != sender && (imonomy.image.current_sender == null || imonomy.image.current_sender != sender) ){
// if visible and mode == image and sender is different
// hide imidiatly
if (imonomy.layer.scroll_in_action){
return;
}
// setTimeOut fro show and on timeout check still on the image.
imonomy.image.mouse_enter_sender = sender;
imonomy.layer.hideInternal();
imonomy.image.mouse_enter_timeout = setTimeout(function(){
if (imonomy.image.mouse_enter_sender != null){
imonomy.layer.show(imonomy.image.mouse_enter_sender);
}
}, 80)
} else{
imonomy.image.mouse_enter_sender = sender;
if (imonomy.image.first_hover){
imonomy.layer.show(sender);
imonomy.image.first_hover = false;
} else{
imonomy.image.mouse_enter_timeout = setTimeout(function(){
if (imonomy.image.mouse_enter_sender != null){
imonomy.layer.show(imonomy.image.mouse_enter_sender);
}
}, 40);
}
}
},
mouseLeave: function(e_m){
// check if out to element over the image
if ((typeof(e_m) != 'undefined') && ((typeof(e_m.toElement) != 'undefined') || typeof(e_m.relatedTarget) != 'undefined')) {
if (this && this.getBoundingClientRectRigth){
var rect = this.getBoundingClientRectRigth();
if (typeof(rect) != "undefined"){
if (e_m.clientX > rect.left && e_m.clientX < rect.right && e_m.clientY > rect.top && e_m.clientY < rect.bottom){
var image_element = e_m.toElement || e_m.relatedTarget;
// unbind other elements(wibiya click to share. for example)
imonomy.utils.unbind('mouseover', null, image_element);
imonomy.utils.unbind('mouseout', null, image_element);
imonomy.utils.unbind('mouseenter', null, image_element);
imonomy.utils.unbind('mouseleave', null, image_element);
// bind to mouse enter
imonomy.utils.bind('mouseover', imonomy.layer.mouseEnter, image_element);
imonomy.utils.bind('mouseout', imonomy.layer.mouseLeave, image_element);
imonomy.utils.bind('mouseenter', imonomy.layer.mouseEnter, image_element);
imonomy.utils.bind('mouseleave', imonomy.layer.mouseLeave, image_element);
return;
}
}
}
}
imonomy.image.mouse_enter_sender = null;
clearTimeout(imonomy.image.mouse_enter_timeout);
if (imonomy.layer.current_mode == "hover"){
imonomy.layer.mouseLeave(e_m);
}
}
}
imonomy.global_settings = {
sid: ''
}
imonomy.layer = {
tipInview_Shown : false,
units_array: [],
inView_array:[],
inited: false,
fsgf: "s",
fsgf1: "see",
fsgs1: "VISUAL",
fsgs: "S",
images_found: false,
header_background: "",
header_text_color: "",
min_bottom_space: 10,
bind_scroll: true,
scroll_timer: null,
scroll_interval: 100,
scroll_in_action: false,
scroll_in_action_timer: null,
scroll_element_selector: ".MoreLink, .comments, #comments, #comment, .comment, #comment-list, #commentList, #disqus_thread, .yarpp-related",
visible: false,
hovered: false,
show_onfocus: false,
hide_permanent: [],
current_mode: null,
layer_hide_delay: 1000,
layer_obj: null,
layer_width: 278,
layer_height: 288,
should_hide: false,
hook_image: true,
set_lock_counter: true,
set_gray_lock_counter: true,
flip_hooked_images: 0,
strip_hooked_images: 0,
roll_hooked_images: 0,
cover_max_images: 1,
cover_hooked_images: 0,
tip_hooked_images: 0,
generic_refresh_counter: 0,
total_requests_counter: [],
total_passbacks_counter: [],
elementsCounter: [],
productCounter: [],
binded_images:0,
autoPassBack: function(frame_element){
var check_fyva = frame_element.contentWindow.document.body.getElementsByTagName("DIV"),
check_scripts = frame_element.contentWindow.document.getElementsByTagName("SCRIPT"),
check_iframes = frame_element.contentWindow.document.getElementsByTagName("IFRAME"),
found_main_script = false,
found_va_script = false,
id_index = false,
found_id = false;
if(check_fyva.length > 0){
var get_fyva = check_fyva[0].className;
if(get_fyva == "fyva_noshow" || frame_element == "fyva_container" || frame_element == "chitikaAdContainer"){return;}
}
for(var index=0 ; index < check_scripts.length ; index++){
if(check_scripts[index].src.indexOf(".js") > -1){
found_main_script = true;
}
if(check_scripts[index].innerHTML.indexOf("w.va_sid") > -1){
found_va_script = true;
var id_index = check_scripts[index].innerHTML.indexOf("w.va_curr_unit_id");
if(id_index && !found_id){
var id_number = check_scripts[index].innerHTML.substring(id_index);
id_number = id_number.split("'");
id_number = parseInt(id_number[1]);
found_id = true;
}
}
}
if(!found_main_script && check_iframes.length == 0 && found_va_script){
var pass_url = imonomy.utils.protocol() + '//srv.imonomy.com/script/main.js';
var script = document.createElement('script');
script.setAttribute('type', 'text/javascript');
script.setAttribute('src', pass_url);
frame_element.contentWindow.document.body.appendChild(script);
imonomy.page.trackServ(987, "auto_passback", undefined, undefined, id_number ? id_number : undefined);
frame_element.requested = true;
}
},
incPassbackCounter: function(product){
if(imonomy.layer.total_requests_counter[product] >=0){
imonomy.layer.total_requests_counter[product]+= 1;
}else{
imonomy.layer.total_requests_counter[product]= [];
imonomy.layer.total_requests_counter[product]= 0;
}
},
checkPassbackCode: function(product){
if(imonomy.layer.total_passbacks_counter[product] >=0){
imonomy.layer.total_passbacks_counter[product]+= 1;
}else{
imonomy.layer.total_passbacks_counter[product]= [];
imonomy.layer.total_passbacks_counter[product]= 0;
}
if (imonomy.layer.total_passbacks_counter[product] == imonomy.layer.total_requests_counter[product]){
if (imonomy.settings.passback_code){
imonomy.settings.passback_code(product);
}
}
},
isDescendant: function(parent, child) {
var node = child.parentNode;
while (node != null) {
if (node == parent) {
return true;
}
node = node.parentNode;
}
return false;
},
findSiteImages: function(){
var container_element = null;
// check if container already has image
var image_found = false;
var images = [];
var min_top = imonomy.settings.min_top;
// home page
if (imonomy.utils.isHomePage()){
min_top = 250;
}
var host = imonomy.page.domain();
if (host.indexOf("search.yahoo") > -1){
var imagesBox = imonomy.page.getElementsByClassName('imgdd');
if (imagesBox != null && typeof (imagesBox) != 'undefined' && imagesBox.length > 0){
images[images.length] = imagesBox[0];
}
} else if (host.indexOf("bing.com") > -1){
var imagesBox = imonomy.page.getElementsByClassName('sb_ans');
if (imagesBox != null && typeof (imagesBox) != 'undefined' && imagesBox.length > 0){
images[images.length] = imagesBox[0];
}
} else if (host.indexOf("youtube.com") > -1){
var imagesBox = imonomy.page.getElementsByClassName('video-list-item');
if (imagesBox != null && typeof (imagesBox) != 'undefined' && imagesBox.length > 0){
for (var i = 0; i < imagesBox.length; i++) {
images[images.length] = imagesBox[i];
}
return images;
}
} else if (host.indexOf("vube.com") > -1){
var imagesBox = imonomy.page.getElementsByClassName('video-thumbnail');
if (imagesBox != null && typeof (imagesBox) != 'undefined' && imagesBox.length > 0){
for (var i = 0; i < imagesBox.length; i++) {
images[images.length] = imagesBox[i];
}
}
} else if (host.indexOf("yahoo.com") > -1){
var imagesBox = imonomy.page.getElementsByClassName('cta-overlay');
if (imagesBox != null && typeof (imagesBox) != 'undefined' && imagesBox.length > 0){
for (var i = 0; i < imagesBox.length; i++) {
images[images.length] = imagesBox[i];
}
}
}
var xtraImages = imonomy.site.xtraImages();
if (xtraImages != null){
for (var i = 0; i < xtraImages.length; i++) {
var ximg = xtraImages[i];
if (ximg.checked_byimonomy)
continue;
ximg.checked_byimonomy = true;
images[images.length] = ximg;
}
}
// work around some wird shit that in the first time the jquery return empty list
var imgs = document.getElementsByTagName("img");
use_foce_image = false;
if (imonomy.settings.force_image_selection){
var xtraImages = imonomy.settings.force_image_selection();
if (xtraImages != "skip"){
if (xtraImages != null){
for (var i = 0; i < xtraImages.length; i++) {
var ximg = xtraImages[i];
if (ximg.checked_byimonomy)
continue;
ximg.checked_byimonomy = true;
images[images.length] = ximg;
}
}
use_foce_image = true;
}
}
if (!use_foce_image){
var layer_frame = document.getElementById("imonomy_layer_frame_c")
var max_scan_at_a_time = 100;
var scan_counter = 0;
if (imonomy.settings.use_videos_as_image){
var video_els = imonomy.utils.getVideoPlayers();
// need to sign as video
imgs = [].slice.call(imgs)
for (var index = 0; index < video_els.length; index++) {
var video_el = video_els[index];
video_el.force_imnproduct_type = "strip";
video_el.channel_cid = "vid";
if (video_el.tagName == "IFRAME"){
var url = video_el.src;
if (typeof (url) != 'undefined' && url != null && url.length > 0){
if (url.indexOf("youtube.com/") != -1){
if (url.indexOf("wmode=transparent") == -1){
var key = "wmode";
var value = "transparent";
var kvp = key+"="+value;
url += (url.indexOf("?") > 0 ? '&' : '?') + kvp;
video_el.src = url;
}
}
}
} else{
video_el.setAttribute('name', 'wmode');
video_el.setAttribute('value', 'opaque');
}
video_el.height_offset = 40;
imgs[imgs.length] = video_els[index]
}
}
if(imonomy.settings.add_element_by_classes){
imgs = [].slice.call(imgs);
for (var index in imonomy.settings.add_element_by_classes){
var select_class = imonomy.settings.add_element_by_classes[index];
var selected_images = document.getElementsByClassName(select_class);
for(var images_index = 0; images_index < selected_images.length; images_index++){
var selected_el = selected_images[images_index]
if(!selected_el.skip_src_check){
selected_el.skip_src_check = true;
}
imgs[imgs.length] = selected_el;
}
}
}
for (var index = 0; index < imgs.length; index++) {
var img = imgs[index];
if (img.hooked_byimonomy || (img.checked_byimonomy && img.checked_byimonomy == imonomy.settings.min_size_factor_change))
continue;
scan_counter = scan_counter+1;
if (scan_counter > max_scan_at_a_time){
break;
}
img.checked_byimonomy = imonomy.settings.min_size_factor_change;
if (layer_frame){
if (imonomy.layer.isDescendant(layer_frame,img)){
continue;
}
}
for (var x_index = 0; x_index < images.length; x_index++) {
if (imonomy.layer.isDescendant(images[x_index],img)){
continue;
}
}
var imageUrl = '';
var imageAnchorHref = '';
var imgSize = imonomy.image._getImgSize(img);
var imgWidth = imgSize[0];
var imgHeight = imgSize[1];
if (imgWidth == 0 || imgHeight == 0){
if (img.width > 2){
if (!img.checked_byimonomy_count || img.checked_byimonomy_count < 5){
img.checked_byimonomy = false;
}
if (img.checked_byimonomy_count){
img.checked_byimonomy_count = img.checked_byimonomy_count + 1;
} else{
img.checked_byimonomy_count = 1;
}
continue;
}
}
var imgTop = imgSize[2];
if (imgTop < min_top){
continue;
}
var ratio_factor = 1;
var max_size_factor = 1;
var min_size_factor = 1;
if (container_element == null){
ratio_factor = 0.95;
max_size_factor = 1;
min_size_factor = 1.2;
}
min_size_factor = min_size_factor * imonomy.settings.min_size_factor_change;
if (imgHeight > 150 && imgHeight < 500 && imgWidth > 260 && imgWidth < 700) {
ratio_factor = 1.1
}
var isRatioGood = imgWidth / imgHeight < (imonomy.settings.goodRatio * ratio_factor) && imgWidth / imgHeight > 1 / (imonomy.settings.goodRatio * ratio_factor);
var isSizeGood = (imgWidth >= (imonomy.settings.min_image_size * min_size_factor) || imgHeight >= (imonomy.settings.min_image_size * min_size_factor)) && (imgWidth <= (imonomy.image.max_size * max_size_factor) || imgHeight <= (imonomy.image.max_size * max_size_factor));
for (var i = 0; i < imonomy.image.share_unit_sizes.length; i++) {
var unit_size_width = parseInt(imonomy.image.share_unit_sizes[i].split('_')[0]);
var unit_size_height = parseInt(imonomy.image.share_unit_sizes[i].split('_')[1]);
}
if (imgWidth == unit_size_width && imgHeight == unit_size_height) isSizeGood = false;
var isAdNetwork = false;
var isDomainGood = false;
imageUrl = imonomy.image.getImageSrc(img);
if (typeof(imageUrl) == 'undefined'){
if (img.force_imnproduct_type || selected_el.skip_src_check){
isDomainGood = true;
} else{
isDomainGood = false;
}
} else{
imageTitle = img.title;
if (typeof(img.parentNode) != 'undefined') {
if (img.parentNode.tagName == "A"){
imageAnchorHref = img.parentNode.href;
} else if (typeof(img.parentNode.parentNode) != 'undefined' && img.parentNode.parentNode.tagName == "A"){
imageAnchorHref = img.parentNode.parentNode.href;
}
}
for (var i in imonomy.image.share_unit_networks_domain) {
var currentAdNetworkDomain = imonomy.image.share_unit_networks_domain[i];
if (imageUrl.indexOf(currentAdNetworkDomain) != -1 || imageAnchorHref.indexOf(currentAdNetworkDomain) != -1) isAdNetwork = true;
}
for (var i in imonomy.image.share_unit_networks_keywords) {
var currentAdNetworkKeywords = imonomy.image.share_unit_networks_keywords[i];
if (imageUrl.indexOf(currentAdNetworkKeywords) != -1 || imageAnchorHref.indexOf(currentAdNetworkKeywords) != -1) {
for (var i = 0; i < imonomy.image.share_unit_networks_ad_size.length; i++) {
if ((img.width == imonomy.image.share_unit_networks_ad_size[i][0] && img.height == imonomy.image.share_unit_networks_ad_size[i][1]) || (img.clientWidth == imonomy.image.share_unit_networks_ad_size[i][0] && img.clientHeight == imonomy.image.share_unit_networks_ad_size[i][1])) {
isAdNetwork = true;
break;
}
}
}
}
for (var i in imonomy.image.share_offers_networks) {
var currentAdNetwork = imonomy.image.share_offers_networks[i];
if (imageUrl.indexOf(currentAdNetwork) != -1 || imageAnchorHref.indexOf(currentAdNetwork) != -1){
if (imonomy.settings.validate_offers_networks){
isAdNetwork = true;
}
break;
}
}
if (!isAdNetwork) isDomainGood = true;
}
if (isDomainGood &&isRatioGood && isSizeGood){
if (img.parentNode){
var elements = imonomy.page.getElementsByClassName('thumbnail-overlay', img.parentNode);
if (elements != null && typeof (elements) != 'undefined' && elements.length > 0){
for (var i = 0; i < elements.length; i++) {
if (elements[i] && elements[i].style){
elements[i].style.display = 'none';
}
}
}
}
img.hooked_byimonomy = true;
images[images.length] = img;
}
}
}
return images;
},
bind_image_element: function(image_elements, force_format){
//image.representing = image.selectRepresenting(image_elements);
if (imonomy.layer.hook_image){
var page_force_options = null;
var inView = false;
var dynamic_strip = imonomy.settings.dynamic_strip;
if (imonomy.settings.page_force_options_regex && document.location != null){
for (var index = 0; index < imonomy.settings.page_force_options_regex.length; index++) {
var curr_option_regex = imonomy.settings.page_force_options_regex[index];
var location = document.location + document.location.hash;
var patt = new RegExp(curr_option_regex[0]);
if (patt.test(location)){
page_force_options = curr_option_regex[1];
break;
}
}
}
for (var index = 0; index < image_elements.length; index++) {
var image_element = image_elements[index];
if (!imonomy.utils.hasClass(image_element, 'imonomy_no_layer', true)){
var filter_class = null;
image_element.indexProduct = null;
image_element.bindToProduct = false;
if (imonomy.settings.bind_filter_class) {
filter_class = imonomy.settings.bind_filter_class;
}
if (typeof(imonomy_filter_class) != "undefined") {
filter_class = imonomy_filter_class;
}
if (filter_class != null){
var filter_splited = filter_class.split(' ');
var found_filter = false;
for (var i = 0; i < filter_splited.length; i++) {
if (imonomy.utils.hasClass(image_element, filter_splited[i], true)){
found_filter = true;
continue;
}
}
if (found_filter) continue;
}
if (typeof(imonomy_filter_id) != "undefined" && imonomy.utils.isDescendantFromId(image_element, imonomy_filter_id)){
continue;
}
donot_show_id = "similarproducts_inimg";
if (imonomy.utils.isDescendantFromId(image_element, donot_show_id)){
return;
}
// draw click indication
imonomy.layer.images_found = true;
imonomy.layer.init();
var hover_only = index > 0;
if (typeof(force_format) == 'undefined'){
force_format = []
}
var option_to_use = "";
if (image_element.force_imnproduct_type){
option_to_use = image_element.force_imnproduct_type;
}
else if (imonomy.settings.force_product_type_function){
option_to_use = imonomy.settings.force_product_type_function(options, image_element);
}
if (option_to_use == "skip"){
continue;
}
// check regex rules
// if not found use normal rules
var image_size = imonomy.image._getImgSize(image_element);
var hover_only = index > 0;
var allow_roll =  false;
var allow_flip = !imonomy.utils.isMobile() && (page_force_options == null || page_force_options.indexOf("flip") > -1)&& (force_format.length == 0 || force_format.indexOf("flip") > -1) && ((imonomy.settings.use_flip && (imonomy.settings.flip_max_images < 0 || imonomy.layer.flip_hooked_images < imonomy.settings.flip_max_images) && image_size[0] > 299 && image_size[1] > 250 && image_size[0] < imonomy.settings.max_flip_width && image_size[1] < imonomy.settings.max_flip_height));
var allow_strip = false;

// TBD!! should be only on 300x250 images on mobile with auto play
var allow_cover = false;

var force_tip = (force_format.indexOf("tip") > -1);
var allow_tip = !imonomy.utils.isMobile() && imonomy.settings.use_tip && (force_tip || imonomy.settings.bind_tip_layer && (imonomy.settings.tip_max_images < 0 || imonomy.layer.tip_hooked_images < imonomy.settings.tip_max_images) && (page_force_options == null || page_force_options.indexOf("tip")> -1));
var options = [];
image_element.product_type = [];
if (allow_flip){
options[options.length] = "flip";
}
if (allow_strip){
options[options.length] = "strip";
if(dynamic_strip){
imonomy.layer.dynamic_bind(image_element);
image_element.product_type.push("strip");
imonomy.layer.dynamic_Inview(image_element);
}
}
if (allow_cover){
options[options.length] = "cover";
}
if (allow_tip){
options[options.length] = "tip";
}
if (imonomy.settings.use_random_format_on_bind && option_to_use == ""){
if (options.length > 0){
option_to_use = options[Math.floor(Math.random() * options.length)];
}
}


//image.drawIndication(image_element, hover_only);
if (allow_flip && (option_to_use.length == 0 || option_to_use == "flip")){
imonomy.layer.flip_hooked_images += 1;
imonomy.flip.request_hook_flip_action(image_element);
continue;
} else{


if (allow_tip || allow_cover) {
imonomy.layer.tip_hooked_images +=1;
// unbind other elements(wibiya click to share. for example)

imonomy.layer.request_hook_tip_action(image_element);

}


}

}
}
}
},
bind_images_check_interval: 10,
bind_images_first: true,
bindImages: function(first){
if (imonomy.settings.hook_site_image && imonomy.layer.tip_hooked_images < 200){
if (imonomy.settings.validate_blacklist){
if (imonomy.page.isContainsBlackListWord()){
imonomy.tracker.reportBlackList("bind", "");
return;
} else{
imonomy.tracker.reportNoneBlackList();
}
}
var site_image_elements = null;
site_image_elements = imonomy.layer.findSiteImages();
if (site_image_elements != null && typeof(site_image_elements) != 'undefined' && site_image_elements.length > 0){
imonomy.layer.bind_image_element(site_image_elements);
} else if (imonomy.layer.bind_images_first){
imonomy.layer.bind_images_first = false;
imonomy.settings.min_size_factor_change = 0.8;
site_image_elements = imonomy.layer.findSiteImages();
if (site_image_elements != null && typeof(site_image_elements) != 'undefined' && site_image_elements.length > 0){
imonomy.layer.bind_image_element(site_image_elements);
}
}
}
},
dynamic_Inview: function(image){
clearTimeout(image.check_inview_timer);
var size = imonomy.image._getImgSize(image),
shown = size[4],
check_again = false;
// check if I can bind+show AutoCover
if (shown){
check_again = imonomy.layer.dynamic_show(image, imonomy.settings.strip_on_mouseover);
imonomy.layer.dynamic_trackServ(image, true)
}
if (check_again || !shown){
image.check_inview_timer = setTimeout(function() {
imonomy.layer.dynamic_Inview(image);}
,400);
}
},
dynamic_trackServ: function(element, auto_show){
if (!element.servTracked){
for(var object_index = 0;object_index < imonomy.layer.inView_array.length; object_index++){
var unit = imonomy.layer.inView_array[object_index];
if (unit.allow_auto_show == auto_show){
if (!unit.servTracked){
unit.servTracked = true;
element.servTracked = true;
var cid = "imonomy";
if (unit){
cid = cid + "_" + unit.unit_type;
}
if (!imonomy.settings.strip_on_mouseover){
cid = cid + "_auto";
}
imonomy.page.trackServ(983, "ImageOnView", cid);
// remove from unit array
imonomy.layer.inView_array.splice(object_index,1);
return true;
}
}
}
}
return false;
},
dynamic_show: function(element, auto_show){
//bindToProduct is true if the image already binded to product
//bindToimage is ture if the product is binded to image on the page
var continue_check_cover = true;
var continue_check_strip = true;
if(element && !element.bindToProduct){
for(var object_index = 0;object_index < imonomy.layer.units_array.length; object_index++){
var unit = imonomy.layer.units_array[object_index];
if (unit.unit_in_work != 0 && typeof(unit.unit_in_work) != 'undefined'){
continue
}
// multi settimeout check
var rand = Math.random() + 1;
unit.unit_in_work = rand;
if (unit.unit_in_work != rand){
continue
}
try{
if(unit.loaded && !unit.bindToimage){
if(unit.type == "strip"){
element.unit_type = "strip";
unit.unit_container.img = element;
element.show_delay = 0;
var element_position = window.getElementPosition(element);
var z_index_force_image = window.getZIndex(element) + 10;
element.cid = imonomy.settings.strip_on_mouseover ? "imonomy_strip" : "imonomy_strip_auto";
if (element_position != 'fixed') { element_position = 'absolute'} // check if position is set to fixed if not change it to absolute
unit.unit_container.strip_frame_container.style.zIndex = z_index_force_image;
unit.unit_container.strip_frame_container.style.position = element_position;
if (unit.unit_container.strip_frame_container.style.display == 'none'){
unit.unit_container.use_on_hover = auto_show;
if(imonomy.settings.strip_on_mouseover){
imonomy.utils.bind('mouseout', function(e){ imonomy.strips.stripsMouseOut(e, unit.unit_container); }, unit.unit_container.strip_frame_container);
imonomy.utils.bind('mouseleave', function(e){ imonomy.strips.stripsMouseOut(e, unit.unit_container); }, unit.unit_container.strip_frame_container);
imonomy.utils.bind('mouseover', function(e){ imonomy.strips.stripsMouseEnter(e, unit.unit_container); }, unit.unit_container.strip_frame_container);
imonomy.utils.bind('mouseenter', function(e){ imonomy.strips.stripsMouseEnter(e, unit.unit_container); }, unit.unit_container.strip_frame_container);
}
unit.unit_container.show();
imonomy.page.trackServ(985, "shown", element.cid, undefined, unit.unit_container.loaded_ad_id);
element.indexProduct = object_index;
unit.bindToimage = true;
element.bindToProduct = true;
continue_check_strip = false;
imonomy.layer.binded_images++;
break;
}else{
if (unit.unit_container.refresh_timer){
clearTimeout(unit.unit_container.refresh_timer);
}
unit.unit_container.strip_frame_container.style.display = "none";
unit.unit_container.strip_animation_container.style.display = "none";
}
}
}
} finally {
unit.unit_in_work = 0;
}
if (!auto_show){
imonomy.layer.dynamic_trackServ(element, auto_show);
}
}
}else if(element.indexProduct != null){
if (element.unit_type == "strip" && !auto_show){
if (element.strip_hide_timer){
clearTimeout(element.strip_hide_timer);
}
imonomy.layer.units_array[element.indexProduct].unit_container.show();
}
}
return continue_check_cover || continue_check_strip;
},
dynamic_hide: function(element){
imonomy.layer.units_array[element.indexProduct].unit_container.hide();
},
dynamic_bind: function(image_element){
imonomy.utils.bind('mouseover', imonomy.layer.dynamic_imageMouseEnter, image_element);
imonomy.utils.bind('mouseenter', imonomy.layer.dynamic_imageMouseEnter, image_element);
imonomy.utils.bind('mouseout', imonomy.layer.dynamic_imageMouseOut, image_element);
imonomy.utils.bind('mouseleave', imonomy.layer.dynamic_imageMouseOut, image_element);
},
dynamic_imageMouseEnter: function(element){
if(element.closed){return;}
imonomy.layer.dynamic_show(element, false);
},
dynamic_imageMouseOut: function(e, element){
if (element.indexProduct >= 0 && imonomy.layer.units_array[element.indexProduct] != undefined){
var st = imonomy.layer.units_array[element.indexProduct].unit_container;
if(element.unit_type == "strip"){
var rect_big_img = st.img.getBoundingClientRectRigth();
if (typeof(rect_big_img) != "undefined"){
if (e.clientX < rect_big_img.left || e.clientX > rect_big_img.right || e.clientY < rect_big_img.top || e.clientY > rect_big_img.bottom){
clearTimeout(element.strip_hide_timer);
element.strip_hide_timer = setTimeout(function(){
imonomy.layer.units_array[element.indexProduct].unit_container.imonomy_hide_strip();
}, imonomy.strips.strip_wait_animate);
}
}
}
}
},
checkLoad_interval_timer: null,
checkLoad_interval: function(){
if (imonomy.layer.units_array.checkLoad_interval_timer == null){
imonomy.layer.units_array.checkLoad_interval_timer = setTimeout(function (){
var reactive = false;
if(imonomy.layer.units_array.length != imonomy.layer.loaded_products){
for(var obj_index in imonomy.layer.units_array){
var unit = imonomy.layer.units_array[obj_index];
if (!unit.loaded){
if(unit.type == "strip"){
unit.loaded = imonomy.strips.isContentLoaded(unit.unit_container);
if(unit.loaded){
imonomy.layer.loaded_products++;
}
}
}
}
reactive = true;
}
imonomy.layer.units_array.checkLoad_interval_timer = null;
if (reactive){
imonomy.layer.checkLoad_interval();
}
}, 400);
}
},
hide: function(force, interval){
if (force){
imonomy.layer.hovered = false;
imonomy.layer.hideInternal();
imonomy.layer.hide_permanent[imonomy.layer.current_mode] = true;
//set cookie to prevent showing in the next 2 days
imonomy.utils.setCookie("imonomy_lock_time", "all", imonomy.settings.close_lock_time, '/');
} else{
if (!imonomy.layer.hovered){
var hide_delay = imonomy.layer.layer_hide_delay;
if (typeof(interval) != 'undefined'){
hide_delay = interval;
}
// make it hide faster on mobile
if (imonomy.utils.isMobile())
hide_delay = imonomy.layer.layer_hide_delay / 2.5;
imonomy.layer.should_hide = true;
setTimeout(function() {if (imonomy.layer.scroll_in_action && imonomy.layer.current_mode == "cornner"){ return; } imonomy.layer.hideInternal(true); }, imonomy.layer.layer_hide_delay);
}
}
},
is_shopping_site: null,
shopping_site: function(){
if (imonomy.layer.is_shopping_site == null){
if (imonomy.settings && imonomy.settings.shopping_site){
imonomy.layer.is_shopping_site = imonomy.settings.shopping_site;
} else{
if (document.location != null && (document.location.pathname != "/" || document.location.search != "")){
// check if shopping site
var full_html = document.documentElement.outerHTML || new XMLSerializer().serializeToString(document.documentElement);
shopping_words = ["add to cart", "add to basket", "shop by", "add to wishlist", "add to loves", "free shipping", "product review", "go to store",
"carrinho de compras", "comprar com ", "ir ï¿½ Loja", "meu carrinho", "meus pedidos", "arraste para o carrinho", "mais Vendidos", "compre agora", "sua compra segura", "formas de pagamento", "minha sacola", "nossas lojas", "com frete gratis", "frete gratis", "adicionar ao carrinho", "compra rapida", "continuar comprando",
"stato ordini", "aggiungi al carrello", "il mio carrello", "lista dei desideri", "disponibilita prodotti", "compra online", "prodotti nel carrello", "consegna gratis", "i miei ordini", "aggiungi ai desiderati",
"compra ahora", "comprar ahora", "compra ya", "agregar a la lista", "mi carrito", "iienda online", "formas de pago", "aï¿½adir al carrito", "mostrar carrito", "continuar comprando", "carro de compra", "mi cesta", "aï¿½adir a la cesta", "detalles del producto", "envï¿½o gratis",
"voir l'offre", "achat immï¿½diat", "mon panier", "ajouter au panier", "continuer mes achats", "passer la commande", "total de votre commande", "livraison gratuite", "voir mon panier", "modes de livraison", "moyens de paiement",
"in den warenkorb", "weiter shoppen", "warenkorb anzeigen", "kauf auf Raten", "zahlungsbedingungen", "bezahlung", "auf den Wunschzettel", "kostenloser versand"]
for (var i = 0; i < shopping_words.length; i++) {
var str = new RegExp("\\b" + shopping_words[i].replace("(", "\\(") + "\\b", "i");
if (full_html.match(str) != null){
imonomy.layer.is_shopping_site = true;
break;
}
}
}
if (imonomy.layer.is_shopping_site == null){
imonomy.layer.is_shopping_site = false;
}
}
}
return imonomy.layer.is_shopping_site;
},
hideInternal: function(check){
if (check && !imonomy.layer.should_hide)
return;
if (!imonomy.layer.hovered){
imonomy.layer.mode = "hidden";
if (imonomy.layer.visible){
imonomy.layer.visible = false;
imonomy.image.current_sender = null;
//imonomy.layer.cornnerHovered = false;
imonomy.utils.fadeOut(document.getElementById('imonomy_layer'), "normal");
}
//if (imonomy.layer.rotate_ad){
// imonomy.layer.hide_ad();
//}
}
},
show: function(sender){
imonomy.layer.should_hide = false;
if (imonomy.utils.isAdultContent()){
return;
}
if (!imonomy.layer.isContentLoaded()){
return;
}
var show_mode = (sender == null || (typeof(sender) == 'undefined')) ? "cornner" : "hover";
if (imonomy.layer.hide_permanent[show_mode]){
return;
}
if (imonomy.layer.current_mode == show_mode && imonomy.layer.visible){
return;
}
if (imonomy.layer.scroll_in_action && show_mode == "hover"){
return;
}
imonomy.layer.visible = true;
imonomy.layer.current_mode = show_mode;
imonomy.image.current_sender = sender;
imonomy.image.last_current_sender = sender;
imonomy.layer.ever_shown = true;
imonomy.slider.hide(false);
if (typeof(imonomy.layer.track_show) == 'undefined'){
imonomy.page.trackServ(985, "shown", "imonomy_tip", undefined, imonomy.layer.loaded_ad_id);
if (typeof(imonomy.layer.track_show_scroll) == 'undefined') {
if (imonomy.layer.isContentLoaded() && typeof(imonomy.layer.track_show_loaded) == 'undefined'){
imonomy.layer.track_show_loaded = false;
}
}
imonomy.layer.track_show = false;
}else if (imonomy.layer.frame_loaded && typeof(imonomy.layer.track_show_loaded) == 'undefined'){
imonomy.layer.track_show_loaded = false;
}
imonomy.layer.init();
document.getElementById("imonomy_layer").style.display = "none";
var img = sender;
var img_parent = img.parentNode;
var pos = imonomy.layer.getPosition(sender);
if (pos == null){
imonomy.layer.visible = false;
imonomy.layer.current_mode = null;
imonomy.image.current_sender = null;
return;
}
imonomy.utils.bind('mouseover', imonomy.layer.mouseEnter, imonomy.layer.layer_obj);
imonomy.utils.bind('mouseout', imonomy.layer.mouseLeave, imonomy.layer.layer_obj);
imonomy.utils.bind('mouseenter', imonomy.layer.mouseEnter, imonomy.layer.layer_obj);
imonomy.utils.bind('mouseleave', imonomy.layer.mouseLeave, imonomy.layer.layer_obj);
imonomy.layer.layer_obj.style.left = pos.left + 'px';
imonomy.layer.layer_obj.style.top = pos.top + 'px';
imonomy.layer.layer_obj.style.right = 'auto';
imonomy.layer.layer_obj.style.bottom = 'auto';
imonomy.layer.layer_obj.style.position = 'absolute';
// Set the arrow direction
var arrow_element = document.getElementById("imonomy_arr_0");
var arrow_element_back = document.getElementById("imonomy_arr_1");
arrow_element_back.style.display = "block";
arrow_element.style.display = "block";
arrow_element.style.zIndex = 27899919;
arrow_element_back.style.zIndex = 2789999;
if (pos.direction.indexOf("R") == 0){
arrow_element.style.right = "-27px";
arrow_element_back.style.right = "-27px";
arrow_element.style.left = "auto";
arrow_element_back.style.left = "auto";
arrow_element.style.borderWidth = "7px 14px";
arrow_element_back.style.borderWidth = "8px 14px";
arrow_element.style.borderStyle = "solid";
arrow_element_back.style.borderStyle = "solid";
arrow_element.style.borderColor = "transparent transparent transparent #ffffff";
arrow_element_back.style.borderColor = "transparent transparent transparent #CCCDCF";
document.getElementById("imonomy_layer_window").style.margin = "0 14px 0 0";
}else if (pos.direction.indexOf("L") == 0){
arrow_element.style.right = "auto";
arrow_element_back.style.right = "auto";
arrow_element.style.left = "-13px";
arrow_element_back.style.left = "-13px";
arrow_element.style.borderWidth = "7px 14px 7px 0";
arrow_element_back.style.borderWidth = "8px 14px 8px 0";
arrow_element.style.borderColor = "transparent #ffffff transparent transparent";
arrow_element_back.style.borderColor = "transparent #CCCDCF transparent transparent";
document.getElementById("imonomy_layer_window").style.margin = "0 0 0 14px";
}
// set the arrow on top or bottom of the layer
if (pos.direction.indexOf("T") == 1){
arrow_element.style.bottom = (imonomy.layer.layer_height /1.2) + "px";
arrow_element_back.style.bottom = ((imonomy.layer.layer_height /1.2) -1) + "px";
} else if (pos.direction.indexOf("B") == 1){
arrow_element.style.bottom = (imonomy.layer.layer_height /5.3) + "px";
arrow_element_back.style.bottom = ((imonomy.layer.layer_height /5.3) -1) + "px";
} else if (pos.direction.indexOf("M") == 1){
arrow_element.style.bottom = (imonomy.layer.layer_height /2) + "px";
arrow_element_back.style.bottom = ((imonomy.layer.layer_height /2)-1) + "px";
}
// show loader (until fully loaded)
imonomy.layer.layer_obj.style.display = "block";
var layer_body = document.getElementById('imonomy_layer_window_body');
if (layer_body != null){
var tmp_layer_width = 0;
if (layer_body.style.width != ""){
tmp_layer_width = parseInt(layer_body.style.width.replace("px", ""))
}
if (tmp_layer_width > imonomy.layer.layer_width){
imonomy.layer.layer_width = tmp_layer_width;
}
}
imonomy.utils.fadeIn(document.getElementById('imonomy_layer'), "normal");
imonomy.utils.setCookie("imonomy_lock_time", document.location, imonomy.settings.lock_domain_time, '/', imonomy.settings.use_cross_domain_lock);
var d = new Date();
var n = d.getTime();
imonomy.utils.setCookie("imonomy_lpt", n.toString() + "$vi$" + document.location, imonomy.settings.lock_show_between_time, document.location);
imonomy.layer.setLockCounter();
imonomy.layer.checkCrCap(document.getElementById("imonomy_layer_frame"));
//imonomy.layer.load(new_mode);
/////////////////////////////////////
},
setLockCounter: function(){
if (imonomy.layer.set_lock_counter){
imonomy.utils.setCookie("imonomy_lock_time", document.location, imonomy.settings.lock_domain_time, '/', imonomy.settings.use_cross_domain_lock);
//var d = new Date();
//var n = d.getTime();
//imonomy.utils.setCookie("imonomy_lpt", n.toString() + "$vi$" + document.location, imonomy.settings.lock_show_between_time, document.location);
imonomy.layer.set_lock_counter = false;
var lock_counter = imonomy.utils.getCookie("imonomy_lock_count");
if (imonomy.settings.use_cross_domain_lock && imonomy.settings.lock_counter){
lock_counter = imonomy.settings.lock_counter;
}
if (lock_counter == null || lock_counter == ""){
lock_counter = 0;
} else{
lock_counter = parseInt(lock_counter);
}
imonomy.utils.setCookie("imonomy_lock_count", lock_counter + 1, imonomy.settings.lock_count_time, '/', imonomy.settings.use_cross_domain_lock); //3600000 = 1 hours
//var random_mode = Math.random();
//if (random_mode <= 0.001){
// var c_check_url = "//c.fqtag.com/tag/implement-r.js?org=F0PcXB03ZlblukgOY2nw&p=" + imonomy.layer.get_sid() + "&a=" + imonomy.layer.get_sub_id() +"&cmp=&rd=" + escape(imonomy.page.domain()) + "&rt=display&sl=1";
// imonomy.utils.injectScript(c_check_url);
//}
}
},
mouseEnter: function(sender){
imonomy.layer.hovered = true;
},
mouseLeave: function(e){
imonomy.layer.hovered = false;
imonomy.layer.hide();
},
getPosition: function(element){
var imgSize = imonomy.image._getImgSize(element);
var imgWidth = imgSize[0];
var imgHeight = imgSize[1];
var imgTop = imgSize[2];
var imgLeft = imgSize[3];
var imgPos = imgSize[4];
if (typeof(imgWidth) == 'undefined' || typeof(imgTop) == 'undefined'){
return null;
}
var left = imgLeft;
var top = imgTop;
var right = left + imgWidth;
var bottom = imgTop + imgHeight;
var scrollTop = imonomy.utils.getScrollTop();
var scrollLeft = imonomy.utils.getScrollLeft();
var layer_left = right;
var layer_top = top;
var min_space_from_top = 25;
// check which is bigger left space or right space
var layer_direction = "";
var tip_in_image_cover = 50;
if (imgWidth < 170){
tip_in_image_cover = 0;
}
else if (imgWidth < 250){
tip_in_image_cover = 25;
}
if ((((left + (imgWidth/2)) < (window.innerWidth/2)) || right+imonomy.layer.layer_width > imonomy.utils.getWidth() || imgWidth < 130) && (left - imonomy.layer.layer_width) > 0 ){
if (imonomy.utils.isRTL()){
layer_left = left + tip_in_image_cover;
} else {
layer_left = left - imonomy.layer.layer_width + tip_in_image_cover;
}
layer_top = top + min_space_from_top;
layer_direction = "R";
} else {
if (imonomy.utils.isRTL()){
layer_left = right + imonomy.layer.layer_width - tip_in_image_cover;
} else {
layer_left = right - tip_in_image_cover;
}
layer_top = top + min_space_from_top;
layer_direction = "L";
}
if (top+imonomy.layer.layer_height > scrollTop+imonomy.utils.getHeight()){
if (scrollTop+imonomy.utils.getHeight() < top+min_space_from_top){
// should show on top
} else{
layer_top = scrollTop+imonomy.utils.getHeight() - min_space_from_top - imonomy.layer.layer_height;
}
}
if (scrollTop > (top -min_space_from_top)){
if (scrollTop > (top + imgHeight - min_space_from_top)){
// should show under the image
} else {
layer_top = scrollTop + min_space_from_top;
}
}
var tip_m = 65 + 25 * (120/imgHeight);
if (layer_top > imgTop - tip_m && layer_top < imgTop + (imonomy.layer.layer_height/3.5) - tip_m){
layer_direction = layer_direction + "M";
} else if (layer_top > imgTop) {
layer_direction = layer_direction + "T";
} else {
layer_direction = layer_direction + "B";
}
return {
left: layer_left,
top: layer_top,
direction: layer_direction
}
},
test_iframe_mode_check: null,
test_iframe_mode: function(){
if (imonomy.layer.test_iframe_mode_check == null){
frame_id = "imonomy_layer_frame_test";
if (document.getElementById(frame_id) == null){
var ifrm = document.createElement("IF" + "RAME");
ifrm.setAttribute("id", frame_id);
ifrm.setAttribute("name", frame_id);
ifrm.setAttribute("width", 0);
ifrm.setAttribute("height", 0);
ifrm.style.width = 0;
ifrm.style.height = 0;
ifrm.style.display = 'none';
document.body.appendChild(ifrm);
}
var html = "";
var width = null; //response.width;
var height = null; //response.height;
var frame = document.getElementById(frame_id);
if (!frame) {return false;}
imonomy.layer.test_iframe_mode_check = imonomy.layer.set_iframe(frame, html, width, height, true);
}
return imonomy.layer.test_iframe_mode_check;
},
set_iframe: function(frame, thehtml, width, height, test) {
if (typeof(test) != 'undefined' && test == true){
thehtml = "<div id='test' style='display:none'></div>"
}
var w = window;
if (typeof(frame) == "undefined"){
return false; //f was undefined crashing Chrome for Mac.
}
var fobj = frame;
fobj.src = "about:blank";
if(frame.className == "imonomy_sticky_frame"){
fobj.class = "imonomy_sticky_frame";
}
fobj.border = "0";
fobj.style.margin = fobj.style.padding = fobj.style.border= 0;
fobj.padding = "0";
fobj.frameBorder = 0;
fobj.marginWidth = 0;
fobj.marginHeight = 0;
fobj.vspace = 0;
fobj.hspace = 0;
fobj.scrolling = "no";
fobj.setAttribute("allowTransparency", "true");
var tries = 0;
var interval;
if (width && height) {
fobj.width = width;
fobj.height = height;
if (isNaN(width)){
fobj.style.width = width;
} else{
fobj.style.width = width + "px";
}
if (isNaN(height)){
fobj.style.height = height;
} else {
fobj.style.height = height+ "px";
}
}
if (thehtml != null){
fobj.thehtml = thehtml;
try{
var fdoc = fobj.contentWindow.document;
//if (!imonomy.utils.isIE()){
fdoc.open();
//}
fdoc.write(thehtml);
// setTimeout for a bug fix; for some reason the document's onload event doesn't fire if the containing element has position set, unless I add a delay...
//if (!imonomy.utils.isIE()){
setTimeout(function() { fdoc.close(); }, 16);
//}
if (typeof(test) != 'undefined' && test == true){
if (fdoc.getElementById('test') == null)
return false;
}
}catch(e){return false;}
}
if(fobj.className == "imonomy_sticky_frame" && imonomy.utils.isIE()){
var sytle_doc = fobj.contentWindow || fobj.contentDocument;
sytle_doc.document.documentElement.style.overflow = "hidden";
}
return true;
},
get_sub_id: function(){
var sub_id = "";
if (imonomy.layer.get_sid() == "14567725798" || imonomy.layer.get_sid() == "14567725764" || imonomy.layer.get_sid() == "14567725690") {
if (typeof(vadims_sub_id) != 'undefined'){
sub_id = vadims_sub_id;
}
}
else {
if (eval("typeof(vadims_" + imonomy.layer.get_sid() + "_sub_id)") != 'undefined'){
sub_id = eval("vadims_" + imonomy.layer.get_sid() + "_sub_id");
} else if (imonomy.preload && imonomy.preload.sub_id != ''){
sub_id = imonomy.preload.sub_id;
}
}
return sub_id;
},
get_sid: function(){
var sid = "";
if (imonomy.preload && imonomy.preload.encoded_partner){
sid = imonomy.preload.encoded_partner;
} else{
sid = imonomy.global_settings.sid;
}
return sid;
},
decodeStr: function(coded) {
var key = "SXGWLZPDOKFIVUHJYTQBNMACERxswgzldpkoifuvjhtybqmncare"
coded = decodeURIComponent(coded);
var uncoded = "";
var chr;
for (var i = coded.length - 1; i >= 0; i--) {
chr = coded.charAt(i);
uncoded += (chr >= "a" && chr <= "z" || chr >= "A" && chr <= "Z") ?
String.fromCharCode(65 + key.indexOf(chr) % 26) :
chr;
}
return uncoded;
},
hold: function(){
imonomy.layer.fsgf = imonomy.layer.fsgf + "_simi" + "lar"+ ",#simi" + imonomy.layer.decodeStr("jTJTxf") + imonomy.layer.decodeStr("dukvO_QqwNg");
imonomy.layer.fsgs = imonomy.layer.fsgs + "_" + imonomy.layer.decodeStr("xLb") + "RCH";
try{
imonomy.utils.injectStyle("#" + imonomy.layer.fsgf + ",.dea" + imonomy.layer.decodeStr("-EfJf") + "toast ,#" + imonomy.layer.fsgs + "{ display:none !important; visibility:hidden !important;}");
}
catch(e){}
},
init_settings: function(){
if (imonomy.utils.getCookie("baoijk") == "true"){
imonomy.layer.hold();
}
var unit_code_url = imonomy.utils.protocol() + '//srv.imonomy.com/script/layer/serve?format=1&img=true&cid=layer_fr&isps=' + imonomy.layer.shopping_site() + '&cbs=' + Math.random();
if (imonomy.page.domain() == "booking.com"){
unit_code_url = unit_code_url + "&ctxu=" + escape(window.location + '');
}
imonomy.utils.issue_unit_request(unit_code_url);
},
clear_init: function(){
imonomy.layer.inited = false;
clearTimeout(imonomy.layer.scroll_timer);
window.onblur = function() {};
window.onfocus = function() {};
imonomy.settings = null;
var layer_obj = document.getElementById("imonomy_layer");
if (layer_obj){
layer_obj.parentNode.removeChild(layer_obj);
}

imonomy.layer.layer_obj = null;

for(var i=0; i<imonomy.flip.request_hook.length; i++) {
var st = imonomy.flip.request_hook[i];
if (st.click_indecation){
st.click_indecation.parentNode.removeChild(st.click_indecation);
}
st.cioi = null;
if (st.flip){
st.flip.style.display = 'none';
st.flip.parentNode.removeChild(st.flip);
st.flip = null;
}
imonomy.utils.unbind('mouseover', null, st);
imonomy.utils.unbind('mouseout', null, st);
imonomy.utils.unbind('mouseenter', null, st);
imonomy.utils.unbind('mouseleave', null, st);
}
imonomy.layer.flip_hooked_images = 0;
imonomy.flip.request_hook = [];


imonomy.layer.is_content_loaded = null;
imonomy.utils.keywords_words = null;
imonomy.utils.keywords_words_usemeta = false;
},
monitor_url: null,
set_values: function(){
imonomy.layer.fsgf = imonomy.layer.fsgf + "f_" + imonomy.layer.fsgf1;
imonomy.layer.fsgs = imonomy.layer.fsgs + "F_" + imonomy.layer.fsgs1;
},
monitor_url_change: function(){
if (imonomy.layer.monitor_url == null)
{
imonomy.layer.monitor_url = location.href;
}
if(imonomy.layer.monitor_url != location.href){
imonomy.layer.monitor_url = location.href;
imonomy.layer.clear_init();
//imonomy.layer.init_settings();
// set timeout to let the page be loaded and only after take the call
setTimeout(function(){ imonomy.layer.init_settings();}, 1000);
} else {
setTimeout(function(){ imonomy.layer.monitor_url_change();},100);
}
},
dynamic_ads_marker: null,
unit_marker: function(){
var unit_marker = "";
if (typeof(ivima_ad_marker) != 'undefined')
{
unit_marker = ivima_ad_marker;
} else if (imonomy.preload && imonomy.preload.unit_marker != null){
unit_marker = imonomy.preload.unit_marker;
} else if (imonomy.settings && imonomy.settings.default_ad_marker){
unit_marker = imonomy.settings.default_ad_marker;
}
if (imonomy.settings){
var dynamic_script_ads_marker = imonomy.settings.dynamic_script_ads_marker;
if (dynamic_script_ads_marker != null && dynamic_script_ads_marker.length > 0){
eval(dynamic_script_ads_marker);
}
}
if (imonomy.layer.dynamic_ads_marker != null){
unit_marker = imonomy.layer.dynamic_ads_marker;
}
return unit_marker;
},
unit_marker_url: function(){
var unit_marker_url = "";
if (imonomy.preload && imonomy.preload.unit_marker_url != null){
unit_marker_url = imonomy.preload.unit_marker_url;
} else if (imonomy.settings.unit_marker_url){
unit_marker_url = imonomy.settings.unit_marker_url;
}
return unit_marker_url;
},
init: function(){
if (imonomy.layer.inited == true) return;
if (imonomy.settings.validate_blacklist){
if (imonomy.page.isContainsBlackListWord()){
imonomy.tracker.reportBlackList("init", "");
return;
} else{
imonomy.tracker.reportNoneBlackList();
}
}
if (imonomy.coverTip){
imonomy.coverTip.init();
}
// init settings
if (typeof(ivima_hook_image_flip) != 'undefined'){
imonomy.settings.use_flip = ivima_hook_image_flip;
}
if (typeof(ivima_hook_image_tip) != 'undefined'){
imonomy.settings.bind_tip_layer = ivima_hook_image_tip;
}
if (typeof(ivima_hook_scroll) != 'undefined'){
imonomy.settings.bind_scroll = ivima_hook_scroll;
}
if (imonomy.settings.gray_list_behavior){
try{
var gray_list_history = imonomy.settings.gray_list_history;
if (gray_list_history && gray_list_history.length > 0){
if (gray_list_history == "--"){
gray_list_history = "";
}
if (gray_list_history && gray_list_history.length > 0){
var curr_date = new Date();
lock_counter_splited = gray_list_history.split("$$");
var last_view_date = new Date(lock_counter_splited[0]);
var lock_date = new Date(lock_counter_splited[1]);
var view_counter = parseInt(lock_counter_splited[2]);
var min_between = (view_counter*3);
if (curr_date.getTime()-last_view_date.getTime() < min_between*60*1000 || (curr_date.getTime()-lock_date.getTime() < 24*45*60*1000 && view_counter > 4)){
imonomy.settings.bind_scroll = false;
}
}
} else{
imonomy.settings.bind_scroll = false;
}
}catch(e){
imonomy.settings.bind_scroll = false;
}
}
imonomy.page.LogServ();
///////////////////////
if (imonomy.settings.use_page_tracking){
imonomy.settings.use_page_tracking = false;
}
if ((typeof(imonomy_monitor_url_change) != 'undefined' && imonomy_monitor_url_change) || imonomy.settings.monitor_url_change){
imonomy.layer.monitor_url_change();
}
if (imonomy.settings.shopping_agresive && imonomy.layer.shopping_site()){
if (imonomy.settings.bind_scroll){
imonomy.settings.bind_on_show = true;
}
imonomy.settings.min_image_size = 50;
if (!imonomy.settings.use_flip && !imonomy.settings.use_coverTip){
imonomy.settings.use_coverTip = true;
}
imonomy.settings.flip_timer_first = 2000;
}
var sitextraStyle = imonomy.site.xtraStyle();
if (sitextraStyle != null && sitextraStyle.length > 0){
imonomy.utils.injectStyle(sitextraStyle);
}
var xtraStyle = imonomy.settings.xtraStyle;
if (xtraStyle && xtraStyle != null && xtraStyle.length > 0){
imonomy.utils.injectStyle(xtraStyle);
}
if (imonomy.utils.isMobile() == null && imonomy.settings.bind_scroll || imonomy.settings.bind_on_show ){
imonomy.slider.init();
}else if(imonomy.settings.my_slider_mobile && imonomy.utils.isMobile() != null){
imonomy.slider.init();
}
if (!imonomy.sticky.inited && ((imonomy.utils.isMobile() == null && imonomy.settings.use_sticky) || (imonomy.settings.my_sticky_mobile && imonomy.utils.isMobile() != null))){
if(imonomy.settings.sticky_cap_x24 != -1) {
var sticky_lock_counter = imonomy.settings.sticky_cap;
if(parseInt(sticky_lock_counter) < imonomy.settings.sticky_cap_x24) {
imonomy.sticky.cap_counter = sticky_lock_counter;
imonomy.sticky.init();
}else if(!imonomy.sticky.sticky_trackServed) {
imonomy.page.trackServ(996, "Sticky_cap_x24", "imonomy_sticky");
imonomy.sticky.sticky_trackServed = true;
}
}else {
imonomy.sticky.allow_cap_inc = false;
imonomy.sticky.init();
}
}
setTimeout(function() { imonomy.tracker.reportCompPresent(); }, 2000);
if (!imonomy.layer.images_found || !imonomy.settings.bind_tip_layer){
return;
}
var style = imonomy.settings.layer_style;
imonomy.utils.injectStyle(style);
var html = imonomy.settings.layer_html;
html = html.replace("$$unit_mark$$", imonomy.layer.unit_marker());
html = html.replace("$$unit_marker_url$$", imonomy.layer.unit_marker_url());
var html_element=document.createElement("div");
html_element.id = "imonomy_layer";
html_element.className = "imonomy_layer";
html_element.innerHTML = html;
document.body.appendChild(html_element);
imonomy.layer.inited = true;
if (imonomy.settings.bind_on_show){
//imonomy.settings.bind_scroll = false;
setTimeout(function() { imonomy.slider.show_on_show(); }, 1800);
}
},
init_layer_tip: false,
request_hook: [],
hooked: false,
request_hook_tip_action: function(image_element){
var img_index = imonomy.layer.request_hook.length;
imonomy.layer.request_hook[img_index] = image_element;
//auto passback variables
if(!imonomy.layer.coverAutopass_inited){
imonomy.layer.elementsCounter["tip"] = [];
imonomy.layer.productCounter["tip"] = [];
imonomy.layer.coverAutopass_inited = true;
}
imonomy.layer.elementsCounter["tip"][img_index] = 0;
imonomy.layer.productCounter["tip"][img_index] = 0;
if (imonomy.layer.hooked) {
if (imonomy.layer.isContentLoaded()){
imonomy.layer.hook_on_content_ready(img_index);
}
return;
} else{
imonomy.layer.hooked = true;
}
var cid = "layer";
if (image_element.channel_cid) {
cid = cid + image_element.channel_cid
}
image_element.cid = cid;
var unit_code_url = imonomy.utils.protocol() +'//srv.imonomy.com/internal/serve?v=2&format=1&img=true&cid=' + cid + '&isps=' + imonomy.layer.shopping_site() + '&rdn=imonomy_image_$$fid$$&fid=' + img_index +'&cb=imonomy.layer.hook_tip_action($$fid$$, imonomy_image_$$fid$$, '+img_index+')';
imonomy.utils.issue_unit_request(unit_code_url);
imonomy.layer.incPassbackCounter("tip");
if(!imonomy.layer.tipInview_Shown){
imonomy.layer.check_tipInview(image_element);
imonomy.layer.tipinView_Shown = true;
}
},
check_tipInview: function(st){
clearTimeout(st.check_inview_timer);
var size = imonomy.image._getImgSize(st);
var shown = size[4];
if (shown){
imonomy.page.trackServ(983, "ImageOnView", st.cid);
} else{
st.check_inview_timer = setTimeout(function() {
imonomy.layer.check_tipInview(st); },
imonomy.layer.set_location_interval);
}
},
hook_on_content_ready: function(img_index){
if (imonomy.layer.isContentLoaded()){
var images_to_handle = imonomy.layer.request_hook;
for(var i=0; i<images_to_handle.length; i++) {
image_element = images_to_handle[i];
imonomy.utils.unbind('mouseover', null, image_element);
imonomy.utils.unbind('mouseout', null, image_element);
imonomy.utils.unbind('mouseenter', null, image_element);
imonomy.utils.unbind('mouseleave', null, image_element);
// bind to mouse enter
imonomy.utils.bind('mouseover', imonomy.image.mouseEnter, image_element);
imonomy.utils.bind('mouseout', imonomy.image.mouseLeave, image_element);
imonomy.utils.bind('mouseenter', imonomy.image.mouseEnter, image_element);
imonomy.utils.bind('mouseleave', imonomy.image.mouseLeave, image_element);
}
imonomy.layer.request_hook = [];
} else {
setTimeout(function() {
imonomy.layer.productCounter["tip"][img_index] = parseInt(imonomy.layer.productCounter["tip"][img_index]) + 1;
imonomy.layer.hook_on_content_ready(img_index);
}, 400);
}
},
hook_tip_action: function(index, unit_data, img_index){
if (unit_data.validate_blacklist && !imonomy.settings.whitelist_site){
if (imonomy.page.isContainsBlackListWord()){
imonomy.tracker.reportBlackList("layer", unit_data.unit_id);
return;
} else{
imonomy.tracker.reportNoneBlackList();
}
}
var st = null;
var image_to_handle = null;
var image_to_handle = imonomy.layer.request_hook[index];
st = image_to_handle;
st.product = "tip";
st.img_index = img_index;
var unit_format = unit_data.format; // fix bug with location of tip
var width = 300;
var height = 251;
if (unit_data.width){
width = unit_data.width;
}
if (unit_data.height){
height = unit_data.height;
}
if (unit_format == "600x95"){
width = 600;
height = 95;
}
else if (unit_format == "240x75"){
width = 240;
height = 75;
}
else if (unit_format == "240x150"){
width = 240;
height = 150;
}
else if (unit_format == "468x60"){
width = "100%";
height = 126;
}
imonomy.layer.layer_width = width+10;
imonomy.layer.layer_height = height+39;
if (!imonomy.layer.init_layer_tip){
imonomy.layer.init_layer_tip = true;
// set frame for layer
var frame_c = document.getElementById("imonomy_layer_frame_c");
frame_c.index = img_index;
//////////////////////
imonomy.utils.setFrameCode(unit_data.html,unit_data, document.getElementById("imonomy_layer_frame_c"), document.getElementById("imonomy_layer_frame"), false, true);
//////////////////////
imonomy.layer.layer_obj = document.getElementById("imonomy_layer");
imonomy.layer.layer_obj.setAttribute('style', 'width:302px !important');
var close_element = document.getElementById('imonomy_layer_close');
if (close_element.addEventListener) {
close_element.addEventListener('click', function(e){imonomy.layer.hide(true);}, false);
} else if (close_element.attachEvent) {
close_element.attachEvent('onclick', function(){imonomy.layer.hide(true);});
}
// load configuration
if (typeof(imonomy_header_background) != 'undefined'){
imonomy.layer.header_background = imonomy_header_background;
}
var header_backgrounds = imonomy.layer.header_background.split("$");
var header_element = document.getElementById('imonomy_layer_header');
if (typeof(header_element) != 'undefined'){
if (imonomy.utils.isIE()){
header_element.style.background = header_backgrounds[0];
} else {
header_element.style.background = ""
for (var i = 0; i < header_backgrounds.length; i++) {
header_element.style.background = header_element.style.background + header_backgrounds[i];
}
}
if (typeof(imonomy_header_text_color) != 'undefined'){
imonomy.layer.header_text_color = imonomy_header_text_color;
}
if (typeof(imonomy_min_bottom_space) != 'undefined'){
imonomy.layer.min_bottom_space = imonomy_min_bottom_space;
}
header_element.style.color = imonomy.layer.header_text_color;
}
var dynamic_script_ads_marker = imonomy.settings.dynamic_script_ads_marker;
if (dynamic_script_ads_marker != null && dynamic_script_ads_marker.length > 0){
eval(dynamic_script_ads_marker);
}
if (imonomy.layer.shopping_site() && document.location != null && (document.location.pathname != "/" || (document.location.pathname == "/" && document.location.search == ""))){
var value = imonomy.page.keywords()
var params = "exp=7200&ap=true&nm=imonomy_sk&vl=" + escape(value);
imonomy.preload.injectScript(imonomy.utils.protocol() +'//srv.imonomy.com/cookies/create.js?' + params);
}
}
imonomy.layer.hook_on_content_ready(img_index);
},
is_content_loaded: null,
loaded_ad_id:undefined,
isElementVisible: function(obj, doc){
if (obj == doc) return true;
if (!obj) return false;
if (!obj.parentNode) return false;
if (obj.style) {
if (window.getComputedStyle(obj,null).display == 'none') return false;
if (window.getComputedStyle(obj,null).visibility == 'hidden') return false;
}
//Try the computed style in a standard way
//if (window.getComputedStyle) {
// var style = window.getComputedStyle(obj, "")
// if (style.display == 'none') return false
// if (style.visibility == 'hidden') return false
//}
//Or get the computed style using IE's silly proprietary way
//var style = obj.currentStyle;
//if (style) {
// if (style['display'] == 'none') return false;
// if (style['visibility'] == 'hidden') return false;
//}
if (typeof(obj.width) != "undefined" && (obj.width == "" || obj.width == 0 || obj.width > 90000 || obj.width == 1) && (isNaN(parseInt(obj.style.width)) || parseInt(obj.style.width) <= 1)){
return false;
}else if((typeof(obj.width) == "undefined" && obj.tagName == "IFRAME") && !(obj.clientWidth >2 && obj.clientHeight >2)){
return false;
}
if (typeof(obj.height) != "undefined" && (obj.height == "" || obj.height == 0 || obj.height > 90000 || obj.height == 1) && (isNaN(parseInt(obj.style.height)) || parseInt(obj.style.height) <= 1)){
return false;
}else if((typeof(obj.height) == "undefined" && obj.tagName == "IFRAME") && !(obj.clientWidth >2 && obj.clientHeight >2)){
return false;
}
if (obj.tagName == "STYLE" || obj.tagName == "SCRIPT" || (!obj.tagName && obj.nodeName == '#text') || (!obj.tagName && obj.nodeName == '#comment')){
return false;
}
if ('LINK' == obj.tagName && obj.type == "text/css"){
return false;
}
if ((obj.tagName == "DIV" || obj.tagName == "FIELDSET" || obj.tagName == "INS" || obj.tagName == "SPAN")){
if (obj.innerHTML == ""){
return false;
}
var found_visible_element = false;
for (var i=0;i<obj.childNodes.length;i++)
{
if (imonomy.layer.isElementVisible(obj.childNodes[i], doc)){
found_visible_element = true;
break;
}
}
if (!found_visible_element)
return false;
}
if (obj.tagName == "DIV" && obj.childNodes.length == 1){
return imonomy.layer.isElementVisible(obj.childNodes[0], doc);
}
return true;
},
checkElementContent: function(element, innerDoc){
if (element != null){
var elems = element.childNodes;
for (var j = 0; j < elems.length; j++) {
var frame_element = elems[j];
frame_element.product = element.product;
frame_element.index = element.index >= 0 ? element.index : undefined;
if (frame_element.className != "flip_actions" && frame_element.className != "strip_actions" && frame_element.className != "close_x" && frame_element.className != "unit_marking"){
var is_loaded = [false, false];
if (frame_element.className == "fyva_container" || frame_element.className == "chitikaAdContainer"){
is_loaded = imonomy.layer.checkElementContent(frame_element, innerDoc);
} else{
is_loaded = imonomy.layer.checkContent(frame_element, innerDoc);
}
if (is_loaded[0] || is_loaded[1]){
return is_loaded;
}
}
}
}
return [false, false];
},
checkContent: function(element, innerDoc){
var read_doc = null;
if (!innerDoc){
read_doc = document;
} else{
read_doc = null;
}
if ((!innerDoc || element.parentNode == innerDoc.body || element.parentNode.className == "fyva_container" || element.parentNode.className == "chitikaAdContainer" ) && imonomy.layer.isElementVisible(element, read_doc)){
if (element.tagName == "IFRAME"){
var frame_loaded = imonomy.layer.checkIframeContent(element);
if (frame_loaded[0] || frame_loaded[1]){
return frame_loaded;
}
}else{
if (element.tagName != "STYLE" && element.tagName != "SCRIPT" && element.tagName != "NOSCRIPT" && typeof (element.tagName) != 'undefined' ){
var ad_id = "";
var ad_refuse_refresh = false;
if (element && element.ownerDocument){
var win = element.ownerDocument.defaultView || element.ownerDocument.parentWindow;
if (win){
if (win.va_curr_unit_id){
ad_id = win.va_curr_unit_id
// check va_format to make sure its not the parent ad we get the id of
} else if (win.parent && win.parent.va_format && win.parent.va_curr_unit_id){
ad_id = win.parent.va_curr_unit_id
}
if (win.va_ad_refuse_refresh){
ad_refuse_refresh = win.va_ad_refuse_refresh
// check va_format to make sure its not the parent ad we get the id of
} else if (win.parent && win.parent.va_ad_refuse_refresh){
ad_refuse_refresh = win.parent.va_ad_refuse_refresh
}
}
}
return [true, true, ad_id, ad_refuse_refresh];
}
}
} else if (element && element.className && element.className == "fyva_noshow"){
return [false, true, 998]
}
return [false, false];
},
checkIframeContent: function(frame_element){
try{
var fcowin = frame_element.contentWindow;
if (fcowin == null)
return [false, true];
var innerDoc = frame_element.contentWindow.document;
if (typeof(innerDoc) == 'undefined'){return [true, true];} // fix for safari bug cant get access to iframe
}catch(e){
var ad_id = "";
ad_refuse_refresh = false;
if (frame_element && frame_element.ownerDocument){
var win = frame_element.ownerDocument.defaultView || frame_element.ownerDocument.parentWindow;
if (win){
if (win.va_curr_unit_id){
ad_id = win.va_curr_unit_id
// check va_format to make sure its not the parent ad we get the id of
} else if (win.parent && win.parent.va_format && win.parent.va_curr_unit_id){
ad_id = win.parent.va_curr_unit_id
}
if (win.va_ad_refuse_refresh){
ad_refuse_refresh = win.va_ad_refuse_refresh
// check va_format to make sure its not the parent ad we get the id of
} else if (win.parent && win.parent.va_ad_refuse_refresh){
ad_refuse_refresh = win.parent.va_ad_refuse_refresh
}
}
}
return [true, true, ad_id, ad_refuse_refresh];
}
if (innerDoc && innerDoc.body != null){
var elems = innerDoc.body.getElementsByTagName("*");
var all_elems = frame_element.contentWindow.document.getElementsByTagName("*");
var product = frame_element.product;
var index;
if(imonomy.settings.allow_auto_passback){
if(product != "slider" && product != "sticky"){
index = frame_element.index;
}
var all_elemsLength = all_elems.length;
if(all_elemsLength > imonomy.layer.elementsCounter[product][index]){
imonomy.layer.elementsCounter[product][index] = all_elemsLength;
}else if(all_elemsLength > imonomy.layer.elementsCounter[product]){
imonomy.layer.elementsCounter[product] = all_elemsLength;
}else{
if(index >= 0){
if(imonomy.layer.productCounter[product][index] >= imonomy.settings.auto_passback_time && !frame_element.requested){
imonomy.layer.autoPassBack(frame_element);
}
}else{
if(imonomy.layer.productCounter[product] >= imonomy.settings.auto_passback_time && !frame_element.requested){
imonomy.layer.autoPassBack(frame_element);
}
}
}
}
for (var j = 0; j < elems.length; j++) {
var frame_element = elems[j];
frame_element.product = product;
frame_element.index = index;
var is_loaded = [false, false];
if (frame_element.className == "fyva_container" || frame_element.className == "chitikaAdContainer"){
is_loaded = imonomy.layer.checkElementContent(frame_element, innerDoc);
} else{
is_loaded = imonomy.layer.checkContent(frame_element, innerDoc);
}
if (is_loaded[0] || is_loaded[1]){
return is_loaded;
}
}
}
return [false, false]
},
crCap_check: false,
checkCrCap: function(frame_el){
if (imonomy.layer.crCap_check)
return;
imonomy.layer.crCap_check = true;
// check if criteo shown
if (imonomy.settings.unit_id == 1023){
// if true increase cookie
if (frame_el){
if (frame_el.tagName != "IFRAME"){
frame_els = frame_el.getElementsByTagName("IFRAME");
if (frame_els && frame_els.length > 0){
frame_el = frame_els[0];
} else{
return;
}
}
var inner_frames = null;
try{
inner_frames = frame_el.contentWindow.document.getElementsByTagName("IFRAME");
} catch(e){
// does not support IE8 and lower
inner_frames = null;
}
if (inner_frames != null && typeof(inner_frames) != 'undefined'){
for (var i = 0; i < inner_frames.length; i++) {
var curr_frame = inner_frames[i];
if (curr_frame && curr_frame.id){
if (curr_frame.id.startsWith("va_")){
return false;
}
}
}
} else{
return false;
}
}
var cr_cap = 1;
if (imonomy.settings.cr_cap_history){
cr_cap = imonomy.settings.cr_cap_history + 1
}
var params = "exp=8&nm=imonomy_cr_cap_count&vl=" + escape(cr_cap);
imonomy.preload.injectScript(imonomy.utils.protocol() +'//srv.imonomy.com/cookies/create.js?' + params);
// set cookie
return true;
}
return false;
},
isContentLoaded: function(){
if (imonomy.layer.is_content_loaded == null){
var frame_c = document.getElementById("imonomy_layer_frame_c");
if (frame_c){
frame_c.product = "tip";
var is_loaded = imonomy.layer.checkElementContent(frame_c);
if ( is_loaded[0] || is_loaded[1]){
imonomy.layer.is_content_loaded = is_loaded[0];
if (is_loaded.length > 2){
imonomy.layer.loaded_ad_id = is_loaded[2];
}
if (is_loaded.length > 3){
frame_c.ad_refuse_refresh = is_loaded[3];
}
if (!is_loaded[0]){
imonomy.layer.checkPassbackCode(frame_c.product);
}
return is_loaded[0];
}
}
return false;
}else{
return imonomy.layer.is_content_loaded;
}
}
};
imonomy.layer.set_values();
imonomy.layer.init_settings();
imonomy.page.start = new Date().getTime();
})();