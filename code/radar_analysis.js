// Define study area (Chennai Metropolitan Area)
var studyArea = ee.Geometry.Rectangle([80.1, 12.8, 80.4, 13.2]);
Map.centerObject(studyArea, 10);

// =============================================================================
// SENTINEL-1 SAR ANALYSIS FOR 2024
// =============================================================================

// Load Sentinel-1 data for 2024
var s1_2024 = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filterBounds(studyArea)
    .filterDate('2024-01-01', '2024-12-31')
    .filter(ee.Filter.eq('instrumentMode', 'IW'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
    .select('VV');

var radar2024 = s1_2024.median().clip(studyArea);

// Display radar backscatter image for 2024
Map.addLayer(radar2024, { min: -20, max: 0 }, 'Radar Backscatter 2024');

// Detect urban areas using radar backscatter threshold VV > -10 dB
var urbanRadar2024 = radar2024.gt(-10);
Map.addLayer(urbanRadar2024, { palette: ['white', 'blue'] }, 'Radar Urban 2024');

// Calculate urban area for 2024
var areaImage2024 = urbanRadar2024.multiply(ee.Image.pixelArea());
var urbanAreaRadar2024 = areaImage2024.reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: studyArea,
    scale: 10,
    maxPixels: 1e13
});

print('Radar Urban Area 2024 (m²):', urbanAreaRadar2024.get('VV'));

// =============================================================================
// SENTINEL-1 SAR ANALYSIS FOR 2018
// =============================================================================

// Load Sentinel-1 data for 2018
var s1_2018 = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filterBounds(studyArea)
    .filterDate('2018-01-01', '2018-12-31')
    .filter(ee.Filter.eq('instrumentMode', 'IW'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
    .select('VV');

var radar2018 = s1_2018.median().clip(studyArea);

// Display radar backscatter image for 2018
Map.addLayer(radar2018, { min: -20, max: 0 }, 'Radar Backscatter 2018');

// Detect urban areas using radar backscatter threshold VV > -10 dB
var urbanRadar2018 = radar2018.gt(-10);
Map.addLayer(urbanRadar2018, { palette: ['white', 'blue'] }, 'Radar Urban 2018');

// Calculate urban area for 2018
var areaImage2018 = urbanRadar2018.multiply(ee.Image.pixelArea());
var urbanAreaRadar2018 = areaImage2018.reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: studyArea,
    scale: 10,
    maxPixels: 1e13
});

print('Radar Urban Area 2018 (m²):', urbanAreaRadar2018.get('VV'));

// =============================================================================
// RESULTS SUMMARY
// =============================================================================

print('=== RADAR ANALYSIS SUMMARY ===');
print('Study Area: Chennai Metropolitan Area');
print('Analysis Period: 2018-2024');
print('Method: SAR Backscatter Analysis');
print('Sensor: Sentinel-1 C-band VV polarization');
print('Threshold: VV > -10 dB');
print('Spatial Resolution: 10m');

// =============================================================================
// ADDITIONAL ANALYSIS: DIFFERENCE MAP
// =============================================================================

// Create difference map showing urban expansion between 2018 and 2024
var urbanChange = urbanRadar2024.subtract(urbanRadar2018);
var newUrbanAreas = urbanChange.eq(1); // Areas that became urban (0->1)

Map.addLayer(newUrbanAreas, { palette: ['white', 'orange'] }, 'New Urban Areas (2018-2024)');

// Calculate area of new urban development
var newUrbanAreaImage = newUrbanAreas.multiply(ee.Image.pixelArea());
var newUrbanAreaTotal = newUrbanAreaImage.reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: studyArea,
    scale: 10,
    maxPixels: 1e13
});

print('New Urban Area (2018-2024) (m²):', newUrbanAreaTotal.get('VV'));