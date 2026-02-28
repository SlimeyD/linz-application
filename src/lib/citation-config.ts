/**
 * Maps knowledge base filenames to their corresponding LINZ URLs and display labels.
 * Used to convert OpenAI citation annotations into clickable source links.
 */
export const CITATION_URL_MAP: Record<string, { label: string; url: string }> = {
  'dvr-data-dictionary.md': { label: 'LINZ Data Dictionary', url: 'https://data.linz.govt.nz/data/linz-data-dictionary/linz-data-dictionary.html#DVR' },
  'dvr-lookup-codes.md': { label: 'DVR Lookup Codes', url: 'https://data.linz.govt.nz/data/linz-data-dictionary/linz-data-dictionary.html#VALUATION_TYPE_CODE_LOOKUP' },
  'dvr-api-access.md': { label: 'DVR API Access', url: 'https://data.linz.govt.nz/layer/104996-district-valuation-roll-dvr/' },
  'dvr-data-availability.md': { label: 'DVR Data Availability', url: 'https://data.linz.govt.nz/layer/104996-district-valuation-roll-dvr/' },
  'dvr-common-issues.md': { label: 'DVR Common Issues', url: 'https://data.linz.govt.nz/layer/104996-district-valuation-roll-dvr/' },
  'dvr-metadata.md': { label: 'DVR Metadata', url: 'https://data.linz.govt.nz/layer/104996-district-valuation-roll-dvr/' },
  'dvr-table-relationships.md': { label: 'DVR Table Relationships', url: 'https://data.linz.govt.nz/data/linz-data-dictionary/linz-data-dictionary.html#DVR' },
};
