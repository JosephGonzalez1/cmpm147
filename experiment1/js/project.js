// project.js - purpose and description here
// Author: Your Name
// Date:

// NOTE: This is how we might start a basic JavaaScript OOP project

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

// define a class
class MyProjectClass {
  // constructor function
  constructor(param1, param2) {
    // set properties using 'this' keyword
    this.property1 = param1;
    this.property2 = param2;
  }
  
  // define a method
  myMethod() {
    // code to run when method is called
  }
}

function main() {
  const fillers = {
    adventurer: ["Person", "Guy", "AI", "Nomad", "Hollowed One", "Fella", "Villager"],
    pre: ["Hollow", "Death", "Green", "Ice", "Rock", "Fleet"],
    post: ["town", "village", "commune"],
    people: ["people", "okay", "crazy", "funny", "dead", "uncanny", "hateful"],
    item: ["twinaxe", "blade of flight", "burnt book", "cloaked cloak", "bubble shield", "fish"],
    num: ["like maybe two", "a couple", "exactly 21", "some but not more than four"],
    looty: ["trashy", "marketable", "serviceable", "kinda rare but not too rare", "cool but in a bad way"],
    loots: ["good points", "Best Dad Mugs", "copper coins", "cow leathers but the bad kind", "dudes"],
    baddies: ["dragons", "blobs of slime", "just some regular people", "a singular rabbit", "like a lot of bears like too many bears"],
    message: ["whimper", "wechat", "whistle", "request", "twitter post"],
    
  };
  
  const template = `Please $adventurer, listen to my $message!
  
  I come from $pre$post where the $people folk are in need your help. Their town has been taken over by $baddies. We need you to go there, taking this totally free $item, and help them in anyway you can.
  
  I'll reward you with $num $looty $loots. This is a good quest I swear!
  `;
  
  
  // STUDENTS: You don't need to edit code below this line.
  
  const slotPattern = /\$(\w+)/;
  
  function replacer(match, name) {
    let options = fillers[name];
    if (options) {
      return options[Math.floor(Math.random() * options.length)];
    } else {
      return `<UNKNOWN:${name}>`;
    }
  }
  
  function generate() {
    let story = template;
    while (story.match(slotPattern)) {
      story = story.replace(slotPattern, replacer);
    }
  
    /* global box */
    box.innerText = story;
  }
  
  /* global clicker */
  clicker.onclick = generate;
  
  generate();
}

// let's get this party started - uncomment me
main();