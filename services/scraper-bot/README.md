# MilkatAI Scraper Bot

Multi-website scraper for Gujarat government property and land record portals.

## Overview

This service scrapes data from various Gujarat government websites related to property and land records. It supports both static scraping (using requests + BeautifulSoup) and dynamic scraping (using Playwright for JavaScript-rendered content).

## Directory Structure

```
scraper-bot/
├── environment.yml           # Conda environment configuration
├── requirements.txt          # Python dependencies
├── pyproject.toml            # Package configuration
├── README.md
├── data/                     # Scraped data output directory
└── src/
    └── scraper_bot/
        ├── __init__.py
        ├── cli.py            # CLI entry point
        ├── api/              # FastAPI application
        │   ├── __init__.py
        │   ├── main.py       # FastAPI app initialization
        │   └── routes.py     # API endpoints
        ├── core/             # Shared utilities
        │   ├── __init__.py
        │   ├── config.py     # Website URLs configuration
        │   ├── http_client.py
        │   ├── logger.py
        │   └── models.py     # Pydantic models
        └── scrapers/         # Website-specific scrapers
            ├── __init__.py
            ├── base.py       # Abstract base scraper
            ├── anyror/       # AnyROR Gujarat scraper
            ├── iora/         # IORA Gujarat (planned)
            ├── rmc/          # Rajkot Municipal Corp (planned)
            ├── garvi/        # GARVI Gujarat (planned)
            ├── revenue/      # Revenue Department (planned)
            ├── rajkot_uda/   # Rajkot UDA (planned)
            ├── gujrerar/     # GujRERA (planned)
            └── rajkot_edu/   # Rajkot Education (planned)
```

## Supported Websites

| Site | URL | Status |
|------|-----|--------|
| AnyROR | https://anyror.gujarat.gov.in/ | Active |
| IORA | https://iora.gujarat.gov.in/ | Planned |
| RMC | https://www.rmc.gov.in/ | Planned |
| GARVI | https://garvi.gujarat.gov.in/ | Planned |
| Revenue | https://revenuedepartment.gujarat.gov.in/ | Planned |
| Rajkot UDA | https://www.rajkotuda.com/ | Planned |
| GujRERA | https://gujrerar1.gujarat.gov.in/ | Planned |
| Rajkot Education | https://rajkot.nic.in/education/ | Planned |

## Setup

### Option 1: Conda Environment (Recommended)

```bash
# Create and activate conda environment
conda env create -f environment.yml
conda activate milkatai

# Install the package in editable mode
pip install -e .

# Install Playwright browsers (required for browser-based scraping)
playwright install
```

### Option 2: Virtual Environment

```bash
# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate
# Activate (Linux/Mac)
source venv/bin/activate

# Install dependencies
pip install -e .

# Install Playwright browsers
playwright install
```

## Usage

### CLI Mode

```bash
# Basic usage - scrape AnyROR
python -m scraper_bot.cli --site anyror --mode auto --out ./data/anyror.json

# Or use the installed command
scraper-bot --site anyror --mode auto --out ./data/anyror.json
```

**CLI Arguments:**
- `--site`: Target site to scrape (default: `anyror`)
- `--mode`: Scrape mode - `auto`, `static`, or `browser` (default: `auto`)
- `--out`: Output JSON file path (default: `./data/anyror.json`)

### API Mode

Start the FastAPI server:

```bash
# Using uvicorn
uvicorn scraper_bot.api.main:app --reload --host 0.0.0.0 --port 8000
```

**API Endpoints:**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Root endpoint with API info |
| GET | `/health` | Health check |
| GET | `/api/v1/scrapers` | List all available scrapers |
| POST | `/api/v1/scrape/{site}` | Trigger a scrape for a site |
| GET | `/api/v1/scrape/{site}/status` | Get scraper status |

**Example API Request:**

```bash
# List available scrapers
curl http://localhost:8000/api/v1/scrapers

# Trigger AnyROR scrape
curl -X POST http://localhost:8000/api/v1/scrape/anyror \
  -H "Content-Type: application/json" \
  -d '{"mode": "auto"}'
```

Interactive API documentation available at: `http://localhost:8000/docs`

## Adding a New Scraper

1. Create a new folder under `src/scraper_bot/scrapers/` (e.g., `new_site/`)
2. Create `__init__.py` and `scraper.py` in the new folder
3. Implement the scraper following the pattern in `anyror/scraper.py`
4. Add the site URL to `core/config.py`
5. Register the scraper in `api/routes.py`
6. Update the CLI choices in `cli.py`

## Output Format

Scraped data is returned as JSON with the following structure:

```json
{
  "source_url": "https://anyror.gujarat.gov.in/",
  "mode": "static",
  "documents": [
    {
      "label": "Document Title",
      "href": "https://example.com/document.pdf",
      "category": null
    }
  ],
  "notes": ["Auto mode used static scrape because links were found."]
}
```
