define(['src/curt.js'],function(){
	describe("Get Vehicle Years",function(){
		it("says []float",function(){
			var vehicle = new CurtVehicle();
			expect(vehicle.get_years()).toContain(2012);
		});
	});
});