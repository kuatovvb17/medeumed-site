# MedeuMed ЖШС - Акушерлік және Гинекология Клиникасы

Бұл жоба **Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4** және **Supabase** арқылы құрылған заманауи медициналық веб-қосымша. 

## Vercel-ге деплой жасау (Deployment)

Жоба Vercel платформасына қатесіз деплой жасауға толығымен дайын. Барлық TypeScript қателері түзетілген және қатаң тексерулерден (strict mode) өткен.

### Қадамдық нұсқаулық:

1. Жобаны өзіңіздің GitHub репозиторийіңізге жүктеңіз (push).
2. [Vercel](https://vercel.com) сайтына кіріп, "Add New Project" түймесін басыңыз.
3. GitHub репозиторийіңізді импорттаңыз.
4. **Маңызды:** Төмендегі Environment Variables (Қоршаған орта айнымалыларын) Vercel панеліне міндетті түрде қосыңыз.

### Environment Variables (Vercel панеліне қосу үшін)

Supabase-пен байланысу үшін келесі екі айнымалыны көрсетуіңіз қажет:

| Айнымалының атауы (Key) | Сипаттамасы (Description) | Қайдан алуға болады? |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase жобасының негізгі URL мекенжайы | Supabase Dashboard -> Project Settings -> API -> Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Құпия емес, жалпы қолжетімді (anon) кілт | Supabase Dashboard -> Project Settings -> API -> Project API Keys (anon, public) |

Мысалы:
- `NEXT_PUBLIC_SUPABASE_URL` = `https://abcdefghijklmnop.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

5. **"Deploy"** түймесін басыңыз!

## Жобаны локальді іске қосу

1. Жоба папкасына өтіп, тәуелділіктерді (dependencies) орнатыңыз:
```bash
npm install
```

2. `.env.local` файлын жасап, ішіне жоғарыдағы айнымалыларды қосыңыз:
```env
NEXT_PUBLIC_SUPABASE_URL=сіздің_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=сіздің_кілт
```

3. Локальді серверді іске қосыңыз:
```bash
npm run dev
```

Жоба `http://localhost:3000` мекенжайында ашылады.

---
*Ескерту: Базалық кестелер мен қазақ тіліндегі тесттік (seed) деректер `supabase/setup.sql` файлында көрсетілген. Оны Supabase-тің SQL Editor бөлімінде іске қосу қажет.*
