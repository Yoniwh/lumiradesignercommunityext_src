/*!
 * SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2013 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.suite.ui.commons.LinkActionSheet");jQuery.sap.require("sap.suite.ui.commons.library");jQuery.sap.require("sap.m.ActionSheet");sap.m.ActionSheet.extend("sap.suite.ui.commons.LinkActionSheet",{metadata:{library:"sap.suite.ui.commons",aggregations:{"items":{type:"sap.ui.core.Control",multiple:true,singularName:"item"}},events:{"itemPress":{allowPreventDefault:true}}}});sap.suite.ui.commons.LinkActionSheet.M_EVENTS={'itemPress':'itemPress'};
sap.suite.ui.commons.LinkActionSheet.prototype.init=function(){if(jQuery.device.is.desktop){sap.m.ActionSheet.prototype.init.apply(this);this.getButtons=this.getItems;}else{this._setItemNavigation=function(){};this.attachBeforeOpen(function(){this.onclick=function(e){e.preventDefault();};}).attachAfterOpen(function(){this.onclick=function(e){};});}};
sap.suite.ui.commons.LinkActionSheet.prototype._preProcessActionItem=function(i){if(i.getType&&i.getType()!==sap.m.ButtonType.Accept&&i.getType()!==sap.m.ButtonType.Reject){i.setType(sap.m.ButtonType.Transparent);i.addStyleClass("sapMBtnInverted");}i.onsapenter=function(){this._bEnterWasPressed=true;};return this;};
sap.suite.ui.commons.LinkActionSheet.prototype._itemSelected=function(e){var i=e.getSource();if(this.fireItemPress({item:i})){if(!(jQuery.device.is.ipad||(!jQuery.device.is.phone))&&this._parent){this._parent._oCloseTrigger=this;}this.close();}i._bEnterWasPressed=undefined;};
sap.suite.ui.commons.LinkActionSheet.prototype.addItem=function(i){this.addAggregation("items",i,false);this._preProcessActionItem(i);i.attachPress(this._itemSelected,this);return this;};
sap.suite.ui.commons.LinkActionSheet.prototype.insertItem=function(i,I){this.insertAggregation("items",i,I,false);this._preProcessActionItem(i);i.attachPress(this._itemSelected,this);return this;};
sap.suite.ui.commons.LinkActionSheet.prototype.removeItem=function(i){var r=this.removeAggregation("items",i,false);if(r){r.detachPress(this._itemSelected,this);i.onsapenter=undefined;}return r;};
sap.suite.ui.commons.LinkActionSheet.prototype.removeAllItems=function(){var r=this.removeAllAggregation("items",false);var t=this;jQuery.each(r,function(i,I){I.detachPress(t._itemSelected,t);I.onsapenter=undefined;});return r;};
sap.suite.ui.commons.LinkActionSheet.prototype.clone=function(){var I=this.getItems();for(var i=0;i<I.length;i++){var o=I[i];o.detachPress(this._itemSelected,this);}var c=sap.ui.core.Control.prototype.clone.apply(this,arguments);for(var i=0;i<I.length;i++){var o=I[i];o.attachPress(this._itemSelected,this);}return c;};
