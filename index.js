const DOM = {
seats: document.querySelector('.seats-container'),
priceStatement: document.querySelector('.statement'),
bookedSeats: document.querySelector('#seats'),
totalPrice: document.querySelector('#total-price'),


}


let movies = {};
let selectedSeats = [];
class Movie {
    constructor(movieName,cost){
        this.movieName = movieName;
        this.cost = cost; 
        
    }
    selectedSeats(seats){

        this.seatLocations = seats; 
    }

    bookedSeat(){
        const seats = Array.from(document.querySelectorAll('.active'));
        this.bookedSeats = seats.length; 
        this.totalPrice = this.cost * this.bookedSeats;

        DOM.bookedSeats.textContent = this.bookedSeats;
        DOM.totalPrice.textContent = this.totalPrice;

    
    }
    cancelBooking(){
        this.bookedSeats--;
        this.totalPrice = this.cost * this.bookedSeats;
        
        DOM.bookedSeats.textContent = this.bookedSeats;
        DOM.totalPrice.textContent = this.totalPrice;
    }
    storeData(){
        const movieDetails =  {
        movieName:this.movieName,
        cost:this.cost,
        bookedSeats:this.bookedSeats,
        seatLocation:this.seatLocations,
        totalPrice:this.totalPrice
        }
        localStorage.setItem('movie',JSON.stringify(movieDetails));
    }

}

DOM.seats.addEventListener('click', event => {
    
    if(event.target.matches('.seat-occupied')) return;

    else if(event.target.matches('.seats')){
    //when its an empty seat
    if(event.target.matches('.movie-seats')){
     //toggle the UI
    event.target.classList.remove('movie-seats');
    event.target.classList.add('active');
    //create movie object and save to local storage
    controlMovie(event.target);
        

    }
    // cancelling booked seat
    else if (event.target.matches('.active')) {
        //remove from movies array
       movies.cancelBooking();
        //remove from selected seats
        const deletedSeat = selectedSeats.findIndex(el => el=== event.target.dataset.id);
        selectedSeats.splice(deletedSeat,1);
        movies.selectedSeats(selectedSeats);
        //remove from storage
        movies.storeData();
        //toggle UI 
        event.target.classList.add('movie-seats');
        event.target.classList.remove('active');

    }


    }

});
function controlMovie(event){
    //get the movie, the price and the selected seat
     const theMovie = document.querySelector('.selected-movie').value;
     let [movieName, cost] = theMovie.split(',');
     cost = parseInt(cost); 
     let seatId,theSeat;
     if(event){
        seatId = event.dataset.id;  
        theSeat = (seatId.split('-'))[1];
        //get the location of booked seats
        selectedSeats.push(theSeat);
     }
     movies = new Movie(movieName, cost);
    //find the number of booked seats and total price
     movies.bookedSeat();

     movies.selectedSeats(selectedSeats);
    //save to local storage
    movies.storeData();
}

function renderSelectedSeats (){


}
