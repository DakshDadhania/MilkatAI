from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class ScraperConfig:
    anyror_base_url: str = "https://anyror.gujarat.gov.in/"
    iora_base_url: str = "https://iora.gujarat.gov.in/"
    rmc_base_url: str = "https://www.rmc.gov.in/"
    garvi_base_url: str = "https://garvi.gujarat.gov.in/"
    revenue_base_url: str = "https://revenuedepartment.gujarat.gov.in/"
    rajkot_uda_base_url: str = "https://www.rajkotuda.com/"
    gujrerar_base_url: str = "https://gujrerar1.gujarat.gov.in/"
    rajkot_edu_base_url: str = "https://rajkot.nic.in/education/"


DEFAULT_CONFIG = ScraperConfig()
