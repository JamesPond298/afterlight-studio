/* Cosmetic suggestions use their own random source, never the simulation's seed. */
(function(root){
  'use strict';
  const subjects={
    Space:['Starbound','Orbit','Nebula','Moonbase','Comet','Void'],
    Mystery:['Hidden','Midnight','Secret','Vanishing','Silent','Unsolved'],
    Racing:['Redline','Turbo','Circuit','Drift','Speedway','Overdrive'],
    Fantasy:['Ember','Dragon','Rune','Moonstone','Crystal','Elderwood'],
    Animals:['Pawprint','Wildlife','Feather','Whisker','Woodland','Critter'],
    Pirates:['Blackwater','Corsair','Saltwind','Treasure','Tide','Cutlass'],
    City:['Metro','Skyline','Downtown','Crosswalk','District','Neon'],
    Sports:['Stadium','Overtime','Matchday','Rally','Goalpost','Underdog'],
    Robots:['Circuit','Chrome','Steel','Automaton','Mech','Servo'],
    Cooking:['Saffron','Skillet','Kitchen','Pepper','Bistro','Sugar'],
    History:['Empire','Bronze','Dynasty','Marble','Frontier','Chronicle'],
    Music:['Rhythm','Melody','Backbeat','Encore','Harmony','Tempo'],
    Wilderness:['Pinewood','Trail','Summit','River','Wildwood','Outpost'],
    Detective:['Cold Case','Alibi','Evidence','Inspector','Clue','Backstreet'],
    Dreams:['Daydream','Velvet','Reverie','Starlit','Lucid','Sleepwalker'],
    Industry:['Ironworks','Foundry','Freight','Steam','Assembly','Copper'],
    Zombies:['Undead','Outbreak','Last Light','Quarantine','Shamble','Rot'],
    Superheroes:['Caped','Justice','Masked','Titan','Vigilant','Hero City'],
    Ninja:['Shadow','Shuriken','Silent Blade','Kunai','Moonlit','Ronin'],
    'Wild West':['Dustbowl','Sundown','Outlaw','Six-Shooter','Frontier','Rattlesnake'],
    Spies:['Covert','Cipher','Double Agent','Dead Drop','Blackout','Operative'],
    Dinosaurs:['Jurassic','Raptor','Fossil','Primeval','Tar Pit','Thunder Lizard'],
    Ocean:['Deep Blue','Coral','Abyss','Tidal','Reef','Undertow'],
    Military:['Frontline','Battalion','Outpost','Vanguard','Iron Brigade','Recon'],
    Farming:['Harvest','Meadowbrook','Orchard','Barnyard','Sunny Acres','Tractor'],
    Fashion:['Runway','Couture','Boutique','Glamour','Stitch','Trendsetter'],
    School:['Campus','Homeroom','Hall Pass','Detention','Class Act','Graduation'],
    Cyberpunk:['Neon','Chrome City','Netrunner','Synthwave','Datajack','Megacorp'],
    Wasteland:['Fallout','Rust','Ashland','Scavenger','Dustwind','Ruin'],
    Mythology:['Olympus','Titan','Valhalla','Oracle','Labyrinth','Pantheon'],
    Aviation:['Skyward','Tailwind','Jetstream','Altitude','Runway','Barnstorm'],
    'Time Travel':['Paradox','Chrono','Timeline','Yesterday','Clockwork','Epoch']
  };
  const endings={Action:['Rush','Strike','Breakout','Overload','Clash','Uprising'],Adventure:['Voyage','Crossing','Odyssey','Journey','Secrets','Passage'],RPG:['Chronicles','Legacy','Oath','Saga','Keepers','Awakening'],Strategy:['Command','Dominion','Tactics','Frontiers','Council','Siege'],Simulation:['Workshop','Manager','Life','Company','Builder','Works'],Casual:['Garden','Shuffle','Days','Party','Pals','Playground']};
  const adjectives=['Amber','Silver','Cinder','Quiet','Bright','Wandering','Crimson','Golden','Paper','Distant','Electric','Velvet','Little','Copper','Northern','Open'];
  const studioNouns=['Lantern','Fox','Harbor','Kite','Orbit','Acorn','Finch','Meadow','Compass','Canyon','Willow','Badger','Beacon','Cloud'];
  const engineNouns=['Firefly','Kestrel','Prism','Aurora','Juniper','Quartz','Sparrow','Cobalt','Flux','Lumen','Mistral','Opal'];
  const first=['Alex','Morgan','Riley','Sam','Jordan','Casey','Robin','Taylor','Jamie','Avery','Quinn','Drew','Cameron','Reese','Rowan','Skyler'];
  const last=['Park','Rivera','Chen','Reed','Patel','Hayes','Brooks','Shah','Lane','Kim','Bennett','Stone','Singh','Ellis','Dawson','Wells'];
  const pick=(a,rng)=>a[Math.min(a.length-1,Math.max(0,Math.floor(rng()*a.length)))];
  function generate(kind,{topic='Space',genre='Adventure',exclude=[],rng=Math.random}={}){
    const limit={game:50,engine:40,studio:26,founder:22}[kind];if(!limit)throw Error('Unknown name type');
    const blocked=new Set(exclude.map(x=>String(x).trim().toLowerCase()));
    const make=()=>{
      if(kind==='game'){const subject=pick(subjects[topic]||adjectives,rng),end=pick(endings[genre]||endings.Adventure,rng);return pick([`${subject} ${end}`,`The ${subject} ${end}`,`${subject}: ${pick(adjectives,rng)} ${end}`],rng);}
      if(kind==='engine')return `${pick(adjectives,rng)} ${pick(engineNouns,rng)} Engine`;
      if(kind==='studio')return `${pick(adjectives,rng)} ${pick(studioNouns,rng)} ${pick(['Games','Studio','Works'],rng)}`;
      return `${pick(first,rng)} ${pick(last,rng)}`;
    };
    let name='';for(let i=0;i<40;i++){name=make().slice(0,limit).trim();if(!blocked.has(name.toLowerCase()))return name;}
    for(let n=2;;n++){const suffix=` ${n}`,candidate=name.slice(0,limit-suffix.length).trimEnd()+suffix;if(!blocked.has(candidate.toLowerCase()))return candidate;}
  }
  const api={generate};if(typeof module!=='undefined')module.exports=api;root.NameIdeas=api;
})(globalThis);
