/*!
 * SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2013 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.suite.ui.commons.GenericTile");jQuery.sap.require("sap.suite.ui.commons.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.suite.ui.commons.GenericTile",{metadata:{library:"sap.suite.ui.commons",properties:{"header":{type:"string",group:"Appearance",defaultValue:null},"subheader":{type:"string",group:"Appearance",defaultValue:null},"failedText":{type:"string",group:"Appearance",defaultValue:null},"size":{type:"sap.suite.ui.commons.InfoTileSize",group:"Misc",defaultValue:sap.suite.ui.commons.InfoTileSize.Auto},"frameType":{type:"sap.suite.ui.commons.FrameType",group:"Misc",defaultValue:sap.suite.ui.commons.FrameType.OneByOne},"backgroundImage":{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},"headerImage":{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},"state":{type:"sap.suite.ui.commons.LoadState",group:"Misc",defaultValue:sap.suite.ui.commons.LoadState.Loaded},"imageDescription":{type:"string",group:"Misc",defaultValue:null}},aggregations:{"tileContent":{type:"sap.suite.ui.commons.TileContent",multiple:true,singularName:"tileContent"},"icon":{type:"sap.ui.core.Control",multiple:false},"titleText":{type:"sap.m.Text",multiple:false,visibility:"hidden"},"failedMessageText":{type:"sap.m.Text",multiple:false,visibility:"hidden"}},events:{"press":{}}}});sap.suite.ui.commons.GenericTile.M_EVENTS={'press':'press'};jQuery.sap.require("sap.m.Text");jQuery.sap.require("sap.ui.core.IconPool");
sap.suite.ui.commons.GenericTile.prototype.init=function(){this._rb=sap.ui.getCore().getLibraryResourceBundle("sap.suite.ui.commons");this._oTitle=new sap.m.Text(this.getId()+"-title",{maxLines:2});this._oTitle.addStyleClass("sapSuiteGTTitle");this._oTitle.cacheLineHeight=false;this.setAggregation("titleText",this._oTitle);this._sFailedToLoad=this._rb.getText("INFOTILE_CANNOT_LOAD_TILE");this._sLoading=this._rb.getText("INFOTILE_LOADING");this._oFailed=new sap.m.Text(this.getId()+"-failed-txt",{maxLines:2});this._oFailed.cacheLineHeight=false;this._oFailed.addStyleClass("sapSuiteGTFailed");this.setAggregation("failedMessageText",this._oFailed);this._oWarningIcon=new sap.ui.core.Icon(this.getId()+"-warn-icon",{src:"sap-icon://notification",size:"1.37rem"});this._oWarningIcon.addStyleClass("sapSuiteGTFtrFldIcnMrk");this._oBusy=new sap.ui.core.HTML(this.getId()+"-overlay");this._oBusy.addStyleClass("sapSuiteGenericTileLoading");this._oBusy.setBusyIndicatorDelay(0);};
sap.suite.ui.commons.GenericTile.prototype.ontap=function(e){if(sap.ui.Device.browser.internet_explorer){this.$().focus();}this.firePress();};
sap.suite.ui.commons.GenericTile.prototype.onkeydown=function(e){if(e.which==jQuery.sap.KeyCodes.SPACE){e.preventDefault();}};
sap.suite.ui.commons.GenericTile.prototype.onkeyup=function(e){if(e.which==jQuery.sap.KeyCodes.ENTER||e.which==jQuery.sap.KeyCodes.SPACE){this.firePress();e.preventDefault();}};
sap.suite.ui.commons.GenericTile.prototype._handleOvrlClick=function(e){e.stopPropagation();};
sap.suite.ui.commons.GenericTile.prototype.onBeforeRendering=function(){var t=this.getTileContent().length;for(var i=0;i<t;i++){this.getTileContent()[i].setDisabled(this.getState()=="Disabled",true);}var c=this.getFailedText();var f=c?c:this._sFailedToLoad;this._oFailed.setText(f);this._oFailed.setTooltip(f);};
sap.suite.ui.commons.GenericTile.prototype.onAfterRendering=function(){this._checkFooter(this.getState());if("Disabled"==this.getState()){this._oBusy.$().bind("tap",jQuery.proxy(this._handleOvrlClick,this));}else{this._oBusy.$().unbind("tap",this._handleOvrlClick);}};
sap.suite.ui.commons.GenericTile.prototype.getHeader=function(){return this._oTitle.getText();};
sap.suite.ui.commons.GenericTile.prototype.setHeader=function(t){this._oTitle.setProperty("text",t,true);this.invalidate();return this;};
sap.suite.ui.commons.GenericTile.prototype.exit=function(){this._oWarningIcon.destroy();if(this._oImage){this._oImage.destroy();}this._oBusy.destroy();};
sap.suite.ui.commons.GenericTile.prototype.setHeaderImage=function(i){var v=!jQuery.sap.equal(this.getHeaderImage(),i);if(v){if(this._oImage){this._oImage.destroy();this._oImage=undefined;}if(i){this._oImage=sap.ui.core.IconPool.createControlByURI({id:this.getId()+"-icon-image",src:i},sap.m.Image);this._oImage.addStyleClass("sapSuiteGTHdrIconImage");}}return this.setProperty("headerImage",i);};
sap.suite.ui.commons.GenericTile.prototype.attachEvent=function(e,d,f,l){sap.ui.core.Control.prototype.attachEvent.call(this,e,d,f,l);if(this.hasListeners("press")&&this.getState()!="Disabled"){this.$().attr("tabindex",0).addClass("sapSuiteUiCommonsPointer");}return this;};
sap.suite.ui.commons.GenericTile.prototype.setState=function(s,i){this._checkFooter(s);this.setProperty("state",s,i);return this;};
sap.suite.ui.commons.GenericTile.prototype._checkFooter=function(s){var t=jQuery.sap.byId(this.getId()).find(".sapSuiteTileCntFtrTxt");if(s==="Failed"&&t.is(":visible")){t.hide();}else if(t.is(":hidden")){t.show();}};
sap.suite.ui.commons.GenericTile.prototype.detachEvent=function(e,f,l){sap.ui.core.Control.prototype.detachEvent.call(this,e,f,l);if(!this.hasListeners("press")){this.$().removeAttr("tabindex").removeClass("sapSuiteUiCommonsPointer");}return this;};
sap.suite.ui.commons.GenericTile.prototype.ontouchstart=function(e){if(this.getState()!="Disabled"){this.addStyleClass("sapSuiteGTHvrOutln");}};
sap.suite.ui.commons.GenericTile.prototype.ontouchcancel=function(e){this.removeStyleClass("sapSuiteGTHvrOutln");};
sap.suite.ui.commons.GenericTile.prototype.ontouchend=function(e){this.removeStyleClass("sapSuiteGTHvrOutln");};
sap.suite.ui.commons.GenericTile.prototype.getHeaderAltText=function(){var a="";var i=true;if(this.getHeader()){a+=jQuery.sap.encodeHTML(this.getHeader());i=false;}if(this.getSubheader()){a+=(i?"":"\n")+jQuery.sap.encodeHTML(this.getSubheader());i=false;}if(this.getImageDescription()){a+=(i?"":"\n")+jQuery.sap.encodeHTML(this.getImageDescription());}return a;};
sap.suite.ui.commons.GenericTile.prototype.getBodyAltText=function(){var a="";var I=true;var t=this.getTileContent();function c(e){if(e=="TwoByOne"){return 2;}return 1;}var f=c(this.getFrameType());var T=0;for(var i=0;i<t.length;i++){if(f>T){if(t[i].getAltText){a+=(I?"":"\n")+t[i].getAltText();I=false;}else if(t[i].getTooltip_AsString()){a+=(I?"":"\n")+t[i].getTooltip_AsString();I=false;}}else{break;}T+=c(t[i].getFrameType());}return a;};
sap.suite.ui.commons.GenericTile.prototype.getAltText=function(){switch(this.getState()){case sap.suite.ui.commons.LoadState.Disabled:return"";case sap.suite.ui.commons.LoadState.Loading:return this._sLoading;case sap.suite.ui.commons.LoadState.Failed:return this._oFailed.getText();default:return this.getHeaderAltText()+"\n"+this.getBodyAltText();}};
