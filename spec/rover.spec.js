const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment
//       out all the others. However, do NOT edit the grading tests for any reason and make sure to un-comment 
//       out your code to get the autograder to pass.


describe("Rover class", function() {

})

  //Test 7 : Makes sure the constructor properly sets the given and default values

  test("Makes sure position is set to this.position", function(){
    let rover = new Rover(`position`);

    //Makes sure the first parameter passed is given to rover.position
    expect(rover.position).toEqual(`position`);

    //Makes sure rover.mode is set to `NORMAL
    expect(rover.mode).toEqual(`NORMAL`);

    //Makes sure the default value for generatorWatts is 110
    expect(rover.generatorWatts).toEqual(110);
  })

  //Test 8: Makes sure the recieveMessage function returns the name of the given message

  test("Response returned by recieveMessage contains name of given message", function(){

    //Creates new message object with the name "name"
    let message = new Message("Name");

    //creates new rover object with the recieveMessage function
    let rover = new Rover();

    //Storing result of function into a temp object
    let output = rover.receiveMessage(message);
    
    expect(output.message).toEqual("Name");
  })

  //Test 9: Makes sure recieveMessage contains 2 results if 2 commands are sent in the message

  test("response returned by receiveMessage includes two results if two commands are sent in the message", function(){

    //Creates new commands array
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];

    //Creates message object containing previous commands array
    let message = new Message("Test message with 2 commands", commands);
  
    let rover = new Rover();

    //Assigns function output to a variable
    let output = rover.receiveMessage(message);

    let arrayLength = output.messageCommand.length;

    expect(arrayLength).toEqual(2);

    //rover.recieveMessage(message)

});

//Test 10: Rover correctly responds to the status check command

test("Responds correctly to the status check command", function(){

  let commands = [new Command('STATUS_CHECK')];

  let message = new Message("Test STATUS_CHECK command", commands);

  //Sets position of rover object to 100
  let rover = new Rover(100)

  let output = rover.receiveMessage(message);

    //Checks if completed is set to true
    expect(output.results[0].completed).toEqual(true);

    //Checks if rthe results array contains the roverstatus object and the status of the rover
    expect(output.results[0].roverStatus.position).toEqual(100);
    expect(output.results[0].roverStatus.generatorWatts).toEqual(110);
    expect(output.results[0].roverStatus.mode).toEqual("NORMAL");
})

//Test 11: Rover correctly changes mode when MODE_CHANGE command is submitted

test("Responds correctly to the mode change command", function(){

  //Commands array made to change mode of rover
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];

  let message = new Message("Test MODE_CHANGE command", commands);

  let rover = new Rover();

  let output = rover.receiveMessage(message);

  //Checks if completed is set to true
  expect(output.results[0].completed).toEqual(true);

  //Checks if the status of the rover (mode in the rover object) is changed to "LOW_POWER"
  expect(rover.mode).toEqual("LOW_POWER");

})

//Test 12: Makes sure rover cannot move while in "LOW_POWER" mode

test("Responds with a false completed value when attempting to move in LOW_POWER mode", function(){

  //Sets rover to low power mode
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];

  let message = new Message("Testing moving in low power mode", commands);

  //Sets rover's position to 100
  let rover = new Rover(100);

  let output = rover.receiveMessage(message)

  //Checking if rover is properly set to low power mode before moving forward
  expect(rover.mode).toEqual("LOW_POWER"); 

  //Setting commands array to move command
  commands = [new Command('MOVE', 123456)];

  //Giving message variable the new commands array
  message = new Message("Testing moving in low power mode", commands);

  //Running function again in an attempt to move
  output = rover.receiveMessage(message)

  //Checks if completed is set to false
  expect(output.results[0].completed).toEqual(false);

  //Makes sure rover's position is unchanged
  expect(rover.position).toEqual(100);


})

//Test 13: Makes sure MOVE command works as intended

test("responds with the position for the move command", function(){

    //Move command
    let commands = [new Command('MOVE', 123456)];

    let message = new Message("Testing MOVE command", commands);
  
    //Sets rover's position to 100
    let rover = new Rover(100);
  
    //Running move command
    let output = rover.receiveMessage(message)

    //Tests rover's new position
    expect(rover.position).toEqual(123456);

})
