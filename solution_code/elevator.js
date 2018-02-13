class Elevator {
  constructor(){
    this.floor       = 0;
    this.MAXFLOOR    = 10;
    this.requests    = [];
    this.idle        = true; //when true, the elevator is not serving any request
    this.waitingList = [];
    this.passengers  = [];
    this.direction   = "up";
    this.currentReq  = null;
  }

  // Iteration 1: Should start a "setInterval" to call the "update" function every second
  start(){
    this.timer = setInterval(() => { this.update() }, 1000);
  }

  // Iteration 1: Should stop the elevator's "setInterval" listening for requests.
  stop(){
    clearInterval(this.timer);
  }

  // Iteration 1: Update function should display the current status of the elevator by 
  // calling the "log" function.

  update(){

    this.log();
    
    // If the list of requests is currently NOT equal to Zero...
    if (this.requests.length !== 0) {

      // Here, we will handle the Entering / Leaving of passengers before
      // navigating to any floor.
      this._passengersEnter();
      this._passengersLeave();

      // remove current floor from requests since we just handled them
      this.requests = this.requests.filter(requestFloor => requestFloor !== this.floor);

      // Here, we use the "spread" operator to unpack the list of requests
      // and select the "highest" and "lowest" floor requests
      const requestMax = Math.max(...this.requests);
      const requestMin = Math.min(...this.requests);

      // Two conditions to be met in order to determine whether the elevator
      // should move up or down.
      if (this.direction === "up" && requestMax > this.floor) {
        this.floorUp();
      }
      if (this.direction === "down" && requestMin < this.floor) {
        this.floorDown();
      }

      // Check if the elevator needs to reverse direction
      this._checkSwitchDirection();
    }
  }


  _passengersEnter() {

    // Iteration 3: When the elevator arrives to any floor, it should check
    // the "waitingList" array to verify if a person is waiting there.
    this.waitingList.forEach((person, index) => {
      
      // If any of the "person" elements in "waitingList" are currently on
      // floor that the elevator is at...
      if (person.originFloor === this.floor) {
        //...then that "person" object will be added to the "passengers" array. 
        this.passengers.push(person);
        // The destination floor of the passenger will be added to the elevator "requests"
        this.requests.push(person.destinationFloor);
        // The passenger is then removed from the waiting list using the ".splice" method.
        // "index" is starting point while "1" is the deleteCount
        this.waitingList.splice(index, 1);

        // Show a message to indicate what happens.
        console.log(`${person.name} has entered the elevator`);
      }
    })
  }

  // Iteration 3: When the elevator arrives to a floor, it should check the
  // "passengers" collection.
  _passengersLeave () {
    this.passengers.forEach((passenger, index) => {
      
      // If a passenger's destination floor matches the current floor...
      if (passenger.destinationFloor === this.floor) {
        
        // We will delete that person from the "passenger's" array
        this.passengers.splice(index, 1);

        // We will show a message to indicate what has happened.
        console.log(`${passenger.name} has left the elevator`);
      }
    })
  }

  // Iteration 2: Update the current floor by incrementing it by one.
  // Remember to consider the limits of the elevator so it doesn't go 
  // higher than the top floor or below the ground floor.
  floorUp() {
    if (this.floor < this.MAXFLOOR) {
      this.floor++;
    }
  }

  // Iteration 2: Update the current floor by subtracting one from
  // the current floor. Remember to consider the limits of the elevator 
  // so it doesn't go higher than the top floor or below the ground floor.
  floorDown() {
    if (this.floor >= 0) {
      this.floor--;
    }
  }

  // Iteration 3: Receives a "person" object and adds it as a request into
  // the elevator's queue. Add the whole person object to the requests array. 
  // The elevator will need all that information later.
  call(person) {
    console.log("call")

    // Iteration 4: When a person calls the elevator, we will add that person
    // to the "waitingList" array. They are not yet in the passengers collection
    // because they're not yet in the elevator.
    this.waitingList.push(person);

    // Iteration 4: Add the "originFloor" to the "requests" array to let the
    // elevator know where it has to stop to pick the passenger up.
    this.requests.push(person.originFloor);
  }

  _checkSwitchDirection () {

    // Again, we pull the "highest" and the "lowest" values from the list of
    // requests.
    const requestMax = Math.max(...this.requests);
    const requestMin = Math.min(...this.requests);

    // Conditionals to determine whether we should head UP or DOWN
    if (( this.direction === "up"   && this.floor > requestMax) ||
        ( this.direction === "down" && this.floor < requestMin)) {
       console.log('change direction!')
       this.direction = this.direction === "up" ? "down" : "up";
    }
  }

  // Parse the names of those waiting / passenger names in order to generate
  // a more informative "log" message below.
  _waitNames ()      { return this.waitingList.map(person => person.name); }
  _passengernames () { return this.passengers.map(person => person.name); }

  // Iteration 1: Should simply print the information related with position and direction.
  log() {
    console.log(`Direction: ${this.direction} | Idle: ${this.idle} | Floor: ${this.floor} | Waiting List: ${ this._waitNames() } | Passengers: ${this._passengernames()} | Requests: ${this.requests}`);
  }
}

module.exports = Elevator;
