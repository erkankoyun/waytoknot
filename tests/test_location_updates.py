import importlib.util,json,sqlite3,unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('location_updates',ROOT/'scripts/catalog/prepare_location_updates.py');module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
class LocationUpdateTests(unittest.TestCase):
 def test_updates_only_existing_listings_preserves_official_details_and_repeats_safely(self):
  db=sqlite3.connect(':memory:');db.executescript((ROOT/'scripts/cloudflare-staging-schema.sql').read_text());db.executescript((ROOT/'scripts/catalog-enrichment-schema.sql').read_text())
  records=[]
  for i,status in enumerate(['listed','listed','approved','pending']):
   id='overture-'+f'{i:08x}-0000-0000-0000-000000000000';payload={'name':'Test','city':'Old City','state':'NY','images':['https://example.com/photo.jpg'],'openingHours':['Monday 9-5'],'url':'https://example.com/'}
   if i==1:payload.update(phone='+15185550000',detailsSource='https://example.com/contact',streetAddress='2 Official Road',address='2 Official Road, Albany')
   db.execute('INSERT INTO directory_records VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',(id,id,'Test','photography','Old City','old city','NY','US','https://example.com/','https://example.com/',status,'40','-72','test old city',json.dumps(payload),None,'original'))
   records.append({'id':id,'patch':{'coords':[42.65,-73.75],'city':'Albany','state':'NY','phone':'+15185551234','address':'1 Source Street, Albany','streetAddress':'1 Source Street'}})
  records.append({'id':'overture-ffffffff-0000-0000-0000-000000000000','patch':records[0]['patch']})
  script='\n'.join(module.statements(records,'test-batch'));db.executescript(script);db.executescript(script)
  self.assertEqual(db.execute('SELECT COUNT(*) FROM directory_records').fetchone()[0],4)
  rows=db.execute('SELECT status,city,latitude,payload,updated_at FROM directory_records ORDER BY id').fetchall()
  self.assertEqual(rows[0][:3],('listed','Albany','42.65'));p=json.loads(rows[0][3]);self.assertEqual(p['phone'],'+15185551234');self.assertEqual(p['locationAccuracy'],'source-point');self.assertEqual(p['images'],['https://example.com/photo.jpg'])
  p=json.loads(rows[1][3]);self.assertEqual(p['phone'],'+15185550000');self.assertEqual(p['address'],'2 Official Road, Albany');self.assertEqual(p['openingHours'],['Monday 9-5'])
  for row in rows[2:]:self.assertEqual(row[1],'Old City');self.assertNotIn('locationImportVersion',json.loads(row[3]))
  self.assertTrue(all(r[4]=='original' for r in rows));self.assertEqual(db.execute('SELECT matched_rows,phones_added FROM catalog_location_imports').fetchone(),(2,1));self.assertEqual(db.execute('SELECT COUNT(*) FROM catalog_location_patch_buffer').fetchone()[0],0)
  db.execute("INSERT INTO directory_fts(directory_fts) VALUES('integrity-check')")
 def test_rejects_invalid_coordinates_and_phone(self):
  row={'id':'overture-00000000-0000-0000-0000-000000000000','patch':{'city':'Albany','state':'NY','coords':[999,0]}}
  with self.assertRaises(ValueError):module.statements([row],'invalid')
  row['patch'].update(coords=[42,-73],phone='call-me')
  with self.assertRaises(ValueError):module.statements([row],'invalid')
if __name__=='__main__':unittest.main()
