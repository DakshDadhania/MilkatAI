from __future__ import annotations

from typing import Literal, Optional

from pydantic import BaseModel, Field


class DocumentLink(BaseModel):
    label: str
    href: str
    category: Optional[str] = None
    doc_type: Optional[str] = None
    region: Optional[str] = None
    source_section: Optional[str] = None


class ScrapeResult(BaseModel):
    source_url: str
    mode: Literal["static", "browser"]
    documents: list[DocumentLink] = Field(default_factory=list)
    notes: list[str] = Field(default_factory=list)
