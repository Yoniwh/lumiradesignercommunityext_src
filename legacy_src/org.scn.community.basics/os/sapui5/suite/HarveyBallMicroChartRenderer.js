/*!
 * SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2013 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.suite.ui.commons.HarveyBallMicroChartRenderer");sap.suite.ui.commons.HarveyBallMicroChartRenderer={};
sap.suite.ui.commons.HarveyBallMicroChartRenderer.render=function(r,c){var R=sap.ui.getCore().getConfiguration().getRTL();var t=c.getTooltip_AsString();if(typeof t!=="string"){t="";}var v="";var V="";var f=false;var a=0;var C="";var s=false;if(c.getItems().length){var p=c.getItems()[0];a=p.getFraction();C=p.getColor();v=p.getFractionLabel()?p.getFractionLabel():""+p.getFraction();V=p.getFractionScale().substring(0,3);f=p.getFormattedLabel();}if(f){var F=c._parseFormattedValue(v);V=F.scale.substring(0,3);v=F.value;}var T=c.getTotal();var b=c.getTotalLabel()?c.getTotalLabel():""+c.getTotal();var d=c.getTotalScale().substring(0,3);if(c.getFormattedLabel()){var o=c._parseFormattedValue(b);d=o.scale.substring(0,3);b=o.value;}var i=5;if(v){v=(v.length>=i&&(v[i-1]==="."||v[i-1]===","))?v.substring(0,i-1):v.substring(0,i);}if(b){b=(b.length>=i&&(b[i-1]==="."||b[i-1]===","))?b.substring(0,i-1):b.substring(0,i);}if(c.getColorPalette()){s=c.getColorPalette()[0];}var S=c.getSize();r.write("<div");r.writeControlData(c);r.writeAttributeEscaped("title",t);r.addClass("suiteHBMC");r.addClass(S);if(c.hasListeners("press")){r.addClass("sapSuiteUiCommonsPointer");r.writeAttribute("tabindex","0");}r.writeClasses();if(c.getWidth()){r.addStyle("width",c.getWidth());}r.writeStyles();r.write(">");r.write("<div");r.addClass("suiteHBMCChartCnt");r.addClass(S);r.writeClasses();r.addStyle("display","inline-block");r.writeStyles();r.writeAttribute("role","presentation");r.writeAttributeEscaped("aria-label",c.getAltText().replace(/\s/g," ")+(sap.ui.Device.browser.firefox?"":" "+t));r.write(">");r.write("<svg");r.writeAttribute("id",c.getId()+"-harvey-ball");r.writeAttribute("width",c._oPath.size);r.writeAttribute("height",c._oPath.size);r.writeAttribute("focusable",false);r.write(">");r.write("<g>");r.write("<circle");r.writeAttribute("cx",c._oPath.center);r.writeAttribute("cy",c._oPath.center);r.writeAttribute("r",(sap.ui.getCore().getConfiguration().getTheme()==="sap_hcb")?c._oPath.center-1:c._oPath.center);r.addClass("suiteHBMCSBall");r.writeClasses();r.write("/>");if(!a){}else if(a>=T){r.write("<circle");r.writeAttribute("cx",c._oPath.center);r.writeAttribute("cy",c._oPath.center);r.writeAttribute("r",c._oPath.center-c._oPath.border);r.addClass("suiteHBMCSgmnt");r.addClass(C);r.writeClasses();if(c.getColorPalette()){r.addStyle("fill",c.getColorPalette()[0]);r.writeStyles();}r.write("/>");}else if(a>0){r.write("<path");r.writeAttribute("id",c.getId()+"-segment");r.addClass("suiteHBMCSgmnt");r.addClass(C);r.writeClasses();r.writeAttribute("d",c.serializePieChart());if(c.getColorPalette().length!=0){r.addStyle("fill",c.getColorPalette()[0]);r.writeStyles();}r.write("/>");}r.write("</g>");r.write("</svg>");r.write("</div>");r.write("<div");r.addClass("suiteHBMCValSclCnt");r.addClass(S);r.addClass(C);if(s){r.addClass("CP");}r.writeClasses();r.addStyle("display",c.getShowFractions()?"inline-block":"none");r.writeStyles();r.write(">");r.write("<p");r.write(">");this.renderLabel(r,c,[C,S,"suiteHBMCVal"],v,"-fraction");this.renderLabel(r,c,[C,S,"suiteHBMCValScale"],V,"-fraction-scale");r.write("</p>");r.write("</div>");r.write("<div");r.addClass("suiteHBMCTtlSclCnt");r.addClass(S);r.writeClasses();if(R){r.addStyle("left","0");}else{r.addStyle("right","0");}r.addStyle("display",c.getShowTotal()?"inline-block":"none");r.writeStyles();r.write(">");this.renderLabel(r,c,[C,S,"suiteHBMCTtl"],b,"-total");this.renderLabel(r,c,[C,S,"suiteHBMCTtlScale"],d,"-total-scale");r.write("</div>");r.write("</div>");};
sap.suite.ui.commons.HarveyBallMicroChartRenderer.renderLabel=function(r,c,C,l,I){r.write("<span");r.writeAttribute("id",c.getId()+I);for(var i=0;i<C.length;i++){r.addClass(C[i]);}r.writeClasses();r.write(">");if(l){r.writeEscaped(l);}r.write("</span>");};
