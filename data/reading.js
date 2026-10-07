// Тексты для чтения и аудирования по уровням (оригинальные).
// q: вопросы на понимание {q, o:[варианты], a:индекс}
window.READING = [
{ id:'r-a1-1', level:'A1', title:'My Day',
  text:`My name is Leo. I am twenty-five and I live in a small flat in Thessaloniki. I get up at seven o'clock every day. I have a shower and I drink a cup of coffee. I don't eat breakfast at home. I go to work by bus. I work in a shop near the sea. I like my job because the people are nice. I finish work at five. In the evening I cook dinner and I watch TV. On Saturday I play football with my friends. On Sunday I visit my parents.`,
  q:[
    {q:'Where does Leo live?',o:['In a big house','In a small flat','With his parents'],a:1},
    {q:'How does he go to work?',o:['By car','On foot','By bus'],a:2},
    {q:'Why does he like his job?',o:['The money is good','The people are nice','It is near his flat'],a:1},
    {q:'What does he do on Sunday?',o:['He plays football','He visits his parents','He works'],a:1}
  ]},
{ id:'r-a1-2', level:'A1', title:'At the Café',
  text:`Anna and Tom are at a café. It is a sunny day and they sit outside. Anna wants a cup of tea and a piece of chocolate cake. Tom is very hungry. He wants a cheese sandwich, a salad and an orange juice. The waiter is friendly. The food is good but the coffee is not hot. Tom asks for a new coffee. After lunch they walk in the park. Anna takes photos of the flowers.`,
  q:[
    {q:'Where do Anna and Tom sit?',o:['Inside','Outside','At home'],a:1},
    {q:'What does Anna want to drink?',o:['Coffee','Orange juice','Tea'],a:2},
    {q:'What is the problem?',o:['The coffee is cold','The waiter is rude','The cake is bad'],a:0},
    {q:'What do they do after lunch?',o:['They go home','They walk in the park','They go shopping'],a:1}
  ]},
{ id:'r-a2-1', level:'A2', title:'A Weekend in Rome',
  text:`Last month my sister and I went to Rome for a long weekend. We flew on Friday morning and arrived at our hotel at lunchtime. The hotel was small but very clean, and it was only ten minutes from the centre. On the first day we visited the Colosseum. There was a long queue, so we waited for almost an hour. In the evening we had dinner in a little restaurant. The pasta was delicious and not expensive. On Saturday it rained all day, so we went to museums. On Sunday the weather was beautiful again and we walked around the old streets until our flight home. We spent too much money, but it was the best trip of the year.`,
  q:[
    {q:'When did they arrive at the hotel?',o:['In the morning','At lunchtime','In the evening'],a:1},
    {q:'Why did they wait for an hour?',o:['The hotel was full','There was a long queue','Their flight was late'],a:1},
    {q:'What did they do on Saturday?',o:['They visited museums','They walked in the streets','They stayed in the hotel'],a:0},
    {q:'What was the only negative thing?',o:['The food','The hotel','They spent a lot of money'],a:2}
  ]},
{ id:'r-a2-2', level:'A2', title:'A New Job',
  text:`Maria has just started a new job as a receptionist in a big hotel. She has always wanted to work in tourism because she loves meeting people from different countries. Her first week was difficult. She had to learn the computer system and remember the names of all her colleagues. On Wednesday a guest was angry because his room was noisy, and Maria felt nervous. Her manager helped her and they found him a quieter room. Now Maria feels more confident. She is going to take an English course in the evenings because most guests speak English.`,
  q:[
    {q:'Why did Maria want to work in tourism?',o:['The salary is good','She loves meeting people','Her parents work there'],a:1},
    {q:'Why was the guest angry?',o:['His room was noisy','His room was dirty','He lost his key'],a:0},
    {q:'Who helped Maria?',o:['A guest','Her colleague','Her manager'],a:2},
    {q:'What is she going to do?',o:['Change her job','Take an English course','Move to another hotel'],a:1}
  ]},
{ id:'r-b1-1', level:'B1', title:'Why We Forget',
  text:`Have you ever learned something and then forgotten it a few days later? You are not alone. In the 1880s a German scientist, Hermann Ebbinghaus, discovered that we forget most new information very quickly — often more than half of it within a day. He called this "the forgetting curve". However, he also found a solution. Every time we review information, we forget it more slowly. That is why reviewing new words after one day, then after a few days, then after a week is much more effective than studying for hours the night before an exam. This method is called spaced repetition, and it is used by millions of language learners today. The secret is not to study more, but to study at the right moment.`,
  q:[
    {q:'What did Ebbinghaus discover?',o:['We remember everything for a week','We forget new information very quickly','Old people forget more'],a:1},
    {q:'What happens every time we review information?',o:['We forget it more slowly','We forget it faster','Nothing changes'],a:0},
    {q:'According to the text, what is less effective?',o:['Reviewing after a day','Reviewing after a week','Studying for hours before an exam'],a:2},
    {q:'What is "the secret" of the method?',o:['Studying more hours','Studying at the right moment','Studying only at night'],a:1}
  ]},
{ id:'r-b1-2', level:'B1', title:'Working From Home',
  text:`Since 2020, millions of people have started working from home, at least a few days a week. Many of them say they would never go back to the office full-time. They save time and money because they don't have to commute, and they can organise their day more flexibly. However, working from home also has disadvantages. Some people feel lonely and miss chatting with colleagues. Others find it hard to separate work from private life, so they end up working longer hours. Experts suggest creating a separate workspace, taking regular breaks and switching off the computer at a fixed time. Most companies now offer a hybrid model, which combines the advantages of both options.`,
  q:[
    {q:'Why do people save money working from home?',o:['They don\'t commute','They earn more','They eat less'],a:0},
    {q:'Which disadvantage is mentioned?',o:['Lower salary','Loneliness','Slow internet'],a:1},
    {q:'What do experts suggest?',o:['Working at night','Having a separate workspace','Going back to the office'],a:1},
    {q:'What is a "hybrid model"?',o:['Only office work','Only home work','A combination of both'],a:2}
  ]},
{ id:'r-b2-1', level:'B2', title:'The Myth of Multitasking',
  text:`Many of us take pride in our ability to multitask: replying to emails while on a call, or studying with the TV on. Yet research consistently suggests that the human brain is not designed to focus on two demanding tasks at once. What we call multitasking is, in fact, rapid switching between tasks, and each switch comes at a cost. Studies have shown that people who constantly switch between activities make more mistakes and take significantly longer to finish their work than those who complete one task before moving on to the next. Moreover, heavy multitaskers tend to be more easily distracted, even when they are trying to concentrate. The implication for learners is clear: twenty minutes of focused practice, with the phone in another room, is likely to be worth more than an hour of distracted study.`,
  q:[
    {q:'What is multitasking "in fact", according to the text?',o:['Doing two things perfectly','Switching quickly between tasks','A rare talent'],a:1},
    {q:'What happens to people who constantly switch tasks?',o:['They work faster','They make more mistakes','They remember more'],a:1},
    {q:'Heavy multitaskers tend to be…',o:['more easily distracted','more creative','better at languages'],a:0},
    {q:'What is the main advice for learners?',o:['Study for longer','Study with music','Practise with full focus'],a:2}
  ]},
{ id:'r-b2-2', level:'B2', title:'Fast Fashion',
  text:`Over the past two decades, the fashion industry has undergone a dramatic transformation. Clothes have become cheaper than ever, and some brands release new collections every few weeks. While this "fast fashion" allows consumers to follow trends at a low price, its environmental impact is considerable. The industry is responsible for a significant share of global carbon emissions and consumes enormous quantities of water. Furthermore, many garments are worn only a handful of times before being thrown away. Critics also point out that low prices are often achieved by paying factory workers extremely low wages. In response, a growing number of consumers are turning to second-hand shops, clothes-swapping events and brands that promote sustainable production. Whether these trends will be enough to change the industry remains to be seen.`,
  q:[
    {q:'What is one feature of fast fashion?',o:['Very high prices','Frequent new collections','Handmade clothes'],a:1},
    {q:'Which environmental problem is mentioned?',o:['Water consumption','Air travel','Plastic bottles'],a:0},
    {q:'What do critics say about low prices?',o:['They help workers','They are achieved through low wages','They are temporary'],a:1},
    {q:'What is the author\'s conclusion?',o:['The industry has already changed','It is uncertain whether things will change','Second-hand shops are failing'],a:1}
  ]},
{ id:'r-c1-1', level:'C1', title:'The Paradox of Choice',
  text:`Conventional wisdom holds that the more options we have, the happier we will be. Psychologist Barry Schwartz, however, has argued that an abundance of choice can be detrimental to our well-being. Faced with dozens of virtually identical products, consumers often experience a kind of paralysis: rather than feeling liberated, they postpone the decision altogether. Even when a choice is eventually made, satisfaction tends to be lower, since it is all too easy to imagine that one of the rejected alternatives would have been better. Schwartz distinguishes between "maximisers", who relentlessly pursue the best possible option, and "satisficers", who settle for one that is good enough. Somewhat counter-intuitively, it is the latter who report greater contentment. None of this implies that choice is inherently harmful; rather, it suggests that beyond a certain threshold, additional options yield diminishing — and possibly negative — returns.`,
  q:[
    {q:'What does conventional wisdom claim?',o:['Fewer options make us happier','More options make us happier','Choice is irrelevant to happiness'],a:1},
    {q:'Why is satisfaction often lower after choosing from many options?',o:['Products are of poor quality','We imagine a rejected option was better','Prices are higher'],a:1},
    {q:'Who reports greater contentment?',o:['Maximisers','Satisficers','Both equally'],a:1},
    {q:'What is the overall conclusion?',o:['Choice is always harmful','Too many options can bring diminishing returns','Consumers should avoid shopping'],a:1}
  ]},
{ id:'r-c1-2', level:'C1', title:'Language and Thought',
  text:`Does the language we speak shape the way we think? The idea, often associated with the linguist Benjamin Lee Whorf, was largely dismissed for decades as speculative. In recent years, however, a growing body of empirical research has revived the debate, albeit in a more nuanced form. Speakers of languages that describe space in absolute terms — north, south, east and west — rather than relative ones like left and right, appear to maintain a remarkably accurate sense of orientation. Similarly, languages that obligatorily mark certain distinctions, such as whether an event was witnessed directly, may subtly heighten speakers' attention to those aspects of experience. Few researchers today would claim that language rigidly determines thought; the prevailing view is rather that it nudges habitual patterns of attention and memory. For learners, this offers an intriguing incentive: acquiring a new language may, to some extent, mean acquiring a new way of perceiving the world.`,
  q:[
    {q:'How was Whorf\'s idea treated for decades?',o:['Widely accepted','Largely dismissed','Proved by experiments'],a:1},
    {q:'What do speakers of "absolute" spatial languages seem to have?',o:['Better memory for faces','An accurate sense of orientation','A larger vocabulary'],a:1},
    {q:'What is the prevailing view today?',o:['Language rigidly determines thought','Language has no effect on thought','Language nudges habits of attention'],a:2},
    {q:'What "incentive" is offered to learners?',o:['Better job prospects','A new way of perceiving the world','Faster thinking'],a:1}
  ]}
];
