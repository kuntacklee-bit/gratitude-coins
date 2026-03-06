// ─────────────────────────────────────────────────────────────────────────────
// Firebase 설정
// Firebase 콘솔(https://console.firebase.google.com)에서 프로젝트 생성 후
// 아래 값을 본인의 Firebase 프로젝트 설정으로 교체하세요.
// ─────────────────────────────────────────────────────────────────────────────

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBFVdj77MHO9WxVLOUgDEyl2XolGftcFjs",
  authDomain: "gratitude-coin.firebaseapp.com",
  projectId: "gratitude-coin",
  storageBucket: "gratitude-coin.firebasestorage.app",
  messagingSenderId: "109486789872",
  appId: "1:109486789872:web:5978a0a87cbf103a2b5e35"
}
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
