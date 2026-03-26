# ORCA Final Escape Terminal

Vite + React 기반 웹사이트 프로젝트입니다. GitHub에 그대로 올린 뒤 Vercel에 연결해서 배포할 수 있습니다.

## 로컬 실행
```bash
npm install
npm run dev
```

## 프로덕션 빌드
```bash
npm run build
npm run preview
```

## GitHub 업로드
1. 이 압축을 풀기
2. 새 GitHub 저장소 생성
3. 저장소 폴더에서 아래 실행

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```

## Vercel 배포
1. Vercel에 로그인
2. GitHub 저장소 Import
3. Framework Preset: Vite
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Deploy

## 포함 파일
- `src/App.jsx` : ORCA 메인 UI
- `public/bgm.mp3` : 배경음 파일
- `public/bio-sample.png` : BIO-4 참고 이미지

## 코드 설정
- 진행요원 승인 코드: `０９１３`
- 최종 탈출 코드: `０３＃１９`

## 참고
- 모바일/태블릿에서도 브라우저로 접속 가능
- 자동재생이 막히면 상단 음악 버튼으로 수동 재생 가능
