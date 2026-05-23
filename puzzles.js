// puzzle data — kept in a separate file from the game logic.
// Level 1: 3-letter words, change 1 letter per step (easy)
// Level 2: 4-letter words, change 1 letter per step (medium)
// Level 3: 5-letter words, change 2 letters per step (hard)

let PUZZLES_LEVEL1 = `CAT
An animal that flies at night|BAT
A small piece or amount|BIT
Large or great in size|BIG
To make a hole in the ground|DIG
To briefly put something in liquid|DIP
The very end or point of something|TIP
The highest point of something|TOP

HIT
To rest in a chair or on the floor|SIT
A collection of matching objects|SET
A mesh used to catch fish or in sports|NET
A hard shell food found underground|NUT
To slice or sever with a blade|CUT
A baby bear or wolf|CUB
A small container for drinking|CUP

MAP
A flat woven surface for wiping feet|MAT
Angry or upset in behavior|MAD
Not good; harmful or naughty|BAD
An offer of money at an auction|BID
Large or great in size|BIG
A farm animal that oinks|PIG
A thin metal fastener with a sharp point|PIN

WET
A mesh used to catch fish or in sports|NET
A hard shell found underground|NUT
Not including; except for|BUT
A large vehicle that carries many passengers|BUS
A slang word for gluteus maximus (your rear end)|BUM
Sticky, stretchy substance you chew on|GUM
A weapon that shoots bullets|GUN

JAR
A fruit spread made by boiling fruit with sugar|JAM
Meat from a pig, often smoked or cured|HAM
A head covering worn in the sun|HAT
Having a high temperature; the opposite of cold|HOT
To jump on one foot|HOP
The highest point or peak of something|TOP
A unit of weight; also an Imperial measurement|TON

PIG
A thin metal fastener with a sharp point|PIN
A container used for storing or cooking things|TIN
A light brown or sandy color|TAN
The number after nine|TEN
A female chicken that lays eggs|HEN
The lower edge of a skirt or shirt|HEM
A male person; the opposite of her|HIM

SUN
A male child; a boy in a family|SON
A unit of weight; also an Imperial measurement|TON
A small object that children play with|TOY
A young male person|BOY
A body of water along a coastline|BAY
A flying mammal that hunts at night|BAT
A small furry animal that says meow|CAT

FED
A piece of furniture you sleep on|BED
To wager money on something|BET
A collection of matching objects|SET
To have rested on a chair or bench|SAT
A liquid produced by trees; also a gullible person|SAP
To speak or utter words|SAY
A body of water along a coastline|BAY

LOG
A common pet that barks and wags its tail|DOG
A small round mark or speck|DOT
Having a high temperature; not cold|HOT
The back section of an old-fashioned stove|HOB
A large unruly crowd|MOB
Abbreviation for a mathematical function|MOD
A long deep sound a cow makes|MOO

WIG
To achieve victory in a contest|WIN
A container used for storing things|TIN
A light brown or sandy color|TAN
An adult male person|MAN
A wide flat dish used for cooking|PAN
A soft cushion used for comfort or protection|PAD
Not good; naughty or harmful|BAD

CUT
A small furry animal that says meow|CAT
A lid or head covering|CAP
A diagram used for navigation|MAP
A flat woven surface for wiping feet|MAT
A flying mammal that hunts at night|BAT
Not good; naughty or harmful|BAD
A piece of furniture you sleep on|BED

HOP
High temperature; not cold|HOT
A small round spot or mark|DOT
A common pet that barks|DOG
Thick mist that makes it hard to see|FOG
A sweet fruit, often dried|FIG
A flat body part that helps fish swim|FIN
Something enjoyable or entertaining|FUN

PEN
A flat cooking tool used on a stove|PAN
A gentle tap with your hand|PAT
An animal's foot with soft pads|PAW
A tool used to cut wood|SAW
Past tense of sit|SAT
To rest in a chair or on the floor|SIT
To drink slowly in small amounts|SIP

CAP
Diagram used for navigation|MAP
To become angry or lose temper|MAD
The opposite of good|BAD
A small winged mammal active at night|BAT
A small rodent that gnaws|RAT
A torn or tattered piece of cloth|RAG
A type of music|RAP

LOG
A body part you walk on|LEG
A short pin or hook for hanging things|PEG
A writing instrument with ink|PEN
A female chicken|HEN
The bottom edge of a garment|HEM
A precious or semi-precious stone|GEM
To obtain or receive something|GET

BUD
Soft, wet earth or dirt|MUD
Feeling upset or irrational|MAD
A flat woven surface for wiping feet|MAT
The jaw or throat of an animal|MAW
An animal's foot with soft pads|PAW
A close friend or companion|PAL
A flat cushion used for comfort|PAD

FAN
Plump or carrying extra weight|FAT
A beanie or beret|HAT
To strike something with force|HIT
A male pronoun|HIM
Not bright; poorly lit|DIM
To briefly plunge into liquid|DIP
The pointed end of something|TIP

COP
A small bed, or a child's sleeping spot|COT
A type of fish|COD
A divine being worshipped in religion|GOD
Received or obtained something|GOT
A small round spot or mark|DOT
A common pet that barks|DOG
A thick mist that limits visibility|FOG

BEG
A resting place; furniture for sleeping|BED
The color of blood or fire|RED
A straight cylindrical stick|ROD
Decayed or spoiled food|ROT
A small round spot or mark|DOT
A common pet that barks|DOG
A thick mist that limits visibility|FOG

RUG
To move fast on foot|RUN
A rounded bread roll|BUN
Soft, wet earth or dirt|MUD
A large cup with a handle|MUG
A small crawling insect|BUG
A vehicle with wheels and an engine|BUS

WIN
Intelligence and clever humor|WIT
A tiny amount; a small piece|BIT
A wooden club used in baseball|BAT
A sack or pouch for carrying things|BAG
Tall and large in size|BIG
A farm animal that oinks|PIG
A thin metal fastener with a sharp point|PIN

SIP
To rest on a chair|SIT
A collection of matching objects|SET
To place a wager on something|BET
A tiny piece or small amount|BIT
An offer of money at an auction|BID
Not good; naughty or harmful|BAD
A sack or pouch for carrying things|BAG

JAM
To poke or hit suddenly|JAB
A taxi or horse-drawn carriage|CAB
A hat or lid for a container|CAP
A police officer|COP
To jump up and down on one foot|HOP
Having high temperature|HOT
A farm animal like a pig|HOG`;

