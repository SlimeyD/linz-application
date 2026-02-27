# Dvr Data Dictionary

## LINZ District Valuation Roll (DVR) Dataset: Data Dictionary

This document provides a comprehensive data dictionary for the LINZ District Valuation Roll (DVR) dataset and its related layers, accessible via the LINZ Data Service (LDS). It details all fields, their data types, and descriptions across the core DVR components and the `NZ Property Titles (including Owners)` layer, which is often used in conjunction with DVR data.

The DVR dataset on LDS is structured across several interconnected layers. The primary layers are:
*   **District Valuation Roll (Layer 100057)**: The main aggregated view, joining key information from other DVR layers.
*   **District Valuation Roll - Property (Layer 100062)**: Details about the physical property and its characteristics.
*   **District Valuation Roll - Assessments (Layer 100061)**: Valuation-specific data (rateable, land, improvements, capital values) for a given valuation date.
*   **District Valuation Roll - Improvements (Layer 100058)**: Details about structures and amenities on the land.
*   **District Valuation Roll - Land (Layer 100059)**: Details specific to the land parcel itself.
*   **District Valuation Roll - Values (Layer 100060)**: A more granular view of value components per assessment.
*   **NZ Property Titles (including Owners) (Layer 100056)**: Contains title information and owner details, often linked to DVR via `unit_of_property_id`.

---

### 1. District Valuation Roll (Layer 100057)

This is typically the most commonly queried layer, providing a summary view.

| Field Name                  | Data Type        | Description                                                                 | Example Value                       |
| :-------------------------- | :--------------- | :-------------------------------------------------------------------------- | :---------------------------------- |
| `id`                        | TEXT             | Unique identifier for the main DVR record.                                  | `dvr_1234567`                       |
| `district_valuation_roll_id`| TEXT             | Redundant unique ID, often same as `id`.                                    | `dvr_1234567`                       |
| `assessment_id`             | TEXT             | Foreign key linking to the `Assessments` layer.                             | `dvra_8765432`                      |
| `property_id`               | TEXT             | Foreign key linking to the `Property` layer.                                | `dvrp_1122334`                      |
| `land_id`                   | TEXT             | Foreign key linking to the `Land` layer.                                    | `dvrl_5566778`                      |
| `improvements_id`           | TEXT             | Foreign key linking to the `Improvements` layer.                            | `dvri_9900112`                      |
| `values_id`                 | TEXT             | Foreign key linking to the `Values` layer.                                  | `dvrv_3344556`                      |
| `valuation_date`            | DATE             | Date on which the valuation was performed.                                  | `2023-09-01`                        |
| `address_id`                | TEXT             | Identifier for the primary address record.                                  | `addr_0001`                         |
| `street_address_line_1`     | TEXT             | First line of the primary street address.                                   | `123 Main Street`                   |
| `street_address_line_2`     | TEXT             | Second line of the primary street address, if applicable (e.g., unit/level).| `Apartment 5`                       |
| `suburb_locality`           | TEXT             | Suburb or locality name.                                                    | `Mount Eden`                        |
| `city_town`                 | TEXT             | City or town name.                                                          | `Auckland`                          |
| `territorial_authority`     | TEXT             | Full name of the Territorial Authority (Council).                           | `Auckland Council`                  |
| `ta_code`                   | TEXT             | Abbreviated code for the Territorial Authority.                             | `AKL`                               |
| `valuation_reference`       | TEXT             | Unique identifier for the valuation within its Territorial Authority.       | `12345/000`                         |
| `valuation_number`          | TEXT             | Legacy valuation number (may not be unique across TAs).                     | `12345`                             |
| `unit_of_property_id`       | TEXT             | Persistent unique identifier for the physical unit of property. Crucial for cross-temporal analysis.| `NZ.QV.Property.1234567`            |
| `val_ref_id`                | TEXT             | A composite ID combining TA code and valuation reference.                   | `AKL-12345/000`                     |
| `geom`                      | GEOMETRY         | The spatial geometry of the property parcel (POINT or POLYGON).             | (WKT representation)                |
| `shape_length`              | DOUBLE PRECISION | Perimeter of the geometry (for polygon).                                    | `150.78`                            |
| `shape_area`                | DOUBLE PRECISION | Area of the geometry (for polygon).                                         | `550.25`                            |
| `dataset_id`                | TEXT             | Identifier for the source dataset.                                          | `DVR`                               |
| `dataset_name`              | TEXT             | Full name of the source dataset.                                            | `District Valuation Roll`           |
| `published_date`            | DATE             | Date the record was published to LDS.                                       | `2023-09-15`                        |
| `created_date`              | DATE             | Date the record was initially created in the source system.                 | `2023-09-01`                        |
| `modified_date`             | DATE             | Date the record was last modified in the source system.                     | `2023-09-01`                        |

