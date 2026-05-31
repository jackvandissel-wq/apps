/* ════════════════════════════════════════════════════════════════
   WORKOUT TEMPLATES  —  data only, no app logic.
   Add a workout = append one object here. Never touch workout-library.html.

   Shared shape:
     id, category, name, source, type, summary, duration   (always)
     category : 'strength' | 'power' | 'hiit' | 'grip' | 'adf' | 'warmup' | 'recovery'
     type     : 'session'  | 'program'
     run      : optional override — 'timer' | 'holds' | 'checklist' | 'program'
     warmupRef: optional id of a warmup template to show before the work

   SESSION strength/warmup:
     items : [ {name, scheme, note, track:true/false, ex:"jvd_lifts name"} ]
   HIIT:
     timer : {prep, work, rest, rounds, cooldown}   (seconds)
     items : [ {name, note} ]                        (what to do)
   RECOVERY:
     holds : [ {name, seconds, note} ]               (per side if noted)
   PROGRAM — percentage (e.g. 5/3/1):
     programType : '531'
     lifts  : ["Overhead Press", ...]   (must match jvd_tm keys)
     warmups: [ {pct, reps} ]
     weeks  : [ {label, sets:[{pct,reps,amrap}]} ]
     accessories : [ {name, scheme, note} ]
   PROGRAM — weekly split (e.g. Easy Strength):
     programType : 'weekly'
     days   : [ {label, focus, dur, items:[{name,scheme,note,track,ex}]} ]
     rules  : [ {title, body} ]
   ════════════════════════════════════════════════════════════════ */
