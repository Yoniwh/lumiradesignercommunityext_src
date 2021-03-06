/**
 * Complex Property Handler
 */
define([], function () {
	/**
	 * Create UI5 Extension
	 */
	sap.ui.commons.layout.VerticalLayout.extend("org.scn.community.aps.ComplexProperty", {
		renderer : {},
		needsLabel : function () {
			return false;
		},
		metadata : {
			properties : {
				value : {
					type : "object",
					defaultValue : []
				},
				config : {
					type : "object",
					defaultValue : {}
				},
				labelOrientation : {
					type : "String",
					defaultValue : "Horizontal"
				}
			},
			events : {
				valueChange : {}
			}
		},
		setConfig : function (o) {
			sap.ui.core.Control.prototype.setProperty.apply(this, ["config", o]);
			this.generateFields();
			this.updateFields();
			return this;
		},
		getConfig : function () {
			return sap.ui.core.Control.prototype.getProperty.apply(this, ["config"]);
		},
		setLabelOrientation : function (o) {
			sap.ui.core.Control.prototype.setProperty.apply(this, ["labelOrientation", o]);
			this.generateFields();
			this.updateFields();
			return this;
		},
		getLabelOrientation : function () {
			return sap.ui.core.Control.prototype.getProperty.apply(this, ["labelOrientation"]);
		},
		setValue : function (o) {
			sap.ui.core.Control.prototype.setProperty.apply(this, ["value", o]);
			this.updateFields();
			return this;
		},
		getValue : function () {
			return sap.ui.core.Control.prototype.getProperty.apply(this, ["value"]);
		},
		modulesLoaded : function(){
			this.updateFields();	//?		
		},
		updateFields : function () {
			var o = this.getValue();
			var c = this.getConfig();
			for (var field in o) {
				if (this["cmp_" + field] && this["cmp_" + field]) {
					var that = this
					require(["../../org.scn.community.shared/aps/"+c[field].apsControl],function(field){return function(handler){
						if (handler.serialized) {
							value = JSON.stringify(o[field]);
						} else {
							value = o[field];
						}
						handler.setter.call(that, field, value);
					};}(field));
				}else{
					// alert(field + " not exist yet.");
				}
			}
			// this.apsModel.setData({propertyData: this.getValue()});
			// this.columnTable.setModel(this.apsModel);
			// this.columnTable.bindRows("/propertyData");
		},
		generateFields : function () {
			try{
			this.destroyContent();
			this.components = {};
			this._props = this.getConfig();
			var config = this._props;
			for (var property in config) {
				var item = config[property];
				var control;
				var that = this;
				
				var failureFunction = function (componentContainer, property, propertyOptions) {
					return function (err) {
						alert("fail" + err);
						// assure there is a control! Make text Area
						that["cmp_" + property] = new sap.ui.commons.TextArea({
								design : sap.ui.core.Design.Monospace,
								rows : 20,
								width : "100%",
								wrapping : sap.ui.core.Wrapping.Off
							});
						that["cmp_" + property].attachChange(function (oControlEvent) {
							var newValue = oControlEvent.getSource().getValue();
							that.props[property].value = newValue;
							if (!that.isTest) {
								that.firePropertiesChanged([property]);
							} else {
								alert("Property: " + property + "\r\nValue:\r\n" + newValue);
							}
						}, this);
						componentContainer.addContent(that.hLabel(propertyOptions.desc || property, that["cmp_" + property]));
					}
				}(this, property+"", JSON.parse(JSON.stringify(item)));
				
				var callbackFunction = function(componentContainer, property, propertyOptions) {
					// B/W Compat
					var opts = propertyOptions;
					if(propertyOptions.opts) {
						opts = propertyOptions.opts;
						opts.desc = opts.desc || propertyOptions.desc;
					}
					return function (handler) {
						try{
						// Closure to store property name
						var changeHandler = function (property, handler) {
							return function (oControlEvent) {
								var newValue = handler.getter.call(that, property, oControlEvent.getSource());
								if (handler.serialized) {
									if (newValue && newValue != "") {
										newValue = jQuery.parseJSON(newValue);
									} else {
										newValue = null;
									}
								}
								var v = that.getValue();
								v[property] = newValue;
								that.setValue(v);
								that.fireValueChange();
							};
						}(property, handler);
						control = handler.createComponent.call(that, property, opts, changeHandler);
						that["cmp_" + property] = control;
						var o = that.getValue();
						var v;
						if(o && o.property){
							v = o[property];
						}else{
							if(handler.defaultValue !== undefined){
								// v = JSON.parse(JSON.stringify(handler.defaultValue));
								// o[property] = v;
							}
							//v = handler.defaultValue;
						}
						if(v!==undefined){
							if(handler.serialized){
								handler.setter.call(that, property, JSON.stringify(v));
								
							}else{
								handler.setter.call(that, property, v);	
							}
						}

						// assure there is a control! Make text Area
						/* TODO
						if (that["cmp_" + property] == undefined) {
							that["cmp_" + property] = new sap.ui.commons.TextArea({
									design : sap.ui.core.Design.Monospace,
									rows : 20,
									width : "100%",
									wrapping : sap.ui.core.Wrapping.Off
								});
							that["cmp_" + property].attachChange(getHandler, that);
						}
						*/
						// Step 3a, if component has afterInit method, call it!

						if (that["cmp_" + property].afterInit) {
							that["cmp_" + property].afterInit();
						}

						// Step 4, add control to layout
						//etcLayout.addContent(that.hLabel(property,that["cmp_"+property]));
						var useLabel = true;
						if (that["cmp_" + property].needsLabel) {
							useLabel = that["cmp_" + property].needsLabel();
						}

						if (useLabel) {
							componentContainer.addContent(that.hLabel(opts.desc || property, that["cmp_" + property]));
						} else {
							componentContainer.addContent(that["cmp_" + property]);
						}
						}catch(e){
							alert("Error on handler callback for complexproperty " + property + ":\n\n" + e);
						}
						that._props[property].loaded = true;
						if(that.checkLoadState()==true){
							that.updateFields();
						};
					};
				}(this, property+"", JSON.parse(JSON.stringify(item)));
				require(["../../org.scn.community.shared/aps/"+item.apsControl],callbackFunction,failureFunction);			
			}
			}catch(e){
				alert("Error generating fields\n\n"+e);
			}
		},
		checkLoadState : function(){
			var loaded = true;
			for(var property in this._props){
				if(!this._props[property].loaded) return false;
			}
			return loaded;
		},
		hLabel : function (label, component) {
			var hLayout;
			if(this.getLabelOrientation()=="Horizontal"){
				hLayout = new sap.ui.commons.layout.HorizontalLayout({});
			}else{
				hLayout = new sap.ui.commons.layout.VerticalLayout({});
			}
			hLayout.addContent(new sap.ui.commons.TextView({
				text : label,
				width : "180px"
			}));
			hLayout.addContent(component);
			return hLayout;
		},
		init : function () { },
		renderer : {},
		needsLabel : function () {
			return false;
		}
	});
	return {
		id : "complexproperty",
		serialized : true,
		setter : function (property, value) {
			var newValue = undefined;
			if (value && value != "") {
				newValue = jQuery.parseJSON(value);
			} else {
				// Blank
			}
			this["cmp_" + property].setValue(newValue);
		},
		getter : function (property, control) {
			var arrayValue = control.getValue();
			alert(0);
			newValue = JSON.stringify(arrayValue);
			alert("ci new value: " + newValue);
			return newValue;
		},
		createComponent : function (property, propertyOptions, changeHandler) {
			var component = new org.scn.community.aps.ComplexProperty({
					width : "100%",
					title : new sap.ui.commons.Title({
						text : propertyOptions.desc
					}),
					config : propertyOptions.apsConfig,
					showCollapseIcon : false
				});
			component.attachValueChange(changeHandler, this);
			return component;
		}
	};
});
