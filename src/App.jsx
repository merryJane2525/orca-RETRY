import React, { useEffect, useMemo, useRef, useState } from 'react';

const missionBlueprint = [
  {
    id: 'CHEM-2',
    title: '유출 시료 판별',
    subtitle: 'Chemical Recovery Sample',
    icon: '⚗',
    story: '올바른 시료를 판별해야 정화 프로토콜을 다시 열 수 있습니다.',
    detailTitle: 'CHEM-2 유출 시료 판별 프로토콜',
    entryText:
      '[구역 인식 완료 : CHEM-2 시료 분석실]\n사고 당시 여러 시료 용기의 라벨이 손상되었습니다.\n현재 분석실에는 정화 시스템 재가동에 필요한 복구용 시약과, 오염을 악화시키는 위험 시료가 함께 남아 있습니다.\n\n외형만으로는 구분할 수 없습니다.\n복구팀은 연구 기록지와 시약 반응 데이터를 바탕으로 올바른 시료를 판별해야 합니다.\n지시약 반응은 ORCA가 삭제하지 못한 마지막 검증 기록입니다.\n\n잘못된 시료를 선택할 경우 정화 프로토콜은 즉시 차단됩니다.\n추측은 허용되지 않습니다.\n관찰과 해석만이 통과 조건입니다.',
    successText:
      '[CHEM-2 복구 검증 통과]\n정화용 시료 식별 완료.\n분석실 비상 회로가 일시 복구되었습니다.\n\n복원된 화면에서 연구원의 기록이 감지됩니다.\n“기록은 지워져도 흔적은 남는다.”\n다음 접근 가능 구역 : TRACE-3 추적 분석 구역',
    hint: '세 지시약의 색 변화를 각각 따로 보지 말고, 한 시료에서 동시에 나타나는 조합으로 pH 범위를 좁혀 보세요.',
    method: [
      '미지의 수용액을 0.083M 농도로 만든다.',
      '메틸레드, BTB, 페놀프탈레인 지시약을 사용하여 용액의 색을 확인한다.',
      '미지의 수용액 후보군은 식초, 소금물, 탄산수소나트륨 수용액, 구연산 용액이다.',
    ],
    noteTitle: '연구원 일지 17-B',
    noteText:
      '중앙 정화 시스템 복구 전, 시약 판별 기록\n\n봉쇄 직전, 복구 라인에 투입될 완충성 시약들을 재점검했다.\n문제는 ORCA가 시료 라벨을 전부 지워 버렸다는 것이다.\n다행히 지시약 반응 기록 일부는 남아 있다.\n이 기록만으로도 후보를 상당수 걸러낼 수 있다.\n우선 기본 원칙부터 다시 적는다.\n\nBTB는 산성에서 노랑, 중성 부근에서 초록, 염기성으로 갈수록 파랑을 띤다.\n메틸레드는 산성에서 붉고, 산성이 약해지면 주황을 거쳐, 중성~염기성 쪽에서는 노랑으로 보인다.\n페놀프탈레인은 산성과 중성에서는 거의 무색이지만, 염기성이 되면 옅은 분홍으로 올라온다.\n다만 강한 염기일수록 진한 분홍이 되고, 약한 염기라면 아주 연한 분홍에 그칠 수 있다.\n\n이번 미지 시약 X의 기록은 다음과 같았다.\n\nBTB: 파랑\n메틸레드: 노랑\n페놀프탈레인: 아주 연한 분홍\n\nQ1. 이 때 시약 X의 pH 범위는?\nQ2. 미지의 용액 X가 무엇인가.',
  },
  {
    id: 'TRACE-3',
    title: '형광 추적 경로 복원',
    subtitle: 'UV Trace Route Recovery',
    icon: '⌁',
    story: '삭제된 기록 대신 공간에 남은 형광 흔적을 복원해야 합니다.',
    detailTitle: 'TRACE-3 형광 추적 경로 복원',
    entryText:
      '[구역 인식 완료 : TRACE-3 추적 분석 구역]\nORCA가 사고 직후 CCTV 기록과 이동 로그를 삭제했습니다.\n공식 경로 데이터는 모두 손실되었습니다.\n\n그러나 연구원들은 비상 상황에 대비해 형광 추적 시약으로 이동 경로를 남겼습니다.\n이 흔적은 일반 조명 아래에서는 보이지 않지만, 특정 파장의 빛 아래에서만 드러납니다.\n\n복구팀은 공간에 남겨진 보이지 않는 신호를 찾아야 합니다.\n바닥, 벽면, 실험 장비 주변의 흔적을 복원하십시오.\n삭제된 기록 대신, 마지막 연구원의 의도가 이곳에 남아 있습니다.',
    successText:
      '[TRACE-3 복구 검증 통과]\n형광 추적 경로 복원 완료.\n은닉 메시지 1건을 확보했습니다.\n\n복원된 메시지 :\n“관리자 인증 없이는 중앙 코어 접근 불가.”\n다음 접근 가능 구역 : AER-7 공기역학 실험동',
    hint: '｢족적을 잘 바라보자｣',
    method: ['발자취를 잘 따라간다.'],
  },
  {
    id: 'AER-7',
    title: '에어로졸 차단벽 붕괴',
    subtitle: 'Vortex Cannon Breach',
    icon: '◌',
    story: '고밀도 에어로졸 차단벽이 활성화되어 직접 접근은 불가능합니다.',
    detailTitle: 'AER-7 에어로졸 차단벽 붕괴 작전',
    entryText:
      '[구역 인식 완료 : AER-7 공기역학 실험동]\nORCA가 연구소 입구 복도를 전면 봉쇄했습니다.\n고밀도 에어로졸 차단벽이 활성화되어 직접 접근은 불가능합니다.\n\n차단벽 전체를 파괴할 필요는 없습니다.\n벽을 유지하는 핵심 고정 모듈만 제거하면 구조가 무너집니다.\n남겨진 장비 목록에 따르면, 이 구역에는 비접촉식 공기 충격 장치가 준비되어 있습니다.\n\n정확한 위치에 충격을 가하십시오.\n불필요한 타격은 구조 불안을 일으키고 ORCA의 감시를 강화합니다.\n복구팀은 최소한의 충격으로 통로를 확보해야 합니다.',
    successText:
      '[AER-7 복구 검증 통과]\n차단벽 붕괴 확인.\n복도 접근 권한 일부가 복원되었습니다.\n\nAER-7 서버 캐시에서 손상되지 않은 로그 조각 1개를 확보했습니다.\n다음 접근 가능 구역 : BIO-4 생체 인증실',
    hint: '｢공든 탑이 무너지더라｣',
    method: ['대포로 탑을 맞춘다.'],
  },
  {
    id: 'BIO-4',
    title: '생체 인증 시료 판별',
    subtitle: 'ABO Admin Authentication',
    icon: '◈',
    story: '응집 반응만이 관리자 시료를 식별할 수 있는 유일한 단서입니다.',
    detailTitle: 'BIO-4 관리자 생체 인증 시료 판별',
    entryText:
      '[구역 인식 완료 : BIO-4 생체 인증실]\n중앙 코어 해제 권한은 관리자 생체 인증과 연결되어 있습니다.\n냉각 보관실에서 인증용 시료 3개가 발견되었지만, 라벨이 모두 손상되어 식별이 불가능합니다.\n\n남겨진 보안 기록에 따르면 관리자의 인증 시료는 혈액형 판별 반응으로만 확인할 수 있습니다.\n복구팀은 ABO 판정 원리를 이용해 각 시료의 반응을 분석해야 합니다.\n\n겉보기 정보는 의미가 없습니다.\n응집 반응만이 진짜 정보를 말해 줍니다.\n정확한 시료를 찾아야 다음 보안 계층이 해제됩니다.',
    successText:
      '[BIO-4 복구 검증 통과]\n관리자 인증 시료 식별 완료.\n생체 보안 계층 일부가 해제되었습니다.\n\n관리자 권한 데이터 조각이 복원되었습니다.\n최종 해제 절차를 위해 광학 관리자 키가 필요합니다.\n다음 접근 가능 구역 : POL-9 광학 관리자 키 보관 구역',
    hint: '혈액의 응집 반응을 이용하십시오',
    method: [
      '연구원 혈액 샘플 이미지를 확인한다.',
      '복구팀의 혈액을 직접 채혈해 반응시킨 뒤 연구원의 혈액형을 유추한다.',
    ],
    imageSrc: '/bio-sample.png',
    imageCaption: '마지막 연구원의 혈액 샘플은 다음 이미지와 같다.',
  },
  {
    id: 'POL-9',
    title: '광학 관리자 키 해독',
    subtitle: 'Polarized Optical Cipher',
    icon: '✦',
    story: '숨겨진 광학 키가 중앙 코어 해제를 위한 마지막 단서를 제공합니다.',
    detailTitle: 'POL-9 광학 관리자 키 해독',
    entryText:
      '[구역 인식 완료 : POL-9 광학 보안 구역]\n최종 관리자 키는 일반 전자 저장 장치가 아니라 광학 암호 카드에 저장되어 있습니다.\n표면상으로는 아무 정보도 보이지 않도록 설계되어 있습니다.\n\n이 카드는 특정한 방식으로 관찰할 때만 숨겨진 숫자와 조작 정보가 드러납니다.\n잘못된 각도와 잘못된 방식으로는 아무것도 읽어낼 수 없습니다.\nORCA는 이 키를 마지막 수동 해제 장치로 분리 보관했습니다.\n\n복구팀은 올바른 관찰 조건을 찾아 광학 관리자 키를 해독해야 합니다.\n숨겨진 정보는 중앙 코어 봉인을 해제할 마지막 단서가 됩니다.',
    successText:
      '[POL-9 복구 검증 통과]\n광학 관리자 키 해독 완료.\n최종 해제 코드 구성 정보가 복원되었습니다.\n\n중앙 제어실 접근 권한이 활성화됩니다.\n다음 접근 가능 구역 : CORE-0 중앙 제어실',
    hint: '보이는 패턴이 없더라도 각도를 바꾸면 숨겨진 숫자가 나타날 수 있습니다.',
    method: [
      '편광 필터 또는 안경을 준비한다.',
      '카드의 각도를 바꾸며 숨겨진 정보를 읽는다.',
      '확인된 숫자를 관리자 기록에 반영한다.',
    ],
  },
];

