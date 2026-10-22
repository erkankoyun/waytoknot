"""Regression checks for source-name quality before unverified publication."""
import unittest

from pipeline import candidate


class SourceNameTests(unittest.TestCase):
    def row(self, name):
        return dict(id='source-id', name=name, source_category='photographer',
                    website='https://example.org/', city='Charleston', state='WV',
                    latitude=38.35, longitude=-81.63)

    def test_invalid_names_are_excluded(self):
        for name in (None, '', ' \t\n', '.', ' --- ', '📷', 123):
            with self.subTest(name=name):
                self.assertIsNone(candidate(self.row(name)))

    def test_unicode_whitespace_is_trimmed_without_losing_branch_data(self):
        row = self.row('\u2003 Studio 123 \u00a0')
        row['addresses'] = [{'freeform': '123 Main Street'}]
        result = candidate(row)
        self.assertEqual(result['name'], 'Studio 123')
        self.assertEqual(result['address'], '123 Main Street')
        self.assertEqual(result['state'], 'WV')
        self.assertEqual(row['name'], '\u2003 Studio 123 \u00a0')

    def test_unicode_names_and_preclassified_rows_are_preserved(self):
        self.assertEqual(candidate(self.row('Élan 婚礼'))['name'], 'Élan 婚礼')
        self.assertIsNone(candidate({'name': '.', 'category': 'photography',
                                     'url': 'https://example.org/'}))


if __name__ == '__main__':
    unittest.main()
