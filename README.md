# SecureAuth — Cybersecurity Final Project
**Secure Registration and Login System**

## Security Features Implemented

| Feature | Implementation |
|---|---|
| Hashing Algorithm | SHA-256 (Node.js `crypto` module) |
| Salt | `crypto.randomBytes(16)` — 32-char hex, unique per user |
| Pepper | Hardcoded secret constant, **never** stored in database |
| Hash Formula | `SHA-256(password + salt + pepper)` |
| Password Meter | 5 criteria: lowercase, uppercase, digit, symbol, min 12 chars |
| Plain-text storage | ❌ Never stored |

---

## Project Structure

```
secure-auth/
├── app/
│   ├── api/
│   │   ├── register/route.ts   ← Registration endpoint
│   │   ├── login/route.ts      ← Login endpoint
│   │   └── users/route.ts      ← DB viewer endpoint
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                ← Main UI page
├── components/
│   ├── RegisterForm.tsx         ← Registration form + strength meter
│   ├── LoginForm.tsx            ← Login form + attempt history
│   ├── PasswordMeter.tsx        ← Password strength component
│   └── DatabaseViewer.tsx       ← Live DB table viewer
├── lib/
│   ├── crypto.ts                ← Salt generation + SHA-256 hashing
│   ├── db.ts                    ← In-memory user store
│   └── passwordStrength.ts      ← Strength evaluation logic
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

---

## How to Run Locally

### 1. Install dependencies
```bash
npm install
```

### 2. Start the development server
```bash
npm run dev
```

### 3. Open in browser
```
http://localhost:3000
```

---

## How to Deploy (Free Hosting)

### Option A — Vercel (Recommended for Next.js)
1. Push this project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign up for free
3. Click **"New Project"** → import your GitHub repo
4. Click **Deploy** — Vercel auto-detects Next.js
5. Your public URL will be: `https://your-project.vercel.app`

### Option B — Netlify
1. Run `npm run build` locally
2. Go to [netlify.com](https://netlify.com) → **"Deploy manually"**
3. Drag and drop the `.next` folder
4. Get your public URL instantly

---

## How Security Works

### Registration Flow
1. User enters username, password, confirm password
2. Password strength is validated (all 5 criteria must pass = **Strong**)
3. A unique **salt** is generated: `crypto.randomBytes(16).toString('hex')`
4. The **pepper** is retrieved from the server constant (never from DB)
5. Hash is computed: `SHA-256(password + salt + pepper)`
6. Only `{ username, passwordHash, salt }` is stored — **never the password or pepper**

### Login Flow
1. User enters username and password
2. The stored **salt** is retrieved from the DB for that user
3. Hash is recomputed: `SHA-256(inputPassword + storedSalt + pepper)`
4. Computed hash is compared to the stored hash
5. If they match → **Login Successful**; otherwise → **Invalid username or password**

### Why This is Secure
- **Hashing** makes passwords irreversible — even if the DB is leaked
- **Salt** prevents rainbow-table attacks — each user's hash is unique
- **Pepper** adds a second secret not in the database — compromising the DB alone is not enough
- **Password strength** ensures users cannot create weak, easily-guessable passwords

---

## Example Passwords

| Password | Strength |
|---|---|
| `password` | Weak |
| `Password123` | Medium |
| `Cyber@2026Secure` | **Strong** ✓ |

---

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Hashing:** Node.js built-in `crypto` module (SHA-256)
- **Database:** In-memory `Map` (simulates a real DB)
