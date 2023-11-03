const Message = require('./message.js');


class Rover {
   // Write code here!

   //Constructor function
   constructor(position, generatorWatts = 110){
      this.position = position;
      this.mode = `NORMAL`;
      this.generatorWatts = generatorWatts;
   }

   //recieveMessage function
   recieveMessage(message){
      
      let output = {
         messageName: message.name,
         messageCommand: [],
      };

      //output.messageCommand += message.command;

      return output;
   }


}

module.exports = Rover;