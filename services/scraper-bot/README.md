## Scraper Bot

Focused on AnyROR first; structured to add more targets later.

### What it does
- Attempts a static scrape with `requests` + `BeautifulSoup`
- Falls back to a headless browser (Playwright) for dynamic content
- Normalizes and stores extracted links + labels

### Setup
1) Create a virtualenv in `services/scraper-bot`
2) Install dependencies:
   - `pip install -e .`
3) (Optional) Install Playwright browsers:
   - `playwright install`

### Run
From `services/scraper-bot`:
- `python -m scraper_bot.main --site anyror --mode auto --out ./data/anyror.json`

### Output
Writes JSON with:
- source URL
- extraction mode (static or browser)
- document/link list with labels and hrefs
*** End Patch}```