let PUZZLES_LEVEL2 = `HAND
A musical group or performers|BAND
To tie or fasten together|BIND
Your brain; thoughts and intellect|MIND
A fresh herb, or where coins are made|MINT
A small clue or helpful tip|HINT
To search or chase prey|HUNT
Past tense of hang|HUNG

FIRE
To employ someone for a job|HIRE
A long-eared animal related to a rabbit|HARE
Having no cover; plain and uncovered|BARE
To drill a hole through something|BORE
A greater amount or quantity|MORE
A female horse|MARE
To look after someone who is sick|CARE

CHIP
To jump onto or into something; to exchange|CHOP
A plant grown on a farm for harvest|CROP
To fall or let something fall downward|DROP
A liquid falling in small drops|DRIP
A firm hold with the hand|GRIP
Small pieces of hard matter; grit or gravel|GRIT
A wide smile showing teeth|GRIN

LOST
An upper storage area in a building|LOFT
The opposite of right; what remains after removal|LEFT
The smallest amount possible; barely enough|LEST
The most excellent or superior|BEST
A hollow where birds lay eggs|NEST
Coming after; following in sequence|NEXT
A written or electronic message|TEXT

BONE
A cause of great distress or ruin|BANE
A long walkway between shops or seats|LANE
Unexciting or dull; not challenging|LAME
A sour citrus fruit used in drinks|LIME
A thin cord or rope|LINE
Belonging to me; also to dig underground|MINE
A fermented grape drink|WINE

DUSK
A flat round object used in sports or storage|DISK
A chance of something bad happening|RISK
To go up from a lower to a higher level|RISE
Having knowledge and good judgment|WISE
Having a large measurement from side to side|WIDE
To conceal from view|HIDE
An insect home made of wax|HIVE

CURL
To make someone healthy again|CURE
The center or most important part of something|CORE
To drill a hole through something|BORE
Having no cover; plain and uncovered|BARE
A large bundle of hay or goods tied together|BALE
A story or narrative, often fictional|TALE
A flat piece of ceramic used on floors or walls|TILE

WISH
An aquatic animal with scales and fins|FISH
A closed hand ready to punch|FIST
A thick fog over a surface; water vapor|MIST
A plant related to peppermint used in cooking|MINT
A small clue or suggestion to help you guess|HINT
The handle of a sword|HILT
Covered with gold; past tense of gild|GILT

GLOW
The movement of a liquid or gas in a steady stream|FLOW
A crack or blemish in something|FLAW
Level and even; also a British word for an apartment|FLAT
A thin strip of wood in blinds or fences|SLAT
To strike with an open hand|SLAP
To applaud by striking palms together|CLAP
A close-knit family group or tribe|CLAN

TEAM
A long wheeled vehicle for public transport|TRAM
A device or plan used to catch someone|TRAP
A journey by boat, plane, or car|TRIP
To cut the edges of something neatly|TRIM
Proper and formal in manner|PRIM
A milestone highschool dance|PROM
The starting point for a letter, but not the recipient|FROM

SAND
A thin stick or rod; to wave in a certain direction|WAND
To wish for or desire something|WANT
To speak loudly and angrily|RANT
The sound of a bell; to call on a phone|RANG
A circular band worn as jewellery|RING
An ice surface used for skating|RINK
A connection or part of a chain|LINK

LATE
A narrow road or path|LANE
A walking stick made from bamboo|CANE
Past tense of come|CAME
An activity played with rules|GAME
A hinged door in a fence|GATE
A very strong wind|GALE
A story or narrative|TALE

BEAR
A fizzy alcoholic drink|BEER
A graceful forest animal with antlers|DEER
An action or a legal document|DEED
To give food to someone or an animal|FEED
Plural of foot|FEET
To sense something by touch|FEEL
A spool of film or a fishing line|REEL

SAIL
The rear appendage of an animal|TAIL
Of great height; not short|TALL
A round object used in sports|BALL
A ringing instrument in a tower|BELL
A strap worn around the waist|BELT
To turn from solid to liquid with heat|MELT
Past tense of feel; a type of fabric|FELT

KING
A circular band worn as jewelry|RING
A frozen surface for skating|RINK
A basin used for washing dishes|SINK
A smooth, luxurious fabric|SILK
The ledge at the bottom of a window|SILL
To make something completely full|FILL
A folder for documents, or a tool for smoothing|FILE

DARK
To challenge someone bravely|DARE
Exposed, or uncovered|BARE
To drill a hole|BORE
The center or most important part|CORE
A thick string or cable|CORD
A unit of language; something you say|WORD
A section of a hospital|WARD

MILE
Not too strong; gentle in flavor|MILD
Living in nature; untamed or fierce|WILD
A trick or crafty strategy|WILE
A bitter digestive liquid in your stomach|BILE
A two-wheeled vehicle you pedal|BIKE
To cut or grip with your teeth|BITE
A location, or the address of a webpage|SITE

FLOW
A defect or imperfection|FLAW
Smooth and level; a British word for apartment|FLAT
A thin strip of wood in a blind or fence|SLAT
To hit someone with an open hand|SLAP
To applaud by hitting your palms together|CLAP
A close-knit family group or tribe|CLAN
A strategy, blueprint, or diagram|PLAN

WINE
A climbing plant that grapes grow on|VINE
To eat a formal meal at a restaurant|DINE
An evergreen tree with needles|PINE
A unit of liquid measurement (half a quart)|PINT
A subtle clue or indirect suggestion|HINT
The handle of a sword|HILT
Covered in gold; also past tense of gild|GILT

MOST
The tall pole on a sailing ship|MAST
Final; to endure or survive over time|LAST
To whip or tie something down tightly|LASH
A long, deep cut or wound|GASH
To hit hard; also a party or celebration|BASH
The bottom foundation of something|BASE
A container; also a legal matter|CASE

COLD
Daring and confident; not afraid|BOLD
Without hair; having a bare head|BALD
A round object used in sports|BALL
Of great height; not short|TALL
A story or narrative|TALE
A thin flat piece of stone or ceramic|TILE
A folder or a tool for smoothing rough edges|FILE

FUND
To discover or locate something|FIND
To fasten or hold things together|BIND
A group of musicians playing together|BAND
A large area of open ground or country|LAND
A narrow road or path|LANE
A walking stick made from bamboo|CANE
Past tense of come|CAME

ROSE
A length of twisted fibers for tying|ROPE
To feel sad or gloomy|MOPE
A particular style of operating|MODE
Constructed or created by hand|MADE
To gradually lose color or brightness|FADE
The front part of the head|FACE
A delicate decorative fabric with open patterns|LACE

LAMP
Slightly wet or moist|DAMP
A noble lady; also an old-fashioned word for woman|DAME
An activity played with rules|GAME
A hinged door in a fence or wall|GATE
Not on time; arriving after the expected moment|LATE
A delicate decorative fabric with open patterns|LACE
Boring or not exciting|LAME

MOON
A low, sorrowful sound of pain|MOAN
Money borrowed from a bank or person|LOAN
Thin and with little body fat|LEAN
A legume vegetable in a pod|BEAN
A small round object in jewelery|BEAD
To look at words on a page|READ
A path made of paved or gravel material|ROAD

GRIP
A liquid falling in drops|DRIP
To fall from a height|DROP
Something used to hold something else up|PROP
Feces|POOP
A shared space for swimming|POOL
Not warm; at a low temperature|COOL
A silly or stupid person|FOOL

MIST
A hand used to punch; a clenched hand|FIST
An aquatic animal with scales and fins|FISH
A plate used for serving food|DISH
To want or desire something very much|WISH
To clean with water and soap|WASH
Money in coins or notes|CASH
To throw something using a fishing rod|CAST

FIRE
To employ someone for a job|HIRE
Like a rabbit|HARE
Uncovered, or plain|BARE
To drill a hole|BORE
A greater quantity|MORE
Ancient tales and legends passed down|LORE
A baited hook used to attract fish|LURE

BANK
A row or line of soldiers; to have a position|RANK
To speak loudly and angrily|RANT
Money paid regularly for housing or work|RENT
A small hollow in a surface; a notch|DENT
Skillful and quick with the hands|DEFT
Opposite of right; remaining after removal|LEFT
A floor, story, or level of a building|LOFT`;

