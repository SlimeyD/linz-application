# Dvr Table Relationships

## LINZ District Valuation Roll (DVR) Dataset: Table Relationships

The LINZ District Valuation Roll (DVR) dataset is structured as a series of interconnected layers on the LINZ Data Service (LDS). These layers represent a logical decomposition of a property's valuation data, allowing for granular access and analysis. The relationships primarily revolve around a persistent unique identifier for the physical unit of property and specific IDs for each sub-component.

---

### 1. Core Relationship Concept: `unit_of_property_id`

The `unit_of_property_id` is the **most critical linking field** across all DVR-related layers and to the `NZ Property Titles (including Owners)` layer. It represents a single physical unit of property, ensuring consistency when tracking a property over time or across different data aspects (property details, improvements, land characteristics, and valuations).

Unlike `valuation_reference` which can change or be re-used over time for different properties within a TA, the `unit_of_property_id` is designed to be a stable identifier for a given parcel or unit.

---

### 2. Hierarchical Structure of DVR Layers

The DVR data follows a hierarchical structure that can be conceptualised as:

**Assessment** (top-level valuation for a specific date)
  **-> Property** (descriptive attributes of the physical property)
    **-> Improvements** (details about buildings and structures)
    **-> Land** (characteristics of the land parcel)
    **-> Values** (specific value components for an assessment)

This structure is implemented through a series of foreign key relationships:

*   **`assessment_id`**: Links the main DVR record to the specific `Assessments`, `Improvements`, `Land`, and `Values` records for a given valuation.
*   **`property_id`**: Links the main DVR record to its descriptive `Property` details.
*   **`improvements_id`**: Links the main DVR record to its `Improvements` details.
*   **`land_id`**: Links the main DVR record to its `Land` characteristics.
*   **`values_id`**: Links the main DVR record to its granular `Values` components.
*   **`title_id`**: Links `dvr-property` to `nz-property-titles-including-owners`.

---

### 3. Text-based Schema Diagram

Here's a simplified text representation of the primary relationships:

```
+------------------------------------+
| NZ Property Titles (Layer 100056)  |
| - title_id (PK)                    |
| - unit_of_property_id              |
| - title_reference                  |
| - owners_names                     |
| ...                                |
+-----------------|------------------+
                  |
                  | unit_of_property_id (FK)
                  | title_id (FK to Property Layer)
                  V
+------------------------------------+
| District Valuation Roll (Layer 100057) - Main Aggregated View |
| - id (PK)                          |
| - unit_of_property_id (FK)         |
| - assessment_id (FK)               |
| - property_id (FK)                 |
| - land_id (FK)                     |
| - improvements_id (FK)             |
| - values_id (FK)                   |
| - valuation_date                   |
| - street_address_line_1            |
| - territorial_authority            |
| - ta_code                          |
| - valuation_reference              |
| - geom                             |
| ...                                |
+-----------------|------------------+
                  | (Links via various FKs)
                  | assessment_id
                  | property_id
                  | land_id
                  | improvements_id
                  | values_id
                  V
+------------------------------------+       +------------------------------------+
| DVR - Assessments (Layer 100061)   |       | DVR - Property (Layer 100062)      |
| - id (PK) (aka assessment_id)      |<------|- id (PK) (aka property_id)        |
| - unit_of_property_id (FK)         |<------|- unit_of_property_id (FK)         |
| - valuation_date                   |       | - legal_description                |
| - rateable_value                   |       | - property_use_code                |
| - land_value                       |       | - zone_code                        |
| - improvements_value               |       | - land_area_sqm                    |
| - capital_value                    |       | - title_id (FK to NZ Property Titles)|
| ...                                |       | ...                                |
+------------------------------------+       +------------------------------------+
     |                                             |
     | assessment_id (FK)                          | unit_of_property_id (FK)
     V                                             V
+------------------------------------+       +------------------------------------+
| DVR - Improvements (Layer 100058)  |       | DVR - Land (Layer 100059)          |
| - id (PK) (aka improvements_id)    |       | - id (PK) (aka land_id)            |
| - assessment_id (FK)               |       | - assessment_id (FK)               |
| - unit_of_property_id (FK)         |       | - unit_of_property_id (FK)         |
| - building_age_indicator           |       | - contour_code                     |
| - condition_code                   |       | - land_use_code                    |
| - gross_floor_area_sqm             |       | - area_sqm                         |
| ...                                |       | ...                                |
+------------------------------------+       +------------------------------------+
     |
     | assessment_id (FK)
     V
+------------------------------------+
| DVR - Values (Layer 100060)        |
| - id (PK) (aka values_id)          |
| - assessment_id (FK)               |
| - unit_of_property_id (FK)         |
| - valuation_date                   |
| - rateable_value                   |
| - land_value                       |
| - improvements_value               |
| - capital_value                    |
| ...                                |
+------------------------------------+
```

---

### 4. Key Join Keys and Their Purpose

*   **`unit_of_property_id`**: This is the universal key. It allows joining ANY DVR-related layer (Property, Assessments, Improvements, Land, Values) to any other DVR-related layer, and also to the `NZ Property Titles` layer. Use this for cross-layer queries where you need to combine data from different aspects of the same physical property.

    *   **Example Join:** Join `dvr-property` with `dvr-improvements` on `unit_of_property_id`.

*   **`assessment_id`**: This key is specific to a particular valuation event. It links the main DVR record to the specific assessment, improvements, land, and values details that are *valid for that specific valuation date*. An `unit_of_property_id` can have multiple `assessment_id`s over time (representing revaluations).

    *   **Example Join:** Join `dvr` (main layer) with `dvr-assessments` on `dvr.assessment_id = dvr-assessments.id`. This ensures you get the assessment values precisely matching the main record's valuation date.

*   **`property_id`, `land_id`, `improvements_id`, `values_id`**: These are typically used to join the main `District Valuation Roll` layer (Layer 100057) to its respective sub-layers (`dvr-property`, `dvr-land`, `dvr-improvements`, `dvr-values`). These foreign keys exist in the main `District Valuation Roll` layer to directly pull in attributes from its component layers without needing to join on `unit_of_property_id` explicitly for data within the same valuation record.

    *   **Example Join:** Join `dvr` (main layer) with `dvr-property` on `dvr.property_id = dvr-property.id`.

*   **`title_id`**: Links `dvr-property` to `NZ Property Titles (including Owners)`.

    *   **Example Join:** Join `dvr-property` with `nz-property-titles-including-owners` on `dvr-property.title_id = nz-property-titles-including-owners.id`.

Understanding these relationships is crucial for constructing accurate and efficient queries when working with the LINZ DVR dataset.
