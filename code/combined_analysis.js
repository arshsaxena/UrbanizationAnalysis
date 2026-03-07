// =============================================================================
// STUDY AREA DEFINITION
// =============================================================================
var studyArea = ee.Geometry.Rectangle([80.1, 12.8, 80.4, 13.2]);
Map.centerObject(studyArea, 10);

print('=== COMPREHENSIVE URBAN ANALYSIS: CHENNAI 2018-2024 ===');
print('Study Area: Chennai Metropolitan Area');
print('Methods: Optical (NDBI) + Radar (SAR Backscatter)');

// =============================================================================
// OPTICAL ANALYSIS (SENTINEL-2 NDBI)
// =============================================================================

// Load Sentinel-2 data for both years
var s2_2024 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
    .filterBounds(studyArea)
    .filterDate('2024-01-01', '2024-12-31')
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20));

var s2_2018 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
    .filterBounds(studyArea)
    .filterDate('2018-01-01', '2018-12-31')
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20));

// Create composite images
var optical2024 = s2_2024.median().clip(studyArea);
var optical2018 = s2_2018.median().clip(studyArea);

// Calculate NDBI for both years
var ndbi2024 = optical2024.normalizedDifference(['B11', 'B8']).rename('NDBI');
var ndbi2018 = optical2018.normalizedDifference(['B11', 'B8']).rename('NDBI');

// Urban classification (NDBI > 0.1)
var opticalUrban2024 = ndbi2024.gt(0.1);
var opticalUrban2018 = ndbi2018.gt(0.1);

// Calculate optical urban areas
var opticalArea2024 = opticalUrban2024.multiply(ee.Image.pixelArea()).reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: studyArea,
    scale: 10,
    maxPixels: 1e13
});

var opticalArea2018 = opticalUrban2018.multiply(ee.Image.pixelArea()).reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: studyArea,
    scale: 10,
    maxPixels: 1e13
});

// =============================================================================
// RADAR ANALYSIS (SENTINEL-1 SAR)
// =============================================================================

// Load Sentinel-1 data for both years
var s1_2024 = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filterBounds(studyArea)
    .filterDate('2024-01-01', '2024-12-31')
    .filter(ee.Filter.eq('instrumentMode', 'IW'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
    .select('VV');

var s1_2018 = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filterBounds(studyArea)
    .filterDate('2018-01-01', '2018-12-31')
    .filter(ee.Filter.eq('instrumentMode', 'IW'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
    .select('VV');

// Create composite images
var radar2024 = s1_2024.median().clip(studyArea);
var radar2018 = s1_2018.median().clip(studyArea);

// Urban classification (VV > -10 dB)
var radarUrban2024 = radar2024.gt(-10);
var radarUrban2018 = radar2018.gt(-10);

// Calculate radar urban areas
var radarArea2024 = radarUrban2024.multiply(ee.Image.pixelArea()).reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: studyArea,
    scale: 10,
    maxPixels: 1e13
});

var radarArea2018 = radarUrban2018.multiply(ee.Image.pixelArea()).reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: studyArea,
    scale: 10,
    maxPixels: 1e13
});

// =============================================================================
// VISUALIZATION
// =============================================================================

// Add layers to map
Map.addLayer(optical2024, { bands: ['B4', 'B3', 'B2'], min: 0, max: 3000 }, 'Optical 2024', false);
Map.addLayer(opticalUrban2024, { palette: ['white', 'red'] }, 'Optical Urban 2024');
Map.addLayer(opticalUrban2018, { palette: ['white', 'blue'] }, 'Optical Urban 2018', false);

Map.addLayer(radar2024, { min: -20, max: 0 }, 'Radar 2024', false);
Map.addLayer(radarUrban2024, { palette: ['white', 'navy'] }, 'Radar Urban 2024', false);
Map.addLayer(radarUrban2018, { palette: ['white', 'purple'] }, 'Radar Urban 2018', false);

// Urban expansion areas
var opticalExpansion = opticalUrban2024.subtract(opticalUrban2018).eq(1);
var radarExpansion = radarUrban2024.subtract(radarUrban2018).eq(1);

Map.addLayer(opticalExpansion, { palette: ['white', 'orange'] }, 'Optical Expansion (2018-2024)', false);
Map.addLayer(radarExpansion, { palette: ['white', 'yellow'] }, 'Radar Expansion (2018-2024)', false);

// =============================================================================
// RESULTS SUMMARY
// =============================================================================

print('');
print('=== OPTICAL ANALYSIS RESULTS ===');
print('2018 Urban Area (km²):', ee.Number(opticalArea2018.get('NDBI')).divide(1000000));
print('2024 Urban Area (km²):', ee.Number(opticalArea2024.get('NDBI')).divide(1000000));
print('Urban Growth (km²):', ee.Number(opticalArea2024.get('NDBI')).subtract(ee.Number(opticalArea2018.get('NDBI'))).divide(1000000));

print('');
print('=== RADAR ANALYSIS RESULTS ===');
print('2018 Urban Area (km²):', ee.Number(radarArea2018.get('VV')).divide(1000000));
print('2024 Urban Area (km²):', ee.Number(radarArea2024.get('VV')).divide(1000000));
print('Urban Growth (km²):', ee.Number(radarArea2024.get('VV')).subtract(ee.Number(radarArea2018.get('VV'))).divide(1000000));

print('');
print('=== ANALYSIS COMPLETE ===');
print('Toggle layer visibility to compare different results');
print('Red: Optical urban areas | Navy: Radar urban areas');
print('Orange: Optical expansion | Yellow: Radar expansion');