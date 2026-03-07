# UrbanizationAnalysis

**Satellite-Based Urban Growth Analysis Using Sentinel-1/2 Data**

![Google Earth Engine](https://img.shields.io/badge/google%20earth%20engine-%234285F4?style=for-the-badge&logo=googleearthengine&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![LaTeX](https://img.shields.io/badge/latex-%23008080.svg?style=for-the-badge&logo=latex&logoColor=white)
![Markdown](https://img.shields.io/badge/markdown-%23000000.svg?style=for-the-badge&logo=markdown&logoColor=white)
![ESA](https://img.shields.io/badge/ESA%20Sentinel-0033A0?style=for-the-badge&logo=esa&logoColor=white)

> 📍 **Multi-sensor satellite analysis using Sentinel-1/2 data to track Chennai urban expansion**

## 🚀 Quick Start

1.  **Sign up for Google Earth Engine**: [earthengine.google.com](https://earthengine.google.com/)
2.  **Open Code Editor**: [code.earthengine.google.com](https://code.earthengine.google.com/)
3.  **Run Analysis**: Copy any script from `code/` paste, and Run!

> **⚡ No installation required!** The entire analysis runs on the Google Earth Engine cloud infrastructure.

## 📊 Key Results

**Chennai Metropolitan Area (1,200 km²)**

| Method | Growth (2018-2024) | Annual Rate |
| :--- | :--- | :--- |
| **Optical (NDBI)** | `+7.43 km²` (4.7%) | 1.24 km²/year |
| **Radar (SAR)** | `+88.15 km²` (14.9%) | 14.69 km²/year |

- **🛰️ Sensors**: Sentinel-1 SAR + Sentinel-2 Optical
- **🎯 Resolution**: 10m spatial resolution
- **📈 Pop. Growth**: ~91k new residents over 6 years

## 📈 Detailed Results

### 📊 Metric Breakdown

| Metric | Optical (NDBI) | Radar (SAR) | Comparison |
| :--- | :--- | :--- | :--- |
| **2018 Baseline** | 158.96 km² | 592.43 km² | Radar covers 3.7x more |
| **2024 Current** | 166.39 km² | 680.58 km² | Radar covers 4.1x more |
| **Absolute Growth** | +7.43 km² | **+88.15 km²** | 11.9x difference |
| **Relative Growth** | +4.7% | **+14.9%** | 3.2x difference |
| **Annual Rate** | 1.24 km²/year | **14.69 km²/year** | 11.8x difference |

### 🔍 Sensor Characteristics

- **Optical (Sentinel-2)**: High precision for core impervious surfaces (buildings, roads). Clear spectral signatures but sensitive to cloud cover.
- **Radar (Sentinel-1)**: Weather-independent. Detects surface roughness and structural complexity. Captures a broader range of infrastructure and mixed-use development.

## 🔬 Methodology

Our study employs a multi-sensor approach to overcome individual sensor limitations and provide a comprehensive map of urban density and structural change.

### ⚙️ Technical Specifications

**1. Optical Analysis (NDBI)**
Uses the Short-Wave Infrared (SWIR) and Near-Infrared (NIR) bands.
- **Formula**: `NDBI = (SWIR - NIR) / (SWIR + NIR)`
- **Threshold**: `NDBI > 0.1` classifies as Urban.

**2. Radar Analysis (SAR)**
Analyzes VV polarization backscatter intensity.
- **Source**: C-band SAR (10m Resolution)
- **Threshold**: `VV > -10 dB` classifies as Urban.

## 🔧 Installation & Usage

1.  **Register**: Apply for access at [earthengine.google.com](https://earthengine.google.com/).
2.  **Clone**: `git clone https://github.com/arshsaxena/UrbanizationAnalysis.git`
3.  **Execute**:
    - Open the [GEE Code Editor](https://code.earthengine.google.com/).
    - Paste the contents of `combined_analysis.js`.
    - Click **Run** to view the interactive map and console statistics.

## 📚 References

1.  **ESA**: [Sentinel-1 SAR User Guide](https://sentinel.esa.int/web/sentinel/user-guides/sentinel-1-sar)
2.  **ESA**: [Sentinel-2 MSI User Handbook](https://sentinel.esa.int/web/sentinel/user-guides/sentinel-2-msi)
3.  **Google**: [GEE Data Catalog](https://developers.google.com/earth-engine/datasets)
4.  **Census India**: [Population Statistics 2001/2011/2021](https://censusindia.gov.in/)