---

### 2. District Valuation Roll - Property (Layer 100062)

Contains descriptive details about the property itself.

| Field Name                        | Data Type        | Description                                                                 | Example Value                       |
| :-------------------------------- | :--------------- | :-------------------------------------------------------------------------- | :---------------------------------- |
| `id`                              | TEXT             | Unique identifier for the property record.                                  | `dvrp_1122334`                      |
| `property_id`                     | TEXT             | Redundant unique ID, often same as `id`.                                    | `dvrp_1122334`                      |
| `assessment_id`                   | TEXT             | Foreign key linking to the `Assessments` layer.                             | `dvra_8765432`                      |
| `unit_of_property_id`             | TEXT             | Persistent unique identifier for the physical unit of property.             | `NZ.QV.Property.1234567`            |
| `legal_description`               | TEXT             | Legal description of the property (e.g., Lot, DP, Section).                 | `Lot 1 DP 54321`                    |
| `title_id`                        | TEXT             | Foreign key linking to the `NZ Property Titles` layer.                      | `nzpt_6789012`                      |
| `property_use_code`               | TEXT             | Code indicating the primary use of the property.                            | `RES`                               |
| `property_use_description`        | TEXT             | Description of the primary property use.                                    | `Residential`                       |
| `category_code`                   | TEXT             | Code indicating the property category.                                      | `SFR`                               |
| `category_description`            | TEXT             | Description of the property category.                                       | `Single Family Residence`           |
| `zone_code`                       | TEXT             | Code indicating the planning zone.                                          | `RS`                                |
| `zone_description`                | TEXT             | Description of the planning zone.                                           | `Residential Suburban`              |
| `number_of_apartments_or_units`   | INTEGER          | Number of separate residential or commercial units on the property.         | `1`                                 |
| `number_of_commercial_units`      | INTEGER          | Number of commercial units on the property.                                 | `0`                                 |
| `number_of_residential_units`     | INTEGER          | Number of residential units on the property.                                | `1`                                 |
| `primary_floor_area`              | NUMERIC          | Primary total floor area of improvements in square meters.                  | `150.00`                            |
| `secondary_floor_area`            | NUMERIC          | Secondary total floor area of improvements in square meters (e.g., garage). | `30.00`                             |
| `other_floor_area`                | NUMERIC          | Other floor area of improvements in square meters.                          | `10.00`                             |
| `land_area_sqm`                   | NUMERIC          | Total land area of the property in square meters.                           | `600.00`                            |
| `land_area_hectares`              | NUMERIC          | Total land area of the property in hectares.                                | `0.06`                              |
| `title_reference`                 | TEXT             | The unique title reference number (e.g., certificate of title).             | `NA123456`                          |
| `share_parcel`                    | BOOLEAN          | True if the property is a share parcel.                                     | `FALSE`                             |
| `covenant`                        | BOOLEAN          | True if there is a covenant on the title.                                   | `TRUE`                              |
| `easement`                        | BOOLEAN          | True if there is an easement affecting the property.                        | `TRUE`                              |
| `cross_lease`                     | BOOLEAN          | True if the property is held under a cross-lease title.                     | `FALSE`                             |
| `strat_plan`                      | BOOLEAN          | True if the property is part of a stratified plan (e.g., unit title).       | `FALSE`                             |
| `leasehold`                       | BOOLEAN          | True if the property is leasehold.                                          | `FALSE`                             |
| `native_land`                     | BOOLEAN          | True if the property is identified as Native (Maori) land.                  | `FALSE`                             |
| `owner_type_code`                 | TEXT             | Code indicating the type of ownership.                                      | `OWN`                               |
| `owner_type_description`          | TEXT             | Description of the ownership type.                                          | `Owner Occupier`                    |
| `proprietor_name_1`               | TEXT             | Name of the primary proprietor/owner.                                       | `Johnathan Smith`                   |
| `proprietor_name_2`               | TEXT             | Name of the secondary proprietor/owner (if any).                            | `Jane Smith`                        |
| `proprietor_address_1`            | TEXT             | First line of the proprietor's mailing address.                             | `123 Main Street`                   |
| `proprietor_address_2`            | TEXT             | Second line of the proprietor's mailing address.                            | `Mount Eden`                        |
| `proprietor_address_3`            | TEXT             | Third line of the proprietor's mailing address.                             | `Auckland`                          |
| `proprietor_address_4`            | TEXT             | Fourth line of the proprietor's mailing address.                            | `New Zealand`                       |
| `proprietor_address_country`      | TEXT             | Country of the proprietor's mailing address.                                | `New Zealand`                       |
| `proprietor_address_postcode`     | TEXT             | Postcode of the proprietor's mailing address.                               | `1024`                              |
| `number_of_owners`                | INTEGER          | The total number of registered owners for the property.                     | `2`                                 |

