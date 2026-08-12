import { Question } from '../types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    questionTitle: "더 피하고 싶은 회의 스타일은?",
    intro: "둘 중 하나의 회의를 꼭 참석해야 한다면?",
    optionA: {
      text: "본인만 30분 동안 계속 말하는 회의",
      highlightText: "본인만 30분 계속 발표",
      subText: "발표 준비 부담 & 질문 세례의 연속",
      categoryTag: "발표자 부담",
      illustrationType: "speaking"
    },
    optionB: {
      text: "3시간 동안 계속 상사의 발표를 듣기만 하는 회의",
      highlightText: "3시간 상사 발표 듣기만",
      subText: "끝없는 경청 & 방전되는 집중력",
      categoryTag: "경청 지루함",
      illustrationType: "listening"
    }
  },
  {
    id: 2,
    questionTitle: "나의 라이프스타일 우선순위는?",
    intro: "보상과 근무 시간 사이의 선택",
    optionA: {
      text: "연봉 1.5배 상승! 단, 매일 2시간 야근",
      highlightText: "연봉 1.5배 & 야근",
      subText: "통장 잔고 든든, 개인시간 감소",
      categoryTag: "고연봉 지향",
      illustrationType: "money"
    },
    optionB: {
      text: "기존 연봉 유지! 매일 칼퇴 보장 & 워라밸",
      highlightText: "칼퇴 보장 & 워라밸",
      subText: "저녁이 있는 삶 & 취미생활",
      categoryTag: "워라밸 지향",
      illustrationType: "time"
    }
  },
  {
    id: 3,
    questionTitle: "내가 가장 선호하는 근무 환경은?",
    intro: "장소와 몰입 공간의 차이",
    optionA: {
      text: "100% 재택근무 & 자율 출퇴근제",
      highlightText: "100% 재택 & 자율시작",
      subText: "출퇴근 스트레스 제로 & 자유로운 장소",
      categoryTag: "자유형 재택",
      illustrationType: "home"
    },
    optionB: {
      text: "풀 오피스 출근 & 최고의 인프라",
      highlightText: "최고급 사옥 오피스 출근",
      subText: "원활한 소통 & 일과 삶의 명확한 분리",
      categoryTag: "오피스 몰입",
      illustrationType: "office"
    }
  },
  {
    id: 4,
    questionTitle: "업무 수행 방식의 차이",
    intro: "협업과 독자적 몰입의 밸런스",
    optionA: {
      text: "혼자서 깊게 몰입하여 독자적으로 완수하는 업무",
      highlightText: "1인독자 몰입 프로젝트",
      subText: "방해 없는 집중 & 내 페이스대로 완수",
      categoryTag: "독자 몰입",
      illustrationType: "solo"
    },
    optionB: {
      text: "팀원들과 매일 긴밀하게 소통하고 협업하는 업무",
      highlightText: "팀 시너지 협업 프로젝트",
      subText: "함께 아이디어 디스커션 & 집단지성",
      categoryTag: "팀 협업",
      illustrationType: "team"
    }
  },
  {
    id: 5,
    questionTitle: "업무 가이드라인과 프로세스",
    intro: "체계와 자유도의 선택",
    optionA: {
      text: "매뉴얼과 가이드라인이 명확히 정해진 업무",
      highlightText: "체계적인 매뉴얼 시스템",
      subText: "예측 가능성 & 안정적인 업무 프로세스",
      categoryTag: "체계 지향",
      illustrationType: "stability"
    },
    optionB: {
      text: "정답이 없어 직접 주도하여 방향을 만드는 업무",
      highlightText: "자율적인 무에서 유 창조",
      subText: "높은 자율성 & 직접 만들어가는 성취감",
      categoryTag: "자율 주도",
      illustrationType: "creative"
    }
  },
  {
    id: 6,
    questionTitle: "커리어 성장 지향점",
    intro: "깊이와 넓이 중 나의 커리어 방향은?",
    optionA: {
      text: "한 분야를 깊게 파고드는 대체불가 스페셜리스트",
      highlightText: "대체불가 스페셜리스트",
      subText: "깊은 전문성 & 분야 최고 권위자",
      categoryTag: "스페셜리스트",
      illustrationType: "focus"
    },
    optionB: {
      text: "다양한 영역을 연결하는 다재다능 제너럴리스트",
      highlightText: "문제해결형 제너럴리스트",
      subText: "넓은 시야 & 복합적 문제 해결자",
      categoryTag: "제너럴리스트",
      illustrationType: "analytics"
    }
  },
  {
    id: 7,
    questionTitle: "조직 내 주 역할",
    intro: "실행과 기획 중 더 즐거운 일은?",
    optionA: {
      text: "직접 결과물을 기민하게 만들고 실행하는 역할",
      highlightText: "직접 만들고 실행하는 플레이어",
      subText: "손으로 만드는 직관적 성과와 속도감",
      categoryTag: "실행 플레이어",
      illustrationType: "growth"
    },
    optionB: {
      text: "전체 판을 설계하고 다른 사람의 실행을 이끄는 역할",
      highlightText: "판을 설계하고 이끄는 리더",
      subText: "조율과 방향성 제시 & 리더십",
      categoryTag: "전랙 리더",
      illustrationType: "leader"
    }
  },
  {
    id: 8,
    questionTitle: "동기부여의 원천",
    intro: "나를 움직이게 하는 가장 큰 힘은?",
    optionA: {
      text: "칭찬은 없어도 연봉과 보너스가 최고인 보상",
      highlightText: "확실하고 두둑한 금전적 보상",
      subText: "결과로 증명되는 냉정한 인센티브",
      categoryTag: "보상 중심",
      illustrationType: "money"
    },
    optionB: {
      text: "동료들의 뜨거운 인정과 비전 성장의 즐거움",
      highlightText: "동료의 인정 & 가치 성장",
      subText: "함께 성장하는 신뢰와 의미감",
      categoryTag: "성장/인정 중심",
      illustrationType: "team"
    }
  },
  {
    id: 9,
    questionTitle: "의사결정 속도와 리스크",
    intro: "새로운 프로젝트를 추진할 때 나의 방식",
    optionA: {
      text: "충분한 정보와 리스크 검토 후 신중하게 결정",
      highlightText: "신중한 분석 & 리스크 최소화",
      subText: "안전하고 완성도 높은 추진",
      categoryTag: "신중 분석",
      illustrationType: "stability"
    },
    optionB: {
      text: "불완전한 정보라도 일단 빠르게 시도하고 수정",
      highlightText: "빠른 시도 & 기민한 피드백",
      subText: "실행 우선 & 테스트를 통한 배움",
      categoryTag: "빠른 실행",
      illustrationType: "growth"
    }
  },
  {
    id: 10,
    questionTitle: "도전과 성장의 방식",
    intro: "내가 피어나기 좋은 학습 환경",
    optionA: {
      text: "업계 최고 리더 밑에서 단단하게 배우며 성장",
      highlightText: "최고의 멘토 사수 밑에서 성장",
      subText: "검증된 노하우 스폰지처럼 흡수",
      categoryTag: "멘토링 도약",
      illustrationType: "follower"
    },
    optionB: {
      text: "직접 리드하며 맨땅에 헤딩으로 시행착오 겪기",
      highlightText: "맨땅 헤딩 실전 리딩",
      subText: "직접 부딪히며 터득하는 야생의 성장",
      categoryTag: "야생 도판",
      illustrationType: "leader"
    }
  }
];
