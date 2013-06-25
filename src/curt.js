var API_DOMAIN = 'http://goapi.curtmfg.com',
	API_KEY    = '8aee0620-412e-47fc-900a-947820ea1c1d';

var CurtVehicle = function(){
	return this;
};

define(['jquery'],function($){

	$.support.cors = true;

	CurtVehicle.prototype = {
		year: 0,
		make: '',
		model: '',
		submodel: '',
		configuration: [], // []string
		parts: [], // []Part
		groups: [], // []int
		reset: function(callback){
			this.year = 0;
			this.make = this.model = this.submodel = '';
			this.configuration = this.parts = this.groups = [];

			if(callback){
				callback();
			}
		},
		get_years: function(callback){
			this.year = 0;
			this.make = this.model = this.submodel = '';
			this.configuration = this.parts = this.groups = [];

			$.ajax({
				url: API_DOMAIN + '/vehicle',
				type: 'get',
				dataType:'json',
				data: {
					key: API_KEY
				},
				success: function(data, status, xhr){
					if (data.ConfigOption !== undefined && data.ConfigOption.Options !== undefined && data.ConfigOption.Options.length > 0){
						callback(data.ConfigOption.Options, null);
					}else{
						callback([],"Failed to retrieve vehicle years");
					}
				},
				error: function(xhr,status,err){
					callback([],err);
				}
			});
		},
		get_makes: function(callback){
			this.make = this.model = this.submodel = '';
			this.configuration = this.parts = this.groups = [];

			$.ajax({
				url: API_DOMAIN + '/vehicle/' + this.year,
				type:'get',
				dataType:'json',
				data:{
					key: API_KEY
				},
				success: function(data, status, xhr){
					if (data.ConfigOption !== undefined && data.ConfigOption.Options !== undefined && data.ConfigOption.Options.length > 0){
						callback(data.ConfigOption.Options, null);
					}else{
						callback([],"Failed to retrieve vehicle makes");
					}
				},
				error: function(xhr,status,err){
					callback([],err);
				}
			});
		},
		get_models: function(callback){
			this.model = this.submodel = '';
			this.configuration = this.parts = this.groups = [];

			$.ajax({
				url: API_DOMAIN + '/vehicle/' + this.year +'/' + this.make,
				type:'get',
				dataType:'json',
				data:{
					key: API_KEY
				},
				success: function(data, status, xhr){
					if(data.Matched.Parts !== null && data.Matched.Parts.length > 0){
						this.parts = data.Matched.Parts;
						this.groups = data.Matched.Groups;
					}
					if (data.ConfigOption !== undefined && data.ConfigOption.Options !== undefined && data.ConfigOption.Options.length > 0){
						callback(data.ConfigOption.Options, null);
					}else{
						callback([],"Failed to retrieve vehicle models");
					}
				},
				error: function(xhr,status,err){
					callback([],err);
				}
			});
		},
		get_submodels: function(callback){
			this.submodel = '';
			this.configuration = this.parts = this.groups = [];
			$.ajax({
				url: API_DOMAIN + '/vehicle/' + this.year + '/' + this.make + '/' + this.model,
				type:'get',
				dataType:'json',
				data:{
					key: API_KEY
				},
				success: function(data, status, xhr){
					if(data.Matched.Parts !== null && data.Matched.Parts.length > 0){
						this.parts = data.Matched.Parts;
						this.groups = data.Matched.Groups;
					}
					if (data.ConfigOption !== undefined && data.ConfigOption.Options !== undefined && data.ConfigOption.Options.length > 0){
						callback(data.ConfigOption.Options, null);
					}else{
						callback([],"Failed to retrieve vehicle sub models");
					}
				},
				error: function(xhr,status,err){
					callback([],err);
				}
			});
		},
		get_configuration: function(callback){
			this.parts = this.groups = [];

			// Build out API Endpoint
			path = API_DOMAIN + '/vehicle/' + this.year + '/' + this.make +'/' + this.model + '/' + this.submodel;

			// Loop configuration options and append to
			// endpoint address
			for (var i = this.configuration.length - 1; i >= 0; i--) {
				path += '/' + this.configuration[i];
			}

			// Execute AJAX
			$.ajax({
				url: path,
				type: 'get',
				dataType: 'json',
				data:{
					key: API_KEY
				},
				success: function(data, status, xhr){
					if(data.Matched.Parts !== null && data.Matched.Parts.length > 0){
						this.parts = data.Matched.Parts;
						this.groups = data.Matched.Groups;
					}
					if (data.ConfigOption !== null && data.ConfigOption.Options !== null && data.ConfigOption.Options.length > 0){
						callback(data.ConfigOption, null);
					}else{
						callback([],"Failed to retrieve vehicle configuration options");
					}
				},
				error: function(xhr, status, err){
					callback([],err);
				}
			});
		}
	};
});