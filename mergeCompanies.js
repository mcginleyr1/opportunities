var fs = require('fs');

var fileName = process.argv[2];
var dirName = process.argv[3];

if (fileName && dirName) {
  var insidePhiladelphia = [];
  var outsidePhiladelphia = [];
  
  // Using the city limits data from Open Data Philly
  // https://www.opendataphilly.org/dataset/city-limits
  var text = fs.readFileSync(fileName, "utf8");
  
  var philadephia = JSON.parse(text);
  var geoPoints = philadephia.features[0].geometry.coordinates[0];
  var cityLimits = [];
  
  // Convert city limit data into the array/object structure we need.
  for (var index in geoPoints) {
    cityLimits[index] = { "longitude": null, "latitude": null };
    cityLimits[index].longitude = geoPoints[index][0];
    cityLimits[index].latitude = geoPoints[index][1];
  }
   
  fs.readdir(dirName, processCompanies);
  
  // converted c code from this page http://www.codeproject.com/Tips/84226/Is-a-Point-inside-a-Polygon
  function isPointInRegion(region, point) {
    var c = false;
    var i, j;
    for(i = 0, j = region.length - 1; i < region.length; j = i++) {
      if ( ((region[i].longitude > point.longitude) != (region[j].longitude > point.longitude)) && 
        (point.latitude < (region[j].latitude - region[i].latitude) * (point.longitude - region[i].longitude) / (region[j].longitude - region[i].longitude) + region[i].latitude) ) {
        c = !c;
      }
    }
    return c;
  }
  
  function checkCompany(fileName) {
    var text = fs.readFileSync(dirName + "/" + fileName, "utf8");
    var company = JSON.parse(text);
    
    if ('geo' in company) {
      if (isPointInRegion(cityLimits, company.geo)) {
        insidePhiladelphia.push(company);
      } else {
        outsidePhiladelphia.push(company);      
      }
    } else {
      outsidePhiladelphia.push(company);
    }	
  }
  
  function writeCompanyMerge(fileName, companies) {
    var out = fs.createWriteStream(fileName, { encoding: "utf8" });
    out.write(JSON.stringify(companies, null, 2));
    out.end(); // currently the same as destroy() and destroySoon() 
  }
  
  function processCompanies(err, files) {
   if (err) {
      console.log(err);
      return;
    }
    
    function isJson(file) {
      return file.endsWith('.json');
    }
    
    files.sort(function(a, b) {
      if (a.toLowerCase() < b.toLowerCase()) return -1;
      if (a.toLowerCase() > b.toLowerCase()) return 1;
      return 0;
    });
    
    files = files.filter(isJson);
    files.forEach(checkCompany);
    
    console.log("insidePhiladelphia = " + insidePhiladelphia.length);
    console.log("outsidePhiladelphia = " + outsidePhiladelphia.length);
    
    writeCompanyMerge('philadelphia.json', insidePhiladelphia);
    writeCompanyMerge('philadelphia-burbs.json', outsidePhiladelphia);
  }
} else {
	function getFileName(path) {
		return path.substring(path.lastIndexOf('/') + 1, path.length);
	}
	var node = getFileName(process.argv[0]);

	var script = getFileName(process.argv[1]);

	console.log("Usage: " + node + " " + script + " <geodata> <dirname>");
  
}