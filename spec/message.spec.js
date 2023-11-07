const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

//Completely honestly not sure what this does
describe("Message class", function() {

});

//Test 1 : Makes sure a name is passed into the constructor, creates a new object of the message class 
//with no name passed to test if the error responds appropriately.

test("Throws error if a name is NOT passed into the constructor as the first parameter", function(){
    expect( function() { new Message();}).toThrow(new Error('Message type required.'));
})

//Test 2 : Makes sure the constructor properly sets the first argument passed to name

test("Constructor sets name", function(){
    let message = new Message("Name");
    expect(message.name).toEqual("Name");
})

//Test 3: Makes sure the constructor properly sets the second argument passed to commands

test("Constructor contains a commands array passed as the second argument", function(){
    let message = new Message("Name", [1,2,3]);
    expect(message.commands).toEqual([1,2,3]);
    
    //Tests if message.commands is an array with at least 2 values
    expect(message.commands[1]).toEqual(2);
})