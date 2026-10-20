import importlib.util,json,unittest
from pathlib import Path
spec=importlib.util.spec_from_file_location('details',Path(__file__).parents[1]/'scripts/catalog/enrich_details.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
class Details(unittest.TestCase):
 def test_uses_correct_branch_and_published_fields(self):
  records=[{'name':'Other store','address':{'addressLocality':'Boston'},'openingHours':'Mo 01:00-02:00','image':'https://example.com/wrong.jpg'},{'name':'Albany store','address':{'addressLocality':'Albany'},'openingHoursSpecification':[{'dayOfWeek':['https://schema.org/Monday'],'opens':'09:00','closes':'17:00'}],'image':{'url':'/albany.jpg'}}]
  result=m.extract('<script type="application/ld+json">'+json.dumps(records)+'</script>','https://example.com/albany','Albany','Albany store')
  self.assertEqual(result['images'],['https://example.com/albany.jpg']);self.assertEqual(result['openingHours'],['Monday: 09:00–17:00'])
 def test_missing_hours_are_never_invented(self):
  self.assertEqual(m.extract('<meta property="og:image" content="/official.jpg">','https://example.com/','Albany','Shop')['images'],['https://example.com/official.jpg'])
  self.assertNotIn('openingHours',m.extract('<p>Open by appointment</p>','https://example.com/','Albany','Shop'))
if __name__=='__main__':unittest.main()
