/*!
 * SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2013 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.suite.ui.commons.NoteTakerRenderer");sap.suite.ui.commons.NoteTakerRenderer={};
sap.suite.ui.commons.NoteTakerRenderer.render=function(r,c){var t=c.getTooltip_AsString();r.write("<div");r.writeControlData(c);if(t){r.writeAttributeEscaped("title",t);}r.addClass("sapSuiteUiCommonsNoteTaker");r.writeClasses();r.writeAttribute("style","width:"+(c.getVisibleNotes()*350+50)+"px");r.write(">");r.write("<div");r.writeAttribute("id",c.getId()+"-filterPane");r.addClass("sapSuiteUiCommonsNoteTakerFilterPane");r.writeClasses();r.write(">");r.write("<div");r.addClass("suiteUiNtFilterPaneLeftSection");r.writeClasses();r.write(">");r.renderControl(c._oHomeButton);r.write("<span");r.writeAttribute("id",c.getId()+"-filterPane-header");r.addClass("suiteUiNtFilterTitle");r.writeClasses();r.write(">");r.writeEscaped(c._rb.getText("NOTETAKER_FILTER_TITLE")+":");r.write("</span>");r.renderControl(c._oFilterTagButton);r.renderControl(c._oFilterThumbUpButton);r.renderControl(c._oFilterThumbDownButton);r.renderControl(c._oFilterAllButton);r.write("</div>");r.write("<div");r.addClass("suiteUiNtFilterPaneRightSection");r.writeClasses();r.write(">");if(c.getVisibleNotes()>1){r.renderControl(c._oFilterSearchField);}else{r.renderControl(c._oSearchButton);}r.write("</div>");r.write("</div>");r.renderControl(c._carousel);if(c.getVisibleNotes()==1){this.searchTextRender(r,c);}r.write("<div");r.writeAttribute("id",c.getId()+"-filterTag-panel");r.addClass("sapSuiteUiCommonsNoteTakerFilterTagPanel");r.addClass("sapUiShd");r.writeClasses();r.write(">");r.write("<div");r.writeAttribute("id",c.getId()+"-filterTag-arrow");r.addClass("sapSuiteUiCommonsNoteTakerFilterTagArrow");r.writeClasses();r.write(">");r.write("</div>");r.write("<div");r.writeAttribute("id",c.getId()+"-filterTag-header");r.addClass("sapSuiteUiCommonsNoteTakerFilterTagHeader");r.writeClasses();r.write(">");r.writeEscaped(c._rb.getText("NOTETAKERFEEDER_TOOLPOPUP_TITLE"));r.write("</div>");r.write("<div>");r.renderControl(c._oFilterTagList);r.write("</div>");r.write("<div");r.addClass("sapSuiteUiCommonsNoteTakerFilterTagButtons");r.writeClasses();r.write(">");r.renderControl(c._oApplyFilterTagButton);r.renderControl(c._oCancelFilterTagButton);r.write("</div>");r.write("</div>");r.write("</div>");};
sap.suite.ui.commons.NoteTakerRenderer.searchTextRender=function(r,c){r.write("<div");r.writeAttribute("id",c.getId()+"-search-panel");r.addClass("sapSuiteUiCommonsNoteTakerSearchPanel");r.addClass("sapUiShd");r.writeClasses();r.write(">");r.write("<div");r.writeAttribute("id",c.getId()+"-search-arrow");r.addClass("sapSuiteUiCommonsNoteTakerSearchArrow");r.writeClasses();r.write(">");r.write("</div>");r.write("<div>");r.renderControl(c._oFilterSearchField);r.write("</div>");r.write("</div>");};
