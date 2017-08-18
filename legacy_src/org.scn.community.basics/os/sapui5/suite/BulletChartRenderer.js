/*!
 * SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2013 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.suite.ui.commons.BulletChartRenderer");sap.suite.ui.commons.BulletChartRenderer={};
sap.suite.ui.commons.BulletChartRenderer.render=function(r,c){var C=c._calculateChartData();var f=+C.forecastValuePct;var s=c.getSize();var S=c.getScale();var R=sap.ui.getCore().getConfiguration().getRTL();var o=R?"right":"left";var m=c.getMode();var d=(sap.suite.ui.commons.BulletChartMode.Delta==m)?c._calculateDeltaValue():0;var I=c.getActual()&&c.getActual()._isValueSet;var b=c.getShowActualValue()&&(sap.suite.ui.commons.InfoTileSize.XS!=s)&&sap.suite.ui.commons.BulletChartMode.Actual==m;var a=c.getShowDeltaValue()&&(sap.suite.ui.commons.InfoTileSize.XS!=s)&&sap.suite.ui.commons.BulletChartMode.Delta==m;var e=c.getShowTargetValue()&&(sap.suite.ui.commons.InfoTileSize.XS!=s);var A=c.getActualValueLabel();var D=c.getDeltaValueLabel();var t=c.getTargetValueLabel();var g=c.getThresholds();var T=c.getTooltip_AsString();if(typeof T!=="string"){T="";}r.write("<div");r.writeControlData(c);r.addClass("sapSuiteBCContent");r.addClass(s);if(c.hasListeners("press")){r.addClass("sapSuiteUiCommonsPointer");r.writeAttribute("tabindex","0");}r.writeAttribute("role","presentation");r.writeAttributeEscaped("aria-label",c.getAltText().replace(/\s/g," ")+(sap.ui.Device.browser.firefox?"":" "+T));r.writeClasses();if(c.getWidth()){r.addStyle("width",c.getWidth());r.writeStyles();}r.writeAttribute("id",c.getId()+"-bc-content");r.writeAttributeEscaped("title",T);r.write(">");r.write("<div");r.addClass("sapSuiteBCChart");r.addClass(s);r.writeClasses();r.writeAttribute("id",c.getId()+"-bc-chart");r.write(">");if(I&&b){var h=(A)?A:""+c.getActual().getValue();var v=h+S;r.write("<div");r.addClass("sapSuiteBCItemValue");r.addClass(c.getActual().getColor());r.addClass(s);r.writeClasses();r.writeStyles();r.writeAttribute("id",c.getId()+"-bc-item-value");r.write(">");r.writeEscaped(v);r.write("</div>");}else if(I&&c._isTargetValueSet&&a){var j=(D)?D:""+d;var v=j+S;r.write("<div");r.addClass("sapSuiteBCItemValue");r.addClass(c.getActual().getColor());r.addClass(s);r.writeClasses();r.writeStyles();r.writeAttribute("id",c.getId()+"-bc-item-value");r.write(">");r.write("&Delta;");r.writeEscaped(v);r.write("</div>");}for(var i=0;i<C.thresholdsPct.length;i++){if(g[i]._isValueSet){this.renderThreshold(r,c,C.thresholdsPct[i]);}}r.write("<div");r.writeAttribute("id",c.getId()+"-chart-bar");r.addClass("sapSuiteBCBar");r.addClass(s);r.addClass(c.getScaleColor());r.writeClasses();r.write(">");r.write("</div>");if(c._isForecastValueSet&&"Actual"==m){r.write("<div");r.addClass("sapSuiteBCForecastBarValue");r.addClass(c.getActual().getColor());r.addClass(s);r.writeClasses();r.addStyle("width",f+"%");r.writeStyles();r.writeAttribute("id",c.getId()+"-forecast-bar-value");r.write("></div>");}if(I){r.write("<div");r.addClass("sapSuiteBCBarValueMarker");r.addClass(m);if(!c.getShowValueMarker()){r.addClass("sapSuiteBCBarValueMarkerHidden");}r.addClass(c.getActual().getColor());r.addClass(s);r.writeClasses();r.addStyle(o,parseFloat(C.actualValuePct)+parseFloat(1)+"%");if("Delta"==m&&C.actualValuePct<=C.targetValuePct){r.addStyle("margin","0");}r.writeStyles();r.writeAttribute("id",c.getId()+"-bc-bar-value-marker");r.write("></div>");if("Actual"==m){r.write("<div");r.addClass("sapSuiteBCBarValue");r.addClass(c.getActual().getColor());r.addClass(s);if(c._isForecastValueSet){r.addClass("sapSuiteBCForecast");}r.writeClasses();r.addStyle("width",C.actualValuePct+"%");r.writeStyles();r.writeAttribute("id",c.getId()+"-bc-bar-value");r.write("></div>");}else if(c._isTargetValueSet&&"Delta"==m){r.write("<div");r.addClass("sapSuiteBCBarValue");r.addClass(c.getActual().getColor());r.addClass(s);r.writeClasses();r.addStyle("width",Math.abs(C.actualValuePct-C.targetValuePct)+"%");r.addStyle(o,1+Math.min(C.actualValuePct,C.targetValuePct)+"%");r.writeStyles();r.writeAttribute("id",c.getId()+"-bc-bar-value");r.write("></div>");}}if(c._isTargetValueSet){r.write("<div");r.addClass("sapSuiteBCTargetBarValue");r.addClass(s);r.writeClasses();r.addStyle(o,parseFloat(C.targetValuePct).toFixed(2)+"%");r.writeStyles();r.writeAttribute("id",c.getId()+"-bc-target-bar-value");r.write("></div>");if(e){var k=(t)?t:""+c.getTargetValue();var l=k+S;r.write("<div");r.addClass("sapSuiteBCTargetValue");r.addClass(s);r.writeClasses();r.writeStyles();r.writeAttribute("id",c.getId()+"-bc-target-value");r.write(">");r.writeEscaped(l);r.write("</div>");}}r.write("</div>");r.write("<div");r.writeAttribute("id",c.getId()+"-info");r.writeAttribute("aria-hidden","true");r.addStyle("display","none");r.writeStyles();r.write(">");r.writeEscaped(T);r.write("</div>");r.write("</div>");};
sap.suite.ui.commons.BulletChartRenderer.renderThreshold=function(r,c,t){var o=sap.ui.getCore().getConfiguration().getRTL()?"right":"left";var v=.98*t.valuePct+1;var C=t.color;var s=c.getSize();if(sap.suite.ui.commons.InfoTileValueColor.Error==t.color){r.write("<div");r.addClass("sapSuiteBCDiamond");r.addClass(s);r.addClass(C);r.writeClasses();r.addStyle(o,v+"%");r.writeStyles();r.write("></div>");}r.write("<div");r.addClass("sapSuiteBCThreshold");r.addClass(s);r.addClass(C);r.writeClasses();r.addStyle(o,v+"%");r.writeStyles();r.write("></div>");};
