# Metadata and Provenance for the LINZ District Valuation Roll (DVR) Dataset

This document provides essential metadata and provenance information for the District Valuation Roll (DVR) dataset available through the LINZ Data Service (LDS). Understanding these details is crucial for appropriate use and interpretation of the data.

## ISO 19115 Metadata Standard Context

LINZ adheres to the ISO 19115 Geospatial Metadata standard. Each dataset on the LINZ Data Service, including the DVR layers, is accompanied by comprehensive metadata. This metadata provides structured information about the dataset's content, quality, spatial and temporal properties, and contact information. Users are encouraged to consult the specific metadata entry for each DVR layer on data.linz.govt.nz for the most detailed and up-to-date information.

## Data Lineage

The DVR dataset follows a specific data lineage from source to publication:
1.  **Local Councils:** Territorial Authorities (TAs) in New Zealand are responsible for maintaining their local District Valuation Rolls. They engage valuers to assess properties within their jurisdiction.
2.  **Quotable Value (QV):** QV, a state-owned enterprise, often acts as the primary valuation service provider for many TAs. They compile the raw valuation data based on council requirements.
3.  **LINZ (Land Information New Zealand):** LINZ aggregates the DVR data provided by participating TAs (often facilitated by QV) into a national dataset.
4.  **LDS (LINZ Data Service):** LINZ then publishes this aggregated DVR data through the LINZ Data Service, making it publicly accessible via web services (WFS/WMS) and bulk downloads.

## Update Frequency and Publication Schedule

-   **Update Frequency:** The DVR dataset is updated **quarterly**.
-   **Publication Schedule:** LINZ aims to publish updates to the LDS following the completion of data aggregation from councils. While a precise date within the quarter can vary, users can typically expect new data versions to appear during the first month of each quarter (e.g., January, April, July, October), allowing for processing time. The "Last Updated" timestamp on the LDS dataset page indicates the most recent publication.

## Data Quality Measures and Known Limitations

-   **Source Data Quality:** The quality of the DVR data is inherently dependent on the accuracy and completeness of the data provided by individual Territorial Authorities and their valuers.
-   **Known Gaps:** As participation is opt-in, data for certain TAs (e.g., Wellington City Council) is not included in the LINZ DVR dataset. Users must be aware of these coverage gaps.
-   **Data Consistency:** While LINZ undertakes data validation and standardisation, minor inconsistencies between TAs can occasionally occur due to varying local practices or timing of updates.
-   **Fitness for Purpose:** Users should always consider the context and purpose for which the data was collected (statutory rating valuations) and assess its suitability for their specific application. LINZ provides the data "as is" and advises users to perform their own due diligence.

## Coordinate Reference System (CRS)

-   **Native Storage CRS:** The DVR data, like most geospatial data managed by LINZ, is primarily stored and maintained in the **New Zealand Geodetic Datum 2000 (NZGD2000)** projection, specifically **NZTM2000 (New Zealand Transverse Mercator 2000)**, which corresponds to **EPSG:2193**. This is the national projection for New Zealand.
-   **Web Feature Service (WFS) Query CRS:** When performing spatial queries (e.g., using the `bbox` parameter) via the WFS API, you **must** provide the coordinates in **WGS84 Latitude/Longitude (EPSG:4326)**. The API will then reproject the request to query the underlying NZTM2000 data.
-   **Output CRS:** WFS output can typically be requested in various CRS, but by default or most commonly for web-based consumption, it will be `EPSG:4326` (GeoJSON) or `EPSG:2193`.

## Coverage Extent

The DVR dataset provides national coverage for New Zealand, **excluding** those Territorial Authorities that have not opted to provide their valuation roll data to LINZ. It is important to check the metadata and documentation for a definitive list of participating TAs.

## Historical Data

-   **Replacement of RVR:** The current District Valuation Roll (DVR) dataset effectively **replaced the Rating Valuations Rules (RVR) dataset in 2008**. The RVR dataset used a different data model and was retired following legislative changes.
-   **No Direct Archive:** While the current DVR dataset is regularly updated, LINZ generally does not maintain public archives of every historical quarterly snapshot of the full DVR data itself through the LDS API. However, some historical data may be accessible through specific bulk downloads or direct request to LINZ.

## Contact and Support Channels

For support, questions, or to report data issues related to the DVR dataset or the LINZ Data Service:
-   **LDS Help Page:** Visit [data.linz.govt.nz/help/](https://data.linz.govt.nz/help/) for FAQs and support resources.
-   **Contact LINZ:** Use the contact form or details provided on the LINZ website for direct inquiries.
-   **Community Forum:** The LDS platform often has a community forum where users can ask questions and share knowledge.

## Licensing: CC BY 4.0 Attribution Requirements

The DVR data, like most open data from LINZ, is licensed under the **Creative Commons Attribution 4.0 International (CC BY 4.0)** license.
-   **Attribution:** Users are required to provide appropriate attribution.
-   **Recommended Attribution Statement:** "District Valuation Roll data sourced from LINZ. Crown Copyright Reserved."
-   Refer to the full license terms at [creativecommons.org/licenses/by/4.0/](https://creativecommons.org/licenses/by/4.0/) for complete details on permissible use and attribution.
---
