/**
 * Copyright 2014 Scn Community Contributors
 * 
 * Original Source Code Location:
 *  https://github.com/org-scn-design-studio-community/sdkpackage/
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at 
 *  
 *  http://www.apache.org/licenses/LICENSE-2.0
 *  
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
 * See the License for the specific language governing permissions and 
 * limitations under the License. 
 */
//%DEFINE-START%
var scn_pkg="org.scn.community.";if(sap.firefly!=undefined){scn_pkg=scn_pkg.replace(".","_");}
define([
	"sap/designstudio/sdk/component",
	"./SideNavigationSpec",
	"../../../"+scn_pkg+"shared/modules/component.core",
	"../../../"+scn_pkg+"shared/modules/component.basics",
	"../../../"+scn_pkg+"shared/modules/component.databound",
	"../../../"+scn_pkg+"shared/modules/component.unified"
	
	],
	function(
		Component,
		spec,
		core,
		basics
	) {
//%DEFINE-END%
var myComponentData = spec;

SideNavigation = {

	renderer: {},

	initDesignStudio: function() {
		var that = this;

		org_scn_community_basics.fillDummyDataInit(that, that.initAsync);		
	},

	initAsync: function (owner) {
		var that = owner;
		org_scn_community_component_Core(that, myComponentData);
		
		that.addStyleClass("scn-pack-SideNavigation");
		that.addStyleClass("scn-pack-FullSizeChildren");

		/* COMPONENT SPECIFIC CODE - START(initDesignStudio)*/
		var componentPath = sap.zen.createStaticSdkMimeUrl(that.componentData.fullComponentPackage , "");
		jQuery.sap.registerModulePath(myComponentData.fullComponentName, componentPath);

		sap.ui.controller(myComponentData.fullComponentName + ".Controller", {
			owner: that,
				onFixedItemSelected: function (event) {
					org_scn_community_unified.processEvent(that, "onFixedItemSelected", event);
				},
				onItemSelected: function (event) {
					org_scn_community_unified.processEvent(that, "onItemSelected", event);
				},

		});

		that._view = new sap.ui.view({ type: sap.ui.core.mvc.ViewType.XML,  
            viewName: myComponentData.fullComponentName + "." 
				+ myComponentData.id,  
            controllerName: myComponentData.fullComponentName + ".Controller" 
        });
		
		that._oModel = new sap.ui.model.json.JSONModel(); 
		that._view.setModel(that._oModel);

		/* COMPONENT SPECIFIC CODE - END(initDesignStudio)*/
		
		that.onAfterRendering = function () {
			org_scn_community_basics.resizeContentAbsoluteLayout(that, that._view, that.onResize);
		}
	},
	
	afterDesignStudioUpdate: function() {
		var that = this;
		
		/* COMPONENT SPECIFIC CODE - START(afterDesignStudioUpdate)*/
		that._data = undefined;
		if(that.getDSMetadata) {
			that._metadata = that.getDSMetadata();
		}

		if(!org_scn_community_databound.hasData (that._data, that._metadata)) {
			org_scn_community_databound.getSampleDataFlat (that, that.processData, that.afterPrepare);
		} else {
			org_scn_community_basics.fillDummyData(that, that.processData, that.afterPrepare);
		}
		/* COMPONENT SPECIFIC CODE - START(afterDesignStudioUpdate)*/
	},
	
	/* COMPONENT SPECIFIC CODE - START METHODS*/
	processData: function (flatData, afterPrepare, owner) {
		var that = owner;

		if(flatData == undefined) {
			// read the real data
		} else {
			that._flatData = flatData;
		}
		
		that.prepareCustomData(that);

		// processing on data
		that.afterPrepare(that);
	},
	
	prepareCustomData: function (owner) {
		var that = owner;

		var options = org_scn_community_databound.initializeOptions();

		options.ignoreResults = true;
		options.keepDataArray = true;

		that._specialDataModel = [];

		options.keepParent = true;
		var l_FixedItem = org_scn_community_unified.getObjectArrayContent(that, "fixedItem", options);
		options.keepParent = true;
		var l_Item = org_scn_community_unified.getObjectArrayContent(that, "item", options);





		var l_ContentHeight = that.getContentHeight();
		var l_ContentWidth = that.getContentWidth();
		var l_Expanded = that.getExpanded();


		var l_OnFixedItemSelected = org_scn_community_unified.createEvent(that, "onFixedItemSelected");
		var l_OnItemSelected = org_scn_community_unified.createEvent(that, "onItemSelected");


		var rowI = 0;
		var counterI = 1;



		for(rowI=0;rowI<counterI;rowI++){
			var rowHeaderName = "NONE";

			l_FixedItem = org_scn_community_unified.loopObjectSingleDouble(that, l_FixedItem, rowI);
			l_Item = org_scn_community_unified.loopObjectSingleDouble(that, l_Item, rowI);






			var customData = {};
			
			customData.contentHeight = l_ContentHeight;
			customData.contentWidth = l_ContentWidth;
			customData.expanded = l_Expanded;



			customData[l_FixedItem.name] = l_FixedItem.json;
			customData[l_Item.name] = l_Item.json;




			customData[l_OnFixedItemSelected.name] = l_OnFixedItemSelected.func;
			customData[l_OnItemSelected.name] = l_OnItemSelected.func;


			that._specialDataModel.push(customData);
		}

		if(org_scn_community_unified.adjustSideNavigationModel) {
			that._specialDataModel = org_scn_community_unified.adjustSideNavigationModel(that._specialDataModel, that);
		}
		that._oModel.setData(that._specialDataModel);

		if(that._oResize) {that._oResize(true, true);}
	},

	afterPrepare: function (owner) {
		var that = owner;

		// visualization on processed data 
	},
	
	onResize: function(width, height, parent) {
		var that = parent;
		// in case special resize code is required

		if(that.getUseContentWidth) {
			if(!that.getUseContentWidth() || that.getContentWidth() <= 0) {
				for(entryI in that._specialDataModel) {
					var entry = that._specialDataModel[entryI];
	
					{entry.width = (width - 20) + "px"};
				}
	
				that._oModel.setData(that._specialDataModel);
			}
		}

		if(that.getUseContentHeight) {
			if(!that.getUseContentHeight() || that.getContentHeight() <= 0) {
				for(entryI in that._specialDataModel) {
					var entry = that._specialDataModel[entryI];
	
					{entry.height = (height - 20) + "px"};
				}
	
				that._oModel.setData(that._specialDataModel);
			}
		}
	},
	/* COMPONENT SPECIFIC CODE - END METHODS*/
};

myComponentData.instance = SideNavigation;
jQuery.sap.require("sap.zen.commons.layout.AbsoluteLayout");
sap.zen.commons.layout.AbsoluteLayout.extend(myComponentData.fullComponentName, myComponentData.instance);

});