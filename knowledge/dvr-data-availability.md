# Dvr Data Availability

## LINZ District Valuation Roll (DVR) Dataset: Data Availability

The LINZ District Valuation Roll (DVR) dataset provides a rich source of property and valuation information for New Zealand. However, its availability is subject to specific conditions, making it crucial to understand what data you can expect and where potential gaps might exist.

---

### 1. DVR is an OPT-IN Dataset

**CRITICAL POINT:** The District Valuation Roll data published by LINZ is **OPT-IN** by individual Territorial Authorities (TAs) or Local Councils. This means that not all councils choose to provide their valuation roll data to LINZ for publication on the LINZ Data Service (LDS).

*   **Consequence:** If a council does not opt-in, its property valuation data will **not be present** in the LINZ DVR dataset. This is not a data quality issue or missing data in the technical sense, but a policy decision by the TA.

*   **Impact on Users:** Users must be aware that queries for properties within non-participating TAs will yield no results, even if those properties exist and have valuations managed by their local council.

---

### 2. Notable Unavailable Territorial Authorities

One of the most prominent examples of a Territorial Authority that **DOES NOT** provide its District Valuation Roll data to LINZ for public distribution via the LDS is **Wellington City Council**.

*   **Wellington City Council:** Data for properties within the Wellington City Council area (TA Code `WGN`) is **not available** in the LINZ DVR dataset. This includes properties in suburbs like Oriental Bay, Miramar, Karori, Johnsonville, etc. Users needing data for Wellington City will need to explore alternative sources, such as direct requests to Wellington City Council or Quotable Value (QV).

While specific lists can change, other smaller TAs might also choose not to participate. It's always advisable to verify the coverage for your area of interest.

---

### 3. Identifying Available/Unavailable TAs

The `ta_code` and `territorial_authority` fields within the DVR dataset itself are the best indicators of coverage.

*   **To check available TAs:** Query the `District Valuation Roll` layer (Layer 100057) and select distinct `territorial_authority` or `ta_code` values. This will give you an exhaustive list of all TAs currently represented in the dataset.
*   **Absence Implies Unavailability:** If a `ta_code` for a known council is not present in this distinct list, it means that council's data is not part of the LINZ DVR dataset.

**Example Query (conceptual, using WFS):**
```
https://data.linz.govt.nz/services;key=<YOUR_API_KEY>/wfs?service=WFS&version=2.0.0&request=GetFeature&typename=layer-100057&outputformat=json&propertyname=territorial_authority&resulttype=hits
```
(Note: `resulttype=hits` only returns the count. For actual distinct values, you would need to fetch features and process them or use a SQL-enabled WFS if available, or download a subset). A more practical approach is often to download a small sample or use a client that supports `DISTINCT` queries if available.

---

### 4. Open vs. Restricted Datasets on LDS

The LINZ Data Service (LDS) categorises datasets as "Open" or "Restricted."

*   **Open Datasets:** Generally freely available for download and API access under a Creative Commons Attribution 4.0 International (CC BY 4.0) license, requiring only attribution to LINZ. The DVR dataset falls under this category in terms of licensing and access mechanism.
*   **Restricted Datasets:** Require specific approval or a data sharing agreement due to sensitive information, licensing constraints from the data provider, or other reasons.

The DVR dataset is an **Open Dataset** once it is published by LINZ. However, the "restriction" in its availability comes from the *source* (local councils) choosing whether to share their data with LINZ in the first place, rather than LINZ itself restricting access to the data they *do* receive.

---

### 5. Implications for Data Use

*   **Regional Analysis:** Be mindful of incomplete coverage when performing regional or national analyses. Aggregations might be skewed if major urban centres or significant rural areas are missing.
*   **Chatbot Responses:** For a LINZ Data Assistant chatbot, it's crucial to inform users about data availability limitations. If a user asks for data for Wellington City, the chatbot should explicitly state that this data is not available through LINZ LDS.
*   **Data Consistency:** While the data provided by participating councils is consistent in structure and updated quarterly (see `dvr-metadata.md`), the lack of data from non-participating councils is a permanent gap within the LDS DVR offering.

Always verify the `territorial_authority` field if your analysis relies on complete national or regional coverage.
