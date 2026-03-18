# 프로젝트 개요: 마크다운 기반 심플 기술 블로그

이 프로젝트는 마크다운(`.md`) 파일 기반으로 동작하는 심플한 기술 블로그입니다. 복잡한 설정 없이 로컬 폴더에 `.md` 파일을 추가하면 자동으로 목록과 상세 페이지가 생성되어야 합니다.

## 🛠 기술 스택 (추천)
- **Framework:** Next.js (App Router 기반)
- **Styling:** Tailwind CSS
- **Markdown Parsing:** `gray-matter` (프론트매터 파싱), `remark` & `rehype` (마크다운을 HTML로 변환)
- **Simple DB (조회수/좋아요용):** Supabase (또는 Firebase) 무료 티어 연동

## 📌 핵심 기능 요구사항

**1. 마크다운 파일 자동 인식 (게시글 관리)**
- 프로젝트 루트 혹은 특정 폴더(예: `/posts`)에 위치한 `.md` 파일들을 자동으로 읽어와야 합니다.
- `.md` 파일 상단의 Frontmatter(제목, 작성일, 요약 태그 등)를 파싱하여 메타데이터로 활용합니다.

**2. 블로그 목록 페이지 (`/`)**
- 생성된 `.md` 파일들의 메타데이터를 기반으로 최신순으로 게시글 목록을 보여줍니다.
- 각 리스트 아이템에는 제목, 작성일, 짧은 요약이 포함됩니다.
- 디자인은 화려함보다는 가독성 위주의 심플하고 깔끔한 UI로 구성해 주세요.

**3. 블로그 상세 페이지 (`/posts/[slug]`)**
- 파일명(slug)을 URL 경로로 사용하여 상세 페이지를 동적으로 생성합니다.
- 마크다운 내용을 HTML로 변환하여 렌더링하며, 코드 블록(Syntax Highlighting)이 예쁘게 보이도록 스타일링해 주세요.

**4. 조회수 및 좋아요 기능 (DB 없는 환경 대안)**
- 별도의 백엔드 서버가 없으므로, 조회수와 좋아요 데이터를 관리하기 위해 가장 단순한 형태의 BaaS(Supabase 또는 Firebase Firestore)를 연동하는 코드를 작성해 주세요.
- **조회수:** 상세 페이지 진입 시 자동으로 +1 카운트되는 간단한 로직.
- **좋아요:** 상세 페이지 하단에 '좋아요' 버튼을 두고, 클릭 시 카운트가 올라가는 토글 또는 단순 증가 로직.
- *참고:* 초기 개발 단계에서는 UI만 먼저 구현하고, Supabase/Firebase 연동 설정 가이드와 함께 더미 데이터를 붙여주세요.

## 🚀 Cursor 작업 지시 순서 (이 순서대로 코드를 작성해 줘)

1. **프로젝트 세팅:** Next.js 및 Tailwind CSS 기본 구조와 `/posts` 폴더를 생성해 줘.
2. **마크다운 파서 유틸리티 작성:** `/posts` 폴더 내의 `.md` 파일을 읽고 파싱하는 유틸리티 함수(예: `lib/markdown.ts`)를 만들어 줘.
3. **목록 및 상세 페이지 UI 구현:** 메인 페이지에서 글 목록을 렌더링하고, 동적 라우팅을 통해 상세 페이지 UI를 만들어 줘. 테스트를 위해 샘플 마크다운 파일 2개 정도를 생성해 줘.
4. **조회수/좋아요 컴포넌트:** 상세 페이지 하단에 들어갈 조회수 및 좋아요 UI 컴포넌트를 만들고, 외부 DB(Supabase/Firebase)와 통신할 수 있는 API Route 혹은 클라이언트 로직 뼈대를 작성해 줘.
5. **스타일링 마무리:** 전체적으로 기술 블로그에 맞는 타이포그래피와 여백을 조정해 줘.

---

## 📋 작업 현황

### ✅ 완료된 항목

**프로젝트 세팅**
- Next.js 15 (App Router) + TypeScript + Tailwind CSS 구성
- `@tailwindcss/typography` 설치 (prose 스타일링)
- `rehype-highlight` + `highlight.js` 코드 신택스 하이라이팅 (github-dark 테마)

**마크다운 파서 유틸리티**
- `src/lib/markdown.ts` 작성
  - `getAllPosts()` — `/posts/*.md` 파일 전체 읽기, 최신순 정렬
  - `getPostBySlug(slug)` — 개별 파일 파싱 후 remark → rehype → HTML 변환

**샘플 포스트 (`/posts/`)**
- `20260318001.md` — Next.js App Router 완전 정복
- `20260318002.md` — TypeScript 실전 팁: 제네릭과 유틸리티 타입
- `20260318003.md` — Tailwind CSS 실전 활용법: 반응형 디자인과 커스텀 테마
- `20260318004.md` — React Server Components 이해하기
- 각 포스트는 frontmatter (title, date, summary, tags) + 본문 코드블록 포함

**페이지 & 컴포넌트**
- `src/app/page.tsx` — 글 목록 페이지 (`/`)
- `src/app/posts/[slug]/page.tsx` — 글 상세 페이지, `generateStaticParams`로 SSG
- `src/app/about/page.tsx` — About 페이지 (`/about`)
- `src/app/layout.tsx` — 네비게이션 (Tech Blog 로고 + About 링크) + 푸터
- `src/components/PostCard.tsx` — 목록 카드 (제목, 날짜, 요약, 태그)
- `src/components/ViewCounter.tsx` — 조회수 표시 클라이언트 컴포넌트
- `src/components/LikeButton.tsx` — 좋아요 버튼, 낙관적 UI (한 번만 클릭 가능)

**API Routes (스켈레톤)**
- `GET /api/posts/[slug]/views` — 조회수 반환
- `POST /api/posts/[slug]/views` — 조회수 +1 후 반환
- `GET /api/posts/[slug]/likes` — 좋아요 수 반환
- `POST /api/posts/[slug]/likes` — 좋아요 +1 후 반환
- 현재 저장소: **in-memory Map** (서버 재시작 시 초기화 — DB 없이도 UI 완전 동작함)
- 각 route 파일에 Supabase 연동 교체용 TODO 주석 및 예시 스니펫 포함

**빌드 확인**
- `npm run build` 통과 (타입 에러 없음)
- 4개 포스트 정적 생성(SSG) 완료

---

### 🔲 남은 작업 (DB 연동 — 선택)

> DB 없이도 블로그는 완전히 동작합니다. 조회수/좋아요를 영구 저장하려면 아래 단계를 진행하세요.

**1. Supabase 설정**
```sql
-- Supabase SQL Editor에서 실행
create table post_stats (
  slug text primary key,
  views integer not null default 0,
  likes integer not null default 0
);
```

**2. 패키지 설치**
```bash
npm install @supabase/supabase-js
```

**3. 환경변수 추가 (`.env.local`)**
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

**4. Supabase 클라이언트 생성 (`src/lib/supabase.ts`)**
```ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

**5. API Routes 교체**
각 route 파일의 in-memory Map 로직을 TODO 주석 아래 Supabase 스니펫으로 교체하면 완성입니다.
- `src/app/api/posts/[slug]/views/route.ts`
- `src/app/api/posts/[slug]/likes/route.ts`
