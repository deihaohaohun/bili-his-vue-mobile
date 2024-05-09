import { nanoid } from 'nanoid'

export const grammars = [
  {
    id: nanoid(),
    title: '～あげく',
    connection: ['vた'],
    meaning: ['反复做某事或者持续做某事很长时间之后, 出现不好的结果'],
    level: 2,
    sort: 0
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
    title: '～かわり（に）',
    connection: ['piなの'],
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
