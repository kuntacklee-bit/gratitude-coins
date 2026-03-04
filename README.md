# 감사 코인 앱 — Firebase + Vercel 배포 가이드

---

## 📋 필요한 것
- 웹 브라우저
- [Node.js](https://nodejs.org) (v18 이상)
- [Firebase](https://firebase.google.com) 계정 (Google 계정으로 무료 가입)
- [Vercel](https://vercel.com) 계정 (GitHub 계정으로 무료 가입)
- [GitHub](https://github.com) 계정

---

## 1단계 — Firebase 프로젝트 만들기

1. https://console.firebase.google.com 접속 → **프로젝트 추가**
2. 프로젝트 이름 입력 (예: `gratitude-coins`) → 계속
3. Google Analytics는 **사용 안 함** 선택 후 **프로젝트 만들기**
4. 프로젝트 생성 완료 후 **계속**

---

## 2단계 — Firestore 데이터베이스 만들기

1. 왼쪽 메뉴 **빌드 → Firestore Database** 클릭
2. **데이터베이스 만들기** 클릭
3. 위치: `asia-northeast3 (서울)` 선택 → 다음
4. **테스트 모드에서 시작** 선택 → **만들기**

> ⚠️ 테스트 모드는 30일 후 자동 만료됩니다.
> 이후 보안 규칙을 아래처럼 변경하세요:
>
> ```
> rules_version = '2';
> service cloud.firestore {
>   match /databases/{database}/documents {
>     match /gratitude-coins/{document} {
>       allow read, write: if true;
>     }
>   }
> }
> ```

---

## 3단계 — Firebase 앱 설정값 복사

1. Firebase 콘솔 좌측 상단 **⚙️ 프로젝트 설정** 클릭
2. **일반** 탭 → 스크롤 내려서 **앱 추가** → 웹 아이콘(`</>`) 클릭
3. 앱 닉네임 입력 → **앱 등록**
4. 아래처럼 생긴 설정값이 나옵니다 — **복사해두세요**:

```js
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

---

## 4단계 — 코드에 Firebase 설정 입력

`src/firebase.js` 파일을 열고, 3단계에서 복사한 값으로 교체하세요:

```js
const firebaseConfig = {
  apiKey:            "AIzaSy...",        // ← 내 값으로 교체
  authDomain:        "your-project.firebaseapp.com",
  projectId:         "your-project",
  storageBucket:     "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId:             "1:123456789:web:abcdef"
}
```

---

## 5단계 — 로컬에서 실행해보기

터미널에서 프로젝트 폴더로 이동:

```bash
cd gratitude-coins-firebase
npm install
npm run dev
```

브라우저에서 http://localhost:5173 열기 → 정상 작동 확인

---

## 6단계 — GitHub에 올리기

```bash
git init
git add .
git commit -m "감사 코인 앱 초기 커밋"
```

GitHub에서 새 레포지토리 생성 후:

```bash
git remote add origin https://github.com/내아이디/gratitude-coins.git
git push -u origin main
```

---

## 7단계 — Vercel로 배포하기

1. https://vercel.com 접속 → **Add New Project**
2. GitHub 연결 → 방금 만든 레포지토리 선택 → **Import**
3. Framework Preset: **Vite** 자동 선택됨
4. **Deploy** 클릭
5. 1~2분 후 배포 완료 → 공유 URL 생성!

예시: `https://gratitude-coins-xxxxx.vercel.app`

---

## 8단계 — 팀원들과 공유

Vercel에서 발급된 URL을 팀원들에게 공유하면 됩니다.

- **모든 팀원이 같은 데이터를 실시간으로 공유**합니다
- 관리자 초기 비밀번호: `admin1234`
- 관리자 로그인 후 회원 DB 등록 → 팀원들이 회원가입

---

## 🔄 코드 수정 후 재배포

코드 수정 후 GitHub에 push하면 Vercel이 자동으로 재배포합니다:

```bash
git add .
git commit -m "수정 내용"
git push
```

---

## ❓ 자주 묻는 질문

**Q: Firebase 무료인가요?**  
A: Firestore는 무료 티어(Spark Plan)로 일일 읽기 50,000회, 쓰기 20,000회까지 무료입니다. 소규모 팀은 충분합니다.

**Q: Vercel도 무료인가요?**  
A: 개인/소규모 팀은 무료 플랜으로 충분합니다.

**Q: 데이터가 안전한가요?**  
A: Firebase Firestore는 Google 클라우드에 저장되며, 보안 규칙으로 접근을 제어할 수 있습니다.

---

## 📱 PWA — 앱처럼 설치하기

### Android (Chrome)
1. Vercel 배포 URL을 Chrome으로 열기
2. 하단에 **"앱으로 설치하기"** 배너가 뜨면 **설치** 버튼 클릭
3. 또는: Chrome 우측 상단 메뉴(⋮) → **홈 화면에 추가**
4. 홈 화면에 🪙 감사코인 아이콘이 생성됨

### iOS (Safari)
1. Safari로 배포 URL 열기
2. 하단 공유 버튼(□↑) 탭
3. **홈 화면에 추가** 선택 → 추가
4. 홈 화면에 앱 아이콘 생성됨

> iOS는 Chrome이 아닌 **Safari**에서만 PWA 설치가 가능합니다.

---

## 🛒 플레이스토어 등록 (TWA)

PWA가 정상 작동하면 **Google Play Console**에 TWA로 등록할 수 있습니다.

### 준비물
- Google Play 개발자 계정 ($25 일회성)
- [Bubblewrap CLI](https://github.com/GoogleChromeLabs/bubblewrap) 또는 [PWABuilder](https://www.pwabuilder.com)

### PWABuilder로 APK 생성 (가장 쉬움)
1. https://www.pwabuilder.com 접속
2. 배포된 Vercel URL 입력 → **분석 시작**
3. **Android** 선택 → **APK 다운로드**
4. Google Play Console에서 APK 업로드 후 심사 신청

> Play Store 심사는 보통 1~3일 소요됩니다.
