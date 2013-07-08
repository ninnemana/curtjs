
describe('Part',function(){
    var part = new window.CurtPart();
	it('should retrieve the part data for part 11000',function(){
        part.PartId = 11000;
		part.get(function(err){

			// Assert
			expect(part).toBeDefined();
			expect(err).not.toBeDefined();
		});
	});
    
    it('should retrieve the vehicles that match part 15062', function(){
        part.PartId = 15062;
        
        part.get_vehicles(function(vehicles,err){
           expect(vehicles).toBeDefined();
           expect(err).not.toBeDefined();
        });
    });
});
