'use strict';

// This line tells the simulator to run this on 'origin-request'. Remove this line before deploying to AWS
exports.hookType = 'origin-request';

exports.handler = (event, context, callback) => {
    const request = event.Records[0].cf.request;
    const headers = request.headers;
    const uri = request.uri;

    // Targeted Match: Define a match patter for the pre-compressed files
    // This example ONLY rewrites NYBuildings.geojson
    if (uri === '/NYBuildings.geojson') {
        const aeHeader = headers['accept-encoding'];
        const acceptEncoding = (aeHeader && aeHeader.length > 0) ? aeHeader[0].value : '';

        // Priority: Brotli (.br) > Gzip (.gz)
        if (acceptEncoding.includes('br')) {
            request.uri += '.br';
        } else if (acceptEncoding.includes('gzip')) {
            request.uri += '.gz';
        }

        // Log the rewrite for CloudWatch debugging
        console.log(`[Lambda@Edge] Rewriting ${uri} to ${request.uri}`);
    }

    // All other files (JS, CSS, etc.) pass through normally.
    // CloudFront will use its "Automatic Compression" for them if enabled.
    callback(null, request);
};

