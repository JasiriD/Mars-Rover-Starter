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
         message: message.name, 
         messageCommand: message.commands,
         results:
         [
   
         ]
      };

      //If statement that checks wheter the commands array is empty or not
      if(message.commands !== undefined){

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
               output.results.push({
                  completed: true,
                  roverStatus: {position: this.position, mode: this.mode, generatorWatts: this.generatorWatts,
                  }})
               console.log("Works");
            }

            //If statement that checks if the current entry in the array is "MOVE"
            if(message.commands[i].commandType === "MOVE"){

               //Checks if rover is in low power mode
               if(this.mode !== "LOW_POWER"){
                  output.results.push({
                     completed: true,
                  })

                  //Sets rover's position to position given in command
                  this.position = message.commands[i].value
               }

               //If rover is in low power mode
               else{
                  output.results.push({
                     completed: false,
                  })
               }
            }


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

// let commands = [new Command('STATUS_CHECK')];
// let message = new Message('Test message with two commands', commands);
// let rover = new Rover(98382);    // Passes 98382 as the rover's position.
// let response = rover.receiveMessage(message);

// //console.log(response.results[1].roverStatus.position);
// console.log(response.messageName)
// console.log(response.messageCommand[0])
// console.log(response.results[0].roverStatus);

module.exports = Rover;