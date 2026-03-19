from jinja2 import Environment, FileSystemLoader
from weasyprint import HTML
import os

_env = Environment(loader=FileSystemLoader(os.path.join(os.path.dirname(__file__), "../templates")))


def _render(template_name: str, context: dict) -> bytes:
    html = _env.get_template(template_name).render(**context)
    return HTML(string=html).write_pdf()


def generate_itinerary_pdf(booking: dict, safari: dict, days: list) -> bytes:
    return _render("itinerary.html", {"booking": booking, "safari": safari, "days": days})


def generate_voucher_pdf(booking: dict, safari: dict) -> bytes:
    return _render("voucher.html", {"booking": booking, "safari": safari})


def generate_invoice_pdf(agent: dict, bookings: list, total_kes: float) -> bytes:
    return _render("invoice.html", {"agent": agent, "bookings": bookings, "total_kes": total_kes})
