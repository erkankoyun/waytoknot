-- Cover viewport cluster calculations without loading business JSON payloads.
CREATE INDEX IF NOT EXISTS directory_map_geo ON directory_records(CAST(longitude AS REAL),CAST(latitude AS REAL),category,state,city_key,id) WHERE status IN ('approved','listed');
