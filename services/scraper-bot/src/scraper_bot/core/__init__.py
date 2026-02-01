"""Core utilities for the scraper bot."""

from .config import DEFAULT_CONFIG, ScraperConfig
from .http_client import get_url, DEFAULT_HEADERS
from .logger import get_logger
from .models import DocumentLink, ScrapeResult

__all__ = [
    "DEFAULT_CONFIG",
    "ScraperConfig",
    "get_url",
    "DEFAULT_HEADERS",
    "get_logger",
    "DocumentLink",
    "ScrapeResult",
]
