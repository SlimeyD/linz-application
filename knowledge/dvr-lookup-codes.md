# Dvr Lookup Codes

## LINZ District Valuation Roll (DVR) Dataset: Lookup Codes

The LINZ District Valuation Roll (DVR) dataset utilises various numeric and alphanumeric codes to classify and describe property attributes. Understanding these lookup codes is crucial for accurate interpretation and filtering of DVR data. This document outlines common lookup codes found across the DVR tables.

**Note on Code Completeness:** The codes listed here are based on commonly available LINZ documentation and examples found within the dataset. It's possible for additional or more specific codes to exist that are not exhaustively documented here. Where possible, descriptions are directly from LINZ sources; otherwise, they are inferred from context.

---

### 1. Building Age Indicator (`building_age_indicator` - from `dvr-improvements`)

This code indicates the approximate decade of construction for the main building. It's typically represented by the last two digits of the decade.

| Code | Meaning            |
| :--- | :----------------- |
| `180`| 1880s (e.g., 1880-1889) |
| `189`| 1890s (e.g., 1890-1899) |
| `190`| 1900s (e.g., 1900-1909) |
| `191`| 1910s (e.g., 1910-1919) |
| `192`| 1920s (e.g., 1920-1929) |
| `193`| 1930s (e.g., 1930-1939) |
| `194`| 1940s (e.g., 1940-1949) |
| `195`| 1950s (e.g., 1950-1959) |
| `196`| 1960s (e.g., 1960-1969) |
| `197`| 1970s (e.g., 1970-1979) |
| `198`| 1980s (e.g., 1980-1989) |
| `199`| 1990s (e.g., 1990-1999) |
| `200`| 2000s (e.g., 2000-2009) |
| `201`| 2010s (e.g., 2010-2019) |
| `202`| 2020s (e.g., 2020-2029) |
| `UNC`| Unspecified / Unknown |

---

### 2. Condition (`condition_code` - from `dvr-improvements`)

Indicates the general physical condition of the improvements on the property.

| Code | Meaning            |
| :--- | :----------------- |
| `E`  | Excellent          |
| `G`  | Good               |
| `A`  | Average            |
| `P`  | Poor               |
| `V`  | Very Poor          |
| `U`  | Unknown / Unspecified |

---

### 3. Construction Type (`construction_type_code` - from `dvr-improvements`)

Describes the main external construction material of the building.

| Code | Meaning                |
| :--- | :--------------------- |
| `TIM`| Timber                 |
| `BRI`| Brick                  |
| `CON`| Concrete               |
| `BLK`| Blockwork (e.g., concrete block) |
| `STB`| Steel & Block          |
| `PRE`| Prefabricated          |
| `MIX`| Mixed Materials        |
| `OTH`| Other                  |
| `UNC`| Unspecified / Unknown  |

---

### 4. Contour (`contour_code` - from `dvr-land`)

Describes the general slope or topography of the land.

| Code | Meaning            |
| :--- | :----------------- |
| `F`  | Flat               |
| `R`  | Rolling            |
| `S`  | Steep              |
| `V`  | Very Steep         |
| `U`  | Undulating         |
| `MIX`| Mixed              |
| `UNC`| Unspecified / Unknown |

---

### 5. Roof Type (`roof_type_code` - from `dvr-improvements`)

Describes the primary roofing material.

| Code | Meaning            |
| :--- | :----------------- |
| `G/I`| Corrugated Iron    |
| `TIL`| Tile (e.g., clay, concrete) |
| `LON`| Longrun Steel      |
| `DEC`| Decramastic / Pressed Steel Tile |
| `ASB`| Asbestos           |
| `SHI`| Shingle            |
| `MEM`| Membrane           |
| `CON`| Concrete           |
| `OTH`| Other              |
| `UNC`| Unspecified / Unknown |

---

### 6. Wall Type (`wall_type_code` - from `dvr-improvements`)

Describes the primary exterior wall material.

