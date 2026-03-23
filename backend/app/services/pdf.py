import logging
from jinja2 import Environment, FileSystemLoader, TemplateError
from weasyprint import HTML
import os

logger = logging.getLogger(__name__)
_env = Environment(loader=FileSystemLoader(os.path.join(os.path.dirname(__file__), "../templates")))


def _render(template_name: str, context: dict) -> bytes:
    try:
        html = _env.get_template(template_name).render(**context)
        return HTML(string=html).write_pdf()
    except TemplateError as exc:
        logger.exception("Template error rendering %s", template_name)
        raise RuntimeError(f"PDF template error: {exc}") from exc
    except Exception as exc:
        logger.exception("PDF generation failed for %s", template_name)
        raise RuntimeError("PDF generation failed") from exc


def generate_itinerary_pdf(booking: dict, safari: dict, days: list) -> bytes:
    return _render("itinerary.html", {"booking": booking, "safari": safari, "days": days})


def generate_voucher_pdf(booking: dict, safari: dict) -> bytes:
    return _render("voucher.html", {"booking": booking, "safari": safari})


def generate_invoice_pdf(agent: dict, bookings: list, total_kes: float) -> bytes:
    return _render("invoice.html", {"agent": agent, "bookings": bookings, "total_kes": total_kes})
