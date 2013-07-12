var API_DOMAIN = 'http://goapi.curtmfg.com',
	API_KEY    = '8aee0620-412e-47fc-900a-947820ea1c1d';

$.support.cors = true;

window.CurtVehicle = function(){

	function CurtVehicle(){

	}
	var vehicle = {
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
			var path = API_DOMAIN + '/vehicle/' + this.year + '/' + this.make +'/' + this.model + '/' + this.submodel;

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

	
	return vehicle;
};

window.CurtPart = function(){
    
    function CurtPart(){
        
    }
    
    var part = {
        PartId: 0,
        Status:0,
        PriceCode: 0,
        RelatedCount:0,
        AverageReview: 0,
        DateModified: '',
        DateAdded: '',
        ShortDesc: '',
        PartClass: '',
        InstallSheet: {},
        Attributes: [],
        VehicleAttributes: [],
        Content: [],
        Pricing: [],
        Reviews: [],
        Images: [],
        Related: [],
        Categories: [],
        Videos: [],
        Packages: [],
        Customer: {},
        get: function(callback){
            // Execute AJAX
            $.ajax({
				url: API_DOMAIN + '/part/' + this.PartId,
				type: 'get',
				dataType: 'json',
				data:{
					key: API_KEY
				},
				success: function(data, status, xhr){
                    if(status === 200 && data.PartId !== undefined && data.PartId > 0){
                        this.PartId = data.PartId;
                        this.Status = data.Status;
                        this.PriceCode = data.PriceCode;
                        this.RelatedCount = data.RelatedCount;
                        this.AverageReview = data.AverageReview;
                        this.DateModified = new Date(Date.parse(data.DateModified));
                        this.DateAdded = new Date(Date.parse(data.DateAdded));
                        this.ShortDesc = data.ShortDesc;
                        this.PartClass = data.PartClass;
                        this.InstallSheet = data.InstallSheet;
                        this.Attributes = data.Attributes;
                        this.VehicleAttributes = data.VehicleAttributes;
                        this.Content = data.Content;
                        this.Pricing = data.Pricing;
                        this.Reviews = data.Reviews;
                        this.Images = data.Images;
                        this.Related = data.Related;
                        this.Categories = data.Categories;
                        this.Videos = data.Videos;
                        this.Packages = data.Packages;
                        this.Customer = data.Customer;
                    }
					callback(null);
				},
				error: function(xhr, status, err){
					callback(err);
				}
			});
        },
        get_vehicles: function(callback){
            // Execute AJAX
            $.ajax({
                url: API_DOMAIN + '/part/' + this.PartId + '/vehicles',
				type: 'get',
				dataType: 'json',
				data:{
					key: API_KEY
				},
				success: function(data, status, xhr){
                    if(status === "success"){
                        var vehicles = [];
                        
                        for(var i = 0; i < data.length; i++){
                            var vehicle = new window.CurtVehicle();
                            vehicle.year = data[i].Year;
                            vehicle.make = data[i].Make;
                            vehicle.model = data[i].Model;
                            vehicle.submodel = data[i].Submodel;
                            vehicle.configuration = data[i].Configuration;
                            vehicles.push(vehicle);
                        }
                        
                        callback(vehicles,null);
                    }else{
                        callback([],null);
                    }
				},
				error: function(xhr, status, err){
					callback([],err);
				}
			});
        }
    };
    
    return part;
};