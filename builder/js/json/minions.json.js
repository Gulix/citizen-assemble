define([], function() {

function loadMinions() {

  var jsonMinions = [
    {
      "id": 1,
      "name": "Advanced Sentry Bots",
      "level": 2,
      "role_key": "shooter",
      "miniatures": 2,
      "additional_miniatures": 0,
      "factions": [  "heavymetal" ],
      "is_hero": 1,
      "is_villain": 1,
      "is_freelance": 0,
      "is_exclusive": false,
      "exclusive_supremes": [   ],
      "is_unique": false,
      "minions_types": [  "mechanical" ]
    },{
      "id": 2,
      "name": "Sentry Bots",
      "level": 1,
      "role_key": "shooter",
      "miniatures": 2,
      "additional_miniatures": 0,
      "factions": [  ],
      "is_hero": 1,
      "is_villain": 1,
      "is_freelance": 0,
      "is_exclusive": false,
      "exclusive_supremes": [   ],
      "is_unique": false,
      "minions_types": [  "mechanical" ]
    },{
      "id": 3,
      "name": "Robo-Chimp",
      "level": 2,
      "role_key": "shooter",
      "miniatures": 1,
      "additional_miniatures": 0,
      "factions": [  "arc" ],
      "is_hero": 1,
      "is_villain": 1,
      "is_freelance": 0,
      "is_exclusive": false,
      "exclusive_supremes": [   ],
      "is_unique": false,
      "minions_types": [  "mechanical" ]
    },{
      "id": 4,
      "name": "Ankle Biters",
      "level": 1,
      "role_key": "brawler",
      "miniatures": 2,
      "additional_miniatures": 0,
      "factions": [  ],
      "is_hero": 1,
      "is_villain": 1,
      "is_freelance": 0,
      "is_exclusive": false,
      "exclusive_supremes": [   ],
      "is_unique": false,
      "minions_types": [  "living" ]
    },{
      "id": 5,
      "name": "Hovercats",
      "level": 2,
      "role_key": "shooter",
      "miniatures": 2,
      "additional_miniatures": 0,
      "factions": [  ],
      "is_hero": 1,
      "is_villain": 1,
      "is_freelance": 0,
      "is_exclusive": false,
      "exclusive_supremes": [   ],
      "is_unique": false,
      "minions_types": [  "living" ]
    },{
      "id": 6,
      "name": "Ninja Sensei",
      "level": 2,
      "role_key": "infiltrator",
      "miniatures": 1,
      "additional_miniatures": 0,
      "factions": [  ],
      "is_hero": 1,
      "is_villain": 1,
      "is_freelance": 0,
      "is_exclusive": false,
      "exclusive_supremes": [   ],
      "is_unique": false,
      "minions_types": [  "living" ]
    },{
      "id": 7,
      "name": "Ninjas",
      "level": 2,
      "role_key": "brawler",
      "miniatures": 2,
      "additional_miniatures": 0,
      "factions": [  ],
      "is_hero": 1,
      "is_villain": 1,
      "is_freelance": 0,
      "is_exclusive": false,
      "exclusive_supremes": [   ],
      "is_unique": false,
      "minions_types": [  "living" ]
    },{
      "id": 8,
      "name": "Vigilantes",
      "level": 2,
      "role_key": "brawler",
      "miniatures": 2,
      "additional_miniatures": 0,
      "factions": [  ],
      "is_hero": 1,
      "is_villain": 0,
      "is_freelance": 0,
      "is_exclusive": false,
      "exclusive_supremes": [   ],
      "is_unique": false,
      "minions_types": [  "living" ]
    },{
      "id": 9,
      "name": "Mutant Mobsters",
      "level": 2,
      "role_key": "shooter",
      "miniatures": 2,
      "additional_miniatures": 0,
      "factions": [  ],
      "is_hero": 0,
      "is_villain": 1,
      "is_freelance": 0,
      "is_exclusive": false,
      "exclusive_supremes": [   ],
      "is_unique": false,
      "minions_types": [  "living" ]
    },{
      "id": 10,
      "name": "Dead Guard",
      "level": 2,
      "role_key": "brawler",
      "miniatures": 1,
      "additional_miniatures": 0,
      "factions": [ "coven" ],
      "is_hero": 0,
      "is_villain": 1,
      "is_freelance": 0,
      "is_exclusive": false,
      "exclusive_supremes": [   ],
      "is_unique": false,
      "minions_types": [  "non-living" ]
    },{
      "id": 11,
      "name": "Ghede",
      "level": 2,
      "role_key": "brawler",
      "miniatures": 1,
      "additional_miniatures": 4,
      "factions": [ "coven" ],
      "is_hero": 0,
      "is_villain": 1,
      "is_freelance": 0,
      "is_exclusive": false,
      "exclusive_supremes": [   ],
      "is_unique": false,
      "minions_types": [  "non-living" ]
    },{
      "id": 12,
      "name": "Necro GI",
      "level": 2,
      "role_key": "brawler",
      "miniatures": 2,
      "additional_miniatures": 3,
      "factions": [ "necroplane" ],
      "is_hero": 0,
      "is_villain": 1,
      "is_freelance": 0,
      "is_exclusive": false,
      "exclusive_supremes": [   ],
      "is_unique": false,
      "minions_types": [  "non-living" ]
    }
  ];

  return jsonMinions;
}

return { load: function() { return loadMinions(); } };

});
