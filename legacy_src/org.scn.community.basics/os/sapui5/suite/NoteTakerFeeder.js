/*!
 * SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2013 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.suite.ui.commons.NoteTakerFeeder");jQuery.sap.require("sap.suite.ui.commons.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.suite.ui.commons.NoteTakerFeeder",{metadata:{library:"sap.suite.ui.commons",properties:{"body":{type:"string",group:"Data",defaultValue:null},"title":{type:"string",group:"Data",defaultValue:null},"tags":{type:"object",group:"Misc",defaultValue:[]},"thumbUp":{type:"boolean",group:"Misc",defaultValue:null},"thumbDown":{type:"boolean",group:"Misc",defaultValue:null},"attachmentUploadUrl":{type:"string",group:"Misc",defaultValue:null},"attachmentName":{type:"string",group:"Misc",defaultValue:'attachment'}},aggregations:{"bodyArea":{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},"titleInput":{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},"fileUploader":{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},"tagInput":{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},events:{"addNote":{},"attachmentSelect":{},"attachmentUploadComplete":{},"attachmentDelete":{},"attachmentClick":{}}}});sap.suite.ui.commons.NoteTakerFeeder.M_EVENTS={'addNote':'addNote','attachmentSelect':'attachmentSelect','attachmentUploadComplete':'attachmentUploadComplete','attachmentDelete':'attachmentDelete','attachmentClick':'attachmentClick'};jQuery.sap.require("sap.ui.ux3.ToolPopup");jQuery.sap.require("sap.m.Button");
sap.suite.ui.commons.NoteTakerFeeder.prototype.init=function(){this._rb=sap.ui.getCore().getLibraryResourceBundle("sap.suite.ui.commons");this._selectedTags=[];this._bTagPopupOpen=false;var t=this;this._oAddButton=new sap.ui.commons.Button({id:this.getId()+"-add-button",text:this._rb.getText("NOTETAKERFEEDER_BUTTON_ADD_TEXT"),tooltip:this._rb.getText("NOTETAKERFEEDER_BUTTON_ADD_TOOLTIP"),press:function(){t._handleAdd();}});this._oAddButton.addStyleClass("sapSuiteUiCommonsNoteTakerFeederHeaderAddButton");this._oTagList=new sap.ui.commons.ListBox({id:this.getId()+"-tagListBox",visibleItems:10,width:"100%",height:"194px",select:function(e){t._handleListSelect(e);}});this._oTagInput=new sap.ui.commons.TextField({id:this.getId()+"-inputTag",liveChange:function(e){t._handleTagInputLive(e);}});this.setAggregation("tagInput",this._oTagInput);this._oTagInput.onsapdown=function(e){e.preventDefault();e.stopPropagation();jQuery("#"+t.getId()+"-tagListBox li:eq(0)").focus();};this._oCancelTagButton=new sap.ui.commons.Button({id:this.getId()+"-cancel-tags-button",text:this._rb.getText("NOTETAKERFEEDER_BUTTON_CANCEL_TAGS"),tooltip:this._rb.getText("NOTETAKERFEEDER_BUTTON_CANCEL_TAGS_TOOLTIP"),press:function(){t._toggleTagPopup();}});this._oCancelTagButton.addStyleClass("sapSuiteUiCommonsNoteTakerFeederCancelTagButton");this._oCancelTagButton.onfocusout=function(e){t._oTagInput.focus();};this._oAddTagButton=new sap.ui.commons.Button({id:this.getId()+"-add-tags-button",text:this._rb.getText("NOTETAKERFEEDER_BUTTON_ADD_TAGS"),tooltip:this._rb.getText("NOTETAKERFEEDER_BUTTON_ADD_TAGS_TOOLTIP"),press:function(){t._handleAddTag(t._oTagInput.getValue());t._oTagButton.rerender();t._toggleTagPopup();}});this._oTagButton=new sap.ui.commons.Button({id:this.getId()+"-tag-button",tooltip:this._rb.getText("NOTETAKERFEEDER_BUTTON_TAG_TOOLTIP"),press:function(){t._toggleTagPopup();}});this._oTagButton.addStyleClass("sapSuiteUiCommonsNoteTakerFeederTagButton");this._oTitle=new sap.ui.commons.TextField({id:this.getId()+"-title-field",placeholder:this._rb.getText("NOTETAKERFEEDER_PLACEHOLDER_HEADER")+"...",maxLength:50});this.setAggregation("titleInput",this._oTitle);this._oBody=new sap.ui.commons.TextArea({id:this.getId()+"-body-field",placeholder:this._rb.getText("NOTETAKERFEEDER_PLACEHOLDER_BODY")+"...",required:true,liveChange:function(e){t._setAddButtonEnabled(e.mParameters["liveValue"],null);}});this.setAggregation("bodyArea",this._oBody);this._oThumbUpButton=new sap.ui.commons.Button({id:this.getId()+"-thumb-up-button",press:function(e){t._handleThumbUpButtonPress();},tooltip:this._rb.getText("NOTETAKERFEEDER_BUTTON_THUMB_UP_TOOLTIP")});this._oThumbUpButton.addStyleClass("sapSuiteUiCommonsNoteTakerFeederThumbUpButton");this._oThumbDownButton=new sap.ui.commons.Button({id:this.getId()+"-thumb-down-button",press:function(e){t._handleThumbDownButtonPress();},tooltip:this._rb.getText("NOTETAKERFEEDER_BUTTON_THUMB_DOWN_TOOLTIP")});this._oThumbDownButton.addStyleClass("sapSuiteUiCommonsNoteTakerFeederThumbDownButton");this._oFileUploader=new sap.ui.commons.FileUploader({id:this.getId()+"-attach",uploadOnChange:false,name:this.getAttachmentName(),change:function(e){t._disableAddAttachBtn();var n=e.getParameter("newValue");t._oAttachmentLink.setText(n);t._oAttachmentLink.rerender();t._handleAddAttachUI();var a={};a.filename=n;t.fireAttachmentSelect(a);t._oTitle.focus();},uploadComplete:function(e){t._handleUploadComplete(e);}});this._oFileUploader.onfocusin=function(e){t._oTitle.focus();};this._oFileUploader.oBrowse.setText("");this.setAggregation("fileUploader",this._oFileUploader);this._oAddAttachButton=new sap.ui.commons.Button({id:this.getId()+"-attach-button",press:function(e){jQuery.sap.domById(t._oFileUploader.getId()+"-fu").click();},tooltip:t._rb.getText("NOTETAKER_BUTTON_ATTACH_TOOLTIP")});this._oAddAttachButton.addStyleClass("sapSuiteUiCommonsNtAttachIcon");this._oAttachmentLoadingLabel=new sap.ui.commons.Label({id:this.getId()+"-loading-label",text:this._rb.getText("NOTETAKERFEEDER_LABEL_ATTACHMENT_LOADING")+"..."});this._oDeleteAttachButton=new sap.ui.commons.Button({id:this.getId()+"-delete-attach-button",lite:true,press:function(e){t._handleDeleteAttachUI();var a={filename:t._oFileUploader.getName()};t.fireAttachmentDelete(a);},tooltip:this._rb.getText("NOTETAKERFEEDER_BUTTON_DELETE_ATTACHMENT")});this._oAttachmentLink=new sap.ui.commons.Link({id:this.getId()+"-attachmentLink",tooltip:this._rb.getText("NOTETAKERFEEDER_LINK_ATTACHMENT_TOOLTIP"),press:function(e){var a={filename:t._oFileUploader.getName()};t.fireAttachmentClick(a);},width:"200px"});this._oRequiredLbl=new sap.ui.commons.Label({required:true}).addStyleClass("sapSuiteRequiredLbl");};
sap.suite.ui.commons.NoteTakerFeeder.prototype.exit=function(){this._oAddButton.destroy();this._oTitle.destroy();this._oBody.destroy();this._oTagButton.destroy();this._oTagList.destroy();this._oTagInput.destroy();this._oCancelTagButton.destroy();this._oAddTagButton.destroy();this._oThumbUpButton.destroy();this._oThumbDownButton.destroy();this._oFileUploader.destroy();this._oAddAttachButton.destroy();this._oAttachmentLoadingLabel.destroy();this._oDeleteAttachButton.destroy();this._oAttachmentLink.destroy();this._oRequiredLbl.destroy();};
sap.suite.ui.commons.NoteTakerFeeder.prototype._handleAdd=function(){if(this.getBody()){var e=new Object();e.title=this.getTitle();e.body=this.getBody();e.timestamp=this._getTimestamp();e.tags=this._selectedTags;e.thumbUp=this.getThumbUp();e.thumbDown=this.getThumbDown();e.attachmentFilename=this._oFileUploader.getValue();this.setTitle("");this.setBody("");this.setThumbDown(false);this.setThumbUp(false);this._oFileUploader.setValue("");this._enableAddAttachBtn();this.fireAddNote(e);jQuery(this._oFileUploader.oFileUpload).show();this._handleClearTag();}else{this._setAddButtonEnabled(this.getBody());}};
sap.suite.ui.commons.NoteTakerFeeder.prototype._getTimestamp=function(){return new Date();};
sap.suite.ui.commons.NoteTakerFeeder.prototype.setTitle=function(t){this._oTitle.setValue(t);return this;};
sap.suite.ui.commons.NoteTakerFeeder.prototype.getTitle=function(){return jQuery.sap.byId(this.getId()+"-title-field").hasClass('sapSuiteUiCommonsPlaceholder')?"":this._oTitle.getValue();};
sap.suite.ui.commons.NoteTakerFeeder.prototype.setBody=function(b){this._oBody.setValue(b);return this;};
sap.suite.ui.commons.NoteTakerFeeder.prototype.getBody=function(){return this._isBodyPlaceholderActive()?"":this._oBody.getValue();};
sap.suite.ui.commons.NoteTakerFeeder.prototype._applyPlaceholder=function(){jQuery('[data-placeholder]').focus(function(){var i=jQuery(this);if(i.hasClass('sapSuiteUiCommonsPlaceholder')){i.val('');i.removeClass('sapSuiteUiCommonsPlaceholder');}}).blur(function(){var i=jQuery(this);if(jQuery.sap.equal(i.val(),'')||jQuery.sap.equal(i.val(),i.attr('data-placeholder'))){i.addClass('sapSuiteUiCommonsPlaceholder');i.val(i.attr('data-placeholder'));}}).blur();};
sap.suite.ui.commons.NoteTakerFeeder.prototype._isBodyPlaceholderActive=function(){return jQuery.sap.byId(this.getId()+"-body-field").hasClass('sapSuiteUiCommonsPlaceholder');};
sap.suite.ui.commons.NoteTakerFeeder.prototype._setAddButtonEnabled=function(b,n){var e=b!=null&&!this._isBodyPlaceholderActive()&&!/^\s*$/.test(b);if(e!==this._oAddButton.getEnabled()){this._oAddButton.setEnabled(e);if(!n){this._oAddButton.rerender();}}};
sap.suite.ui.commons.NoteTakerFeeder.prototype._adjustUploaderForIe=function(){this._oFileUploader.superOnkeydown=this._oFileUploader.onkeydown;this._oFileUploader.onkeydown=function(e){var k=e.keyCode,a=jQuery.sap.KeyCodes;if(k!=a.SPACE&&k!=a.ENTER){this.superOnkeydown(e);}};jQuery(this._oFileUploader.oFilePath.getDomRef()).hide();jQuery(this._oFileUploader.oBrowse.getDomRef()).hide();jQuery(this._oAddAttachButton.getDomRef()).attr("tabindex","-1");var t=this;jQuery(this._oFileUploader.oFileUpload).attr("tabindex","0").attr("title",this._rb.getText("NOTETAKER_BUTTON_ATTACH_TOOLTIP")).focus(function(){this.hasFocus=true;jQuery(t._oAddAttachButton.getDomRef()).addClass("sapUiBtnStdFocus");}).focusout(function(){this.hasFocus=false;jQuery(t._oAddAttachButton.getDomRef()).removeClass("sapUiBtnStdFocus");}).hover(function(){jQuery(t._oAddAttachButton.getDomRef()).addClass("sapUiBtnStdFocus");},function(){if(!this.hasFocus){jQuery(t._oAddAttachButton.getDomRef()).removeClass("sapUiBtnStdFocus");}jQuery(t._oAddAttachButton.getDomRef()).removeClass("sapSuiteUiCommonsNoteTakerFeederButtonSelected");}).mousedown(function(){jQuery(t._oAddAttachButton.getDomRef()).addClass("sapSuiteUiCommonsNoteTakerFeederButtonSelected").addClass("sapUiBtnAct");}).mouseup(function(){jQuery(t._oAddAttachButton.getDomRef()).removeClass("sapSuiteUiCommonsNoteTakerFeederButtonSelected");});jQuery(this._oFileUploader.oFileUpload).keydown(function(e){var a=jQuery.sap.KeyCodes;if(e.keyCode==a.TAB){if(e.shiftKey){t._oThumbDownButton.focus();}else{t._oTitle.focus();}e.preventDefault();e.stopPropagation();}});};
sap.suite.ui.commons.NoteTakerFeeder.prototype._setAriaInfo=function(){jQuery.sap.byId(this._oThumbUpButton.getId()).attr("aria-pressed",this.getThumbUp());jQuery.sap.byId(this._oThumbDownButton.getId()).attr("aria-pressed",this.getThumbDown());jQuery.sap.byId(this._oTitle.getId()).attr("aria-label",this._rb.getText("NOTETAKERFEEDER_PLACEHOLDER_HEADER"));jQuery.sap.byId(this._oBody.getId()).attr("aria-label",this._rb.getText("NOTETAKERFEEDER_PLACEHOLDER_BODY"));jQuery(this._oFileUploader.oFileUpload).attr("aria-label",this._rb.getText("NOTETAKER_BUTTON_ATTACH_TOOLTIP"));};
sap.suite.ui.commons.NoteTakerFeeder.prototype.onAfterRendering=function(){this._applyPlaceholder();this._adjustPopupState();if(this._oFileUploader.getValue()){jQuery.sap.byId(this.getId()+"-attachment-panel").show();jQuery.sap.byId(this.getId()+"-attachment-loading").hide();jQuery.sap.byId(this.getId()+"-attachment-delete").show();}jQuery.sap.byId(this._oFileUploader.getId()).addClass("sapSuiteUiCommonsNtfUploader");this._setAriaInfo();if(jQuery.browser.msie){this._adjustUploaderForIe();}};
sap.suite.ui.commons.NoteTakerFeeder.prototype.onBeforeRendering=function(){this._setAddButtonEnabled(this.getBody(),true);this._setThumbButtonsView();};
sap.suite.ui.commons.NoteTakerFeeder.prototype.getFormattedTags=function(){return sap.suite.ui.commons.NoteTakerCard.prototype._getFormattedTags();};
sap.suite.ui.commons.NoteTakerFeeder.prototype._adjustPopupState=function(){if(this._bTagPopupOpen){jQuery.sap.byId(this.getId()+"-selectTag-panel").show();}};
sap.suite.ui.commons.NoteTakerFeeder.prototype._handleAddTag=function(t){this._selectedTags=[];var n=t.split(new RegExp("\\s+"));var T={};for(var i=0;i<n.length;i++){if(n[i].length!=0){T[n[i]]=0;}}for(var f in T){this._selectedTags.push(f);}if(this._oTagButton){this._adjustTagButton();}};
sap.suite.ui.commons.NoteTakerFeeder.prototype._adjustTagButton=function(){if(this._selectedTags.length){this._oTagButton.setTooltip(this._rb.getText("NOTETAKERFEEDER_BUTTON_ADD_TAGS_SELECTED_TOOLTIP")+": "+this._selectedTags.join(" "));this._oTagButton.addStyleClass("sapSuiteUiCommonsNoteTakerFeederButtonSelected");}else{this._oTagButton.setTooltip(this._rb.getText("NOTETAKERFEEDER_BUTTON_TAG_TOOLTIP"));this._oTagButton.removeStyleClass("sapSuiteUiCommonsNoteTakerFeederButtonSelected");}};
sap.suite.ui.commons.NoteTakerFeeder.prototype._handleClearTag=function(){if(this._oTagInput){this._oTagInput.setValue("");}if(this._oTagList){this._oTagList.clearSelection();}this._selectedTags=[];if(this._oTagButton){this._adjustTagButton();}};
sap.suite.ui.commons.NoteTakerFeeder.prototype.setTags=function(t){this.setProperty("tags",t,true);return this;};
sap.suite.ui.commons.NoteTakerFeeder.prototype._toggleTagPopup=function(){if(this._bTagPopupOpen){jQuery.sap.byId(this.getId()+"-selectTag-panel").slideToggle();this._focusDefaultControl();this._bTagPopupOpen=false;}else{this._addTagsToListBox(this.getTags());jQuery.sap.byId(this.getId()+"-selectTag-panel").slideToggle();jQuery.sap.byId(this.getId()+"-inputTag").val(this._selectedTags.length==0?"":this._selectedTags.join(" ")+" ");this._oTagInput.focus();this._bTagPopupOpen=true;}};
sap.suite.ui.commons.NoteTakerFeeder.prototype._focusDefaultControl=function(){this._oTagButton.focus();};
sap.suite.ui.commons.NoteTakerFeeder.prototype._handleTagInputLive=function(e){var l=e.getParameter("liveValue");var n=l.split(" ");var c=n[n.length-1];this._filterListBox(c);};
sap.suite.ui.commons.NoteTakerFeeder.prototype._filterListBox=function(i){if(i.length==0){this._addTagsToListBox(this.getTags());return;}var f=jQuery.grep(this.getTags(),function(a){if(a.indexOf(i)>=0){return true;}});this._addTagsToListBox(f);};
sap.suite.ui.commons.NoteTakerFeeder.prototype._addTagsToListBox=function(t){var l=jQuery.map(t,function(v,i){return new sap.ui.core.ListItem({text:v});});this._oTagList.setItems(l,true);this._oTagList.rerender();};
sap.suite.ui.commons.NoteTakerFeeder.prototype._handleListSelect=function(e){var s=e.getParameter("selectedItem").getText();var t=this._oTagInput.getValue();var n=t.split(" ");n.pop();if(n.length==0){this._oTagInput.setValue(s+" ");}else{this._oTagInput.setValue(n.join(" ")+" "+s+" ");}this._oTagList.setSelectedIndex(-1);this._oTagInput.focus();};
sap.suite.ui.commons.NoteTakerFeeder.prototype._setThumbButtonsView=function(){if(this.getThumbUp()){this._oThumbUpButton.addStyleClass("sapSuiteUiCommonsNoteTakerFeederButtonSelected");}else{this._oThumbUpButton.removeStyleClass("sapSuiteUiCommonsNoteTakerFeederButtonSelected");}if(this.getThumbDown()){this._oThumbDownButton.addStyleClass("sapSuiteUiCommonsNoteTakerFeederButtonSelected");}else{this._oThumbDownButton.removeStyleClass("sapSuiteUiCommonsNoteTakerFeederButtonSelected");}};
sap.suite.ui.commons.NoteTakerFeeder.prototype._handleThumbUpButtonPress=function(){this.setThumbUp(!this.getThumbUp());if(this.getThumbUp()){this.setThumbDown(false);}};
sap.suite.ui.commons.NoteTakerFeeder.prototype._handleThumbDownButtonPress=function(){this.setThumbDown(!this.getThumbDown());if(this.getThumbDown()){this.setThumbUp(false);}};
sap.suite.ui.commons.NoteTakerFeeder.prototype._disableAddAttachBtn=function(){this._oAddAttachButton.setEnabled(false);this._oAddAttachButton.removeStyleClass("sapSuiteUiCommonsNtAttachIcon");this._oAddAttachButton.addStyleClass("sapSuiteUiCommonsNtDsblAttachIcon");this._oAddAttachButton.setTooltip("");this._oAddAttachButton.rerender();};
sap.suite.ui.commons.NoteTakerFeeder.prototype._enableAddAttachBtn=function(){this._oAddAttachButton.setEnabled(true);this._oAddAttachButton.removeStyleClass("sapSuiteUiCommonsNtDsblAttachIcon");this._oAddAttachButton.addStyleClass("sapSuiteUiCommonsNtAttachIcon");this._oAddAttachButton.setTooltip(this._rb.getText("NOTETAKER_BUTTON_ATTACH_TOOLTIP"));this._oAddAttachButton.rerender();if(jQuery.browser.msie){jQuery.sap.byId(this._oAddAttachButton.getId()).attr("tabindex","-1");}};
sap.suite.ui.commons.NoteTakerFeeder.prototype._handleAddAttachUI=function(){jQuery(this._oFileUploader.oFileUpload).hide();jQuery.sap.byId(this.getId()+"-attachment-loading").show("fast");jQuery.sap.byId(this.getId()+"-body").animate({height:"332px"},300);jQuery.sap.byId(this.getId()+"-attachment-panel").slideDown({duration:300,queue:false});};
sap.suite.ui.commons.NoteTakerFeeder.prototype._handleDeleteAttachUI=function(){jQuery(this._oFileUploader.oFileUpload).show();jQuery.sap.byId(this.getId()+"-body").animate({height:"352px"},300);jQuery.sap.byId(this.getId()+"-attachment-delete").hide("fast");jQuery.sap.byId(this.getId()+"-attachment-panel").hide({duration:300,queue:false});this._enableAddAttachBtn();this._oFileUploader.setValue("");this._oFileUploader.addStyleClass("sapSuiteUiCommonsNtfUploader");this._oAttachmentLink.setText("");this._oAddAttachButton.focus();};
sap.suite.ui.commons.NoteTakerFeeder.prototype.handleUploadResponse=function(r){};
sap.suite.ui.commons.NoteTakerFeeder.prototype._handleUploadComplete=function(e){jQuery.sap.byId(this.getId()+"-attachment-loading").hide("fast");jQuery.sap.byId(this.getId()+"-attachment-delete").show("fast");var a={response:e.getParameter("response")};this.fireAttachmentUploadComplete(a);};
sap.suite.ui.commons.NoteTakerFeeder.prototype.setAttachmentUploadUrl=function(u){this._oFileUploader.setUploadUrl(u);return this;};
sap.suite.ui.commons.NoteTakerFeeder.prototype.getAttachmentUploadUrl=function(){return this._oFileUploader.getUploadUrl();};
