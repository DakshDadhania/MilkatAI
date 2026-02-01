# MilkatAI

AI-powered platform for Gujarat property and land record management.

## Repository Structure

```
MilkatAI/
├── docs/                     # Documentation
├── services/                 # Backend services
│   └── scraper-bot/          # Multi-website scraper service
│       ├── src/
│       │   └── scraper_bot/
│       │       ├── api/      # FastAPI application
│       │       ├── core/     # Shared utilities
│       │       └── scrapers/ # Website-specific scrapers
│       ├── data/             # Scraped data output
│       ├── environment.yml   # Conda environment
│       ├── requirements.txt
│       └── pyproject.toml
├── apps/                     # Frontend applications (planned)
│   ├── api/
│   ├── mobile/
│   └── web/
├── packages/                 # Shared packages (planned)
│   └── shared/
└── scripts/                  # Utility scripts (planned)
```

## Services

### Scraper Bot

Multi-website scraper for Gujarat government property and land record portals.

**Features:**
- Static scraping (requests + BeautifulSoup)
- Dynamic scraping (Playwright for JS-rendered content)
- FastAPI REST API
- CLI interface

**Supported Websites:**
- AnyROR Gujarat (Active)
- IORA Gujarat (Planned)
- RMC - Rajkot Municipal Corporation (Planned)
- GARVI Gujarat (Planned)
- Revenue Department Gujarat (Planned)
- Rajkot UDA (Planned)
- GujRERA (Planned)
- Rajkot Education (Planned)

See [services/scraper-bot/README.md](services/scraper-bot/README.md) for detailed documentation.

## Quick Start

### Prerequisites

- Python 3.10+
- Conda (recommended) or virtualenv

### Setup Scraper Bot

```bash
cd services/scraper-bot

# Create conda environment
conda env create -f environment.yml
conda activate milkatai

# Install package
pip install -e .

# Install Playwright browsers
playwright install
```

### Run Scraper

**CLI Mode:**
```bash
scraper-bot --site anyror --mode auto --out ./data/anyror.json
```

**API Mode:**
```bash
uvicorn scraper_bot.api.main:app --reload --port 8000
```

API docs available at: http://localhost:8000/docs

## Development

### Project Conventions

- Python 3.10+ with type hints
- Pydantic for data validation
- FastAPI for REST APIs
- Playwright for browser automation
- Conda for environment management

### Adding New Scrapers

Each website scraper lives in its own folder under `services/scraper-bot/src/scraper_bot/scrapers/`. Follow the pattern established in the `anyror/` folder to create new scrapers.
