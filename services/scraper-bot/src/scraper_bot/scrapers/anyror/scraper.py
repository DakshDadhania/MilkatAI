from __future__ import annotations

from dataclasses import dataclass
from typing import Literal
from urllib.parse import urljoin

from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright

from scraper_bot.core.config import DEFAULT_CONFIG
from scraper_bot.core.http_client import get_url
from scraper_bot.core.logger import get_logger
from scraper_bot.core.models import DocumentLink, ScrapeResult

logger = get_logger("scraper_bot.anyror")


@dataclass(frozen=True)
class AnyRORScrapeOptions:
    mode: Literal["auto", "static", "browser"] = "auto"


class AnyRORScraper:
    """Scraper for AnyROR Gujarat (https://anyror.gujarat.gov.in/)."""

    def __init__(self, base_url: str = DEFAULT_CONFIG.anyror_base_url) -> None:
        self.base_url = base_url

    def run(self, options: AnyRORScrapeOptions) -> ScrapeResult:
        if options.mode == "static":
            return self._run_static()
        if options.mode == "browser":
            return self._run_browser()
        static_result = self._run_static()
        if static_result.documents:
            static_result.notes.append(
                "Auto mode used static scrape because links were found."
            )
            return static_result
        browser_result = self._run_browser()
        browser_result.notes.append(
            "Auto mode fell back to browser because static scrape was empty."
        )
        return browser_result

    def _run_static(self) -> ScrapeResult:
        response = get_url(self.base_url)
        soup = BeautifulSoup(response.text, "lxml")
        documents = self._parse_links(soup)
        return ScrapeResult(
            source_url=self.base_url,
            mode="static",
            documents=documents,
            notes=[],
        )

    def _run_browser(self) -> ScrapeResult:
        documents: list[DocumentLink] = []
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            page.goto(self.base_url, wait_until="networkidle")
            html = page.content()
            browser.close()
        soup = BeautifulSoup(html, "lxml")
        documents = self._parse_links(soup)
        return ScrapeResult(
            source_url=self.base_url,
            mode="browser",
            documents=documents,
            notes=[],
        )

    def _parse_links(self, soup: BeautifulSoup) -> list[DocumentLink]:
        links: list[DocumentLink] = []
        for anchor in soup.find_all("a"):
            text = (anchor.get_text() or "").strip()
            href = (anchor.get("href") or "").strip()
            if not text or not href or href.startswith("#"):
                continue
            absolute = urljoin(self.base_url, href)
            links.append(DocumentLink(label=text, href=absolute))
        return links
