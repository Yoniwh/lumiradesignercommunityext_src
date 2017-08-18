/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){'use strict';var S={};S.render=function(r,c){this.startSideNavigation(r,c);this.renderArrowUp(r,c);this.renderItem(r,c);this.renderArrowDown(r,c);this.renderFixedItem(r,c);this.renderFooter(r,c);this.endSideNavigation(r,c);};S.startSideNavigation=function(r,c){var i=c.getAggregation('item');var f=c.getAggregation('fixedItem');var a=c.getExpanded();r.write('<div');r.writeControlData(c);r.writeAttribute("role",'navigation');r.addClass('sapTntSideNavigation');if(!a){r.addClass('sapTntSideNavigationNotExpanded');}if(!a&&i){i.setExpanded(false);}if(!a&&f){f.setExpanded(false);}r.writeClasses();r.write('>');};S.endSideNavigation=function(r,c){r.write('</div>');};S.renderArrowUp=function(r,c){r.renderControl(c._getTopArrowControl());};S.renderArrowDown=function(r,c){r.renderControl(c._getBottomArrowControl());};S.renderItem=function(r,c){var i=c.getAggregation('item');r.write('<div id="'+c.getId()+'-Flexible" tabindex="-1" class="sapTntSideNavigationFlexible sapTntSideNavigationVerticalScrolling">');r.write('<div id="'+c.getId()+'-Flexible-Content" class="sapTntSideNavigationFlexibleContent">');r.renderControl(i);r.write('</div></div>');};S.renderFixedItem=function(r,c){var f=c.getAggregation('fixedItem');if(f===null){return;}if(f.getExpanded()===false){f.setExpanded(false);}r.write('<div class="sapTntSideNavigationSeparator" role="separator" aria-orientation="horizontal"></div>');r.write('<div class="sapTntSideNavigationFixed">');r.renderControl(f);r.write('</div>');};S.renderFooter=function(r,c){if(c.getAggregation('footer')){r.write('<footer class="sapTntSideNavigationFooter">');r.renderControl(c.getAggregation('footer'));r.write('</footer>');}};return S;},true);