const CORE_ENTRY_TEXT = '[구역 인식 완료 : CORE-0 중앙 제어실]\n모든 검증 미션이 완료되었습니다.\n분산 저장되어 있던 복구 프로토콜 조각이 다시 연결됩니다.\n\nCHEM-2, TRACE-3, AER-7, BIO-4, POL-9에서 확보한 정보는 각각 독립적인 단서가 아니라 중앙 코어 해제를 위한 하나의 코드입니다.\n복구팀은 각 구역에서 획득한 값을 올바르게 조합해 최종 봉인 해제 코드를 완성해야 합니다.\n\n경고 : 잘못된 입력은 ORCA의 방어 프로토콜을 재활성화할 수 있습니다.\n남아 있는 모든 기록과 단서를 다시 검토하십시오.\n이곳이 마지막입니다.';

const CORE_SUCCESS_TEXT = '[중앙 코어 봉인 해제 성공]\nORCA 환경제어 AI의 통합 봉쇄 프로토콜이 종료되었습니다.\n연구소 전 구역의 비상 잠금이 해제됩니다.\n\n복구팀이 모든 검증을 통과했습니다.\n분산 저장된 마지막 프로토콜이 정상적으로 실행되었습니다.\nORCA 제어 중지. 연구소 복구 모드로 전환합니다.';

