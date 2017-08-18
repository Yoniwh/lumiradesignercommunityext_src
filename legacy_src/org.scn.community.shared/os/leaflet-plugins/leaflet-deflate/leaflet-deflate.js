/*
 * https://github.com/oliverroick/Leaflet.Deflate
 */
define(["leaflet"], function (L) {
L.Map.Deflate=L.Map.extend({options:{minSize:10},removedPaths:[],isCollapsed:function(e,t){var o=e.getBounds(),s=this.project(o.getNorthEast(),t),i=this.project(o.getSouthWest(),t),r=s.x-i.x,h=i.y-s.y;return h<this.options.minSize||r<this.options.minSize},getZoomThreshold:function(e){var t=null,o=this.getZoom();if(this.isCollapsed(e,this.getZoom()))for(;!t;)o+=1,this.isCollapsed(e,o)||(t=o-1);else for(;!t;)o-=1,this.isCollapsed(e,o)&&(t=o);return t},initialize:function(e,t){L.Map.prototype.initialize.call(this,e,t),t=L.setOptions(this,t),this.on("layeradd",function(e){var t=e.layer;if(t.getBounds&&!t.zoomThreshold&&!t.marker){var o=this.getZoomThreshold(t),s=L.marker(t.getBounds().getCenter());t.zoomThreshold=o,t.marker=s,this.getZoom()<=o&&(this.removeLayer(t),this.addLayer(t.marker))}}),this.on("zoomend",function(){var e=[];this.eachLayer(function(t){this.getZoom()<=t.zoomThreshold&&(this.removeLayer(t),this.addLayer(t.marker),e.push(t))},this);for(var t=0;t<this.removedPaths.length;t++){var o=this.removedPaths[t];this.getZoom()>o.zoomThreshold&&(this.removeLayer(o.marker),this.addLayer(o),this.removedPaths.splice(t,1),t-=1)}this.removedPaths=this.removedPaths.concat(e)})}}),L.map.deflate=function(e,t){return new L.Map.Deflate(e,t)};
});