---

### 3. District Valuation Roll - Assessments (Layer 100061)

Records valuation figures for a specific assessment date.

| Field Name                  | Data Type        | Description                                                                 | Example Value                       |
| :-------------------------- | :--------------- | :-------------------------------------------------------------------------- | :---------------------------------- |
| `id`                        | TEXT             | Unique identifier for the assessment record.                                | `dvra_8765432`                      |
| `assessment_id`             | TEXT             | Redundant unique ID, often same as `id`.                                    | `dvra_8765432`                      |
| `valuation_date`            | DATE             | Date on which this specific assessment's values are effective.              | `2023-09-01`                        |
| `valuation_reference`       | TEXT             | Valuation reference number.                                                 | `12345/000`                         |
| `unit_of_property_id`       | TEXT             | Persistent unique identifier for the physical unit of property.             | `NZ.QV.Property.1234567`            |
| `rateable_value`            | NUMERIC          | The current rateable value of the property.                                 | `950000.00`                         |
| `land_value`                | NUMERIC          | The current value of the bare land component.                               | `600000.00`                         |
| `improvements_value`        | NUMERIC          | The current value of the improvements component.                            | `350000.00`                         |
| `capital_value`             | NUMERIC          | The current capital value (typically sum of land_value + improvements_value).| `950000.00`                         |
| `effective_date`            | DATE             | The official effective date of the valuation figures.                       | `2023-07-01`                        |
| `revaluation_date`          | DATE             | Date of the last general revaluation for the territorial authority.         | `2021-07-01`                        |
| `rateable_value_old`        | NUMERIC          | Rateable value from the previous assessment period.                         | `800000.00`                         |
| `land_value_old`            | NUMERIC          | Land value from the previous assessment period.                             | `500000.00`                         |
| `improvements_value_old`    | NUMERIC          | Improvements value from the previous assessment period.                     | `300000.00`                         |
| `capital_value_old`         | NUMERIC          | Capital value from the previous assessment period.                          | `800000.00`                         |

---

### 4. District Valuation Roll - Improvements (Layer 100058)

Details about the structures and other improvements on the land.

