from __future__ import annotations

from dataclasses import dataclass
from typing import Literal, Optional
import re
from urllib.parse import urljoin

from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright

from .config import DEFAULT_CONFIG
from .http_client import get_url
from .logger import get_logger
from .models import DocumentLink, ScrapeResult

logger = get_logger("scraper_bot.anyror")


@dataclass(frozen=True)
class AnyRORScrapeOptions:
    mode: Literal["auto", "static", "browser"] = "auto"


class AnyRORScraper:
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
            section = self._closest_heading_text(anchor)
            doc_type = self._detect_doc_type(text)
            region = self._detect_region(text, section)
            links.append(
                DocumentLink(
                    label=text,
                    href=absolute,
                    category="anyror",
                    doc_type=doc_type,
                    region=region,
                    source_section=section,
                )
            )
        return links

    def _closest_heading_text(self, anchor: BeautifulSoup) -> Optional[str]:
        heading = anchor.find_previous(["h1", "h2", "h3", "h4", "h5", "h6"])
        if heading:
            return (heading.get_text() or "").strip()
        return None

    def _detect_region(self, text: str, section: Optional[str]) -> Optional[str]:
        target = " ".join([text, section or ""]).lower()
        if "rural" in target or "grameen" in target or "gramya" in target:
            return "rural"
        if "urban" in target or "shaheri" in target:
            return "urban"
        return None

    def _detect_doc_type(self, text: str) -> Optional[str]:
        normalized = text.lower()
        patterns = {
            "vf_7_12": [r"7/12", r"vf-?7", r"vf-?7/12", r"utara"],
            "vf_8a": [r"8a", r"vf-?8a"],
            "vf_6": [r"vf-?6", r"entry"],
            "mutation_135d": [r"135-d", r"mutation"],
            "revenue_case": [r"revenue case"],
            "survey_detail": [r"survey", r"integrated survey"],
            "khata_detail": [r"khata", r"account"],
        }
        for doc_type, keys in patterns.items():
            for key in keys:
                if re.search(key, normalized):
                    return doc_type
        return None