let PUZZLES_LEVEL3 = `GRAPE
Courageous and daring; willing to face danger|BRAVE
A hot, bright flame of fire|BLAZE
A bright, harsh light that hurts your eyes|GLARE
Elegance and beauty in movement|GRACE
A cereal crop; also a tiny piece of sand|GRAIN
A path through the woods; also to follow behind|TRAIL
A pathway or course; to follow footprints|TRACK

FLAME
A large open area; also a spot of ground|PLACE
A flat cutting tool with a sharp edge|BLADE
A slope or level on a scale|GRADE
A large long-necked construction vehicle|CRANE
Salty water found in pickles; sea water|BRINE
To glow or radiate light|SHINE
A hard natural material; also a fruit seed|STONE

SWAMP
A person who hikes over rough terrain|TRAMP
To mark or press a pattern into something|STAMP
A muscle spasm or a tight curve|CRAMP
A theatrical performance; also a short play|DRAMA
The border or edge of a picture or window|FRAME
Elegance and charm in movement or manner|GRACE
A cost paid for goods or services|PRICE

CROWN
To make a low rumbling sound of pain|GROAN
A dense, water-resistant mixture of cement to fill gaps|GROUT
To call out loudly; to yell or cry|SHOUT
Approximately; on the subject of something|ABOUT
Positioned at a height; raised up in the air|ALOFT
A gap or split, especially in rock|CLEFT
The act of stealing; larceny|THEFT

BLAST
The sound a sheep makes|BLEAT
To deceive or trick someone|CHEAT
To cut or clip off a piece; also a blade|SHEAR
Easy to see or understand; transparent|CLEAR
To thicken liquid by heating it|CREAM
Water heated to vapor; also to cook with vapor|STEAM
To make a solemn promise or vow|SWEAR

PROUD
Something dishonest or deceptive|FRAUD
A plait or interweaving of strands|BRAID
A legendary cup or object sought by knights|GRAIL
A slow-moving creature that leaves a silvery trail|SNAIL
A loop used to catch an animal|SNARE
The blazing light or heat of fire|FLARE
A spot or location; to position something|PLACE

CRISP
A hard outer layer; also the top of bread|CRUST
A framework of beams or supports|TRUSS
A type of metal alloy made from copper and zinc|BRASS
To wish happiness for another person|BLESS
The soft tissue covering the body|FLESH
A long sweeping cut across a surface|SLASH
To bite or grind with the teeth noisily|GNASH

BLAZE
To scrape along the surface; to scratch|GRAZE
Seizes or takes hold of quickly|GRABS
Devices or snares for catching animals|TRAPS
To cut or shape very neatly and precisely|TRIMS
Instruments that beat out a rhythm|DRUMS
Larval insects that live underground|GRUBS
Organizations or groups with a shared goal|CLUBS

TROVE
To search through something with the hands|GROPE
To investigate or examine closely|PROBE
A modest or restrained person; prim|PRUDE
A woman about to get married|BRIDE
To complain repeatedly about something|GRIPE
To move smoothly and effortlessly|GLIDE
A bright dazzling light that hurts the eyes|GLARE

FROST
To look at someone with a serious or stern face|FROWN
To pull or sketch lines across a surface|DRAWN
The organ inside the skull used for thinking|BRAIN
A legendary cup or object sought by knights|GRAIL
A creature that moves slowly and leaves slime|SNAIL
A loop used to catch an animal or person|SNARE
Bright light that dazzles and hurts the eyes|GLARE

PRISM
To make a mark or impression on a surface|PRINT
Smiles that show the teeth from ear to ear|GRINS
To seize or grab at quickly|GRABS
Devices used for catching animals or people|TRAPS
A mark or footprint left by a person|TRACE
A location or spot; to set or position something|PLACE
A flat cutting tool with a sharp edge|BLADE

STORM
Having made a serious promise or oath|SWORN
The number of points in a game or test|SCORE
A hard, solid rock material; also a fruit seed|STONE
The backbone area of your body|SPINE
An empty area; where astronauts are|SPACE
A dark area blocked from sunlight|SHADE
A loop of rope used to catch animals|SNARE

CLOUD
A long, loose outer garment or disguise|CLOAK
Easy to understand; obvious and bright|CLEAR
Low in price; not expensive|CHEAP
A large box used to store valuables|CHEST
A map or graph that shows information|CHART
A piece of furniture to sit on|CHAIR
A soft, white writing stick for blackboards|CHALK

CRANK
One thousand dollars or pounds; also magnificent|GRAND
To seize or grab quickly; clutches|GRABS
A firm hold with both hands|GRASP
A clip or buckle to hold things closed|CLASP
Applauds by striking palms together|CLAPS
Things that fall heavily|FLOPS
To suddenly release an object|DROPS

PLUME
A dried fruit made from a plum|PRUNE
A long-necked construction machine|CRANE
A path marked on the ground to follow|TRACE
A setting or location for an event|PLACE
A flat cutting tool with a sharp edge|BLADE
A slope or incline on a road or hill|GRADE
To complain about something repeatedly|GRIPE

CHESS
To give praise or good wishes to someone|BLESS
The soft tissue covering the body|FLESH
A long, sweeping cut across a surface|SLASH
To bite or chew noisily with the teeth|GNASH
A strip of leather used to hold a dog|LEASH
To gain knowledge through study|LEARN
Jumped or sprang into the air|LEAPT`;