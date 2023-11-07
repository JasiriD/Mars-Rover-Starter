const Message = require('./message.js');
const Command = require('./command.js');



class Rover {
   // Write code here!

   //Constructor function
   constructor(position, generatorWatts = 110){
      this.position = position;
      this.mode = `NORMAL`;
      this.generatorWatts = generatorWatts;
   }

   //receiveMessage function
   receiveMessage(message){
      
      let output = {
         messageName: message.name, 
         messageCommand: message.commands,
         results:
         [
   
         ]
      };

      //For loop that loops though the array of commands and dynamically updated the results array within the output object
      for(let i = 0; i < message.commands.length; i++){

         //If statement that checks if the current entry in the array is "MODE_CHANGE"
         if(message.commands[i].commandType === "MODE_CHANGE"){
            //Checks if the mode is to be changed to "LOW_POWER" and changes it if so
            if(message.commands[i].value === "LOW_POWER"){
               output.results.push({completed: true})
               this.mode = "LOW_POWER";
            }
            //Does the same for "NORMAL"
            else if(message.commands[i].value === "NORMAL"){
               output.results.push({completed: true})
               this.mode = "NORMAL";
            }
            //If it's neither set to normal
            else{
               this.mode = "NORMAL";
            }
         }

         //If statement that checks if the current entry in the array is "STATUS_CHECK"
         if(message.commands[i].commandType === "STATUS_CHECK"){
            output.results.push({completed: true})
            
         }


      }
      /*
      roverStatus = {
         position: this.position,
         mode: this.mode,
         generatorWatts: this.generatorWatts,
      }
      */

      //output.messageCommand += message.commands;


      return output;
   }


}

let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
let message = new Message('Test message with two commands', commands);
let rover = new Rover(98382);    // Passes 98382 as the rover's position.
let response = rover.receiveMessage(message);

console.log(response.results);
console.log(rover.mode)

module.exports = Rover;