const TEMPLATES = [

/* ───────────── DAN JOHN STRENGTH (sessions) ───────────── */
{
  id:'abc', category:'strength', type:'session', warmupRef:'goblet-flow',
  name:'Armor Building Complex', source:'Dan John / Geoff Neupert',
  summary:'Double-KB density complex — clean, press, squat.',
  duration:20,
  items:[
    {name:'Double KB Clean', scheme:'×2', note:'Two cleans start each rep. Snap the hips, rack soft.', track:true, ex:'KB Clean'},
    {name:'Double KB Press', scheme:'×1', note:'One strict press. This is the limiter — pick bells you can press for clean reps.', track:true, ex:'KB Press'},
    {name:'Double KB Front Squat', scheme:'×3', note:'Three squats. Elbows high, brace, drive.', track:true, ex:'KB Front Squat'},
  ],
  notes:'One round = 2 cleans + 1 press + 3 front squats, run EMOM. Build the density over time: start at 10 rounds and work up toward 30. Stop a round if bar speed or rack quality drops.'
},
{
  id:'humane-burpee', category:'strength', type:'session', warmupRef:'goblet-flow',
  name:'Humane Burpee', source:'Dan John',
  summary:'Descending swing + goblet squat + push-up ladder.',
  duration:18,
  items:[
    {name:'KB Swing', scheme:'15→1', note:'Start the round.', track:true, ex:'KB Swing'},
    {name:'Goblet Squat', scheme:'15→1', note:'Same bell.', track:true, ex:'Goblet Squat'},
    {name:'Push-up', scheme:'15→1', note:'Finish the round.', track:false},
  ],
  notes:'Round 1: 15 of each. Round 2: 14. Down to 1. Move steadily, minimal rest. Brutal conditioning with almost no joint cost.'
},
{
  id:'easy-strength-day', category:'strength', type:'session', warmupRef:'goblet-flow',
  name:'Easy Strength — Single Day', source:'Dan John',
  summary:'The five movements, 2×5, never to failure.',
  duration:30,
  items:[
    {name:'Hinge (deadlift / trap bar)', scheme:'2×5', note:'~80%. Stop at 5 with more in the tank.', track:true, ex:'Trap Bar Deadlift'},
    {name:'Push (press)', scheme:'2×5', note:'Brace, glutes, slight arc.', track:true, ex:'Overhead Press'},
    {name:'Pull (chin / row)', scheme:'2×5', note:'Full range, controlled.', track:true, ex:'Pull-up'},
    {name:'Squat (goblet / front)', scheme:'2×5', note:'Treat as a real lift.', track:true, ex:'Goblet Squat'},
    {name:'Loaded carry', scheme:'2–3 trips', note:'Farmer / suitcase / rack. Walk tall.', track:false},
  ],
  notes:'Same lifts, same submaximal loads, most days. Strength accumulates from consistency, not grind. For the full 8-week plan, run the Easy Strength program.'
},

/* ───────────── PROGRAMS (multi-week) ───────────── */
{
  id:'easy-strength', category:'strength', type:'program', run:'program',
  name:'Easy Strength — Adaptable', source:'Dan John / Pavel — Easy Strength Omnibus',
  summary:'The daily-driver strength program. Choose your lifts and a rep template from the Omnibus.',
  duration:30,
  programType:'easy-strength',
  warmupRef:'goblet-flow',
  slots:[
    {key:'hinge', label:'Hinge', def:'Trap Bar Deadlift', options:['Trap Bar Deadlift','Deadlift','Sumo Deadlift','Romanian Deadlift','KB Swing']},
    {key:'push',  label:'Push',  def:'Overhead Press',    options:['Overhead Press','Push Press','Bench Press','Incline Bench Press','KB Press']},
    {key:'pull',  label:'Pull',  def:'Pull-up',           options:['Pull-up','Chin-up','Barbell Row','Pendlay Row','Dumbbell Row']},
    {key:'squat', label:'Squat', def:'Goblet Squat',      options:['Goblet Squat','Front Squat','Back Squat','Bulgarian Split Squat']},
    {key:'carry', label:'Carry', def:'Farmer Carry',      options:['Farmer Carry','Suitcase Carry','Rack Carry','Turkish Get-up']},
  ],
  presets:[
    {id:'40day',      name:'40-Day',           scheme:'2×5',       slots:['hinge','push','pull','squat','carry'], note:'The classic. Five lifts, 2×5 at ~80%, most days for 40 sessions. Never to failure.'},
    {id:'eveneasier', name:'Even Easier (10/5)',scheme:'10, then 5',slots:['hinge','push','pull','squat','carry'], note:'Two waves — a set of 10 then a set of 5. Lower intensity, good for a deload block or busy weeks.'},
    {id:'1234',       name:'1-2-3-4 Ladder',   scheme:'1,2,3,4 ×2', slots:['hinge','push','pull','squat'],         note:'Heavy low-rep ladders: 1,2,3,4 reps run through twice. Strength-skill bias, minimal fatigue.'},
    {id:'busbench',   name:'Bus Bench (3 lifts)',scheme:'2×5',      slots:['hinge','push','pull'],                 note:'Minimalist — hinge, push, pull only. For maintenance or alongside hard conditioning.'},
  ],
  rules:[
    {title:'Never miss a workout', body:'Show up most days. On a bad day, do the minimum — even one lift counts. Showing up is the stimulus.'},
    {title:'Never miss a lift', body:'No failed reps, ever. Leave 2–3 in the tank on every set.'},
    {title:'Two reps below max', body:'Pick a weight you could do for 7, then do 5. Submaximal work accumulates into strength.'},
    {title:'Progress slowly', body:'Add a small load only when the work feels easy for two sessions. Patience beats grind.'},
  ],
  notes:'Pick the exercise for each movement and a rep template — your choices save automatically. Based on the Easy Strength Omnibus. Run it most days and log your working sets to Lift Log so you can nudge the loads up over time.'
},
{
  id:'one-lift', category:'strength', type:'program',
  name:'One Lift a Day', source:'Dan John',
  summary:'One big lift per day, ramped to a heavy work set. Rotate the lifts across the week.',
  duration:30,
  programType:'weekly',
  warmupRef:'famous-five',
  days:[
    {label:'Day 1 — Squat', focus:'Squat', dur:'~30 min', items:[
      {name:'Back Squat', scheme:'work to a heavy 5/3/2', note:'Ramp in small jumps to one or two strong, clean top sets. Leave a rep or two in the tank.', track:true, ex:'Back Squat'},
    ]},
    {label:'Day 2 — Press', focus:'Push', dur:'~30 min', items:[
      {name:'Overhead Press', scheme:'work to a heavy 5/3/2', note:'Same ramp. Brace hard, glutes on. Stop when bar speed drops.', track:true, ex:'Overhead Press'},
    ]},
    {label:'Day 3 — Deadlift', focus:'Hinge', dur:'~30 min', items:[
      {name:'Deadlift', scheme:'work to a heavy 5/3/2', note:'Crisp pulls — one or two heavy sets, never a grind. Trap bar works too.', track:true, ex:'Deadlift'},
    ]},
    {label:'Day 4 — Bench', focus:'Push', dur:'~30 min', items:[
      {name:'Bench Press', scheme:'work to a heavy 5/3/2', note:'Controlled, full range. Stop one or two reps short of failure.', track:true, ex:'Bench Press'},
    ]},
    {label:'Day 5 — Chin-up (optional)', focus:'Pull', dur:'~25 min', items:[
      {name:'Chin-up', scheme:'work to a heavy set of 5', note:'Add belt weight when bodyweight is easy. Balances the pressing volume.', track:true, ex:'Chin-up'},
    ]},
  ],
  rules:[
    {title:'One lift, full focus', body:'Warm up thoroughly, then one main lift. Ramp to a heavy clean top set — no junk volume, no second exercise.'},
    {title:'Leave reps in reserve', body:'Never miss a rep. Stop the top set when bar speed slows. Quality, not failure.'},
    {title:'Rotate over the week', body:'Hit each lift once across your training days, with small load jumps session to session.'},
  ],
  notes:'Dan John\'s simplest template — ideal for busy weeks. One lift, done well, each day. Rotate squat / press / deadlift / bench / chin. Log the top set so you can nudge it up.'
},
{
  id:'10k-swing', category:'strength', type:'program', run:'challenge',
  name:'10,000 Swing Challenge', source:'Dan John',
  summary:'20 workouts, 500 swings each — 10,000 swings in ~4 weeks. Tracks your progress.',
  duration:35,
  programType:'challenge',
  warmupRef:'goblet-flow',
  target:20,
  swingsPerSession:500,
  session:{
    items:[
      {name:'KB Swing', scheme:'10·15·25·50', note:'One cluster = 100 swings (sets of 10, 15, 25, 50). Five clusters = 500. Full hip snap, plank at the top.', track:true, ex:'KB Swing'},
      {name:'Strength filler', scheme:'1–5 reps between clusters', note:'Slot a low-rep press, dip or goblet squat between swing sets — never to failure. Keeps the session productive.', track:true, ex:'Overhead Press'},
    ],
  },
  rules:[
    {title:'500 a session', body:'Five clusters of 10-15-25-50 = 500 swings. Do this 4–5 days a week for 20 sessions.'},
    {title:'Filler, not fatigue', body:'The press/dip/squat between swings stays light and crisp — 1 to 5 reps, never grinding.'},
    {title:'Bell choice', body:'24kg is the classic men\'s prescription, 16kg women\'s. Drop a size if hip snap or form fades.'},
  ],
  notes:'Tap "Log session done" each time you finish 500 swings — the bar tracks you toward 10,000. Spread the 20 sessions over ~4 weeks; rest when your hands or hips need it.'
},
{
  id:'armor-building', category:'strength', type:'program',
  name:'Armor Building Formula', source:'Geoff Neupert',
  summary:'4-week double-KB density wave on the Armor Building Complex. EMOM time climbs each week.',
  duration:30,
  programType:'progressive',
  warmupRef:'goblet-flow',
  weeks:[
    {label:'Week 1', goal:'EMOM 10 min', progress:'Establish clean rounds at a pair you can press well. Run the ABC on days 1 & 3, swings + press on day 2.', items:[
      {name:'Armor Building Complex — days 1 & 3', scheme:'EMOM 10 min', note:'1 round/min: 2 double cleans, 1 double press, 3 double front squats. Stop a round if the rack gets sloppy.', track:true, ex:'KB Clean'},
      {name:'Double KB Swing — day 2', scheme:'10×10 EMOM', note:'Explosive hip snap, 10 swings on the minute.', track:true, ex:'KB Swing'},
      {name:'Double KB Press — day 2', scheme:'5×5', note:'Strict, leave one in the tank.', track:true, ex:'KB Press'},
    ]},
    {label:'Week 2', goal:'EMOM 12 min', progress:'+2 min of complex density vs week 1. Same bells — earn the time before adding load.', items:[
      {name:'Armor Building Complex — days 1 & 3', scheme:'EMOM 12 min', note:'Two more rounds than last week. Quality first.', track:true, ex:'KB Clean'},
      {name:'Double KB Swing — day 2', scheme:'10×10 EMOM', note:'Same crisp swings.', track:true, ex:'KB Swing'},
      {name:'Double KB Press — day 2', scheme:'6×5', note:'One extra set vs week 1.', track:true, ex:'KB Press'},
    ]},
    {label:'Week 3', goal:'EMOM 15 min', progress:'+3 min. If any round degrades, hold here rather than push. Bells unchanged.', items:[
      {name:'Armor Building Complex — days 1 & 3', scheme:'EMOM 15 min', note:'15 clean rounds. This is real volume — fuel and sleep.', track:true, ex:'KB Clean'},
      {name:'Double KB Swing — day 2', scheme:'10×10 EMOM', note:'Hold form under fatigue.', track:true, ex:'KB Swing'},
      {name:'Double KB Press — day 2', scheme:'6×5', note:'Match week 2.', track:true, ex:'KB Press'},
    ]},
    {label:'Week 4', goal:'EMOM 20 min (peak)', progress:'Peak density. Next cycle: go up a bell size and restart at 10 min.', items:[
      {name:'Armor Building Complex — days 1 & 3', scheme:'EMOM 20 min', note:'20 rounds = 40 cleans, 20 presses, 60 squats. The whole point of the block.', track:true, ex:'KB Clean'},
      {name:'Double KB Swing — day 2', scheme:'10×10 EMOM', note:'Keep the engine going.', track:true, ex:'KB Swing'},
      {name:'Double KB Press — day 2', scheme:'5×5', note:'Back off a set — the complex volume is high this week.', track:true, ex:'KB Press'},
    ]},
  ],
  rules:[
    {title:'Density over load', body:'Add rounds/minutes at the same bells across the four weeks before reaching for heavier ones. Load goes up between cycles, not within.'},
    {title:'Quality reps only', body:'Stop a round when the rack gets sloppy or bar speed drops. The press is the limiter — pick bells you can press cleanly.'},
    {title:'Three days a week', body:'ABC on days 1 & 3, swings + press on day 2, on non-consecutive days.'},
  ],
  notes:'A 4-week density wave built on the Armor Building Complex (also a standalone session in the library). The complex EMOM time is the progressive-overload dial — it climbs 10 → 12 → 15 → 20 min, then you restart heavier. Tap a week to see its target.'
},
{
  id:'mass-made-simple', category:'strength', type:'program',
  name:'Mass Made Simple', source:'Dan John',
  summary:'6-week mass program — the barbell complex builds week to week, paired with 20-rep squats.',
  duration:35,
  programType:'progressive',
  warmupRef:'goblet-flow',
  weeks:[
    {label:'Week 1', goal:'2 complexes', progress:'Start light — the complex humbles everyone. Squat ≈ your 10-rep-max weight.', items:[
      {name:'Barbell Complex (row·clean·front squat·press·back squat·good morning)', scheme:'2 complexes ×8', note:'8 reps of each lift back-to-back, bar never set down. Two rounds, no rest within a round.', track:false},
      {name:'Back Squat', scheme:'1×20', note:'~10RM weight. Big breaths near the end, no racking until 20. Log the working weight.', track:true, ex:'Back Squat'},
    ]},
    {label:'Week 2', goal:'3 complexes', progress:'+1 complex vs week 1. Squat +2.5kg on last week.', items:[
      {name:'Barbell Complex', scheme:'3 complexes ×8', note:'Three clean rounds. Same bar weight as week 1 if it was right.', track:false},
      {name:'Back Squat', scheme:'1×20', note:'+2.5kg vs week 1. Still all 20 reps unbroken.', track:true, ex:'Back Squat'},
    ]},
    {label:'Week 3', goal:'3 complexes (heavier)', progress:'Hold 3 complexes, nudge the complex bar slightly. Squat +2.5kg again.', items:[
      {name:'Barbell Complex', scheme:'3 complexes ×8', note:'Add a little to the bar if week 2 felt clean.', track:false},
      {name:'Back Squat', scheme:'1×20', note:'+2.5kg vs week 2.', track:true, ex:'Back Squat'},
    ]},
    {label:'Week 4', goal:'4 complexes', progress:'+1 complex. Squat keeps climbing ~2.5kg — it should feel hard now.', items:[
      {name:'Barbell Complex', scheme:'4 complexes ×8', note:'Four rounds. Brace and breathe.', track:false},
      {name:'Back Squat', scheme:'1×20', note:'+2.5kg vs week 3.', track:true, ex:'Back Squat'},
    ]},
    {label:'Week 5', goal:'4–5 complexes', progress:'Peak volume building. Squat heavy but still 20 honest reps.', items:[
      {name:'Barbell Complex', scheme:'4–5 complexes ×8', note:'Push to 5 if 4 is solid.', track:false},
      {name:'Back Squat', scheme:'1×20', note:'+2.5kg vs week 4. This is the grind week.', track:true, ex:'Back Squat'},
    ]},
    {label:'Week 6', goal:'5 complexes + test', progress:'Top out at 5 complexes and a final hard 20-rep squat, then deload.', items:[
      {name:'Barbell Complex', scheme:'5 complexes ×8', note:'The peak — 5 unbroken rounds.', track:false},
      {name:'Back Squat', scheme:'1×20', note:'Final, heaviest 20. Then take an easy week.', track:true, ex:'Back Squat'},
    ]},
  ],
  rules:[
    {title:'Build the complex', body:'The number of complexes is the dial — 2 → 5 across the six weeks. Add a round only when the last is clean.'},
    {title:'Drive the squat', body:'The 20-rep back squat is the engine. Add ~2.5kg each week and log it so the overload is visible in Lift Log.'},
    {title:'Eat and rest', body:'This is a mass program — train ~3 days/week, eat enough to grow, sleep hard.'},
  ],
  notes:'~6 weeks. The barbell complex builds work capacity (2 → 5 rounds) and the 20-rep squat builds size (+~2.5kg/week). Tap a week to see exactly that week\'s complexes and squat target. Warm up thoroughly.'
},
{
  id:'531-classic', category:'strength', type:'program',
  name:'5/3/1 — Classic Cycle', source:'Jim Wendler',
  summary:'4-week wave off your training max. Pulls TM from Lift Log.',
  duration:45,
  programType:'531',
  warmupRef:'famous-five',
  lifts:['Overhead Press','Bench Press','Back Squat','Deadlift'],
  warmups:[{pct:40,reps:5},{pct:50,reps:5},{pct:60,reps:3}],
  weeks:[
    {label:'Week 1 — 5s', sets:[{pct:65,reps:5},{pct:75,reps:5},{pct:85,reps:'5+',amrap:true}]},
    {label:'Week 2 — 3s', sets:[{pct:70,reps:3},{pct:80,reps:3},{pct:90,reps:'3+',amrap:true}]},
    {label:'Week 3 — 5/3/1', sets:[{pct:75,reps:5},{pct:85,reps:3},{pct:95,reps:'1+',amrap:true}]},
    {label:'Week 4 — Deload', sets:[{pct:40,reps:5},{pct:50,reps:5},{pct:60,reps:5}]},
  ],
  accessories:[
    {name:'KB Clean & Jerk', scheme:'5×3 / side', note:'Olympic power after pressing days. Explosive, technical, no grind.'},
    {name:'KB Snatch', scheme:'5×5 / side', note:'High pull to lockout. Posterior-chain power and conditioning.'},
    {name:'Chin-ups', scheme:'5×5–10', note:'Every session. Balance the pressing volume.'},
    {name:'Ab wheel / hanging leg raise', scheme:'3×8–12', note:'Trunk under the heavy work.'},
  ],
  notes:'Set training maxes in Lift Log (90% of est 1RM) — this template reads them to fill every set. Push the final "+" set for reps, leaving 1–2 in reserve. Add 2.5kg (upper) / 5kg (lower) to your TM each cycle.'
},

/* ───────────── POWER / EXPLOSIVE (beginner-safe, no technical Oly) ───────────── */
{
  id:'jump-power', category:'power', type:'session', warmupRef:'famous-five',
  name:'Jump & Throw Power', source:'Explosive basics',
  summary:'Box jumps, broad jumps, med-ball slams — pure speed.',
  duration:20,
  items:[
    {name:'Box Jump', scheme:'5×3', note:'Step down every rep, reset. Quality of jump beats height. Full rest between sets.', track:false},
    {name:'Broad Jump', scheme:'5×3', note:'Stick the landing, soft knees. Walk back, no rush.', track:false},
    {name:'Med-Ball Slam', scheme:'4×5', note:'Overhead, whole body, drive the ball into the floor.', track:false},
    {name:'Med-Ball Rotational Throw', scheme:'3×5 / side', note:'Into a wall. Pivot the back foot, throw through the hips.', track:false},
  ],
  notes:'Power needs freshness — rest fully between sets, stop the moment reps slow down. Low reps, high intent. No grinding, no fatigue chasing.'
},
{
  id:'kb-ballistics', category:'power', type:'session', warmupRef:'goblet-flow',
  name:'KB Ballistic Power', source:'Kettlebell power',
  summary:'Swings, high pulls, push press — hip-driven explosion.',
  duration:22,
  items:[
    {name:'KB Swing (heavy, hard)', scheme:'6×5', note:'Two-hand or one-hand. Float the bell with the hips, snap to a plank at the top. Crisp, not grindy.', track:true, ex:'KB Swing'},
    {name:'KB High Pull', scheme:'4×5 / side', note:'Swing path, then pull the elbow high and back. Bell stays close. A safe lead-in to snatch mechanics.', track:true, ex:'KB High Pull'},
    {name:'KB Push Press', scheme:'4×5 / side', note:'Dip the knees, drive the floor, punch overhead. Leg-driven, not a strict press.', track:true, ex:'KB Push Press'},
    {name:'Dead-stop Swing', scheme:'4×3', note:'Bell starts on the floor each rep. Explode from a dead stop — maximal hip power.', track:false},
  ],
  notes:'All hip-snap and drive, no technical catch positions. Builds the same explosiveness as the Olympic lifts without the coaching demand. Stop sets while the bell still moves fast.'
},
{
  id:'push-press-ladder', category:'power', type:'session', warmupRef:'famous-five',
  name:'Push Press & Jump Ladder', source:'Explosive basics',
  summary:'Alternate overhead drive with vertical jumps.',
  duration:18,
  items:[
    {name:'Barbell / DB Push Press', scheme:'5×3', note:'Leg drive into the press. Heavier than a strict press — the legs start it.', track:true, ex:'Push Press'},
    {name:'Vertical Jump (reach)', scheme:'5×3', note:'After each press set. Reach for a target, land soft. Contrast pairing wakes up the fast-twitch.', track:false},
    {name:'Plyo Push-up (knee or full)', scheme:'3×4', note:'Push hard enough to leave the floor. Scale to knees if needed.', track:false},
  ],
  notes:'Contrast training: a heavy explosive press primes the nervous system for a faster jump. Full rest, low reps, maximum intent every rep.'
},

/* ───────────── GRIP STRENGTH ───────────── */
{
  id:'grip-builder', category:'grip', type:'session', warmupRef:'famous-five',
  name:'Grip Builder', source:'Grip strength',
  summary:'Carries, holds, hangs — crushing and supporting grip.',
  duration:18,
  items:[
    {name:'Farmer Carry', scheme:'4×30–40m', note:'Heaviest bells/DBs you can hold. Walk tall, grip hard. Drop when it slips, not before.', track:true, ex:'Farmer Carry'},
    {name:'Bar / Bell Dead Hang', scheme:'4× max time', note:'Hang from a bar, full grip. Builds supporting grip and shoulders. Log the seconds.', track:true, ex:'Dead Hang'},
    {name:'Heavy KB/Bar Hold', scheme:'3×20–30s', note:'Hold a heavy bell at the top of a deadlift or in the rack. Do not let it open your hand.', track:false},
    {name:'Plate Pinch', scheme:'3×20–30s / side', note:'Pinch two plates smooth-side-out. Pure thumb and finger strength.', track:false},
  ],
  notes:'Grip responds to time under tension. Train it 2–3× a week at the end of sessions. Chalk helps; straps defeat the purpose here.'
},
{
  id:'grip-finisher', category:'grip', type:'session', warmupRef:'famous-five',
  name:'Towel & Pinch Finisher', source:'Grip strength',
  summary:'Quick brutal grip burner to end a session.',
  duration:10,
  items:[
    {name:'Towel Pull-up / Hang', scheme:'3× max', note:'Loop a towel over the bar, grip the ends. Hang or pull. Savage on the hands and forearms.', track:false},
    {name:'Towel KB Row', scheme:'3×8 / side', note:'Wrap a towel through the handle and row. Thick-grip rowing.', track:false},
    {name:'Wrist Roller / Plate Pinch Carry', scheme:'2–3 rounds', note:'Roll a weighted wrist roller up and down, or pinch-carry plates for distance.', track:false},
  ],
  notes:'Three to four minutes of dedicated forearm work. Pair with the Grip Builder on alternating days or tack onto any pulling session.'
},

/* ───────────── ADF FITNESS (for Anna — Air Force prep) ───────────── */
{
  id:'adf-strength', category:'adf', type:'session', warmupRef:'famous-five',
  name:'ADF PFA Strength Builder', source:'ADF fitness prep',
  summary:'Push-ups, sit-ups, plank — the assessed movements.',
  duration:25,
  items:[
    {name:'Push-ups (practice the standard)', scheme:'5× sub-max', note:'Full range, chest near floor, body straight. Stop ~2 reps shy of failure each set. Build total reps over weeks.', track:false},
    {name:'Sit-ups (feet held)', scheme:'5×15–20', note:'The PFA uses feet-held sit-ups. Practise the exact movement and tempo.', track:false},
    {name:'Front Plank', scheme:'3× toward 1 min', note:'In-service standard is a 1-minute hold. Build to it. Straight line, brace, breathe.', track:false},
    {name:'Bodyweight Squat / Lunge', scheme:'3×12', note:'General leg strength and durability for the running side.', track:false},
  ],
  notes:'Targets the ADF Physical Fitness Assessment (push-ups, feet-held sit-ups, plank). IMPORTANT: standards change and differ by service/role/age — Anna should confirm the current numbers on the official defencejobs.gov.au fitness page before testing. Train the exact movements, build volume gradually, and rest a day between hard sessions.'
},
{
  id:'adf-beep', category:'adf', type:'session', run:'timer', warmupRef:'famous-five',
  name:'Beep Test Interval Builder', source:'ADF fitness prep',
  summary:'20m shuttle pacing intervals toward the beep-test standard.',
  duration:20,
  timer:{prep:15, work:60, rest:60, rounds:10, cooldown:0},
  items:[{name:'20m shuttle run', note:'On each 60s work block, run controlled 20m shuttles at goal pace (turn on the line). Easy walk/jog on the 60s rest. The general-entry beep-test target sits around level 5–6 — build the engine to hold pace without redlining early.'}],
  notes:'Interval substitute when you cannot run the full beep test. IMPORTANT: the exact required level varies by service, role, age and sex — confirm Anna\'s current target on defencejobs.gov.au. Progress by adding rounds or trimming rest before chasing more speed. Pair with the PFA Strength Builder 2–3× a week.'
},

/* ───────────── ASSAULT BIKE HIIT ───────────── */
{
  id:'tabata', category:'hiit', type:'session', warmupRef:'famous-five',
  name:'Tabata', source:'Assault bike',
  summary:'20s on / 10s off × 8. Four brutal minutes.',
  duration:4,
  timer:{prep:10, work:20, rest:10, rounds:8, cooldown:0},
  items:[{name:'All-out sprint', note:'Max effort on the 20s. Do not pace — the 10s rest is barely real. Spin easy for 2–3 min first to warm the legs.'}],
  notes:'Classic 4-minute protocol. Score = lowest calories in any round; chase that number up over time.'
},
{
  id:'30-30', category:'hiit', type:'session', warmupRef:'famous-five',
  name:'30 / 30 Intervals', source:'Assault bike',
  summary:'30s hard / 30s easy × 10.',
  duration:10,
  timer:{prep:10, work:30, rest:30, rounds:10, cooldown:0},
  items:[{name:'Hard / easy', note:'Strong pace on the 30s work — not all-out. Keep the easy 30s spinning, never stopped.'}],
  notes:'Repeatable threshold work. Hold a consistent calorie count across all 10 rounds.'
},
{
  id:'40-20', category:'hiit', type:'session', warmupRef:'famous-five',
  name:'40 / 20 Grinder', source:'Assault bike',
  summary:'40s work / 20s rest × 8.',
  duration:8,
  timer:{prep:10, work:40, rest:20, rounds:8, cooldown:0},
  items:[{name:'Sustained hard', note:'Uncomfortable but controlled. The short rest builds quickly.'}],
  notes:'Longer work bouts build the engine. Pick a pace you can hold to round 8.'
},
{
  id:'10-50', category:'hiit', type:'session', warmupRef:'famous-five',
  name:'10 / 50 Power Sprints', source:'Assault bike',
  summary:'10s all-out / 50s easy × 8.',
  duration:8,
  timer:{prep:10, work:10, rest:50, rounds:8, cooldown:0},
  items:[{name:'Maximal sprint', note:'Truly maximal 10s — peak watts. Full recovery on the 50s.'}],
  notes:'Alactic power. Quality over fatigue — if calories drop hard, stop early.'
},
{
  id:'emom-bike', category:'hiit', type:'session', warmupRef:'famous-five',
  name:'EMOM Calories', source:'Assault bike',
  summary:'Hit a calorie target each minute × 12.',
  duration:12,
  timer:{prep:10, work:30, rest:30, rounds:12, cooldown:0},
  items:[{name:'Sprint to target, rest the remainder', note:'Pick a calorie target (e.g. 10/12/15). Hit it fast, rest until the next minute. Timer splits each minute into work/rest as a guide.'}],
  notes:'Self-scaling: the fitter you are, the more rest you earn. Raise the target as it gets easy.'
},

/* ───────────── WARMUPS ───────────── */
{
  id:'os-reset', category:'warmup', type:'session',
  name:'Original Strength Reset', source:'Original Strength',
  summary:'Breathe, roll, rock, crawl — wake the body up.',
  duration:8,
  items:[
    {name:'Diaphragmatic breathing', scheme:'10 breaths', note:'Belly, on your back. Reset the nervous system.', track:false},
    {name:'Head nods (segmental)', scheme:'10 each way', note:'Gentle yes/no/tilt to switch on the neck.', track:false},
    {name:'Rolling (back↔front)', scheme:'4 each side', note:'Lead with head/eyes, no momentum.', track:false},
    {name:'Rocking', scheme:'15 reps', note:'On all fours, rock hips to heels. Spine long.', track:false},
    {name:'Crawling', scheme:'1–2 min', note:'Baby crawl then leopard. Cross-body coordination.', track:false},
  ],
  notes:'Pressing reset before lifting or as a standalone movement snack. Quality over speed.'
},
{
  id:'goblet-flow', category:'warmup', type:'session',
  name:'Goblet Squat Flow', source:'Dan John',
  summary:'The original "do this before everything" primer.',
  duration:6,
  items:[
    {name:'Goblet Squat', scheme:'5 reps', note:'Sit between knees, elbows inside, pry the hips open.', track:false},
    {name:'Goblet + curl-grip hip flush', scheme:'5 reps', note:'At the bottom, gently push knees out with elbows.', track:false},
    {name:'Halo', scheme:'5 each way', note:'Light bell around the head. Loosen shoulders.', track:false},
    {name:'Hip hinge / RDL pattern', scheme:'8 reps', note:'Groove the hinge before swings or deadlifts.', track:false},
  ],
  notes:'Dan John\'s universal warm-up. Light bell, smooth tempo, no fatigue.'
},
{
  id:'famous-five', category:'warmup', type:'session',
  name:'The Famous Five', source:'Dan John',
  summary:'Five movements to prep the whole body.',
  duration:7,
  items:[
    {name:'Hinge — leg swings', scheme:'10 / side', note:'Front-to-back, open the hips.', track:false},
    {name:'Squat — bodyweight', scheme:'10 reps', note:'Slow, full depth.', track:false},
    {name:'Push — scap push-ups', scheme:'10 reps', note:'Protract/retract, wake the shoulders.', track:false},
    {name:'Pull — band pull-apart', scheme:'15 reps', note:'Upper back on.', track:false},
    {name:'Carry / locomotion — march', scheme:'30s', note:'High knees, brace, breathe.', track:false},
  ],
  notes:'One round of each movement pattern before the main work.'
},

/* ───────────── RECOVERY / STRETCHING ───────────── */
{
  id:'lower-unwind', category:'recovery', type:'session',
  name:'Lower Body Unwind', source:'Recovery',
  summary:'Hips, quads, hamstrings, calves after leg work.',
  duration:11,
  holds:[
    {name:'Couch stretch', seconds:60, note:'Per side. Rear foot up a wall, tall torso, tuck the pelvis.'},
    {name:'Pigeon', seconds:60, note:'Per side. Front shin angled, fold forward slowly.'},
    {name:'90/90 hip switch hold', seconds:45, note:'Per side. Sit tall, keep both sit-bones down.'},
    {name:'Standing hamstring (foot elevated)', seconds:45, note:'Per side. Hinge from the hip, flat back.'},
    {name:'Wall calf stretch', seconds:45, note:'Per side. Heel down, knee straight then bent.'},
  ],
  notes:'Breathe into each hold, exhale to settle deeper. Per-side timer counts one side — repeat for the other.'
},
{
  id:'upper-open', category:'recovery', type:'session',
  name:'Upper Body Open', source:'Recovery',
  summary:'Chest, shoulders, t-spine, neck after pressing.',
  duration:9,
  holds:[
    {name:'Doorway pec stretch', seconds:45, note:'Per side. Forearm on frame, rotate away gently.'},
    {name:'Thoracic extension over edge', seconds:45, note:'Hands behind head, drape over a bench/foam roller.'},
    {name:'Lat stretch (hang or kneel)', seconds:45, note:'Per side. Reach long, sink the armpit.'},
    {name:'Cross-body shoulder', seconds:30, note:'Per side. Draw the arm across, relax the trap.'},
    {name:'Neck — upper trap', seconds:30, note:'Per side. Ear to shoulder, light hand assist.'},
  ],
  notes:'Keep every hold gentle — recovery, not a max stretch. Per-side holds repeat for the other side.'
},
{
  id:'full-reset', category:'recovery', type:'session',
  name:'Full Body Reset', source:'Recovery',
  summary:'Short whole-body down-regulation flow.',
  duration:8,
  holds:[
    {name:'Child\'s pose', seconds:60, note:'Knees wide, reach long, breathe into the back.'},
    {name:'Cobra / press-up', seconds:30, note:'Gentle spinal extension, hips down.'},
    {name:'Supine spinal twist', seconds:45, note:'Per side. Knees over, shoulders flat.'},
    {name:'Happy baby', seconds:45, note:'Hold the feet, rock gently, open the hips.'},
    {name:'Legs up the wall + breathing', seconds:90, note:'Down-shift. Long slow exhales.'},
  ],
  notes:'Good after any session or on a rest day. End on the breathing hold.'
},
{
  id:'tv-floor', category:'recovery', type:'session',
  name:'TV-Time Floor Flow', source:'Recovery — couch session',
  summary:'Long ground-based holds you can do in front of the TV.',
  duration:18,
  holds:[
    {name:'Deep squat sit', seconds:120, note:'Heels down, sink into a flat-foot squat. Rock side to side, pry knees out. The original resting posture.'},
    {name:'90/90 hip sit', seconds:90, note:'Per side. Both shins on the floor, sit tall. Lean forward over the front shin to deepen.'},
    {name:'Couch stretch', seconds:90, note:'Per side. Rear foot up the couch, kneel tall, squeeze the glute. Hip-flexor opener for all the riding and sitting.'},
    {name:'Seated straddle fold', seconds:90, note:'Legs wide, hinge from the hips, walk the hands forward. Adductors and hamstrings.'},
    {name:'Figure-4 glute (on back)', seconds:60, note:'Per side. Ankle over knee, draw the thigh in. Easy on the floor by the couch.'},
    {name:'Lying spinal twist', seconds:60, note:'Per side. Knees over, shoulders flat, gaze away. Decompress the lower back.'},
  ],
  notes:'Built for recovery evenings — get on the floor while you watch something and hold each position long. Great counter to a week of riding and sitting. Breathe slow, never force.'
},
{
  id:'tv-mobility', category:'recovery', type:'session',
  name:'TV-Time Mobility Reset', source:'Recovery — couch session',
  summary:'Gentle whole-body mobility, all from the floor.',
  duration:16,
  holds:[
    {name:'Diaphragm breathing', seconds:90, note:'On your back, knees bent. Long exhales, belly rises. Down-shift the nervous system.'},
    {name:'Cat–cow flow', seconds:60, note:'On all fours, move with the breath. Mobilise the whole spine.'},
    {name:'Thread the needle', seconds:60, note:'Per side. Reach the arm under and through. Opens the upper back and shoulders.'},
    {name:'World\'s greatest stretch (hold)', seconds:60, note:'Per side. Lunge, hand down, rotate the top arm to the ceiling. Hips and t-spine in one.'},
    {name:'Ankle rock at the wall', seconds:45, note:'Per side. Knee over toes to the wall, heel down. Loosens the ankles for squatting and riding.'},
    {name:'Legs up the wall', seconds:120, note:'Drain the legs after riding. Slow breathing, eyes closed.'},
  ],
  notes:'A no-equipment mobility session for rest nights. Tailored to undo a lot of riding and desk time. Keep everything easy and breath-led.'
},

];

if (typeof module !== 'undefined') module.exports = { TEMPLATES };
