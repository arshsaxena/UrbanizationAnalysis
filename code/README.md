# Satellite-Based Urbanization Analysis Code

This directory contains the Google Earth Engine JavaScript code for analyzing urban growth in Chennai using satellite remote sensing data.

## Files

### 📡 `optical_analysis.js`
**Sentinel-2 Optical Analysis using NDBI**
- Analyzes urban areas using the Normalized Difference Built-up Index (NDBI)
- Uses Sentinel-2 multispectral imagery (2018-2024)
- Detects built-up areas through spectral contrast between SWIR and NIR bands
- Spatial resolution: 10m

**Key Features:**
- Cloud filtering (< 20% cloud coverage)
- NDBI calculation: (B11 - B8) / (B11 + B8)
- Urban classification threshold: NDBI > 0.1
- Area calculations for both 2018 and 2024

### 🛰️ `radar_analysis.js` 
**Sentinel-1 SAR Analysis using Backscatter**
- Analyzes urban areas using C-band radar backscatter
- Uses Sentinel-1 SAR imagery (2018-2024)
- Detects urban features through surface roughness and structure
- Spatial resolution: 10m

**Key Features:**
- VV polarization backscatter analysis
- Urban detection threshold: VV > -10 dB
- Temporal change analysis
- New urban area detection (2018-2024)

## How to Use

### In Google Earth Engine Code Editor:

1. **Open Google Earth Engine**: https://code.earthengine.google.com/
2. **Copy and paste** the content of either file into a new script
3. **Run the script** to execute the analysis
4. **View results** in the console and map visualization

### Study Area
- **Location**: Chennai Metropolitan Area, Tamil Nadu, India
- **Coordinates**: 80.1°-80.4°E, 12.8°-13.2°N
- **Area**: Approximately 1,200 km²

### Expected Results

**Optical Analysis (NDBI):**
- 2018 Urban Area: ~159 km²
- 2024 Urban Area: ~166 km²
- Growth: ~7.43 km² (4.7% increase)

**Radar Analysis (SAR):**
- 2018 Urban Area: ~592 km²
- 2024 Urban Area: ~681 km²
- Growth: ~88.15 km² (14.9% increase)

## Requirements

- Google Earth Engine account
- Access to Copernicus Sentinel data collections
- Web browser with JavaScript enabled

## Methodology

### Optical Analysis (NDBI)
1. Load Sentinel-2 Surface Reflectance collections
2. Apply cloud masking filters
3. Calculate median composite images
4. Compute NDBI using bands B11 (SWIR) and B8 (NIR)
5. Apply threshold classification
6. Calculate pixel areas and sum for total urban area

### Radar Analysis (SAR)
1. Load Sentinel-1 Ground Range Detected collections
2. Filter for VV polarization and IW instrument mode
3. Calculate median composite images
4. Apply backscatter threshold for urban detection
5. Generate change detection maps
6. Calculate pixel areas and sum for total urban area

## Notes

- Both analyses use 10-meter spatial resolution
- Results are reported in square meters
- Maps are automatically displayed with appropriate color palettes
- Console output provides quantitative area measurements