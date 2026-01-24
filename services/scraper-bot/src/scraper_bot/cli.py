"""CLI entry point for the scraper bot."""

from __future__ import annotations

import argparse
import json
from pathlib import Path

from scraper_bot.core.logger import get_logger
from scraper_bot.scrapers.anyror import AnyRORScraper, AnyRORScrapeOptions

logger = get_logger("scraper_bot")

# List of supported sites
SUPPORTED_SITES = ["anyror"]


def _build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="MilkatAI scraper bot CLI")
    parser.add_argument(
        "--site",
        type=str,
        default="anyror",
        choices=SUPPORTED_SITES,
        help="Target site to scrape",
    )
    parser.add_argument(
        "--mode",
        type=str,
        default="auto",
        choices=["auto", "static", "browser"],
        help="Scrape mode",
    )
    parser.add_argument(
        "--out",
        type=str,
        default="./data/anyror.json",
        help="Output JSON path",
    )
    return parser


def _write_output(output_path: Path, payload: dict) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), "utf-8")


def main() -> None:
    parser = _build_parser()
    args = parser.parse_args()
    
    if args.site == "anyror":
        scraper = AnyRORScraper()
        result = scraper.run(AnyRORScrapeOptions(mode=args.mode))
        _write_output(Path(args.out), result.model_dump())
        logger.info("Scrape complete: %s", args.out)
        return

    logger.error("Unsupported site: %s", args.site)


if __name__ == "__main__":
    main()
