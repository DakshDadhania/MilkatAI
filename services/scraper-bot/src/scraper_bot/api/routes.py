"""API routes for the scraper bot."""

from typing import Literal

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from scraper_bot.core.models import ScrapeResult
from scraper_bot.scrapers.anyror import AnyRORScraper, AnyRORScrapeOptions

router = APIRouter(tags=["scrapers"])


class ScrapeRequest(BaseModel):
    """Request model for scraping."""
    mode: Literal["auto", "static", "browser"] = "auto"


class ScrapeResponse(BaseModel):
    """Response model for scraping."""
    success: bool
    data: ScrapeResult | None = None
    error: str | None = None


# Available scrapers registry
AVAILABLE_SCRAPERS = {
    "anyror": {
        "name": "AnyROR Gujarat",
        "url": "https://anyror.gujarat.gov.in/",
        "status": "active",
    },
    "iora": {
        "name": "IORA Gujarat",
        "url": "https://iora.gujarat.gov.in/",
        "status": "planned",
    },
    "rmc": {
        "name": "Rajkot Municipal Corporation",
        "url": "https://www.rmc.gov.in/",
        "status": "planned",
    },
    "garvi": {
        "name": "GARVI Gujarat",
        "url": "https://garvi.gujarat.gov.in/",
        "status": "planned",
    },
    "revenue": {
        "name": "Revenue Department Gujarat",
        "url": "https://revenuedepartment.gujarat.gov.in/",
        "status": "planned",
    },
    "rajkot_uda": {
        "name": "Rajkot UDA",
        "url": "https://www.rajkotuda.com/",
        "status": "planned",
    },
    "gujrerar": {
        "name": "GujRERA",
        "url": "https://gujrerar1.gujarat.gov.in/",
        "status": "planned",
    },
    "rajkot_edu": {
        "name": "Rajkot Education",
        "url": "https://rajkot.nic.in/education/",
        "status": "planned",
    },
}


@router.get("/scrapers")
async def list_scrapers():
    """List all available scrapers and their status."""
    return {"scrapers": AVAILABLE_SCRAPERS}


@router.post("/scrape/{site}", response_model=ScrapeResponse)
async def scrape_site(site: str, request: ScrapeRequest):
    """
    Trigger a scrape for the specified site.
    
    Args:
        site: The site identifier (e.g., 'anyror', 'iora')
        request: Scrape options including mode
    
    Returns:
        Scrape results with documents and metadata
    """
    if site not in AVAILABLE_SCRAPERS:
        raise HTTPException(
            status_code=404,
            detail=f"Unknown site: {site}. Available: {list(AVAILABLE_SCRAPERS.keys())}"
        )
    
    if AVAILABLE_SCRAPERS[site]["status"] != "active":
        raise HTTPException(
            status_code=501,
            detail=f"Scraper for {site} is not yet implemented"
        )
    
    try:
        if site == "anyror":
            scraper = AnyRORScraper()
            result = scraper.run(AnyRORScrapeOptions(mode=request.mode))
            return ScrapeResponse(success=True, data=result)
        
        # Add more scrapers here as they are implemented
        raise HTTPException(status_code=501, detail="Scraper not implemented")
    
    except Exception as e:
        return ScrapeResponse(success=False, error=str(e))


@router.get("/scrape/{site}/status")
async def get_scraper_status(site: str):
    """Get the status of a specific scraper."""
    if site not in AVAILABLE_SCRAPERS:
        raise HTTPException(
            status_code=404,
            detail=f"Unknown site: {site}"
        )
    return AVAILABLE_SCRAPERS[site]
