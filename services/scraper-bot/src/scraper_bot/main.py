from __future__ import annotations

import argparse
import json
from pathlib import Path

from .anyror_scraper import AnyRORScrapeOptions, AnyRORScraper
from .compare_pipeline import compare_scrape_to_ocr
from .logger import get_logger

logger = get_logger("scraper_bot")


def _build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="MilkatAI scraper bot CLI")
    parser.add_argument(
        "--site",
        type=str,
        default="anyror",
        choices=["anyror"],
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
    parser.add_argument(
        "--ocr",
        type=str,
        default="",
        help="Optional OCR text file for comparison",
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
        if args.ocr:
            ocr_text = Path(args.ocr).read_text(encoding="utf-8")
            issues = compare_scrape_to_ocr(result.documents, ocr_text)
            compare_out = Path(args.out).with_suffix(".compare.json")
            _write_output(
                compare_out,
                {"issues": [issue.__dict__ for issue in issues]},
            )
            logger.info("Compare complete: %s", compare_out)
        return

    logger.error("Unsupported site: %s", args.site)


if __name__ == "__main__":
    main()

