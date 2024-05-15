import { nanoid } from 'nanoid'

const pinano = 'piなの'

export const grammars = [
  {
    id: nanoid(),
    title: '～あげく',
    connection: ['vた'],
    meaning: ['反复做某事或者持续做某事很长时间之后, 出现不好的结果'],
    level: 2,
    sort: 0,
    demos: [
      {
        connection: 'vた',
        list: ['']
      }
    ]
  },
  {
    id: nanoid(),
    title: '～こそ',
    connection: ['名词'],
    meaning: ['~正是, ~才是'],
    level: 3,
    sort: 0
  },
  {
    id: nanoid(),
    title: '～一方だ',
    connection: ['ｖる'],
    meaning: ['不断地A, 一直A'],
    level: 3,
    sort: 1
  },
  {
    id: nanoid(),
    title: '～うえ「に」',
    connection: [pinano],
    meaning: ['不但A而且B (好上加好, 坏上加坏)'],
    level: 3,
    sort: 1
  },
  {
    id: nanoid(),
    title: '～うちに',
    connection: [pinano],
    meaning: ['趁A做B', '在~期间发生B (意外的状况或动作)'],
    level: 3,
    sort: 1
  },
  {
    id: nanoid(),
    title: '～おかげで・だ・か',
    connection: [pinano],
    meaning: ['拖~的福, 多亏~'],
    level: 3,
    sort: 1
  },
  {
    id: nanoid(),
    title: '～恐れがある',
    connection: ['ｖる・ない', '名词の'],
    meaning: ['恐怕~, 有可能~ (负面情况)'],
    level: 3,
    sort: 1
  },
  {
    id: nanoid(),
    title: '～かける・かけ',
    connection: ['ｖます', 'かけのN'],
    meaning: ['刚开始~', '~到一半', '快要~(もう少しで完全にAになる)'],
    level: 3,
    sort: 0
  },
  {
    id: nanoid(),
    title: '～のことだから・のことだ',
    connection: ['名词'],
    meaning: ['正因为是A, 所以肯定~'],
    level: 3,
    sort: 0
  },
  {
    id: nanoid(),
    title: '～くらい・ぐらい',
    connection: ['piな・×'],
    meaning: ['程度', '表示最低程度'],
    level: 3,
    sort: 0
  },
  {
    id: nanoid(),
    title: '～かわり「に」',
    connection: [pinano],
    meaning: ['代替, 取代', '另一方面', '代价'],
    level: 2,
    sort: 0
  },
  {
    id: nanoid(),
    title: '～きる・きれる・きれない',
    connection: ['ｖます型'],
    meaning: ['动作A做完', '动作A能做完', '动作A做到极限(言い切った・疲れ切った)'],
    level: 3,
    sort: 0
  }
]
