# Vite Brotli CloudFront Sample

A high-performance 3D geospatial visualizer using **Deck.gl** and **Mapbox** to demonstrate advanced asset optimization.

## The Core Problem

AWS CloudFront has a strict **10MB limit** for automatic compression. This project includes a **12MB NYC Buildings GeoJSON** file that bypasses this limit, forcing a manual compression strategy.

## Key Features

* **Surgical Compression:** Vite is configured to only pre-compress assets exceeding the 10MB threshold.
* **Dual Format:** Generates both `.br` (Brotli) and `.gz` (Gzip) for the heavy GeoJSON payload.
* **Edge Intelligence:** Includes a `lambdaCompress.js` Origin-Request function to serve the smallest version based on browser support.
* **Data Integrity:** Implements specific coordinate normalization and type-casting (`height * 1.0`) to ensure 3D building geometry renders correctly.

## Tech Stack

* **Framework:** React 19 + Vite 6
* **Visualization:** Deck.gl + Mapbox GL JS (v3)
* **Deployment Target:** AWS S3 + CloudFront + Lambda@Edge

## Quick Start

1. **Clone & Install:**

```bash
npm install
```

2. **Environment:** (Optional step)

Create a `.env` file in the root directory and add your Mapbox token if you have one. This will add streets map to the demo,

```text
VITE_MAPBOX_KEY=your_mapbox_access_token
```

3. **Build:**

```bash
npm run build
```

Inspect the `dist/` folder to see the 12MB GeoJSON alongside its 1.3MB `.br` counterpart.


4. **Simulate the Lambda@Edge:**

If not yet installed, install **[cloudfrontize](https://www.npmjs.com/package/cloudfrontize)** globally:
```bash
npm install -g cloudfrontize
```
Point CloudFrontize to your /dist folder and your Lambda logic:
 
```bash
cloudfrontize ./dist --edge ./lambdaCompress.js -d
```

* `--edge` Indicates the location of the Lambda@Edge function
* `-d` Option enabled debug
---


### Detailed article
This sample is a complement to this DEV.to article https://dev.to/felipecarrillo100/why-is-my-cdn-slow-bypassing-the-10mb-compression-limit-on-aws-cloudfront-1okn 

---

### 💡 Final Repo Configuration Notes

* **Description:** Brotli/Gzip compression demo for 11MB+ GeoJSON on CloudFront.
* **Keywords:** `vite`, `brotli`, `cloudfront`, `lambda@edge`, `deck.gl`, `mapbox`.
* **Repository URL:** [https://github.com/felipecarrillo100/vite-brotli-cloudfront-sample](https://github.com/felipecarrillo100/vite-brotli-cloudfront-sample)

**Would you like me to generate the first section of your article, focusing on the "10MB CloudFront trap," now that the repo is ready?**