| Field Name                  | Data Type        | Description                                                                 | Example Value                       |
| :-------------------------- | :--------------- | :-------------------------------------------------------------------------- | :---------------------------------- |
| `id`                        | TEXT             | Unique identifier for the improvement record.                               | `dvri_9900112`                      |
| `improvements_id`           | TEXT             | Redundant unique ID, often same as `id`.                                    | `dvri_9900112`                      |
| `assessment_id`             | TEXT             | Foreign key linking to the `Assessments` layer.                             | `dvra_8765432`                      |
| `unit_of_property_id`       | TEXT             | Persistent unique identifier for the physical unit of property.             | `NZ.QV.Property.1234567`            |
| `building_age_indicator`    | TEXT             | Code indicating the decade of the main building's construction.             | `198`                               |
| `condition_code`            | TEXT             | Code for the general condition of improvements.                             | `A`                                 |
| `condition_description`     | TEXT             | Description of the general condition.                                       | `Average`                           |
| `construction_type_code`    | TEXT             | Code for the main construction material of the building.                    | `TIM`                               |
| `construction_type_description`| TEXT             | Description of the main construction material.                              | `Timber`                            |
| `roof_type_code`            | TEXT             | Code for the main roofing material.                                         | `G/I`                               |
| `roof_type_description`     | TEXT             | Description of the main roofing material.                                   | `Corrugated Iron`                   |
| `wall_type_code`            | TEXT             | Code for the main exterior wall material.                                   | `WEA`                               |
| `wall_type_description`     | TEXT             | Description of the main exterior wall material.                             | `Weatherboard`                      |
| `year_built`                | INTEGER          | Estimated or actual year the main building was built.                       | `1985`                              |
| `total_dwelling_units`      | INTEGER          | Total number of dwelling units within the improvements.                     | `1`                                 |
| `gross_floor_area_sqm`      | NUMERIC          | Total gross floor area of all buildings on the property in square meters.   | `190.00`                            |
| `number_of_bathrooms`       | INTEGER          | Number of bathrooms in the main dwelling.                                   | `2`                                 |
| `number_of_bedrooms`        | INTEGER          | Number of bedrooms in the main dwelling.                                    | `3`                                 |
| `number_of_garages`         | INTEGER          | Number of garage spaces.                                                    | `2`                                 |
| `has_carport`               | BOOLEAN          | True if the property has a carport.                                         | `TRUE`                              |
| `has_ensuite`               | BOOLEAN          | True if the property has an ensuite bathroom.                               | `TRUE`                              |
| `has_fireplace`             | BOOLEAN          | True if the property has a fireplace.                                       | `FALSE`                             |
| `has_swimming_pool`         | BOOLEAN          | True if the property has a swimming pool.                                   | `FALSE`                             |
| `has_lift`                  | BOOLEAN          | True if the building has a lift/elevator.                                   | `FALSE`                             |
| `has_air_conditioning`      | BOOLEAN          | True if the building has air conditioning.                                  | `TRUE`                              |
| `has_heating`               | BOOLEAN          | True if the building has central heating or similar.                        | `TRUE`                              |
| `has_alarm`                 | BOOLEAN          | True if the building has an alarm system.                                   | `FALSE`                             |
| `has_deck`                  | BOOLEAN          | True if the property has a deck.                                            | `TRUE`                              |
| `has_balcony`               | BOOLEAN          | True if the property has a balcony.                                         | `FALSE`                             |
| `number_of_offices`         | INTEGER          | Number of office spaces.                                                    | `0`                                 |
| `number_of_storerooms`      | INTEGER          | Number of dedicated storerooms.                                             | `1`                                 |
| `number_of_living_rooms`    | INTEGER          | Number of separate living rooms.                                            | `2`                                 |

---

### 5. District Valuation Roll - Land (Layer 100059)

Details specific to the land parcel.

| Field Name          | Data Type        | Description                                                                 | Example Value                       |
| :------------------ | :--------------- | :-------------------------------------------------------------------------- | :---------------------------------- |
| `id`                | TEXT             | Unique identifier for the land record.                                      | `dvrl_5566778`                      |
| `land_id`           | TEXT             | Redundant unique ID, often same as `id`.                                    | `dvrl_5566778`                      |
| `assessment_id`     | TEXT             | Foreign key linking to the `Assessments` layer.                             | `dvra_8765432`                      |
| `unit_of_property_id`| TEXT             | Persistent unique identifier for the physical unit of property.             | `NZ.QV.Property.1234567`            |
| `contour_code`      | TEXT             | Code for the general contour of the land.                                   | `F`                                 |
| `contour_description`| TEXT             | Description of the general land contour.                                    | `Flat`                              |
| `easement_access`   | BOOLEAN          | True if property access is via an easement.                                 | `FALSE`                             |
| `land_use_code`     | TEXT             | Code for the primary land use.                                              | `RES`                               |
| `land_use_description`| TEXT             | Description of the primary land use.                                        | `Residential`                       |
| `area_sqm`          | NUMERIC          | Land area in square meters (typically matches `land_area_sqm` in Property). | `600.00`                            |
| `area_hectares`     | NUMERIC          | Land area in hectares.                                                      | `0.06`                              |
| `frontage_metres`   | NUMERIC          | Length of the road frontage in metres.                                      | `15.50`                             |

