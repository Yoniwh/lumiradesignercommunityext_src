sap.ui.define(["jquery.sap.global","./library","sap/ui/core/Item",'sap/ui/core/Icon','./NavigationList','sap/ui/core/Renderer','sap/ui/core/IconPool'],function(q,l,I,a,N,R,b){"use strict";var c=I.extend("sap.tnt.NavigationListItem",{metadata:{library:"sap.tnt",properties:{icon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:''},expanded:{type:"boolean",group:"Misc",defaultValue:true},hasExpander:{type:"boolean",group:"Misc",defaultValue:true}},defaultAggregation:"items",aggregations:{items:{type:"sap.tnt.NavigationListItem",multiple:true,singularName:"item"},_expandIconControl:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"}},events:{select:{parameters:{item:{type:"sap.ui.core.Item"}}}}}});c.expandIcon='sap-icon://navigation-right-arrow';c.collapseIcon='sap-icon://navigation-down-arrow';c.prototype._getExpandIconControl=function(){var e=this.getAggregation('_expandIconControl');if(!e){var d=this.getExpanded();e=new a({src:d?c.collapseIcon:c.expandIcon,visible:this.getItems().length>0&&this.getHasExpander(),useIconTooltip:false,tooltip:this._getExpandIconTooltip(!d)}).addStyleClass('sapTntNavLIExpandIcon');this.setAggregation("_expandIconControl",e,true);}return e;};c.prototype._getExpandIconTooltip=function(e){if(!this.getEnabled()){return'';}var t=e?'Icon.expand':'Icon.collapse';return this.getNavigationList()._resourceBundle.getText(t);};c.prototype.getLevel=function(){var d=0;var p=this.getParent();if(p.getMetadata().getName()=='sap.tnt.NavigationListItem'){return p.getLevel()+1;}return d;};c.prototype.getNavigationList=function(){var p=this.getParent();while(p&&p.getMetadata().getName()!='sap.tnt.NavigationList'){p=p.getParent();}return p;};c.prototype.createPopupList=function(){var n=[],d=this.getNavigationList(),s=d.getSelectedItem(),p,e,f,g=this.getItems();for(var i=0;i<g.length;i++){e=g[i];f=new c({key:e.getId(),text:e.getText(),textDirection:e.getTextDirection(),enabled:e.getEnabled()});n.push(f);if(s==e){p=f;}}var h=new c({expanded:true,hasExpander:false,key:this.getId(),text:this.getText(),enabled:this.getEnabled(),textDirection:this.getTextDirection(),items:n});var j=new N({itemSelect:this.onPopupItemSelect.bind(this),items:[h]}).addStyleClass('sapTntNavLIPopup');j.setHasListBoxRole(true);if(s==this){p=h;j.isGroupSelected=true;}j.setSelectedItem(p);return j;};c.prototype.onPopupItemSelect=function(e){var i=e.getParameter('item');i=sap.ui.getCore().byId(i.getKey());i._selectItem(e);};c.prototype._selectItem=function(e){var p={item:this};this.fireSelect(p);var n=this.getNavigationList();n._selectItem(p);};c.prototype.onkeydown=function(e){if(e.isMarked('subItem')){return;}e.setMarked('subItem');if(this.getLevel()>0){return;}var i=sap.ui.getCore().getConfiguration().getRTL();if((e.shiftKey&&e.which==189)||e.which==q.sap.KeyCodes.NUMPAD_MINUS||(e.which==q.sap.KeyCodes.ARROW_RIGHT&&i)||(e.which==q.sap.KeyCodes.ARROW_LEFT&&!i)){if(this.collapse()){e.preventDefault();e.target=null;}}else if(e.which==q.sap.KeyCodes.NUMPAD_PLUS||(e.shiftKey&&e.which==q.sap.KeyCodes.PLUS)||e.which==q.sap.KeyCodes.ARROW_LEFT&&i||e.which==q.sap.KeyCodes.ARROW_RIGHT&&!i){if(this.expand()){e.preventDefault();e.target=null;}}};c.prototype.expand=function(d){if(this.getExpanded()||!this.getHasExpander()||this.getItems().length==0||this.getLevel()>0){return;}this.setProperty('expanded',true,true);this.$().find('.sapTntNavLIGroup').attr('aria-expanded',true);var e=this._getExpandIconControl();e.setSrc(c.collapseIcon);e.setTooltip(this._getExpandIconTooltip(false));var $=this.$().find('.sapTntNavLIGroupItems');$.stop(true,true).slideDown(d||'fast',function(){$.toggleClass('sapTntNavLIHiddenGroupItems');});this.getNavigationList()._updateNavItems();return true;};c.prototype.collapse=function(d){if(!this.getExpanded()||!this.getHasExpander()||this.getItems().length==0||this.getLevel()>0){return;}this.setProperty('expanded',false,true);this.$().find('.sapTntNavLIGroup').attr('aria-expanded',false);var e=this._getExpandIconControl();e.setSrc(c.expandIcon);e.setTooltip(this._getExpandIconTooltip(true));var $=this.$().find('.sapTntNavLIGroupItems');$.stop(true,true).slideUp(d||'fast',function(){$.toggleClass('sapTntNavLIHiddenGroupItems');});this.getNavigationList()._updateNavItems();return true;};c.prototype.ontap=function(e){if(e.isMarked('subItem')||!this.getEnabled()){return;}e.setMarked('subItem');e.preventDefault();var n=this.getNavigationList();var s=sap.ui.getCore().byId(e.target.id);var d=this.getLevel();if(d==1){var p=this.getParent();if(this.getEnabled()&&p.getEnabled()){this._selectItem(e);}return;}if(n.getExpanded()){if(!s||s.getMetadata().getName()!='sap.ui.core.Icon'||!s.$().hasClass('sapTntNavLIExpandIcon')){this._selectItem(e);return;}if(this.getExpanded()){this.collapse();}else{this.expand();}}else{var f=this.createPopupList();n._openPopover(this,f);}};c.prototype.onsapenter=c.prototype.ontap;c.prototype.onsapspace=c.prototype.ontap;c.prototype.render=function(r,d){if(this.getLevel()==0){this.renderFirstLevelNavItem(r,d);}else{this.renderSecondLevelNavItem(r,d);}};c.prototype.renderGroupItem=function(r,d){r.write('<div');r.addClass("sapTntNavLIItem");r.addClass("sapTntNavLIGroup");if(!this.getEnabled()){r.addClass("sapTntNavLIItemDisabled");}else if(d.getExpanded()){r.write(' tabindex="-1"');}if(d.getExpanded()){if(d.getHasListBoxRole()){r.writeAttribute("role",'option');}else{r.writeAttribute("role",'treeitem');if(this.getItems().length>0){r.writeAttribute("aria-expanded",this.getExpanded());}r.writeAttribute("aria-level",1);}var t=this.getText();var T=this.getTooltip_AsString()||t;if(T){r.writeAttributeEscaped("title",T);}r.writeAttributeEscaped("aria-label",t);}r.writeClasses();r.write(">");if(d.getExpanded()){var e=this._getExpandIconControl();e.setVisible(this.getItems().length>0&&this.getHasExpander());e.setSrc(this.getExpanded()?c.collapseIcon:c.expandIcon);e.setTooltip(this._getExpandIconTooltip(!this.getExpanded()));this._renderIcon(r);this._renderText(r);r.renderControl(e);}else{this._renderIcon(r);}r.write("</div>");};c.prototype.renderFirstLevelNavItem=function(r,d){var e,f=this.getItems(),g=this.getExpanded(),h=d.getExpanded();r.write('<li');r.writeElementData(this);if(this.getEnabled()&&!h){r.write(' tabindex="-1"');}var t=this.getText();if(!h){var t=this.getText();var T=this.getTooltip_AsString()||t;if(T){r.writeAttributeEscaped("title",T);}r.writeAttributeEscaped("aria-label",t);r.writeAttribute("role",'button');r.writeAttribute("aria-haspopup",true);}else{r.write(' role="presentation" ');}r.write(">");this.renderGroupItem(r,d);if(h){r.write("<ul");r.addClass("sapTntNavLIGroupItems");if(!g){r.addClass("sapTntNavLIHiddenGroupItems");}r.writeClasses();r.write(">");for(var i=0;i<f.length;i++){e=f[i];e.render(r,d,this);}r.write("</ul>");}r.write("</li>");};c.prototype.renderSecondLevelNavItem=function(r,d){var g=this.getParent();r.write('<li');r.writeElementData(this);r.addClass("sapTntNavLIItem");r.addClass("sapTntNavLIGroupItem");if(!this.getEnabled()||!g.getEnabled()){r.addClass("sapTntNavLIItemDisabled");}else{r.write(' tabindex="-1"');}var t=this.getText();var T=this.getTooltip_AsString()||t;if(T){r.writeAttributeEscaped("title",T);}if(d.getHasListBoxRole()){r.writeAttribute("role",'option');}else{r.writeAttribute("role",'treeitem');r.writeAttribute("aria-level",2);}r.writeClasses();r.write(">");this._renderText(r);r.write("</li>");};c.prototype._renderIcon=function(r){r.write('<span');r.addClass("sapUiIcon");r.addClass("sapTntNavLIGroupIcon");r.writeAttribute("aria-hidden",true);var i=this.getIcon();var d=b.getIconInfo(i);if(d&&!d.suppressMirroring){r.addClass("sapUiIconMirrorInRTL");}if(d){r.writeAttribute("data-sap-ui-icon-content",d.content);r.addStyle("font-family","'"+d.fontFamily+"'");}r.writeClasses();r.writeStyles();r.write("></span>");};c.prototype._renderText=function(r){r.write('<span');r.addClass("sapMText");r.addClass("sapTntNavLIText");r.addClass("sapMTextNoWrap");r.writeClasses();var t=this.getTextDirection();if(t!==sap.ui.core.TextDirection.Inherit){r.writeAttribute("dir",t.toLowerCase());}var d=R.getTextAlign(sap.ui.core.TextAlign.Begin,t);if(d){r.addStyle("text-align",d);r.writeStyles();}r.write(">");r.writeEscaped(this.getText());r.write("</span>");};c.prototype._unselect=function(){var $=this.$(),n=this.getNavigationList();if(!n){return;}$.removeClass('sapTntNavLIItemSelected');if(n.getExpanded()){if(this.getLevel()==0){$=$.find('.sapTntNavLIGroup');}$.removeAttr('aria-selected');}else{$.removeAttr('aria-pressed');}};c.prototype._select=function(){var $=this.$(),n=this.getNavigationList();if(!n){return;}$.addClass('sapTntNavLIItemSelected');if(n.getExpanded()){if(this.getLevel()==0){$=$.find('.sapTntNavLIGroup');}$.attr('aria-selected',true);}else{$.attr('aria-pressed',true);}};c.prototype._getDomRefs=function(){var d=[];if(!this.getEnabled()){return d;}var $=this.$();if(this.getParent().getExpanded()){d.push($.find('.sapTntNavLIGroup')[0]);}else{d.push($[0]);}if(this.getExpanded()){var s=$.find('.sapTntNavLIGroupItem');for(var i=0;i<s.length;i++){d.push(s[i]);}}return d;};return c;},true);
/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
