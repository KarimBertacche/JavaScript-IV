/* 

Prototype Refactor

1. Copy and paste your code or the solution from yesterday

2. Your goal is to refactor all of this code to use ES6 Classes. The console.log() statements should still return what is expected of them.

*/

/*
  === GameObject ===
  * createdAt
  * name
  * dimensions (These represent the character's size in the video game)
  * destroy() // prototype method that returns: `${this.name} was removed from the game.`
*/
function GameObject(createdAt, name, dimensions) {
    this.createdAt = createdAt;
    this.name = name;
    this.dimensions = dimensions;
  }
  
  GameObject.prototype.destroy = function() {
    return `${this.name} was removed from the game.`;
  }
  
  /*
    === CharacterStats ===
    * healthPoints
    * takeDamage() // prototype method -> returns the string '<object name> took damage.'
    * should inherit destroy() from GameObject's prototype
  */
  function CharacterStats({createdAt, name, dimensions, healthPoints}) {
    GameObject.call(this, {createdAt, name, dimensions});
    this.healthPoints = healthPoints;
  }
  CharacterStats.prototype = Object.create(GameObject.prototype);
  
  CharacterStats.prototype.takeDamage = function() {
    return `${this.name} took damage.`;
  }
  
  
  
  /*
    === Humanoid (Having an appearance or character resembling that of a human.) ===
    * team
    * weapons
    * language
    * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
    * should inherit destroy() from GameObject through CharacterStats
    * should inherit takeDamage() from CharacterStats
  */
  function Humanoid({createdAt, name, dimensions, healthPoints, team, weapons, language}) {
    CharacterStats.call(this, {createdAt, name, dimensions, healthPoints});
    this.team = team;
    this.weapons = weapons;
    this.language = language;
  }
  
  Humanoid.prototype = Object.create(CharacterStats.prototype); 
  
  Humanoid.prototype.greet = function() {
    return `${this.name} offers a greeting in ${this.language}.`;
  }
  
   
  /*
    * Inheritance chain: GameObject -> CharacterStats -> Humanoid
    * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
    * Instances of CharacterStats should have all of the same properties as GameObject.
  */
  
  // Test you work by un-commenting these 3 objects and the list of console logs below:
  
  
    const mage = new Humanoid({
      createdAt: new Date(),
      dimensions: {
        length: 2,
        width: 1,
        height: 1,
      },
      healthPoints: 5,
      name: 'Bruce',
      team: 'Mage Guild',
      weapons: [
        'Staff of Shamalama',
      ],
      language: 'Common Tongue',
    });
  
    const swordsman = new Humanoid({
      createdAt: new Date(),
      dimensions: {
        length: 2,
        width: 2,
        height: 2,
      },
      healthPoints: 15,
      name: 'Sir Mustachio',
      team: 'The Round Table',
      weapons: [
        'Giant Sword',
        'Shield',
      ],
      language: 'Common Tongue',
    });
  
    const archer = new Humanoid({
      createdAt: new Date(),
      dimensions: {
        length: 1,
        width: 2,
        height: 4,
      },
      healthPoints: 10,
      name: 'Lilith',
      team: 'Forest Kingdom',
      weapons: [
        'Bow',
        'Dagger',
      ],
      language: 'Elvish',
    });
  
    console.log(mage.createdAt); // Today's date
    console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
    console.log(swordsman.healthPoints); // 15
    console.log(mage.name); // Bruce
    console.log(swordsman.team); // The Round Table
    console.log(mage.weapons); // Staff of Shamalama
    console.log(archer.language); // Elvish
    console.log(archer.greet()); // Lilith offers a greeting in Elvish.
    console.log(mage.takeDamage()); // Bruce took damage.
    console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.
  
  
    // Stretch task: 
    // * Create Villain and Hero constructor functions that inherit from the Humanoid constructor function. 
    // * Give the Hero and Villains different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
    // * Create two new objects, one a villain and one a hero and fight it out with methods!
    function Villain({createdAt, name, dimensions, healthPoints, team, weapons, language}) {
      Humanoid.call(this, {createdAt, name, dimensions, healthPoints, team, weapons, language});
    } 
  
    Villain.prototype.evilAttack = function(victim, hitPoints) {
      victim.healthPoints = victim.healthPoints - hitPoints;
      return `Take that SuperHero, EvilAttach 💀💥‼️ Hero loses ${hitPoints} is health is now at ${victim.healthPoints}`;
    };
  
    Villain.prototype.ghostSlash = function(victim, hitPoints) {
      victim.healthPoints = victim.healthPoints - hitPoints;
      return `Take that SuperHero, GhostSlash💫👻‼️ Hero loses ${hitPoints} is health is now at ${victim.healthPoints}`
    }
  
    function Hero({createdAt, name, dimensions, healthPoints, team, weapons, language}) {
      Humanoid.call(this, {createdAt, name, dimensions, healthPoints, team, weapons, language});
    }
  
    Hero.prototype.justiceAttack = function(victim, hitPoints) {
      victim.healthPoints = victim.healthPoints - hitPoints;
      return `Take that Villain, justiceAttack 💪🏽👺🤜🏽🔥‼️ Villain loses ${hitPoints} is health is now at ${victim.healthPoints}`
    }
  
    Hero.prototype.laserGaze = function(victim, hitPoints) {
      victim.healthPoints = victim.healthPoints - hitPoints;
      return `Take that Villain, Laser Gaze ✨🤩✨‼️ Villain loses ${hitPoints} is health is now at ${victim.healthPoints}`
    }

    const hitPoints = () => {
        let hit = 0;
        hit = Math.round(Math.random() * 10);
        return hit;
    }
  
    const hero = new Hero({
      createdAt: new Date(),
      dimensions: {
        length: 2,
        width: 2,
        height: 3,
      },
      healthPoints: 30,
      name: 'Karma',
      team: 'Justice League',
      weapons: [
        'Laser Gaze',
        'Guntastic',
      ],
      language: 'Common Tongue',
    });
  
    const villain = new Villain({
      createdAt: new Date(),
      dimensions: {
        length: 2,
        width: 2,
        height: 4,
      },
      healthPoints: 35,
      name: 'Captain Mad',
      team: '',
      weapons: [
        'Giant Claw',
        'Spirit Katana',
      ],
      language: 'Evil Tounge',
    });
  
    console.log(villain.evilAttack(hero, hitPoints()));
    console.log(villain.ghostSlash(hero, hitPoints()));
    console.log(hero.justiceAttack(villain, hitPoints()));
    console.log(hero.laserGaze(villain, hitPoints()));
