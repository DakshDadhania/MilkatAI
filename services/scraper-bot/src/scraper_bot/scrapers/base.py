from __future__ import annotations

from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Literal

from scraper_bot.core.models import ScrapeResult


@dataclass(frozen=True)
class BaseScrapeOptions:
    """Base options for all scrapers."""
    mode: Literal["auto", "static", "browser"] = "auto"


class BaseScraper(ABC):
    """Abstract base class for all website scrapers."""

    def __init__(self, base_url: str) -> None:
        self.base_url = base_url

    @abstractmethod
    def run(self, options: BaseScrapeOptions) -> ScrapeResult:
        """Execute the scraper with given options."""
        pass

    @abstractmethod
    def _run_static(self) -> ScrapeResult:
        """Run static scraping using requests + BeautifulSoup."""
        pass

    @abstractmethod
    def _run_browser(self) -> ScrapeResult:
        """Run browser-based scraping using Playwright."""
        pass
