// Грамматика по уровням CEFR.
// Упражнения: {t:'mc', q, o:[варианты], a:индекс}  |  {t:'gap', q:'… ___ …', a:['ответ','вариант']}
window.GRAMMAR = [
// ===================== A1 =====================
{ id:'a1-be', level:'A1', title:'Глагол to be (am / is / are)',
  rule:`<p>«Быть» в настоящем времени: <b>I am</b>, <b>he/she/it is</b>, <b>you/we/they are</b>. В речи сокращаем: I'm, she's, they're.</p>
<p>Вопрос — меняем местами: <b>Are you</b> tired? Отрицание — <b>not</b>: She <b>isn't</b> here.</p>`,
  ex:['I am a student.','She is from Spain.','Are they at home? — No, they aren\'t.'],
  tasks:[
    {t:'mc',q:'My brother ___ a doctor.',o:['am','is','are'],a:1},
    {t:'mc',q:'We ___ hungry.',o:['is','am','are'],a:2},
    {t:'gap',q:'I ___ from Greece. (быть)',a:['am',"'m"]},
    {t:'mc',q:'___ you a student?',o:['Is','Are','Am'],a:1},
    {t:'gap',q:'It ___ cold today. (отрицание, кратко)',a:["isn't",'is not']},
    {t:'mc',q:'They ___ my friends.',o:['are','is','be'],a:0}
  ]},
{ id:'a1-present-simple', level:'A1', title:'Present Simple — привычки и факты',
  rule:`<p>Регулярные действия и факты. С <b>he/she/it</b> к глаголу добавляем <b>-s/-es</b>: she work<b>s</b>, he go<b>es</b>.</p>
<p>Вопрос и отрицание — через <b>do/does</b>: <b>Do</b> you like tea? He <b>doesn't</b> drink coffee. После does глагол без -s!</p>`,
  ex:['I drink tea every morning.','She lives in London.','Does he play football?'],
  tasks:[
    {t:'mc',q:'She ___ in a bank.',o:['work','works','working'],a:1},
    {t:'gap',q:'He ___ to school by bus. (go)',a:['goes']},
    {t:'mc',q:'___ they speak English?',o:['Does','Do','Are'],a:1},
    {t:'mc',q:'My dad doesn\'t ___ meat.',o:['eat','eats','eating'],a:0},
    {t:'gap',q:'We ___ like horror films. (отрицание)',a:["don't",'do not']},
    {t:'mc',q:'Where ___ your sister live?',o:['do','does','is'],a:1}
  ]},
{ id:'a1-articles', level:'A1', title:'Артикли a / an / the',
  rule:`<p><b>a/an</b> — один из многих, упоминаем впервые: <b>a</b> cat, <b>an</b> apple (an — перед гласным звуком).</p>
<p><b>the</b> — конкретный, уже известный или единственный: <b>the</b> sun, Close <b>the</b> door.</p>`,
  ex:['I have a dog. The dog is black.','She is an engineer.','The moon is bright.'],
  tasks:[
    {t:'mc',q:'I eat ___ orange every day.',o:['a','an','the'],a:1},
    {t:'mc',q:'___ sun is very hot.',o:['A','An','The'],a:2},
    {t:'mc',q:'He is ___ teacher.',o:['a','an','the'],a:0},
    {t:'gap',q:'It\'s ___ umbrella. (артикль)',a:['an']},
    {t:'mc',q:'I bought a book. ___ book is great.',o:['A','The','An'],a:1},
    {t:'mc',q:'She has ___ hour for lunch.',o:['a','an','the'],a:1}
  ]},
{ id:'a1-have-got', level:'A1', title:'have / has — иметь',
  rule:`<p><b>I/you/we/they have</b>, <b>he/she/it has</b>.</p><p>Вопрос: <b>Do</b> you have…? / <b>Does</b> she have…? (после does — снова <b>have</b>).</p>`,
  ex:['I have two cats.','She has a new phone.','Does he have a car?'],
  tasks:[
    {t:'mc',q:'My sister ___ blue eyes.',o:['have','has','haves'],a:1},
    {t:'mc',q:'We ___ a big garden.',o:['has','have','having'],a:1},
    {t:'gap',q:'Does he ___ a brother? (have/has)',a:['have']},
    {t:'mc',q:'They ___ a car.',o:["doesn't have","don't have","don't has"],a:1},
    {t:'gap',q:'The cat ___ a long tail. (have/has)',a:['has']}
  ]},
{ id:'a1-there-is', level:'A1', title:'There is / There are',
  rule:`<p>«Есть, находится»: <b>There is</b> + единственное число, <b>There are</b> + множественное.</p><p>Вопрос: <b>Is there</b>…? <b>Are there</b>…?</p>`,
  ex:['There is a park near my house.','There are three chairs.','Is there a bank here?'],
  tasks:[
    {t:'mc',q:'There ___ two beds in the room.',o:['is','are','be'],a:1},
    {t:'mc',q:'There ___ a cat on the sofa.',o:['is','are','am'],a:0},
    {t:'gap',q:'___ there any milk? (вопрос)',a:['is']},
    {t:'mc',q:'There ___ any students today.',o:["isn't","aren't","not"],a:1},
    {t:'gap',q:'There ___ many shops in my city.',a:['are']}
  ]},
{ id:'a1-can', level:'A1', title:'can / can\'t — умения и просьбы',
  rule:`<p><b>can</b> + глагол без to: I <b>can swim</b>. Одна форма для всех лиц — никаких -s.</p><p>Отрицание: <b>can't</b>. Вопрос: <b>Can</b> you help me?</p>`,
  ex:['She can speak French.','I can\'t drive.','Can I open the window?'],
  tasks:[
    {t:'mc',q:'He ___ play the guitar.',o:['cans','can','can to'],a:1},
    {t:'mc',q:'___ you swim?',o:['Do','Can','Are'],a:1},
    {t:'gap',q:'I ___ cook. I never learned. (отрицание)',a:["can't",'cannot','can not']},
    {t:'mc',q:'She can ___ very fast.',o:['run','runs','to run'],a:0},
    {t:'mc',q:'Can I ___ your pen?',o:['to use','use','using'],a:1}
  ]},

// ===================== A2 =====================
{ id:'a2-past-simple', level:'A2', title:'Past Simple — прошедшее время',
  rule:`<p>Законченное действие в прошлом (yesterday, last week, ago). Правильные глаголы + <b>-ed</b>: worked, played. Неправильные учим: go → <b>went</b>, see → <b>saw</b>, buy → <b>bought</b>.</p>
<p>Вопрос/отрицание — <b>did</b> + начальная форма: <b>Did</b> you <b>go</b>? I <b>didn't see</b> him.</p>`,
  ex:['I visited Paris last year.','We went to the cinema yesterday.','Did she call you?'],
  tasks:[
    {t:'mc',q:'Yesterday I ___ to the gym.',o:['go','went','goed'],a:1},
    {t:'gap',q:'She ___ a new dress last week. (buy)',a:['bought']},
    {t:'mc',q:'Did you ___ the film?',o:['saw','see','seen'],a:1},
    {t:'gap',q:'We ___ TV last night. (watch)',a:['watched']},
    {t:'mc',q:'He ___ come to the party.',o:["didn't","doesn't","wasn't"],a:0},
    {t:'gap',q:'I ___ my keys this morning. (lose)',a:['lost']}
  ]},
{ id:'a2-continuous', level:'A2', title:'Present Continuous — сейчас',
  rule:`<p>Действие прямо сейчас или временное: <b>am/is/are + -ing</b>. I <b>am reading</b>.</p><p>Также — планы на ближайшее будущее: We<b>'re meeting</b> tomorrow.</p><p>Не используем с глаголами состояния: know, like, want (НЕ «I'm knowing»).</p>`,
  ex:['Look! It is raining.','She is working from home this week.','What are you doing?'],
  tasks:[
    {t:'mc',q:'Be quiet! The baby ___.',o:['sleeps','is sleeping','sleeping'],a:1},
    {t:'gap',q:'They ___ football right now. (play)',a:["are playing","'re playing"]},
    {t:'mc',q:'I usually walk, but today I ___ the bus.',o:['take','am taking','takes'],a:1},
    {t:'mc',q:'I ___ the answer.',o:['know','am knowing','knowing'],a:0},
    {t:'gap',q:'What ___ you doing?',a:['are']}
  ]},
{ id:'a2-comparatives', level:'A2', title:'Сравнение прилагательных',
  rule:`<p>Короткие: <b>-er / the -est</b>: cheap → cheap<b>er</b> → the cheap<b>est</b>. Длинные: <b>more / the most</b>: more expensive.</p>
<p>Исключения: good → <b>better</b> → <b>the best</b>; bad → <b>worse</b> → <b>the worst</b>. После сравнения — <b>than</b>.</p>`,
  ex:['My car is faster than yours.','This is the most beautiful city.','Today is worse than yesterday.'],
  tasks:[
    {t:'mc',q:'Russia is ___ than Greece.',o:['big','bigger','biggest'],a:1},
    {t:'mc',q:'This is ___ film I\'ve ever seen.',o:['the best','the better','the goodest'],a:0},
    {t:'gap',q:'English is ___ than Chinese. (easy)',a:['easier']},
    {t:'mc',q:'This phone is ___ than that one.',o:['expensiver','more expensive','most expensive'],a:1},
    {t:'gap',q:'My cold is ___ today than yesterday. (bad)',a:['worse']}
  ]},
{ id:'a2-going-to-will', level:'A2', title:'Будущее: will и going to',
  rule:`<p><b>going to</b> — заранее решённые планы и очевидные прогнозы: I'm <b>going to</b> study medicine. Look at the clouds — it's <b>going to</b> rain.</p>
<p><b>will</b> — решение в момент речи, обещания, предположения: I'<b>ll</b> help you! I think she <b>will</b> win.</p>`,
  ex:['We are going to visit Rome in July.','The phone is ringing — I\'ll answer it.','It will be sunny tomorrow.'],
  tasks:[
    {t:'mc',q:'"I\'m cold." — "I ___ close the window."',o:["'ll","'m going to",'am'],a:0},
    {t:'mc',q:'I\'ve bought tickets. We ___ see a concert.',o:['will','are going to','go'],a:1},
    {t:'gap',q:'I promise I ___ tell anyone. (отрицание с will)',a:["won't",'will not']},
    {t:'mc',q:'Look! That glass ___ fall!',o:["will",'is going to','falls'],a:1},
    {t:'mc',q:'I think robots ___ do most jobs.',o:['will','are going','going to'],a:0}
  ]},
{ id:'a2-present-perfect', level:'A2', title:'Present Perfect — опыт и результат',
  rule:`<p><b>have/has + 3-я форма</b>: I <b>have seen</b>, she <b>has finished</b>.</p>
<p>Опыт без точного времени (ever, never), результат сейчас (already, just, yet), период до сейчас (for, since).</p><p>Если есть точное время в прошлом (yesterday, in 2019) — только Past Simple!</p>`,
  ex:['Have you ever been to Japan?','I have just finished my work.','She has lived here since 2018.'],
  tasks:[
    {t:'mc',q:'I ___ never ___ sushi.',o:['have / eaten','did / eat','has / eat'],a:0},
    {t:'mc',q:'She ___ to London in 2019.',o:['has gone','went','has been'],a:1},
    {t:'gap',q:'We have known each other ___ ten years. (for/since)',a:['for']},
    {t:'gap',q:'He ___ already done his homework. (have/has)',a:['has']},
    {t:'mc',q:'Have you finished ___?',o:['already','yet','ago'],a:1},
    {t:'gap',q:'I have lived here ___ 2020. (for/since)',a:['since']}
  ]},
{ id:'a2-countable', level:'A2', title:'some / any, much / many',
  rule:`<p><b>some</b> — в утверждениях, <b>any</b> — в вопросах и отрицаниях.</p><p><b>many</b> — с исчисляемыми (many books), <b>much</b> — с неисчисляемыми (much water). В утверждениях часто <b>a lot of</b>.</p>`,
  ex:['There is some milk.','Do you have any questions?','How much money do you need?'],
  tasks:[
    {t:'mc',q:'How ___ people came?',o:['much','many','any'],a:1},
    {t:'mc',q:'I don\'t have ___ time.',o:['some','any','many'],a:1},
    {t:'mc',q:'There isn\'t ___ sugar left.',o:['many','much','some'],a:1},
    {t:'gap',q:'Would you like ___ tea? (some/any)',a:['some']},
    {t:'mc',q:'She has ___ friends.',o:['a lot of','much','any'],a:0}
  ]},

// ===================== B1 =====================
{ id:'b1-pp-vs-ps', level:'B1', title:'Present Perfect vs Past Simple',
  rule:`<p><b>Past Simple</b> — когда важно <i>когда</i> (yesterday, last year, in 2010, when I was a child).</p><p><b>Present Perfect</b> — важно <i>что</i>, связь с настоящим, период ещё не закончился (today, this week, ever, so far).</p>`,
  ex:['I lost my keys yesterday.','I\'ve lost my keys — I can\'t get in!','I\'ve drunk three coffees today.'],
  tasks:[
    {t:'mc',q:'I ___ him last Friday.',o:['have met','met','meet'],a:1},
    {t:'mc',q:'___ you ever ___ a horse?',o:['Did / ride','Have / ridden','Have / rode'],a:1},
    {t:'mc',q:'Shakespeare ___ many plays.',o:['has written','wrote','writes'],a:1},
    {t:'gap',q:'How long ___ you known her? (have/did)',a:['have']},
    {t:'mc',q:'This week I ___ three books so far.',o:['read','have read','was reading'],a:1}
  ]},
{ id:'b1-past-continuous', level:'B1', title:'Past Continuous — фон в прошлом',
  rule:`<p><b>was/were + -ing</b> — процесс в момент в прошлом. Часто с Past Simple: длинное действие прервано коротким.</p><p>I <b>was cooking</b> when the phone <b>rang</b>. While she <b>was sleeping</b>, …</p>`,
  ex:['At 8 pm I was watching TV.','They were walking when it started to rain.'],
  tasks:[
    {t:'mc',q:'I ___ a shower when you called.',o:['had','was having','have had'],a:1},
    {t:'gap',q:'What ___ you doing at midnight? (was/were)',a:['were']},
    {t:'mc',q:'While we were driving, we ___ an accident.',o:['saw','were seeing','see'],a:0},
    {t:'gap',q:'She ___ reading when the lights went out. (was/were)',a:['was']},
    {t:'mc',q:'It ___ heavily all night.',o:['was raining','rained raining','is raining'],a:0}
  ]},
{ id:'b1-conditionals-1', level:'B1', title:'Условия 0 и 1 типа',
  rule:`<p><b>Zero</b> — всегда правда: If you heat ice, it <b>melts</b>. (Present + Present)</p><p><b>First</b> — реальное будущее: If it <b>rains</b>, I <b>will stay</b> home. После <b>if</b> — НЕ will!</p>`,
  ex:['If I see her, I\'ll tell her.','If you mix red and blue, you get purple.','Unless you hurry, you\'ll miss the bus.'],
  tasks:[
    {t:'mc',q:'If it ___ tomorrow, we\'ll cancel the trip.',o:['will rain','rains','rained'],a:1},
    {t:'gap',q:'If you study, you ___ pass. (will)',a:["will","'ll"]},
    {t:'mc',q:'If you heat water to 100°C, it ___.',o:['boils','will boil','boiled'],a:0},
    {t:'mc',q:'I won\'t go ___ you come with me.',o:['if','unless','when'],a:1},
    {t:'mc',q:'If she ___ late, call me.',o:['is','will be','was'],a:0}
  ]},
{ id:'b1-modals', level:'B1', title:'Модальные: must, have to, should, might',
  rule:`<p><b>must</b> — внутренняя необходимость/правило; <b>mustn't</b> — запрет.</p><p><b>have to</b> — внешняя обязанность; <b>don't have to</b> — нет необходимости (не запрет!).</p><p><b>should</b> — совет. <b>might/may</b> — возможность.</p>`,
  ex:['You mustn\'t smoke here.','I don\'t have to work on Sunday.','You should see a doctor.','It might snow.'],
  tasks:[
    {t:'mc',q:'You ___ park here — it\'s forbidden.',o:["don't have to","mustn't","shouldn't to"],a:1},
    {t:'mc',q:'It\'s Saturday — I ___ get up early.',o:["mustn't","don't have to","can't"],a:1},
    {t:'mc',q:'You look tired. You ___ go to bed.',o:['should','must to','might'],a:0},
    {t:'gap',q:'Take an umbrella. It ___ rain. (возможность, m...)',a:['might','may']},
    {t:'mc',q:'In my job I ___ wear a uniform.',o:['have to','has to','must to'],a:0}
  ]},
{ id:'b1-passive', level:'B1', title:'Пассивный залог',
  rule:`<p><b>be + 3-я форма</b>: важно действие, а не кто его делает.</p><p>Present: is made. Past: was built. Perfect: has been sold. Future: will be done. Исполнителя — через <b>by</b>.</p>`,
  ex:['English is spoken all over the world.','The house was built in 1900.','The tickets have been sold.'],
  tasks:[
    {t:'mc',q:'This car ___ in Germany.',o:['made','is made','is make'],a:1},
    {t:'gap',q:'The Mona Lisa was ___ by Leonardo. (paint)',a:['painted']},
    {t:'mc',q:'The letters ___ yesterday.',o:['were sent','was sent','sent'],a:0},
    {t:'mc',q:'The work ___ by Friday.',o:['will finish','will be finished','is finish'],a:1},
    {t:'gap',q:'My bike has been ___. (steal)',a:['stolen']}
  ]},
{ id:'b1-relative', level:'B1', title:'Придаточные: who, which, that, where',
  rule:`<p><b>who</b> — о людях, <b>which</b> — о вещах, <b>that</b> — о людях и вещах (в определяющих), <b>where</b> — о месте, <b>whose</b> — чей.</p>`,
  ex:['The man who called is my boss.','The book which/that I read was great.','This is the café where we met.'],
  tasks:[
    {t:'mc',q:'She is the woman ___ helped me.',o:['which','who','where'],a:1},
    {t:'mc',q:'That\'s the hotel ___ we stayed.',o:['which','where','who'],a:1},
    {t:'gap',q:'I lost the phone ___ you gave me. (which/who)',a:['which','that']},
    {t:'mc',q:'He\'s the boy ___ father is a pilot.',o:['who','whose','which'],a:1},
    {t:'mc',q:'A dictionary is a book ___ explains words.',o:['who','that','where'],a:1}
  ]},
{ id:'b1-gerund-inf', level:'B1', title:'Герундий или инфинитив',
  rule:`<p>После <b>enjoy, avoid, mind, finish, suggest</b> — <b>-ing</b>. После <b>want, decide, hope, plan, agree, refuse</b> — <b>to + глагол</b>.</p><p>После предлогов — всегда -ing: interested <b>in learning</b>.</p>`,
  ex:['I enjoy swimming.','She decided to leave.','Thanks for helping me.'],
  tasks:[
    {t:'mc',q:'I enjoy ___ books.',o:['to read','reading','read'],a:1},
    {t:'mc',q:'We decided ___ a car.',o:['buying','to buy','buy'],a:1},
    {t:'gap',q:'He avoided ___ the question. (answer)',a:['answering']},
    {t:'mc',q:'I\'m interested in ___ Japanese.',o:['learn','to learn','learning'],a:2},
    {t:'gap',q:'She refused ___ me. (help)',a:['to help']}
  ]},

// ===================== B2 =====================
{ id:'b2-conditionals-23', level:'B2', title:'Условия 2 и 3 типа, смешанные',
  rule:`<p><b>Second</b> — нереально сейчас: If I <b>had</b> money, I <b>would buy</b> a house. (If I were…)</p><p><b>Third</b> — нереально в прошлом: If I <b>had studied</b>, I <b>would have passed</b>.</p><p><b>Mixed</b>: If I had taken the job, I <b>would be</b> rich now.</p>`,
  ex:['If I were you, I would apologise.','If we had left earlier, we wouldn\'t have missed the train.'],
  tasks:[
    {t:'mc',q:'If I ___ rich, I\'d travel the world.',o:['am','were','would be'],a:1},
    {t:'mc',q:'If she had asked me, I ___ her.',o:['would help','would have helped','helped'],a:1},
    {t:'gap',q:'If I ___ known, I would have come. (had)',a:['had']},
    {t:'mc',q:'If I had studied medicine, I ___ a doctor now.',o:['would be','would have been','was'],a:0},
    {t:'gap',q:'What ___ you do if you won the lottery?',a:['would']}
  ]},
{ id:'b2-perfect-cont', level:'B2', title:'Perfect Continuous и Past Perfect',
  rule:`<p><b>Present Perfect Continuous</b> (have been + -ing) — процесс длится до сейчас: I<b>'ve been waiting</b> for an hour.</p><p><b>Past Perfect</b> (had + V3) — раньше другого действия в прошлом: When I arrived, the film <b>had started</b>.</p>`,
  ex:['She\'s been learning English for two years.','I realised I had left my wallet at home.'],
  tasks:[
    {t:'mc',q:'You look tired. ___ you been running?',o:['Have','Did','Had'],a:0},
    {t:'mc',q:'When we got there, the train ___.',o:['left','had left','has left'],a:1},
    {t:'gap',q:'I have been ___ here since morning. (work)',a:['working']},
    {t:'mc',q:'She ___ never seen snow before she moved to Canada.',o:['has','had','was'],a:1},
    {t:'mc',q:'How long ___ you been living here?',o:['are','have','did'],a:1}
  ]},
{ id:'b2-reported', level:'B2', title:'Косвенная речь',
  rule:`<p>Время сдвигается назад: am → was, will → would, have done → had done, did → had done.</p><p>Вопросы — прямой порядок слов: She asked where <b>I lived</b>. Да/нет вопросы — через <b>if/whether</b>.</p>`,
  ex:['"I\'m tired." → He said he was tired.','"Where do you work?" → She asked where I worked.'],
  tasks:[
    {t:'mc',q:'"I will call you." → She said she ___ call me.',o:['will','would','is'],a:1},
    {t:'mc',q:'He asked me where ___.',o:['did I live','I lived','do I live'],a:1},
    {t:'gap',q:'She asked ___ I liked coffee. (if)',a:['if','whether']},
    {t:'mc',q:'"I saw him." → She said she ___ him.',o:['had seen','has seen','sees'],a:0},
    {t:'mc',q:'He told me ___ late.',o:['not be','not to be','to not being'],a:1}
  ]},
{ id:'b2-wish', level:'B2', title:'I wish / If only',
  rule:`<p>Сожаление о настоящем: I wish I <b>had</b> more time (Past Simple).</p><p>О прошлом: I wish I <b>had studied</b> harder (Past Perfect).</p><p>Раздражение: I wish you <b>would</b> stop talking.</p>`,
  ex:['I wish I could speak French.','If only I hadn\'t said that!'],
  tasks:[
    {t:'mc',q:'I wish I ___ taller.',o:['am','were','will be'],a:1},
    {t:'mc',q:'I wish I ___ that cake. I feel sick.',o:["didn't eat","hadn't eaten","don't eat"],a:1},
    {t:'gap',q:'I wish you ___ stop shouting! (would)',a:['would']},
    {t:'mc',q:'If only I ___ his number!',o:['know','knew','will know'],a:1},
    {t:'gap',q:'I wish I ___ swim. (can → прошедшая форма)',a:['could']}
  ]},
{ id:'b2-modal-past', level:'B2', title:'Модальные о прошлом',
  rule:`<p><b>must have done</b> — наверняка было. <b>can't have done</b> — точно не было.</p><p><b>might/could have done</b> — возможно было. <b>should have done</b> — следовало (но не сделал).</p>`,
  ex:['He must have forgotten.','She can\'t have seen us.','You should have told me!'],
  tasks:[
    {t:'mc',q:'The streets are wet. It ___ rained.',o:['must have','should have','can\'t have'],a:0},
    {t:'mc',q:'She ___ been at work — I saw her at the beach.',o:['must have','can\'t have','should have'],a:1},
    {t:'gap',q:'You should have ___ me! (call)',a:['called']},
    {t:'mc',q:'I\'m not sure. He ___ missed the bus.',o:['might have','must','should'],a:0},
    {t:'gap',q:'They ___ have known — nobody told them. (отрицание, can)',a:["can't",'cannot','couldn\'t']}
  ]},
{ id:'b2-linking', level:'B2', title:'Связки: although, despite, whereas…',
  rule:`<p><b>although / even though</b> + предложение. <b>despite / in spite of</b> + существительное или -ing.</p><p><b>whereas / while</b> — противопоставление. <b>so that</b> — цель. <b>therefore</b> — следствие.</p>`,
  ex:['Although it rained, we went out.','Despite the rain, we went out.','He saved money so that he could travel.'],
  tasks:[
    {t:'mc',q:'___ being tired, she kept working.',o:['Although','Despite','However'],a:1},
    {t:'mc',q:'___ he is rich, he isn\'t happy.',o:['Despite','Although','In spite'],a:1},
    {t:'gap',q:'I like cats, ___ my sister likes dogs. (whereas)',a:['whereas','while']},
    {t:'mc',q:'Speak louder ___ everyone can hear.',o:['so that','because','despite'],a:0},
    {t:'mc',q:'It was expensive. ___, we bought it.',o:['Although','Nevertheless','Despite'],a:1}
  ]},

// ===================== C1 =====================
{ id:'c1-inversion', level:'C1', title:'Инверсия для эмфазы',
  rule:`<p>После отрицательных наречий в начале — порядок вопроса: <b>Never have I</b> seen…, <b>Not only did</b> he…, <b>Rarely do</b> we…, <b>No sooner had</b> I… than…, <b>Hardly had</b> … when…</p><p>Условия без if: <b>Had I known</b>…, <b>Were I</b> you…, <b>Should you</b> need help…</p>`,
  ex:['Never have I felt so happy.','Not only did she win, but she also broke the record.','Had I known, I would have helped.'],
  tasks:[
    {t:'mc',q:'Never ___ such a beautiful view.',o:['I have seen','have I seen','I saw'],a:1},
    {t:'mc',q:'No sooner ___ arrived than it started to rain.',o:['we had','had we','did we'],a:1},
    {t:'gap',q:'___ I known, I would have come. (вместо If I had)',a:['had']},
    {t:'mc',q:'Not only ___ late, but he also forgot the documents.',o:['he was','was he','did he'],a:1},
    {t:'gap',q:'___ you need any help, call me. (вместо If you)',a:['should']}
  ]},
{ id:'c1-cleft', level:'C1', title:'Расщеплённые предложения (cleft)',
  rule:`<p>Выделяем часть мысли: <b>It was John who</b> called. <b>What I need is</b> a holiday. <b>All I want is</b>… <b>The reason why</b>… <b>The thing that</b>…</p>`,
  ex:['It was in Paris that we first met.','What annoys me is his attitude.','All I did was ask a question.'],
  tasks:[
    {t:'mc',q:'___ I need is some peace and quiet.',o:['That','What','Which'],a:1},
    {t:'mc',q:'It was Maria ___ told me the news.',o:['who','what','which'],a:0},
    {t:'gap',q:'All I ___ was a simple answer. (want — прош.)',a:['wanted']},
    {t:'mc',q:'It ___ in 2015 that they got married.',o:['is','was','were'],a:1},
    {t:'mc',q:'What surprised me ___ his reaction.',o:['were','was','did'],a:1}
  ]},
{ id:'c1-participle', level:'C1', title:'Причастные обороты',
  rule:`<p>Сокращаем придаточные: <b>Having finished</b> the report, she left. <b>Feeling</b> tired, he went to bed. <b>Built</b> in 1900, the house is…</p><p>Подлежащее оборота = подлежащее главного предложения!</p>`,
  ex:['Walking home, I saw an accident.','Having lost the key, we couldn\'t get in.','Written in a hurry, the letter had mistakes.'],
  tasks:[
    {t:'mc',q:'___ the work, he went home.',o:['Finished','Having finished','Have finished'],a:1},
    {t:'mc',q:'___ in Italy, this cheese is famous.',o:['Making','Made','Having make'],a:1},
    {t:'gap',q:'___ the news, she burst into tears. (hear, -ing)',a:['hearing','having heard']},
    {t:'mc',q:'Not ___ what to say, I stayed silent.',o:['knew','knowing','known'],a:1},
    {t:'mc',q:'___ by his friends, he felt lonely.',o:['Abandoning','Abandoned','Abandon'],a:1}
  ]},
{ id:'c1-subjunctive', level:'C1', title:'Сослагательное: suggest that he go, it\'s time…',
  rule:`<p>После <b>suggest, recommend, insist, demand, it\'s essential that</b> — глагол в начальной форме: I insist that he <b>be</b> present.</p><p><b>It\'s (high) time</b> + Past: It's time we <b>left</b>. <b>I\'d rather</b> you <b>didn\'t</b> smoke.</p>`,
  ex:['They recommended that she apply early.','It\'s high time you got a job.','I\'d rather you stayed.'],
  tasks:[
    {t:'mc',q:'The doctor insisted that he ___ rest.',o:['takes','take','took'],a:1},
    {t:'mc',q:'It\'s high time we ___ home.',o:['go','went','will go'],a:1},
    {t:'gap',q:'I\'d rather you ___ tell anyone. (отрицание, прош.)',a:["didn't",'did not']},
    {t:'mc',q:'It is essential that every student ___ the form.',o:['completes','complete','completed'],a:1},
    {t:'mc',q:'She suggested that we ___ a taxi.',o:['take','took','taking'],a:0}
  ]},
{ id:'c1-hedging', level:'C1', title:'Смягчение и академичный стиль',
  rule:`<p>Чтобы звучать точно и вежливо: <b>It would appear that</b>…, <b>tend to</b>, <b>seem to</b>, <b>to some extent</b>, <b>arguably</b>, <b>is likely to</b>, <b>there is evidence to suggest</b>…</p>`,
  ex:['It would seem that the plan has failed.','Prices are likely to rise.','This is arguably the best solution.'],
  tasks:[
    {t:'mc',q:'Young people ___ to spend more time online.',o:['tend','are tend','tending'],a:0},
    {t:'mc',q:'There is evidence to ___ that sleep improves memory.',o:['suggesting','suggest','suggests'],a:1},
    {t:'gap',q:'It would ___ that the data is wrong. (appear)',a:['appear','seem']},
    {t:'mc',q:'Costs are ___ to increase next year.',o:['likely','like','probably'],a:0},
    {t:'mc',q:'___, this is the most important factor.',o:['Arguable','Arguably','Argue'],a:1}
  ]},
{ id:'c1-collocations', level:'C1', title:'Коллокации: make / do / take / pay',
  rule:`<p>Устойчивые сочетания носителей: <b>make</b> a decision / progress / an effort; <b>do</b> research / harm / a favour; <b>take</b> into account / place / advantage of; <b>pay</b> attention / a compliment.</p>`,
  ex:['She made a huge effort.','Smoking does a lot of harm.','Take his age into account.'],
  tasks:[
    {t:'mc',q:'You need to ___ a decision soon.',o:['do','make','take'],a:1},
    {t:'mc',q:'Could you ___ me a favour?',o:['make','do','give'],a:1},
    {t:'gap',q:'Please ___ attention to the details. (pay/give)',a:['pay']},
    {t:'mc',q:'The meeting will ___ place on Monday.',o:['make','take','have'],a:1},
    {t:'mc',q:'Scientists ___ research on climate.',o:['make','do','take'],a:1}
  ]}
];