| Code | Meaning                |
| :--- | :--------------------- |
| `WEA`| Weatherboard           |
| `BRI`| Brick                  |
| `BLK`| Blockwork (e.g., concrete block) |
| `FIB`| Fibrolite / Asbestos Cement |
| `ALU`| Aluminium (cladding)   |
| `PLA`| Plaster / Stucco       |
| `COM`| Composite / Panel      |
| `MIX`| Mixed Materials        |
| `OTH`| Other                  |
| `UNC`| Unspecified / Unknown  |

---

### 7. Ownership Type (`owner_type_code` - from `dvr-property` and `NZ Property Titles`)

Describes the general category of property ownership. This may vary slightly between DVR and NZ Property Titles.

**From `dvr-property`:**

| Code | Meaning            |
| :--- | :----------------- |
| `OWN`| Owner Occupier     |
| `INV`| Investor           |
| `GOV`| Government         |
| `COR`| Corporate / Company|
| `TRU`| Trust              |
| `LEA`| Leasehold          |
| `UNC`| Unspecified / Unknown |

**From `NZ Property Titles` (`owner_type` field):**

| Code (Description) | Meaning            |
| :----------------- | :----------------- |
| `Fee Simple`       | Absolute ownership, most common type. |
| `Leasehold`        | Ownership of a lease agreement. |
| `Licence`          | Right to occupy but not own. |
| `Stratum Estate`   | Unit title ownership. |
| `Cross Lease`      | Form of tenure where owners are tenants in common of the land and lease their homes from the other owners. |
| `Maori Freehold`   | Land held under Te Ture Whenua Maori Act 1993. |
| `Crown Lease`      | Leasehold from the Crown. |
| `Crown Land`       | Owned by the Crown. |

---

### 8. Property Use (`property_use_code` - from `dvr-property` and `dvr-land`)

Indicates the primary functional use of the property or land.

| Code | Meaning            |
| :--- | :----------------- |
| `RES`| Residential        |
| `COM`| Commercial         |
| `IND`| Industrial         |
| `RUR`| Rural              |
| `MIX`| Mixed Use          |
| `EDU`| Education          |
| `REC`| Recreation         |
| `CIV`| Civic / Public     |
| `OTH`| Other              |
| `UNC`| Unspecified / Unknown |

---

### 9. Category (`category_code` - from `dvr-property`)

Provides a more specific categorisation of the property type.

| Code | Meaning                     |
| :--- | :-------------------------- |
| `SFR`| Single Family Residence     |
| `TER`| Terraced House              |
| `APT`| Apartment / Flat            |
| `UNI`| Unit (general)              |
| `RET`| Retail                      |
| `OFF`| Office                      |
| `WHS`| Warehouse                   |
| `FAR`| Farm                        |
| `LIG`| Light Industrial            |
| `HEA`| Heavy Industrial            |
| `ACA`| Accommodation (e.g., hotel, motel) |
| `CAR`| Carpark                     |
| `OTH`| Other                       |
| `UNC`| Unspecified / Unknown       |

---

### 10. Zone (`zone_code` - from `dvr-property`)

Indicates the planning zone assigned to the property by the Territorial Authority. These codes are highly variable by TA, so only generic examples are provided. For precise definitions, refer to the relevant TA's district plan.

| Generic Code | Generic Meaning        |
| :----------- | :--------------------- |
| `RS`         | Residential Suburban   |
| `MHU`        | Mixed Housing Urban    |
| `BCH`        | Business - City Centre |
| `BLG`        | Business - Local Centre|
| `IND`        | Industrial             |
| `RUR`        | Rural                  |
| `OS`         | Open Space             |
| `CON`        | Conservation           |
| `WTR`        | Water                  |
| `HTG`        | Heritage               |
| `OTH`        | Other                  |
| `UNC`        | Unspecified / Unknown  |

**Important:** The specific codes and their meanings for `zone_code` are defined by each Territorial Authority in their respective District Plans. The values in the DVR dataset will reflect these TA-specific codes. It is recommended to cross-reference with the relevant TA's planning documents for definitive interpretations.
