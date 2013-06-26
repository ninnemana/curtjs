
describe('Vehicle',function(){
	var v = new window.CurtVehicle();
	it('should retrieve the vehicle years without error',function(){
		v.get_years(function(data,err){

			// Assert
			expect(data).toBeDefined();
			expect(err).not.toBeDefined();

			// Update object
			v.year = data[0];
		});
	});

	it('should retrieve the vehicle makes without error', function(){
		v.year = 2012;
		v.get_makes(function(data,err){
			expect(data).toBeDefined();
			expect(err).not.toBeDefined();

			v.make = data[0];
		});
	});

	it('should retrieve the vehicle models without error',function(){
		v.year = 2012;
		v.make = "Ford";
		v.get_models(function(data,err){
			expect(data).toBeArray();
			expect(err).not.toBeDefined();

			v.model = data[0];
		});
	});

	it('should retrieve the vehicle submodels without error',function(){
		v.year = 2012;
		v.make = "Ford";
		v.model = "Edge";
		v.get_submodels(function(data,err){
			expect(data).toBeArray();
			expect(err).not.toBeDefined();

			v.submodel = data[0];
		});
	});
});
