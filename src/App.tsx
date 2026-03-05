import React from 'react';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer } from '@deck.gl/layers';
import { Map } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_KEY;

export const App: React.FC = () => {
    const layer = new GeoJsonLayer({
        id: 'nyc-buildings',
        // This 11MB file is the star of the Brotli article
        data: '/NYBuildings.geojson',
        filled: true,
        extruded: true,

        /* 🛠️ GEOMETRY REPAIR SETTINGS */
        // Fixes "broken" polygons by ensuring consistent coordinate winding
        _normalize: true,
        _windingOrder: 'CCW',

        /* 🏗️ 3D EXTRUSION LOGIC */
        // Prioritize 'height', fallback to 'levels', default to 15m if both missing
        getElevation: (f: any) =>
            f.properties.height * 1.0 ||
            (f.properties['building:levels'] * 3.5) ||
            15,

        getFillColor: (f: any) => {
            const color = f.properties['building:colour'] || '#B5B9B8';
            // Robust Hex to RGB conversion for Deck.gl [R, G, B]
            const match = color.match(/[A-Za-z0-9]{2}/g);
            if (match && match.length === 3) {
                return match.map((v: string) => parseInt(v, 16));
            }
            return [181, 185, 184]; // Fallback Grey
        },

        /* ✨ VISUAL POLISH */
        material: {
            ambient: 0.2,
            diffuse: 0.6,
            shininess: 32,
            specularColor: [60, 60, 60]
        },

        pickable: true,
        autoHighlight: true,
        highlightColor: [255, 255, 255, 128],
    });

    return (
        <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
            <DeckGL
                initialViewState={{
                    longitude: -74.0060,
                    latitude: 40.7128,
                    zoom: 15.5,
                    pitch: 60, // Deep pitch for dramatic 3D perspective
                    bearing: 20
                }}
                controller={true}
                layers={[layer]}
            >
                <Map
                    mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
                    mapStyle="mapbox://styles/mapbox/dark-v11"
                />

                {/* Visual Label for the Article Demo */}
                <div style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    background: 'rgba(0,0,0,0.8)',
                    color: '#fff',
                    padding: '15px',
                    borderRadius: '8px',
                    fontFamily: 'sans-serif',
                    border: '1px solid #333'
                }}>
                    <h2 style={{ margin: 0, fontSize: '18px' }}>NYC 3D Digital Twin</h2>
                    <p style={{ margin: '5px 0 0', opacity: 0.7, fontSize: '12px' }}>
                        Loading 11MB GeoJSON via CloudFront
                    </p>
                </div>
            </DeckGL>
        </div>
    );
}