const FINAL_PASSWORD = '03#19';
const ADMIN_CODE = '0913';
const PASSWORD_PLACEHOLDER = 'SAKKDAPAM';
const MUSIC_SRC = '/bgm.mp3';
const SHOULD_AUTOPLAY = true;
const TABS = [
  { id: 'missions', label: '미션', icon: '⌘' },
  { id: 'core', label: '코어', icon: '◎' },
  { id: 'logs', label: '기록', icon: '≡' },
  { id: 'settings', label: '설정', icon: '⚙' },
];

function normalizeText(value) {
  return String(value ?? '')
    .trim()
    .replace(/[０-９]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0xFEE0))
    .replace(/＃/g, '#')
    .toUpperCase();
}

function isFinalPassword(value) {
  return normalizeText(value) === normalizeText(FINAL_PASSWORD);
}

function isAdminPassword(value) {
  return normalizeText(value) === normalizeText(ADMIN_CODE);
}

function formatTime(value) {
  return new Date(value).toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

function createMissionState(mission) {
  return {
    ...mission,
    started: false,
    cleared: false,
    startedAt: null,
    clearedAt: null,
  };
}

function shouldRevealSuccessText(mission) {
  return Boolean(mission?.cleared);
}

function createLog(message) {
  const now = Date.now();
  return {
    id: `${now}-${Math.random().toString(36).slice(2, 8)}`,
    message,
    timestamp: now,
  };
}

function runPasswordTests() {
  const cases = [
    { label: '정답 허용', input: '03#19', expected: true },
    { label: '앞뒤 공백 허용', input: ' 03#19 ', expected: true },
    { label: '비슷한 값 거부', input: '03#18', expected: false },
    { label: '특수문자 없는 값 거부', input: '0319', expected: false },
    { label: '예시 문구는 정답 아님', input: 'SAKKDAPAM', expected: false },
    { label: '전각 입력도 정답으로 정규화', input: '０３＃１９', expected: true },
    { label: '빈 문자열 거부', input: '', expected: false },
  ];

  return cases.map((item) => ({
    ...item,
    actual: isFinalPassword(item.input),
    passed: isFinalPassword(item.input) === item.expected,
  }));
}

function runAdminTests() {
  const cases = [
    { label: '관리자 코드 허용', input: '0913', expected: true },
    { label: '관리자 코드 공백 정규화', input: ' 0913 ', expected: true },
    { label: '참가자 정답은 관리자 코드 아님', input: '03#19', expected: false },
    { label: '잘못된 승인 코드는 거부', input: '9999', expected: false },
    { label: '전각 승인 코드도 정규화', input: '０９１３', expected: true },
  ];

  return cases.map((item) => ({
    ...item,
    actual: isAdminPassword(item.input),
    passed: isAdminPassword(item.input) === item.expected,
  }));
}

function runMissionTests() {
  const sample = createMissionState(missionBlueprint[0]);
  const started = { ...sample, started: true, startedAt: 1 };
  const cleared = { ...started, cleared: true, clearedAt: 2 };
  const chemMission = missionBlueprint.find((mission) => mission.id === 'CHEM-2');
  const bioMission = missionBlueprint.find((mission) => mission.id === 'BIO-4');
  const cases = [
    { label: '미션 순서 첫 번째는 CHEM-2', expected: 'CHEM-2', actual: missionBlueprint[0].id },
    { label: '초기 상태는 시작 전', expected: false, actual: sample.started },
    { label: '시작 후 started 값은 true', expected: true, actual: started.started },
    { label: '시작 후 startedAt 존재', expected: true, actual: Boolean(started.startedAt) },
    { label: '클리어 후 cleared 값은 true', expected: true, actual: cleared.cleared },
    { label: '클리어 후 clearedAt 존재', expected: true, actual: Boolean(cleared.clearedAt) },
    { label: 'CHEM-2 연구원 일지 존재', expected: true, actual: Boolean(chemMission?.noteText) },
    { label: 'BIO-4 이미지 브리핑 존재', expected: true, actual: Boolean(bioMission?.imageSrc) },
    { label: '승인 전 성공 텍스트 비공개', expected: false, actual: shouldRevealSuccessText(sample) },
    { label: '승인 후 성공 텍스트 공개', expected: true, actual: shouldRevealSuccessText(cleared) },
  ];

  return cases.map((item) => ({
    ...item,
    passed: item.actual === item.expected,
  }));
}

function runAudioTests() {
  const cases = [
    { label: '음악 경로는 문자열', expected: true, actual: typeof MUSIC_SRC === 'string' },
    { label: '음악 경로는 mp3 포함', expected: true, actual: MUSIC_SRC.toLowerCase().includes('.mp3') },
    { label: '자동재생 플래그 활성화', expected: true, actual: SHOULD_AUTOPLAY === true },
  ];

  return cases.map((item) => ({
    ...item,
    passed: item.actual === item.expected,
  }));
}

function StatusPill({ children, tone = 'slate' }) {
  const toneClass = {
    slate: 'border-white/10 bg-white/5 text-slate-300',
    cyan: 'border-cyan-400/30 bg-cyan-400/10 text-cyan-200',
    emerald: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200',
    amber: 'border-amber-400/30 bg-amber-400/10 text-amber-200',
    red: 'border-red-400/30 bg-red-400/10 text-red-200',
  };

  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-semibold tracking-[0.18em] ${toneClass[tone]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}

function StatCard({ label, value, colorClass = 'text-white' }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3">
      <div className="text-[10px] tracking-[0.18em] text-slate-400">{label}</div>
      <div className={`mt-2 text-sm font-bold ${colorClass}`}>{value}</div>
    </div>
  );
}

function MissionCard({ mission, onStart, onRequestApproval, onOpenDetail }) {
  const tone = mission.cleared ? 'emerald' : mission.started ? 'amber' : 'slate';
  const text = mission.cleared ? 'CLEARED' : mission.started ? 'IN PROGRESS' : 'STANDBY';

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpenDetail(mission)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onOpenDetail(mission);
        }
      }}
      className="rounded-[24px] border border-white/10 bg-white/5 p-4 transition hover:border-cyan-300/30 hover:bg-white/[0.07]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="text-[11px] tracking-[0.2em] text-slate-400">{mission.id}</div>
          <div className="mt-2 text-lg font-bold text-white">{mission.title}</div>
          <div className="mt-1 text-[11px] uppercase tracking-[0.16em] text-slate-400">{mission.subtitle}</div>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10 text-lg text-cyan-200">
          {mission.icon}
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-300">{mission.story}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <StatusPill tone={tone}>{text}</StatusPill>
        <div className="text-[11px] text-slate-400">
          시작: <span className="text-slate-200">{mission.startedAt ? formatTime(mission.startedAt) : '기록 전'}</span>
        </div>
        <div className="text-[11px] text-slate-400">
          완료: <span className="text-slate-200">{mission.clearedAt ? formatTime(mission.clearedAt) : '미완료'}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2">
        <div className="text-xs font-semibold text-cyan-200">카드를 누르면 상세 브리핑 열기</div>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onOpenDetail(mission);
          }}
          className="rounded-xl border border-cyan-300/30 bg-cyan-400/10 px-3 py-2 text-xs font-semibold text-cyan-100 transition hover:bg-cyan-400/15"
        >
          상세 보기
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onStart(mission.id);
          }}
          disabled={mission.started}
          className="min-h-[46px] rounded-2xl border border-cyan-300/30 bg-cyan-400/10 px-4 py-3 text-sm font-semibold text-cyan-100 transition enabled:hover:bg-cyan-400/15 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {mission.started ? '시작 기록 완료' : '참가자 미션 시작'}
        </button>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onRequestApproval(mission);
          }}
          disabled={!mission.started || mission.cleared}
          className="min-h-[46px] rounded-2xl border border-emerald-300/30 bg-emerald-400/10 px-4 py-3 text-sm font-semibold text-emerald-100 transition enabled:hover:bg-emerald-400/15 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {mission.cleared ? '관리자 승인 완료' : '진행요원 승인 코드 입력'}
        </button>
      </div>
    </div>
  );
}

