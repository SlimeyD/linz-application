# Accessing LINZ District Valuation Roll (DVR) Data via LINZ Data Service (LDS) API

The LINZ Data Service (LDS) provides programmatic access to the District Valuation Roll (DVR) and its related datasets through a Web Feature Service (WFS) API. This document outlines the process for accessing and querying DVR data.

## LINZ API Key System

To access data via the LDS API, you need a personal API key.
1.  **Registration:** Register for a free account at [data.linz.govt.nz](https://data.linz.govt.nz/register/).
2.  **API Key Generation:** Once logged in, navigate to your account settings or API key management section to generate your unique API key.
3.  **Security:** Treat your API key like a password. Do not share it publicly or embed it directly in client-side code.

## Web Feature Service (WFS) Query Format

The LDS API uses the OGC WFS standard. All API requests begin with the base URL: `https://data.linz.govt.nz/services;key={YOUR_API_KEY}/wfs`.

A typical WFS GetFeature request includes the following parameters:
-   `service=WFS` (specifies the service type)
-   `version=1.0.0` (specifies the WFS version)
-   `request=GetFeature` (specifies the operation)
-   `typeName=layer_{LAYER_ID}` (specifies the dataset layer to query)
-   `outputFormat={FORMAT}` (desired output format)
-   `srsName=EPSG:4326` (CRS for spatial filtering, if applicable; always WGS84 Lat/Lon for WFS query parameters)
-   `maxFeatures={COUNT}` (for pagination)
-   `startIndex={OFFSET}` (for pagination)
-   `cql_filter={CQL_EXPRESSION}` (for attribute filtering)
-   `bbox={WEST,SOUTH,EAST,NORTH,EPSG:4326}` (for spatial filtering)

## DVR Layer IDs

The DVR dataset is composed of several related layers:
-   **100057**: District Valuation Roll (Main Roll) - The primary layer with valuation summaries.
-   **100062**: Property - Details about the properties (e.g., address, legal description).
-   **100061**: Assessments - Links properties to valuations.
-   **100058**: Improvements - Details about property improvements.
-   **100059**: Land - Details about the land component of a property.
-   **100060**: Values - Contains the specific valuation figures (Capital Value, Land Value, Value of Improvements).

## Pagination

To handle large datasets, the LDS API supports pagination:
-   `startIndex`: Specifies the offset for the first feature to return (0-based).
-   `maxFeatures`: Specifies the maximum number of features to return in a single request.
-   **Maximum per request:** The LDS API has a hard limit of `100000` features per request. If you need more data, you must make multiple paginated requests.

## Output Formats

Commonly used output formats include:
-   `geojson` or `application/json` (GeoJSON)
-   `csv` (Comma Separated Values)
-   `kml` (Keyhole Markup Language)
-   `gml` (Geography Markup Language)
-   `shape-zip` (Esri Shapefile in a ZIP archive)

## Authentication Header Format

While the API key can be embedded directly in the URL, for enhanced security and to bypass browser URL length limits, it is recommended to pass the API key in an `Authorization` HTTP header:

`Authorization: LINZAPI {YOUR_API_KEY}`

Example using `curl`:
`curl -H "Authorization: LINZAPI {YOUR_API_KEY}" "https://data.linz.govt.nz/services/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=layer_100057&maxFeatures=10"`

## CC BY 4.0 Licensing Requirements

Data obtained from the LINZ Data Service, including the DVR, is licensed under Creative Commons Attribution 4.0 International (CC BY 4.0).
-   **Attribution:** You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.
-   **Recommended Attribution:** "District Valuation Roll data sourced from LINZ. Crown Copyright Reserved."
-   Refer to the full license at [creativecommons.org/licenses/by/4.0/](https://creativecommons.org/licenses/by/4.0/).

## Rate Limiting Considerations

The LINZ Data Service implements rate limiting to ensure fair usage and service stability.
-   **General Limit:** Typically around 10 requests per second per IP address.
-   **Best Practice:** Implement exponential backoff in your application for retrying failed requests (e.g., HTTP 429 Too Many Requests errors). Avoid rapid, successive requests without pauses.
-   **Large Downloads:** For very large, one-off downloads, consider using the bulk download options on the LDS website directly, rather than making millions of API calls.

## Example Queries for Common Operations

Replace `{YOUR_API_KEY}` with your actual API key and adjust parameters as needed.

**1. Fetch first 10 DVR main records in GeoJSON:**
```
https://data.linz.govt.nz/services;key={YOUR_API_KEY}/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=layer_100057&outputFormat=geojson&maxFeatures=10
```

**2. Fetch 100 DVR main records for a specific Territorial Authority (e.g., "Auckland Council") in CSV:**
```
https://data.linz.govt.nz/services;key={YOUR_API_KEY}/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=layer_100057&outputFormat=csv&maxFeatures=100&cql_filter=TA_Name='Auckland Council'
```

**3. Fetch 50 Property records (layer 100062) starting from the 101st record in KML:**
```
https://data.linz.govt.nz/services;key={YOUR_API_KEY}/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=layer_100062&outputFormat=kml&maxFeatures=50&startIndex=100
```

**4. Fetch DVR main records within a bounding box (e.g., around central Wellington) in GeoJSON:**
*Note: BBOX coordinates must be in EPSG:4326 (longitude, latitude).*
```
https://data.linz.govt.nz/services;key={YOUR_API_KEY}/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=layer_100057&outputFormat=geojson&maxFeatures=100&bbox=174.76,-41.29,174.78,-41.28,EPSG:4326
```

**5. Fetch specific fields (`Valuation_Type`, `Capital_Value`, `Address`) for DVR main records:**
```
https://data.linz.govt.nz/services;key={YOUR_API_KEY}/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=layer_100057&outputFormat=geojson&maxFeatures=10&propertyname=Valuation_Type,Capital_Value,Address
```
---