---

### 6. District Valuation Roll - Values (Layer 100060)

Provides the raw value components similar to Assessments, potentially for historical or specific sub-assessments.

| Field Name           | Data Type        | Description                                                                 | Example Value                       |
| :------------------- | :--------------- | :-------------------------------------------------------------------------- | :---------------------------------- |
| `id`                 | TEXT             | Unique identifier for the values record.                                    | `dvrv_3344556`                      |
| `values_id`          | TEXT             | Redundant unique ID, often same as `id`.                                    | `dvrv_3344556`                      |
| `assessment_id`      | TEXT             | Foreign key linking to the `Assessments` layer.                             | `dvra_8765432`                      |
| `unit_of_property_id`| TEXT             | Persistent unique identifier for the physical unit of property.             | `NZ.QV.Property.1234567`            |
| `valuation_date`     | DATE             | Date on which these specific values are effective.                          | `2023-09-01`                        |
| `rateable_value`     | NUMERIC          | The current rateable value of the property.                                 | `950000.00`                         |
| `land_value`         | NUMERIC          | The current value of the bare land component.                               | `600000.00`                         |
| `improvements_value` | NUMERIC          | The current value of the improvements component.                            | `350000.00`                         |
| `capital_value`      | NUMERIC          | The current capital value (typically sum of land_value + improvements_value).| `950000.00`                         |
| `effective_date`     | DATE             | The official effective date of the valuation figures.                       | `2023-07-01`                        |

---

### 7. NZ Property Titles (including Owners) (Layer 100056)

Provides comprehensive information about property titles and registered owners, often joined with DVR data.

| Field Name                  | Data Type        | Description                                                                 | Example Value                       |
| :-------------------------- | :--------------- | :-------------------------------------------------------------------------- | :---------------------------------- |
| `id`                        | TEXT             | Unique identifier for the title record.                                     | `nzpt_6789012`                      |
| `title_id`                  | TEXT             | Redundant unique ID, often same as `id`.                                    | `nzpt_6789012`                      |
| `title_reference`           | TEXT             | The unique title reference number (e.g., certificate of title).             | `NA123456`                          |
| `unit_of_property_id`       | TEXT             | Persistent unique identifier for the physical unit of property. Links to DVR.| `NZ.QV.Property.1234567`            |
| `owners_names`              | TEXT             | A concatenated string of all registered owner names.                        | `John Smith; Jane Smith`            |
| `owners_addresses`          | TEXT             | A concatenated string of all registered owner addresses.                    | `123 Main St, Auckland; PO Box 100, Wellington` |
| `owner_type`                | TEXT             | Description of the ownership type (e.g., Fee Simple).                       | `Fee Simple`                        |
| `issue_date`                | DATE             | Date the title was issued.                                                  | `1990-03-20`                        |
| `status`                    | TEXT             | Current status of the title (e.g., `Active`, `Cancelled`).                  | `Active`                            |
| `territorial_authority`     | TEXT             | Full name of the Territorial Authority.                                     | `Auckland Council`                  |
| `ta_code`                   | TEXT             | Abbreviated code for the Territorial Authority.                             | `AKL`                               |
| `geom`                      | GEOMETRY         | The spatial geometry of the title parcel (usually POLYGON).                 | (WKT representation)                |
| `shape_length`              | DOUBLE PRECISION | Perimeter of the title geometry.                                            | `150.78`                            |
| `shape_area`                | DOUBLE PRECISION | Area of the title geometry.                                                 | `550.25`                            |
| `dataset_id`                | TEXT             | Identifier for the source dataset.                                          | `NZPT`                              |
| `dataset_name`              | TEXT             | Full name of the source dataset.                                            | `NZ Property Titles (including Owners)`|
| `published_date`            | DATE             | Date the record was published to LDS.                                       | `2023-09-15`                        |
| `created_date`              | DATE             | Date the record was initially created in the source system.                 | `2023-09-01`                        |
| `modified_date`             | DATE             | Date the record was last modified in the source system.                     | `2023-09-01`                        |