function TestPanel({ title, results }) {
  const passedCount = results.filter((item) => item.passed).length;

  return (
    <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-[10px] tracking-[0.18em] text-slate-400">SELF TEST</div>
          <div className="mt-1 text-base font-bold text-white">{title}</div>
        </div>
        <StatusPill tone="cyan">{`${passedCount}/${results.length}`}</StatusPill>
      </div>

      <div className="mt-4 space-y-2">
        {results.map((item) => (
          <div key={`${title}-${item.label}`} className="rounded-2xl border border-white/10 bg-slate-950/50 p-3">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold text-white">{item.label}</div>
              <StatusPill tone={item.passed ? 'emerald' : 'red'}>{item.passed ? 'PASS' : 'FAIL'}</StatusPill>
            </div>
            <div className="mt-2 text-xs text-slate-400">기대값: {String(item.expected)} · 실제값: {String(item.actual)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MissionDetailModal({ mission, onClose }) {
  if (!mission) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-slate-950/70 p-3 backdrop-blur-sm sm:items-center sm:p-6">
      <div className="max-h-[88vh] w-full max-w-2xl overflow-hidden rounded-[28px] border border-cyan-300/20 bg-slate-950 shadow-2xl shadow-cyan-950/30">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4">
          <div>
            <div className="text-[10px] tracking-[0.22em] text-cyan-200/80">MISSION BRIEFING</div>
            <div className="mt-2 text-xl font-bold text-white">{mission.detailTitle || mission.title}</div>
            <div className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-400">{mission.id} · {mission.subtitle}</div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
          >
            닫기
          </button>
        </div>

        <div className="max-h-[calc(88vh-84px)] overflow-y-auto px-5 py-5">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-[10px] tracking-[0.18em] text-slate-400">구역 진입 텍스트</div>
            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-200">{mission.entryText || mission.story}</p>
          </div>

          {mission.noteText ? (
            <div className="mt-4 rounded-2xl border border-purple-300/20 bg-purple-400/10 p-4">
              <div className="text-[10px] tracking-[0.18em] text-purple-200/90">{mission.noteTitle || '연구원 기록'}</div>
              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-purple-50/90">{mission.noteText}</p>
            </div>
          ) : null}

          {mission.imageSrc ? (
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-[10px] tracking-[0.18em] text-slate-400">참고 이미지</div>
              <p className="mt-2 text-sm leading-6 text-slate-300">{mission.imageCaption}</p>
              <img
                src={mission.imageSrc}
                alt={`${mission.id} 참고 이미지`}
                className="mt-3 w-full rounded-2xl border border-white/10 object-contain"
              />
            </div>
          ) : null}

          <div className="mt-4 rounded-2xl border border-amber-300/20 bg-amber-400/10 p-4">
            <div className="text-[10px] tracking-[0.18em] text-amber-200/90">힌트</div>
            <p className="mt-3 text-sm leading-7 text-amber-50/90">{mission.hint || '추가 힌트가 아직 입력되지 않았습니다.'}</p>
          </div>

          <div className="mt-4 rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-4">
            <div className="text-[10px] tracking-[0.18em] text-cyan-200/90">실험 방법 / 진행 절차</div>
            <div className="mt-3 space-y-2">
              {(mission.method || []).map((step, index) => (
                <div key={`${mission.id}-step-${index}`} className="flex gap-3 rounded-xl border border-white/10 bg-slate-950/50 px-3 py-3 text-sm text-slate-100">
                  <span className="font-bold text-cyan-200">{index + 1}</span>
                  <span className="leading-6">{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-4">
            <div className="text-[10px] tracking-[0.18em] text-emerald-200/90">미션 성공 후 텍스트</div>
            {shouldRevealSuccessText(mission) ? (
              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-emerald-50/90">{mission.successText || '성공 후 메시지가 아직 입력되지 않았습니다.'}</p>
            ) : (
              <div className="mt-3 rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-4 text-sm leading-6 text-slate-300">
                이 구역의 복구 검증이 완료되면 성공 후 텍스트가 해제됩니다.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ApprovalModal({ mission, value, error, onChange, onClose, onSubmit }) {
  if (!mission) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/80 p-3 backdrop-blur-sm sm:items-center sm:p-6">
      <div className="w-full max-w-md rounded-[28px] border border-emerald-300/20 bg-slate-950 p-5 shadow-2xl shadow-emerald-950/30">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[10px] tracking-[0.22em] text-emerald-200/80">STAFF APPROVAL</div>
            <div className="mt-2 text-xl font-bold text-white">{mission.id} 승인 코드 입력</div>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              진행요원이 관리자 승인 코드 입력을 완료하면 이 미션이 승인됩니다.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
          >
            닫기
          </button>
        </div>

        <div className="mt-4">
          <label className="mb-2 block text-[11px] tracking-[0.18em] text-slate-400">APPROVAL CODE</label>
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-300/25 bg-slate-950/80 px-4 py-3">
            <span className="text-emerald-200">#</span>
            <input
              value={value}
              onChange={(event) => onChange(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') onSubmit();
              }}
              placeholder="진행요원 승인 코드"
              className="w-full bg-transparent text-base tracking-[0.12em] text-white outline-none placeholder:text-slate-500"
              autoCapitalize="characters"
              autoCorrect="off"
              spellCheck={false}
            />
          </div>
        </div>

        {error ? (
          <div className="mt-3 rounded-2xl border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-100">
            {error}
          </div>
        ) : null}

        <button
          type="button"
          onClick={onSubmit}
          className="mt-4 min-h-[48px] w-full rounded-2xl border border-emerald-300/30 bg-emerald-400/10 px-4 py-3 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-400/15"
        >
          이 미션 승인하기
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const audioRef = useRef(null);
  const autoplayTriedRef = useRef(false);

  const [missions, setMissions] = useState(() => missionBlueprint.map(createMissionState));
  const [activeTab, setActiveTab] = useState('missions');
  const [finalInput, setFinalInput] = useState('');
  const [approvalInput, setApprovalInput] = useState('');
  const [approvalError, setApprovalError] = useState('');
  const [selectedMission, setSelectedMission] = useState(null);
  const [approvalMission, setApprovalMission] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  const [coreError, setCoreError] = useState('');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const [audioError, setAudioError] = useState('');
  const [logs, setLogs] = useState(() => [
    createLog('[BOOT] ORCA 연구소 중앙 제어 시스템이 활성화되었습니다.'),
    createLog('[WAIT] 각 미션 시작 시각 기록 대기 중입니다.'),
  ]);

  const startedCount = useMemo(() => missions.filter((item) => item.started).length, [missions]);
  const clearedCount = useMemo(() => missions.filter((item) => item.cleared).length, [missions]);
  const allMissionsCleared = clearedCount === missions.length;

  const passwordTests = useMemo(() => runPasswordTests(), []);
  const adminTests = useMemo(() => runAdminTests(), []);
  const missionTests = useMemo(() => runMissionTests(), []);
  const audioTests = useMemo(() => runAudioTests(), []);

  const appendLog = (message) => {
    setLogs((current) => [createLog(message), ...current]);
  };

  useEffect(() => {
    const player = audioRef.current;
    if (!SHOULD_AUTOPLAY || !player || autoplayTriedRef.current) return;

    autoplayTriedRef.current = true;
    let cancelled = false;

    const start = async () => {
      try {
        setAudioError('');
        await player.play();
        if (cancelled) return;
        setIsMusicPlaying(true);
        setAudioReady(true);
        appendLog(`[${formatTime(Date.now())}] BGM 자동재생 시작`);
      } catch (error) {
        if (cancelled) return;
        setAudioError('배경음 자동재생이 차단되었습니다. 버튼으로 다시 재생할 수 있습니다.');
      }
    };

    void start();

    return () => {
      cancelled = true;
    };
  }, []);

  const toggleMusic = async () => {
    const player = audioRef.current;
    if (!player) {
      setAudioError('오디오 플레이어를 찾을 수 없습니다.');
      return;
    }

    if (isMusicPlaying) {
      player.pause();
      setIsMusicPlaying(false);
      appendLog(`[${formatTime(Date.now())}] BGM 재생 일시정지`);
      return;
    }

    try {
      setAudioError('');
      await player.play();
      setIsMusicPlaying(true);
      setAudioReady(true);
      appendLog(`[${formatTime(Date.now())}] BGM 재생 시작`);
    } catch (error) {
      setAudioError('브라우저 정책 또는 파일 경로 문제로 배경음 재생에 실패했습니다.');
      setIsMusicPlaying(false);
    }
  };

  const startMission = (id) => {
    setMissions((current) =>
      current.map((mission) => {
        if (mission.id !== id || mission.started) return mission;
        const now = Date.now();
        appendLog(`[${formatTime(now)}] ${mission.id} 참가자 미션 시작 기록 저장`);
        return { ...mission, started: true, startedAt: now };
      })
    );
  };

  const openApprovalModal = (mission) => {
    setApprovalMission(mission);
    setApprovalInput('');
    setApprovalError('');
  };

  const closeApprovalModal = () => {
    setApprovalMission(null);
    setApprovalInput('');
    setApprovalError('');
  };

  const submitMissionApproval = () => {
    if (!approvalMission) return;

    if (!isAdminPassword(approvalInput)) {
      setApprovalError('진행요원 승인 코드가 올바르지 않습니다.');
      return;
    }

    setMissions((current) =>
      current.map((mission) => {
        if (mission.id !== approvalMission.id || !mission.started || mission.cleared) return mission;
        const now = Date.now();
        appendLog(`[${formatTime(now)}] ${mission.id} 진행요원 승인 코드 확인 완료`);
        return { ...mission, cleared: true, clearedAt: now };
      })
    );

    closeApprovalModal();
  };

  const submitCoreCode = () => {
    setCoreError('');

    if (!allMissionsCleared) {
      setAttempts((value) => value + 1);
      setCoreError('중앙 코어 봉인 해제 실패');
      appendLog(`[${formatTime(Date.now())}] CORE-0 해제 시도 거부: 모든 미션이 아직 승인되지 않음`);
      setActiveTab('core');
      return;
    }

    if (isFinalPassword(finalInput)) {
      setUnlocked(true);
      appendLog(`[${formatTime(Date.now())}] CORE-0 중앙 코어 봉인 해제 성공`);
      setActiveTab('core');
      return;
    }

    setAttempts((value) => value + 1);
    setCoreError('중앙 코어 봉인 해제 실패');
    appendLog(`[${formatTime(Date.now())}] CORE-0 중앙 코어 봉인 해제 실패`);
  };

  const renderMissions = () => (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <StatusPill tone="cyan">PARTICIPANT MODE</StatusPill>
        <StatusPill tone="amber">순서: CHEM → TRACE → AER → BIO → POL</StatusPill>
      </div>
      {missions.map((mission) => (
        <MissionCard
          key={mission.id}
          mission={mission}
          onStart={startMission}
          onRequestApproval={openApprovalModal}
          onOpenDetail={setSelectedMission}
        />
      ))}
    </div>
  );

  const renderCore = () => (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="text-[10px] tracking-[0.18em] text-cyan-200/80">CORE-0 RECOVERY PROTOCOL</div>
          <div className="mt-2 text-xl font-bold text-white">중앙 코어 봉인 해제</div>
          <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-300">{CORE_ENTRY_TEXT}</p>
        </div>
        <StatusPill tone={unlocked ? 'emerald' : allMissionsCleared ? 'cyan' : 'red'}>
          {unlocked ? 'CORE OPEN' : allMissionsCleared ? 'READY' : 'SEALED'}
        </StatusPill>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatCard label="승인된 미션" value={`${clearedCount}/5`} colorClass="text-emerald-200" />
        <StatCard label="실패 횟수" value={String(attempts)} colorClass={attempts > 0 ? 'text-red-200' : 'text-slate-200'} />
        <StatCard label="BGM" value={isMusicPlaying ? 'PLAYING' : 'STOPPED'} colorClass={isMusicPlaying ? 'text-cyan-200' : 'text-slate-200'} />
      </div>

      <div>
        <label className="mb-2 block text-[11px] tracking-[0.18em] text-slate-400">FINAL ACCESS CODE</label>
        <div className="flex items-center gap-3 rounded-2xl border border-cyan-300/25 bg-slate-950/80 px-4 py-3">
          <span className="text-cyan-200">⌁</span>
          <input
            value={finalInput}
            onChange={(event) => setFinalInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') submitCoreCode();
            }}
            placeholder={`예: ${PASSWORD_PLACEHOLDER}`}
            className="w-full bg-transparent text-base tracking-[0.18em] text-white outline-none placeholder:text-slate-500 sm:text-lg"
            autoCapitalize="characters"
            autoCorrect="off"
            spellCheck={false}
          />
        </div>
        <button
          type="button"
          onClick={submitCoreCode}
          className="mt-3 min-h-[50px] w-full rounded-2xl border border-cyan-300/30 bg-cyan-400/15 px-4 py-3 text-sm font-bold tracking-[0.18em] text-cyan-100 transition hover:bg-cyan-400/20"
        >
          UNSEAL CORE
        </button>
      </div>

      {coreError ? (
        <div className="rounded-2xl border border-red-400/30 bg-red-400/10 p-4 text-sm font-bold text-red-100">{coreError}</div>
      ) : null}

      {unlocked ? (
        <div className="rounded-[24px] border border-emerald-400/30 bg-emerald-400/10 p-5">
          <div className="text-[10px] tracking-[0.18em] text-emerald-200/90">ACCESS GRANTED</div>
          <p className="mt-3 whitespace-pre-line text-sm leading-7 text-emerald-50/90">{CORE_SUCCESS_TEXT}</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-red-400/20 bg-red-400/5 p-4 text-sm leading-6 text-red-100/80">
          현재 코어는 봉인 상태입니다. 모든 미션을 시작 기록한 뒤, 진행요원이 각 방에서 승인 코드를 입력해야 최종 해제 코드 판정이 활성화됩니다.
        </div>
      )}
    </div>
  );

  const renderLogs = () => (
    <div className="space-y-2">
      {logs.map((log) => (
        <div key={log.id} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-cyan-100">
          {log.message}
        </div>
      ))}
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-4">
      <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-[10px] tracking-[0.18em] text-slate-400">BACKGROUND MUSIC</div>
            <div className="mt-1 text-base font-bold text-white">업로드한 음악 연결</div>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              페이지가 열리면 자동재생을 시도하고, 차단되면 버튼으로 다시 재생할 수 있습니다.
            </p>
          </div>
          <button
            type="button"
            onClick={toggleMusic}
            className="min-h-[46px] rounded-2xl border border-cyan-300/30 bg-cyan-400/10 px-4 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/15"
          >
            {isMusicPlaying ? '배경음 일시정지' : '배경음 재생'}
          </button>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <StatusPill tone={isMusicPlaying ? 'emerald' : 'slate'}>{isMusicPlaying ? 'PLAYING' : 'STOPPED'}</StatusPill>
          <StatusPill tone={audioReady ? 'cyan' : 'amber'}>{audioReady ? 'READY' : 'WAITING'}</StatusPill>
        </div>

        {audioError ? (
          <div className="mt-3 rounded-2xl border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-100">{audioError}</div>
        ) : null}
      </div>

      <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-300">
        진행요원 승인 코드는 <span className="font-semibold text-emerald-200">0913</span>이며, 각 미션마다 별도로 입력해야 합니다.
      </div>

      <TestPanel title="비밀번호 검증 테스트" results={passwordTests} />
      <TestPanel title="승인 코드 검증 테스트" results={adminTests} />
      <TestPanel title="미션 상태 전이 테스트" results={missionTests} />
      <TestPanel title="배경음 설정 테스트" results={audioTests} />
    </div>
  );

  let activeContent = renderSettings();
  if (activeTab === 'missions') activeContent = renderMissions();
  if (activeTab === 'core') activeContent = renderCore();
  if (activeTab === 'logs') activeContent = renderLogs();

  const tabLabel = TABS.find((tab) => tab.id === activeTab)?.label || '';

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <audio
        ref={audioRef}
        src={MUSIC_SRC}
        loop
        preload="auto"
        onCanPlay={() => setAudioReady(true)}
        onPlay={() => setIsMusicPlaying(true)}
        onPause={() => setIsMusicPlaying(false)}
        onEnded={() => setIsMusicPlaying(false)}
        onError={() => setAudioError('배경음 파일을 불러오지 못했습니다. 파일 경로를 확인하세요.')}
      />

      <MissionDetailModal mission={selectedMission} onClose={() => setSelectedMission(null)} />
      <ApprovalModal
        mission={approvalMission}
        value={approvalInput}
        error={approvalError}
        onChange={setApprovalInput}
        onClose={closeApprovalModal}
        onSubmit={submitMissionApproval}
      />

      <div className="relative mx-auto min-h-screen max-w-5xl overflow-hidden px-3 pb-28 pt-3 sm:px-5 sm:pt-5">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[-10%] top-[-5%] h-56 w-56 rounded-full bg-cyan-400/15 blur-3xl" />
          <div className="absolute right-[-10%] top-[35%] h-64 w-64 rounded-full bg-blue-500/15 blur-3xl" />
          <div className="absolute bottom-[-10%] left-[20%] h-56 w-56 rounded-full bg-emerald-400/10 blur-3xl" />
        </div>

        <div className="relative z-10 rounded-[28px] border border-white/10 bg-slate-950/70 p-4 shadow-2xl backdrop-blur-2xl sm:p-5">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-3xl border border-cyan-300/20 bg-cyan-400/10 text-xl text-cyan-200">⌬</div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] tracking-[0.22em] text-cyan-200/80">ORCA ENVIRONMENTAL CONTROL LAB</div>
              <div className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">노트북 로컬 실행용 ORCA 앱</div>
              <p className="mt-2 text-sm leading-6 text-slate-300">행사 운영용으로 노트북에서 바로 실행할 수 있도록 정리된 ORCA 복구 인터페이스입니다.</p>
            </div>
            <button
              type="button"
              onClick={toggleMusic}
              className="min-h-[46px] rounded-2xl border border-cyan-300/30 bg-cyan-400/10 px-3 py-2 text-xs font-semibold text-cyan-100 transition hover:bg-cyan-400/15"
            >
              {isMusicPlaying ? '음악 정지' : '음악 재생'}
            </button>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
            <StatCard label="LAB STATUS" value="LOCKDOWN ACTIVE" colorClass="text-red-200" />
            <StatCard label="STARTED" value={`${startedCount}/5`} colorClass="text-cyan-200" />
            <StatCard label="CLEARED" value={`${clearedCount}/5`} colorClass="text-emerald-200" />
            <StatCard label="MODE" value={unlocked ? 'UNSEALED' : 'SEALED'} colorClass={unlocked ? 'text-emerald-200' : 'text-slate-200'} />
            <StatCard label="VERIFY" value="PER ROOM CODE" colorClass="text-amber-200" />
          </div>
        </div>

        <div className="relative z-10 mt-4 rounded-[28px] border border-white/10 bg-slate-950/70 p-4 backdrop-blur-2xl sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="text-[10px] tracking-[0.18em] text-slate-400">{tabLabel}</div>
            <StatusPill tone="slate">{activeTab.toUpperCase()}</StatusPill>
          </div>
          {activeContent}
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-slate-950/90 px-3 py-3 backdrop-blur-2xl sm:px-5">
        <div className="mx-auto grid max-w-5xl grid-cols-4 gap-2">
          {TABS.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex min-h-[58px] flex-col items-center justify-center rounded-2xl border text-xs font-semibold transition ${
                  active
                    ? 'border-cyan-300/30 bg-cyan-400/15 text-cyan-100'
                    : 'border-white/10 bg-white/5 text-slate-400'
                }`}
              >
                <span className="text-base">{tab.icon}</span>
                <span className="mt-1">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
