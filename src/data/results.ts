import { PersonalityResult } from '../types';

export const PERSONALITY_RESULTS: PersonalityResult[] = [
  {
    id: 'perfectionist_specialist',
    minACount: 8,
    maxACount: 10,
    emoji: '🎯',
    title: '완벽주의 전문 실무형',
    subtitle: '깊은 몰입과 명확한 체계 속에서 빛나는 핵심 스페셜리스트',
    description: '기준이 분명한 일을 좋아하고, 한번 맡은 일은 깊이 파고들어 끝까지 높은 완성도로 완수해내는 오너십이 뛰어난 타입이에요. 모호함보다는 확실한 데이터와 체계적인 프로세스에서 최고의 퍼포먼스를 발휘해요.',
    strengths: [
      '탁월한 집중력과 완성도 높은 일처리',
      '전문 분야에 대한 깊은 지식과 리서치 능력',
      '신중한 분석으로 예측 가능한 리스크 관리'
    ],
    recommendedRole: [
      '연구/개발자', '데이터 분석가', '전문 실무 전문가', 'QA/품질관리', '금융/회계 분석가'
    ],
    workEnvironmentAdvice: '불필요한 소음 없이 조용히 집중할 수 있는 환경과 명확한 KPI, 전문가로서 존중받는 분위기에서 가장 빠르게 성과를 만들어냅니다.',
    badgeColor: 'from-blue-600 to-indigo-700'
  },
  {
    id: 'steady_communicator',
    minACount: 5,
    maxACount: 7,
    emoji: '🤝',
    title: '소통형 오퍼레이션·실무 전문가',
    subtitle: '안정적인 체계 위에서 조화와 협업을 만드는 핵심 연결고리',
    description: '체계적인 프로세스 위에서 사람들과 차분하게 호흡을 맞추며 팀이 매끄럽게 굴러가도록 돕는 능력이 뛰어납니다. 안정감과 소통 능력을 겸비하여 조직의 신뢰를 받는 든든한 플레이어예요.',
    strengths: [
      '원활한 조율과 경청에 기반한 협업 능력',
      '안정적이고 지속 가능한 업무 습관',
      '동료들이 편안하게 의지할 수 있는 신뢰감'
    ],
    recommendedRole: [
      '프로젝트 매니저(PM)', '운영 전문가', 'HR/인재개발', '고객경험(CX) 매니저', '브랜드 마케터'
    ],
    workEnvironmentAdvice: '상호 존중하는 팀 문화와 안정적인 가이드라인, 적절한 워라밸이 보장될 때 꾸준하게 기량을 펼칠 수 있습니다.',
    badgeColor: 'from-indigo-600 to-purple-600'
  },
  {
    id: 'strategic_coordinator',
    minACount: 3,
    maxACount: 4,
    emoji: '📈',
    title: '전략적 조율·조직 리더형',
    subtitle: '전체 그림을 그리고 팀의 성장을 드라이브하는 전략가',
    description: '세부적인 실무 디테일에 매이기보다 전체적인 판의 방향과 목표를 크게 바라보는 시야를 가졌습니다. 사람들을 연결하고 방향성을 제안하여 목표를 빠르게 달성하도록 이끄는 데 강점이 있습니다.',
    strengths: [
      '거시적 시야와 전략적 의사결정력',
      '팀원들의 강점을 살려주는 리더십',
      '복잡한 상황을 단순화하는 구조화 능력'
    ],
    recommendedRole: [
      '전략 기획자', '프로덕트 리더', '비즈니스 디벨로퍼', '컨설턴트', '팀 리더'
    ],
    workEnvironmentAdvice: '의사결정권이 주어지고 프로젝트 전체 흐름을 주도할 수 있는 리더십 중심 환경에서 진가를 발휘합니다.',
    badgeColor: 'from-purple-600 to-pink-600'
  },
  {
    id: 'pioneer_product_creator',
    minACount: 0,
    maxACount: 2,
    emoji: '🚀',
    title: '도전적 프로덕트 기획·창업가형',
    subtitle: '불확실성을 기회로 바꾸며 빠르게 실행하는 개척자',
    description: '정해진 틀에 안주하기보다는 새로운 가능성에 과감히 도전하고, 실패를 두려워하지 않으며 속도감 있게 결과를 도출하는 혁신가 타입입니다. 맨땅에 헤딩하면서 배울 때 가장 큰 흥분을 느낍니다.',
    strengths: [
      '압도적인 실행력과 과감한 추진력',
      '불확실성에 대한 높은 유연성과 적응력',
      '새로운 기회를 먼저 포착하는 뛰어난 직관'
    ],
    recommendedRole: [
      '스타트업 창업가/파운더', '신사업 기획자', '그로스 마케터', '프로덕트 오너(PO)', '혁신 TF 리더'
    ],
    workEnvironmentAdvice: '규제가 적고 자율성이 극대화되며, 빠른 테스트와 도전을 권장하는 애자일한 조직 환경에서 폭발적인 성장을 이룹니다.',
    badgeColor: 'from-rose-500 to-orange-500'
  }
];
