-- Reversible review of legacy substring category matches. Existing approved businesses are excluded.
CREATE TABLE IF NOT EXISTS catalog_category_review_backup(
 version TEXT NOT NULL,id TEXT NOT NULL,original_status TEXT NOT NULL,original_payload TEXT NOT NULL,
 reason TEXT NOT NULL,created_at TEXT NOT NULL,PRIMARY KEY(version,id));
INSERT INTO catalog_category_review_backup(version,id,original_status,original_payload,reason,created_at)
SELECT '2026-10-22-taxonomy-v1',id,status,payload,'source_category_outside_wedding_catalog',strftime('%Y-%m-%dT%H:%M:%SZ','now')
FROM directory_records WHERE status='listed' AND id LIKE 'overture-%'
AND json_extract(payload,'$.locationImportVersion') IS NOT '2026-10-22-points-v1'
AND json_extract(payload,'$.sourceCategory') IN ('coworking_space','air_duct_cleaning_service','spanish_restaurant','fingerprinting_service','newspaper_and_magazines_store','massage_school','hotel_bar','bartending_school','shared_office_space','social_security_service','3d_printing_service','hotel_supply_service','hot_air_balloons_tour','b2b_newspaper_advertising','industrial_cleaning_service','makerspace','outdoor_movie_space','self_catering_accommodation','art_space_rental','balloon_port','industrial_spares_and_products_wholesaler','national_security_service')
ON CONFLICT(version,id) DO NOTHING;
UPDATE directory_records SET status='pending',
payload=json_patch(payload,json_object('publishUnverified',json('false'),'reviewReason','source_category_outside_wedding_catalog','categoryReviewVersion','2026-10-22-taxonomy-v1','categoryReviewedAt','2026-10-22'))
WHERE status='listed' AND id IN(SELECT id FROM catalog_category_review_backup WHERE version='2026-10-22-taxonomy-v1');
SELECT COUNT(*) AS review_records FROM catalog_category_review_backup WHERE version='2026-10-22-taxonomy-v1';