// ---------- Дополнительные темы ----------
// Тип {t:'order', w:'слова через пробел', a:'правильное предложение'} — собрать предложение из слов
window.GRAMMAR.push(
{ id:'a1-possessive', level:'A1', title:'Притяжательные: my, your, his… и \'s',
  rule:`<p><b>my, your, his, her, its, our, their</b> + существительное: <b>my</b> car, <b>their</b> house.</p><p>Принадлежность человеку — <b>'s</b>: <b>Anna's</b> phone, my <b>parents'</b> house (во мн. ч. на -s — только апостроф).</p><p>Не путайте: <b>its</b> (его/её — о предмете) и <b>it's</b> = it is.</p>`,
  ex:['This is my brother\'s car.','Their flat is small.','The dog wagged its tail.'],
  tasks:[
    {t:'mc',q:'Is this ___ bag, Tom?',o:['you','your','yours'],a:1},
    {t:'mc',q:'Anna and Max love ___ new house.',o:['their','there','they\'re'],a:0},
    {t:'gap',q:'This is ___ phone. (Maria — с \'s)',a:["maria's"]},
    {t:'mc',q:'The cat is eating ___ food.',o:["it's",'its','his'],a:1},
    {t:'order',w:'is my name sister\'s Kate',a:"My sister's name is Kate"}
  ]},
{ id:'a1-prep-time', level:'A1', title:'Предлоги времени: in / on / at',
  rule:`<p><b>at</b> — точное время и праздники: at 5 o'clock, at night, at the weekend.</p><p><b>on</b> — дни и даты: on Monday, on 5 May, on my birthday.</p><p><b>in</b> — месяцы, годы, сезоны, части дня: in July, in 2025, in summer, in the morning.</p>`,
  ex:['The meeting is at 10.','I was born in 1998.','See you on Friday!'],
  tasks:[
    {t:'mc',q:'My birthday is ___ June.',o:['at','on','in'],a:2},
    {t:'mc',q:'The film starts ___ 8 pm.',o:['at','on','in'],a:0},
    {t:'mc',q:'We don\'t work ___ Sunday.',o:['at','on','in'],a:1},
    {t:'gap',q:'I drink coffee ___ the morning.',a:['in']},
    {t:'gap',q:'I sleep badly ___ night.',a:['at']},
    {t:'order',w:'Saturday on play we football',a:'We play football on Saturday'}
  ]},
{ id:'a1-questions', level:'A1', title:'Вопросительные слова',
  rule:`<p><b>What</b> — что, <b>Where</b> — где, <b>When</b> — когда, <b>Who</b> — кто, <b>Why</b> — почему, <b>How</b> — как, <b>How much/many</b> — сколько, <b>Which</b> — который.</p><p>Порядок: вопросительное слово + вспомогательный глагол + подлежащее: <b>Where do you</b> live?</p>`,
  ex:['What is your name?','Where do you work?','How many brothers do you have?'],
  tasks:[
    {t:'mc',q:'___ do you live? — In Berlin.',o:['What','Where','Who'],a:1},
    {t:'mc',q:'___ is that man? — My boss.',o:['Who','What','How'],a:0},
    {t:'mc',q:'___ are you sad? — Because I lost my job.',o:['When','Why','Which'],a:1},
    {t:'gap',q:'___ old are you? (вопрос.слово)',a:['how']},
    {t:'order',w:'do what you do',a:'What do you do'},
    {t:'order',w:'does start when the lesson',a:'When does the lesson start'}
  ]},
{ id:'a1-plurals', level:'A1', title:'Множественное число и this/these',
  rule:`<p>Обычно <b>+s</b>: cats. После s, sh, ch, x — <b>+es</b>: buses, boxes. Согласная + y → <b>ies</b>: city → cities.</p><p>Исключения: man → <b>men</b>, woman → <b>women</b>, child → <b>children</b>, person → <b>people</b>, foot → <b>feet</b>, tooth → <b>teeth</b>.</p><p><b>this/that</b> — единственное, <b>these/those</b> — множественное.</p>`,
  ex:['These shoes are new.','There are three children.','Those people are tourists.'],
  tasks:[
    {t:'gap',q:'one child, two ___',a:['children']},
    {t:'gap',q:'one city, two ___',a:['cities']},
    {t:'mc',q:'___ apples are sweet.',o:['This','These','That'],a:1},
    {t:'gap',q:'one man, three ___',a:['men']},
    {t:'mc',q:'I brush my ___ twice a day.',o:['tooths','teeth','teeths'],a:1}
  ]},
{ id:'a2-used-to', level:'A2', title:'used to — раньше (а теперь нет)',
  rule:`<p><b>used to + глагол</b> — привычка или состояние в прошлом, которых больше нет: I <b>used to</b> smoke.</p><p>Вопрос/отрицание: <b>Did</b> you <b>use to</b>…? I <b>didn't use to</b>…</p>`,
  ex:['I used to live in Moscow.','She didn\'t use to like coffee.','Did you use to play football?'],
  tasks:[
    {t:'mc',q:'I ___ have long hair, but now it\'s short.',o:['use to','used to','was used to'],a:1},
    {t:'mc',q:'Did you ___ live here?',o:['used to','use to','using to'],a:1},
    {t:'gap',q:'He ___ to be very shy. (used/use)',a:['used']},
    {t:'order',w:'used to we in a village live',a:'We used to live in a village'}
  ]},
{ id:'a2-pronouns', level:'A2', title:'Местоимения: me, him, mine, myself',
  rule:`<p>Объектные (после глагола/предлога): <b>me, you, him, her, it, us, them</b> — Call <b>me</b>.</p><p>Притяжательные без существительного: <b>mine, yours, his, hers, ours, theirs</b> — It's <b>mine</b>.</p><p>Возвратные: <b>myself, yourself, himself…</b> — I did it <b>myself</b>.</p>`,
  ex:['Give it to them.','This book is hers.','He hurt himself.'],
  tasks:[
    {t:'mc',q:'Can you help ___?',o:['I','me','my'],a:1},
    {t:'mc',q:'This isn\'t your coat. It\'s ___.',o:['my','mine','me'],a:1},
    {t:'gap',q:'She made the cake ___. (сама)',a:['herself']},
    {t:'mc',q:'I see Tom every day. I like ___.',o:['he','him','his'],a:1},
    {t:'gap',q:'Is this bag ___? (ваша — без сущ.)',a:['yours']}
  ]},
{ id:'a2-adverbs', level:'A2', title:'Наречия частоты и порядок слов',
  rule:`<p><b>always, usually, often, sometimes, rarely, never</b> стоят <b>перед</b> основным глаголом, но <b>после</b> to be: I <b>often</b> cook. She is <b>always</b> late.</p><p>Наречия образа действия: quick → quick<b>ly</b>, careful → careful<b>ly</b>; good → <b>well</b>, fast → <b>fast</b>, hard → <b>hard</b>.</p>`,
  ex:['I usually get up at 7.','He is never late.','She speaks English well.'],
  tasks:[
    {t:'order',w:'always I breakfast have',a:'I always have breakfast'},
    {t:'order',w:'late is he often',a:'He is often late'},
    {t:'mc',q:'She sings very ___.',o:['good','well','goodly'],a:1},
    {t:'gap',q:'Drive ___, please! (careful → наречие)',a:['carefully']},
    {t:'mc',q:'He works very ___.',o:['hardly','hard','hards'],a:1}
  ]},
{ id:'b1-future-forms', level:'B1', title:'Все способы сказать о будущем',
  rule:`<p><b>Present Continuous</b> — договорённости: I'm meeting Ann at 6.</p><p><b>going to</b> — намерения. <b>will</b> — решения на месте, прогнозы.</p><p><b>Present Simple</b> — расписания: The train leaves at 9.</p><p>После <b>when, before, after, as soon as</b> — настоящее время: I'll call you <b>when I arrive</b>.</p>`,
  ex:['The flight departs at 7:40.','I\'ll text you as soon as I get home.','We\'re having a party on Saturday.'],
  tasks:[
    {t:'mc',q:'The film ___ at 8:30 tonight (по расписанию).',o:['starts','will starting','is start'],a:0},
    {t:'mc',q:'I\'ll call you when I ___ home.',o:['will get','get','am get'],a:1},
    {t:'mc',q:'I ___ the dentist tomorrow at 10 — it\'s booked.',o:['see','am seeing','will see'],a:1},
    {t:'gap',q:'As soon as she ___, we\'ll start. (arrive)',a:['arrives']},
    {t:'order',w:'going I am to apply',a:'I am going to apply'}
  ]},
{ id:'b1-quantifiers', level:'B1', title:'few / little / a few / a little',
  rule:`<p><b>a few</b> (исчисл.) / <b>a little</b> (неисчисл.) — немного, достаточно: I have <b>a few</b> friends here.</p><p><b>few / little</b> без a — мало, недостаточно: <b>Few</b> people came. There's <b>little</b> hope.</p><p><b>too much / too many</b> — слишком много; <b>enough</b> — достаточно.</p>`,
  ex:['Add a little salt.','Very few students passed.','There are too many cars.'],
  tasks:[
    {t:'mc',q:'Can I ask you ___ questions?',o:['a few','a little','little'],a:0},
    {t:'mc',q:'Hurry! We have very ___ time.',o:['few','little','a few'],a:1},
    {t:'mc',q:'There are ___ people here — it\'s too crowded.',o:['too much','too many','enough'],a:1},
    {t:'gap',q:'Is there ___ milk for everyone? (достаточно)',a:['enough']},
    {t:'mc',q:'I speak ___ Spanish — enough to order food.',o:['a little','a few','few'],a:0}
  ]},
{ id:'b2-future-perf', level:'B2', title:'Future Continuous и Future Perfect',
  rule:`<p><b>will be + -ing</b> — процесс в момент в будущем: This time tomorrow I<b>'ll be flying</b> to Rome.</p><p><b>will have + V3</b> — будет завершено к моменту: By 2030 I<b>'ll have finished</b> university.</p>`,
  ex:['Don\'t call at 8 — I\'ll be having dinner.','By Friday we\'ll have sold all tickets.'],
  tasks:[
    {t:'mc',q:'At 9 pm tomorrow I ___ the match.',o:['will watch','will be watching','will have watched'],a:1},
    {t:'mc',q:'By the end of the year she ___ 20 books.',o:['will read','will be reading','will have read'],a:2},
    {t:'gap',q:'By June I will have ___ here for 5 years. (work)',a:['worked','been working']},
    {t:'order',w:'will be I working tomorrow',a:'I will be working tomorrow'}
  ]},
{ id:'b2-causative', level:'B2', title:'have something done',
  rule:`<p>Когда работу за вас делает кто-то другой: <b>have/get + объект + V3</b>.</p><p>I <b>had my hair cut</b> (меня подстригли). We're <b>getting the car repaired</b>.</p>`,
  ex:['I need to have my eyes tested.','She had her phone stolen.'],
  tasks:[
    {t:'mc',q:'I ___ my car washed every week.',o:['have','make','do'],a:0},
    {t:'mc',q:'She had her nails ___.',o:['do','did','done'],a:2},
    {t:'gap',q:'We\'re having our house ___. (paint)',a:['painted']},
    {t:'order',w:'had I hair cut my',a:'I had my hair cut'}
  ]},
{ id:'b2-phrasal', level:'B2', title:'Фразовые глаголы: основное',
  rule:`<p>Глагол + частица меняют смысл: <b>give up</b> — бросить, <b>look after</b> — заботиться, <b>find out</b> — узнать, <b>set up</b> — основать, <b>put up with</b> — терпеть, <b>get on with</b> — ладить.</p><p>С местоимением частица идёт после него: turn <b>it</b> off (не turn off it).</p>`,
  ex:['I gave up smoking.','Can you look after my cat?','Turn it off, please.'],
  tasks:[
    {t:'mc',q:'I want to ___ how it works.',o:['find out','find up','find off'],a:0},
    {t:'mc',q:'She ___ her own company in 2020.',o:['set up','set off','set out'],a:0},
    {t:'mc',q:'I can\'t ___ this noise any more!',o:['put up with','put off','put on'],a:0},
    {t:'gap',q:'Do you get ___ with your boss? (частица)',a:['on']},
    {t:'order',w:'it turn please off',a:'Turn it off please'}
  ]},
{ id:'c1-emphasis', level:'C1', title:'Эмфаза: do/does/did, so/such',
  rule:`<p>Усиление утверждения: I <b>do</b> like it! She <b>did</b> call you.</p><p><b>so</b> + прилагательное, <b>such (a)</b> + (прил.) + существительное: It was <b>so</b> cold. It was <b>such a</b> cold day.</p><p><b>so… that / such… that</b> — настолько… что.</p>`,
  ex:['I do understand your concerns.','It was such a good film that I watched it twice.'],
  tasks:[
    {t:'mc',q:'It was ___ boring lecture that I fell asleep.',o:['so','such a','such'],a:1},
    {t:'mc',q:'"You don\'t like me." — "I ___ like you!"',o:['do','am','does'],a:0},
    {t:'gap',q:'The coffee was ___ hot that I couldn\'t drink it. (so/such)',a:['so']},
    {t:'mc',q:'They have ___ friendly neighbours.',o:['so','such','such a'],a:1}
  ]},
{ id:'c1-ellipsis', level:'C1', title:'Замещение и эллипсис: so, not, one',
  rule:`<p>Чтобы не повторяться: I think <b>so</b> / I hope <b>not</b>. A red one and a blue <b>one</b>.</p><p>Краткие ответы и согласие: <b>So do I</b> / <b>Neither do I</b>. He can swim and <b>so can</b> she.</p>`,
  ex:['"Is it going to rain?" — "I hope not."','"I love jazz." — "So do I."','I\'m not tired, and neither is she.'],
  tasks:[
    {t:'mc',q:'"I don\'t eat meat." — "___"',o:['So do I.','Neither do I.','Neither I do.'],a:1},
    {t:'mc',q:'"Will he come?" — "I\'m afraid ___."',o:['not','no','don\'t'],a:0},
    {t:'gap',q:'"I\'ve been to Japan." — "So ___ I." (вспомог.)',a:['have']},
    {t:'mc',q:'I don\'t like this shirt. Show me another ___.',o:['it','one','ones'],a:1}
  ]}
);
