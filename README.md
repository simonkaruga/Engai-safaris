# Engai Safaris 🦁

> **En-KAI** · Supreme Sky God of the Maasai · Giver of all Life  
> **Tagline:** Where the Sky Meets the Wild  
> Africa's first technology-native tour company.

---

## Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 App Router · TypeScript · Tailwind CSS |
| Backend | FastAPI · Python 3.12 · SQLAlchemy 2.0 async |
| Database | PostgreSQL 16 (Supabase) · Alembic migrations |
| Payments | Pesapal v3 (M-Pesa + Visa/MC) |
| SMS | Africa's Talking |
| Email | Resend |
| AI Planner | Claude API (Anthropic) |
| PDF | WeasyPrint + Jinja2 |
| Frontend Host | Vercel |
| Backend Host | Railway |

---

## Repository Structure

```
engai-safaris/
├── frontend/    ← Next.js 14 → Vercel
└── backend/     ← FastAPI → Railway
```

---

## Quick Start

### Backend

```bash
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # fill in your values
alembic upgrade head
python scripts/seed_destinations.py
python scripts/seed_safaris.py
python scripts/create_admin.py
uvicorn app.main:app --reload
```

API docs: http://localhost:8000/docs

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local   # fill in your values
npm run dev
```

App: http://localhost:3000

---

## Environment Variables

See `backend/.env.example` and `frontend/.env.example`.

---

## Deployment

**Frontend → Vercel**
- Root directory: `frontend/`
- Set all `NEXT_PUBLIC_*` env vars in Vercel dashboard
- Domains: `engaisafaris.com` + `engaisafaris.co.ke`

**Backend → Railway**
- Root directory: `backend/`
- Uses `Dockerfile`
- Domain: `api.engaisafaris.com`
- Start command in `railway.toml` runs migrations then starts server

**Database → Supabase**
- Managed PostgreSQL
- Run `alembic upgrade head` on first deploy

---

## Key URLs

| URL | Purpose |
|---|---|
| `/` | Homepage |
| `/safaris` | All safari packages |
| `/safaris/[slug]` | Package detail + booking |
| `/destinations` | All destinations |
| `/guides` | Guide profiles |
| `/plan-my-safari` | AI Safari Planner (Claude) |
| `/enquire` | Multi-step enquiry wizard |
| `/blog` | SEO content hub |
| `/faq` | 50 FAQs with schema markup |
| `/agent/login` | B2B agent portal |
| `/admin/login` | Owner admin panel |

---

## Phase Roadmap

- **Phase 1 (Months 1–2):** Launch · 6 packages · 4 guides · Pesapal live
- **Phase 2 (Months 3–6):** B2B agents · Lipa Polepole · Affiliates · 30 blog posts
- **Phase 3 (Months 6–12):** Tanzania · Uganda · Rwanda · KES 50M revenue
- **Phase 4 (Year 2+):** Mobile app · AI wildlife ID · Series A · KES 500M+

---

*The gap is real. The name is unclaimed. The blueprint is complete.*  
*Build Engai Safaris. Own Kenya. Conquer East Africa.*  
🌍 🦁 🚀
