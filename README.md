![Ironhack Logo](https://i.imgur.com/1QgrNNw.png)

# Node | The Elevator

## Learning Goals

After this learning unit, you will be able to:

- Build your own elevator using node asynchrony
- Create as many request as you want and save them in a queue
- Create callback functions to respond asynchronously to the orders recieved
- Original idea: http://play.elevatorsaga.com/

![Crazy giphy](https://media.giphy.com/media/P8XjmO1TTX3Nu/giphy.gif)

## Introduction

Elevators are a common element in real-life that requires asynchrony. In this Lab, we are going to create an elevator able to respond to different asynchronous requests.

The elevator will have a queue where is going to store all the request in the order they are made. Then, the elevator will move up or down depending on the next floor requested. Once it arrives to the actual requested floor, it will get the next one until there are no more requests in the queue.

### Requirements

- [Fork this repo](https://guides.github.com/activities/forking/)
- Clone this repo into your `~/code/labs`

## Submission

Upon completion, run the following commands
```
$ git add .
$ git commit -m "done"
$ git push origin master
```

Navigate to your repo and create a Pull Request -from your master branch to the original repository master branch.

In the Pull request name, add your name and last names separated by a dash "-"

## Deliverables
In your starter code folder you will find every file you need to finish the game. Push every needed file to make your game work properly.

## Exercise

### Iteration 1

In the `starter_code` we will have three files:

1. `elevator.js`
  - Will contain the logic for the elevator, accept requests, move up or down, etc.
1. `person.js`
  - Will contain a person class, with a name, the original floor and the requested floor
1. `index.js`
  - Main file that instances these classes and operate with them. Remember to require the other files in this file.

Most of the functions we need to create are executed by the `elevator.js`, so we will begin to code in the `elevator.js` file.

#### The *Elevator* class

First, the elevator needs to move. We will take care of what triggers the movement later.

In order to make it move, it will need a direction and a current position (floor). Let's focus on four main methods:

- For now, the `update` function will display in the console the actual status of the elevator by calling the `log` function.
- The `log` function will only print the information related with position and direction:
```
Direction: up | Floor: 0
```
- The `start` function will call the `update` function every second to prompt the execution
- The `stop` function will cease the elevator's listening for requests


These last two functions are key to the exercise.

Remember to use JavaScript functions such as [setTimeOut()](https://nodejs.org/api/timers.html#timers_settimeout_callback_delay_args) to create the listener


### Iteration 2

In the second iteration, the elevator will move up and down regarding its direction and the petitions requested.

We are going to create a function `floorUp` to update the actual floor by incrementing one to the current position. So, if the actual floor was 0, it will turn 1.

Also, we will create a similar function called `floorDown` to update the actual floor by substracting one to the current position. So, if the actual floor was 6, it will turn 5.

> Remember to consider the limits of the elevator, so you won't go further the top floor or below the entrance level


```
Test the elevator.
Make it go to the top floor and the entrance level
by using `floorUp` and `floorDown`
displaying it in the console with `log`
```

### Iteration 3

Elevators pick up and leave passengers, so we will have to model those passengers. Let’s use our class Person to describe a Person.

#### The *Person* class

A person will have three attributes:
- A `name`
- A `originFloor`: the floor she is in before calling the elevator
- A `destinationFloor`: the floor she intends to go

Now, we need to think about what happens when a person ‘calls’ the elevator. In the `Elevator` class, we will create the `call` method. This method should add a request into the elevator’s queue. A good idea would be to add the whole person object to the requests collection.

We will then process the list of requests in order for the elevator to process them. We will need a list of floors that the elevator should serve in the `update` method.

### Iteration 4

When elevators travel up and down to pick up and leave passengers, people actually come into the elevator.

To keep a track of everyone without messing all up, you will have three different lists:

- `waitingList`: people waiting for the elevator -they made the request and they're waiting the elevator to come
- `passengers`: people currently in the elevator
- `requests`: a list of pending requests. Floors where the elevator must stop

#### The Waiting List

When a person calls the elevator (the `call` function is executed), we will add that person into the `waitingList` array. Notice they're not in the `passengers` collection because they're not yet in the elevator.

Also, add the (`originFloor`) to the `requests` array to let the elevator know where it has to stop to pick the passenger up.

#### A passenger enters the elevator

When the elevator arrives to any floor, it should check the `waitingList` array to verify if a person is waiting there. If this condition occurs:

- add the person into the `passengers` array
- delete the passenger from the `waitingList`
- Add the destination floor of the passenger to the elevator `requests`

We will show a message to indicate what just happens:

`Julia has enter the elevator`

#### A passenger leaves the elevator

When the elevator arrives to a floor, it should check the `passengers` collection. If a passenger's `destinationFloor` matches the current floor:

- we will delete that person from the `passengers` array.

We will show a message to indicate what just happens:

`Julia has left the elevator`


**Good luck!**


![Giphy IMAGE](https://media.giphy.com/media/l0MYIyrdQeWyEtQm4/giphy.gif)

## Extra resources

- [The Elevator Saga](http://play.elevatorsaga.com/)
- [Codepen](http://codepen.io/brigham/pen/AErDk) - Ok, we're in the backend, right? But this is a pretty simulation :stuck_out_tongue_closed_eyes:
