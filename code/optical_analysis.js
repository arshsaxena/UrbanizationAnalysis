// Define study area (Chennai Metropolitan Area)
var studyArea = ee.Geometry.Rectangle([80.1, 12.8, 80.4, 13.2]);
Map.centerObject(studyArea, 10); // Center map on study area

// =============================================================================
// SENTINEL-2 ANALYSIS FOR 2024
// =============================================================================

// Load Sentinel-2 images for 2024
var s2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
    .filterBounds(studyArea)
    .filterDate('2024-01-01', '2024-12-31')
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20)); // remove cloudy images

var image2024 = s2.median().clip(studyArea); // create single composite image

// RGB visualization parameters
var visualization = {
    bands: ['B4', 'B3', 'B2'],
    min: 0,
    max: 3000
};

Map.addLayer(image2024, visualization, 'Sentinel-2 Image 2024');

// Calculate NDBI to detect built-up areas
// NDBI = (SWIR - NIR) / (SWIR + NIR) where SWIR=B11, NIR=B8
var ndbi = image2024.normalizedDifference(['B11', 'B8']).rename('NDBI');

Map.addLayer(
    ndbi,
    { min: -0.5, max: 0.5, palette: ['blue', 'white', 'red'] },
    'NDBI 2024'
);

// Classify urban pixels using threshold NDBI > 0.1
var urban = ndbi.gt(0.1);
Map.addLayer(urban, { palette: ['white', 'red'] }, 'Urban Areas 2024');

// Calculate urban area for 2024
var areaImage = urban.multiply(ee.Image.pixelArea());
var urbanArea = areaImage.reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: studyArea,
    scale: 10,
    maxPixels: 1e13
});

print('Urban Area 2024 (m²):', urbanArea.get('NDBI'));

// =============================================================================
// SENTINEL-2 ANALYSIS FOR 2018
// =============================================================================

// Load Sentinel-2 data for 2018
var s2_2018 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
    .filterBounds(studyArea)
    .filterDate('2018-01-01', '2018-12-31')
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20));

var image2018 = s2_2018.median().clip(studyArea);

// NDBI calculation for 2018
var ndbi2018 = image2018.normalizedDifference(['B11', 'B8']).rename('NDBI');

Map.addLayer(
    ndbi2018,
    { min: -0.5, max: 0.5, palette: ['blue', 'white', 'red'] },
    'NDBI 2018'
);

// Urban classification for 2018
var urban2018 = ndbi2018.gt(0.1);
Map.addLayer(urban2018, { palette: ['white', 'red'] }, 'Urban Areas 2018');

// Calculate urban area for 2018
var areaImage2018 = urban2018.multiply(ee.Image.pixelArea());
var urbanArea2018 = areaImage2018.reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: studyArea,
    scale: 10,
    maxPixels: 1e13
});

print('Urban Area 2018 (m²):', urbanArea2018.get('NDBI'));

// =============================================================================
// RESULTS SUMMARY
// =============================================================================

print('=== OPTICAL ANALYSIS SUMMARY ===');
print('Study Area: Chennai Metropolitan Area');
print('Analysis Period: 2018-2024');
print('Method: NDBI (Normalized Difference Built-up Index)');
print('Threshold: NDBI > 0.1');
print('Spatial Resolution: 10m');