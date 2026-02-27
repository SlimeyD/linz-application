# Troubleshooting Guide for LINZ District Valuation Roll (DVR) Data Users

This document outlines common issues and considerations when working with the LINZ District Valuation Roll (DVR) dataset, particularly when accessed via the LINZ Data Service (LDS) API.

## Missing Territorial Authority (TA) Data

**Issue:** Data for certain Territorial Authorities (TAs) appears to be missing from the DVR dataset.
**Explanation:** The provision of DVR data by local councils to LINZ is an opt-in system. Not all TAs have chosen to participate in sharing their DVR data through LINZ.
**Specific Example:** Wellington City Council is a prominent example of a TA whose DVR data is currently not available through the LINZ Data Service.
**Resolution:** Verify the coverage extent in the metadata. If a TA is not listed, its data is not available via this service. Direct contact with the specific TA may be required for their valuation data.

## ValRef Reuse and Persistent Tracking

**Issue:** The `ValRef` (Valuation Reference) field, while seeming unique, can be reused over time, making it unreliable for tracking properties across different valuation cycles.
**Explanation:** `ValRef` is an identifier assigned by local councils for a specific valuation event. If a property is subdivided, merged, or undergoes significant changes, its `ValRef` may change, or a new property might inherit an old `ValRef` after a period.
**Resolution:** For persistent and unique tracking of a property or unit of property over time, **always use the `unit_of_property_id` field.** This identifier is designed to remain stable for the life of the property or unit, even if its valuation reference changes.

## Field Name Differences from Old Rating Valuations Rules (RVR) 2008 Dataset

**Issue:** Users migrating from the older Rating Valuations Rules (RVR) 2008 dataset may find field names have changed or data structures are different in the DVR dataset.
**Explanation:** The DVR dataset replaced the RVR in 2008, reflecting changes in valuation practices and data representation. Field names and their definitions were updated to align with the new standards.
**Resolution:** Refer to the detailed data dictionaries and metadata available for each DVR layer on the LINZ Data Service website. This will provide the current and accurate field names and their descriptions, facilitating migration and correct data interpretation.

## Empty/Null Fields

**Issue:** Some fields within the DVR dataset may contain null values or be empty.
**Explanation:** Empty or null fields generally indicate one of the following:
-   **Not Applicable:** The attribute is not relevant for that specific property (e.g., a specific improvement type for an undeveloped land parcel).
-   **Data Not Provided:** The information was not provided by the contributing Territorial Authority.
-   **Historical Data:** Data that was relevant under previous valuation methodologies but is no longer captured.
-   **Privacy/Suppression:** In rare cases, data might be intentionally omitted for privacy reasons.
**Resolution:** Assume null or empty fields mean the data is unavailable or not applicable for that record. Always check the data dictionary for specific field notes regarding potential null values.

## Large Dataset Handling

**Issue:** Retrieving large amounts of DVR data can lead to long processing times, timeouts, or excessive bandwidth usage.
**Explanation:** The DVR dataset is extensive, covering properties across New Zealand. Attempting to download the entire dataset in a single request is impractical and will likely fail.
**Resolution:**
-   **Pagination:** Use `startIndex` and `maxFeatures` (max 100,000 features per request) parameters to retrieve data in chunks.
-   **Spatial Filtering:** Use the `bbox` parameter with `srsName=EPSG:4326` to limit data to a specific geographical area.
-   **Attribute Filtering:** Use `cql_filter` to retrieve only records that match specific criteria (e.g., `TA_Name='Auckland Council'`).
-   **Targeted Fields:** Use `propertyname` to request only the specific attributes you need, reducing data transfer size.
-   **Bulk Downloads:** For full dataset downloads, consider using the pre-packaged bulk download files available directly on the LDS website, which are often faster and more robust.

## Common WFS Query Mistakes

**Issue:** Queries fail or return unexpected results due to incorrect WFS parameter usage.
**Common Mistakes:**
-   **Wrong Layer ID:** Using an incorrect `typeName` (e.g., `layer_100000` instead of `layer_100057`).
-   **Missing/Incorrect CRS:** For `bbox` queries, `srsName` must always be `EPSG:4326` (WGS84 Latitude/Longitude). The coordinates should be in `WEST,SOUTH,EAST,NORTH` (Long/Lat) order.
-   **Pagination Errors:** Forgetting `startIndex` or `maxFeatures` when expecting a large dataset, leading to only the first chunk being returned.
-   **Incorrect CQL Filter Syntax:** Errors in `cql_filter` expressions (e.g., missing quotes for string values, incorrect operators).
-   **Authentication:** Not including the API key in the URL or the `Authorization` header.
**Resolution:** Double-check all parameters against the LDS API documentation. Test small queries first. Pay close attention to case sensitivity for `typeName` and `outputFormat`.

## Data Freshness

**Issue:** Apparent lag between council updates and data availability on LDS.
**Explanation:**
-   **Update Frequency:** The DVR data is typically updated quarterly by LINZ.
-   **Lag:** There is an inherent delay between when local councils update their valuation rolls and when this updated data is processed by Quotable Value (QV), provided to LINZ, and then published on the LDS. This can mean the data on LDS is a few weeks or months behind the absolute latest council records.
**Resolution:** Be aware that the DVR data on LDS represents a snapshot at the time of its last quarterly publication, not necessarily real-time council data. Check the "Last Updated" date on the LDS dataset page for the most recent publication timestamp.

## Spatial Query Gotchas

**Issue:** Inaccurate or no results when performing spatial queries using `bbox`.
**Explanation:** While the underlying DVR data is stored in the New Zealand Transverse Mercator 2000 (NZTM2000, EPSG:2193) projection, the WFS API for spatial filtering (i.e., the `bbox` parameter) *requires* coordinates to be provided in **WGS84 Latitude/Longitude (EPSG:4326)**.
**Resolution:** Always ensure your `bbox` coordinates are in `EPSG:4326` (Long/Lat) format, and explicitly include `EPSG:4326` as the CRS in the `bbox` parameter itself (e.g., `bbox=174.76,-41.29,174.78,-41.28,EPSG:4326`). If you have coordinates in NZTM2000, you must reproject them to WGS84 before constructing your `bbox` query.
---
