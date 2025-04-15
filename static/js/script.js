// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Search tabs functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
        });
    });
    
    // Date inputs - set min date to today
    const today = new Date().toISOString().split('T')[0];
    const dateInputs = document.querySelectorAll('input[type="date"]');
    
    dateInputs.forEach(input => {
        input.setAttribute('min', today);
    });
    
    // Return date should be after departure date
    const departureInput = document.getElementById('departure');
    const returnInput = document.getElementById('return');
    
    if (departureInput && returnInput) {
        departureInput.addEventListener('change', function() {
            returnInput.setAttribute('min', this.value);
            
            // If return date is before new min date, clear it
            if (returnInput.value && returnInput.value < this.value) {
                returnInput.value = '';
            }
        });
    }
    
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Weather API example (would need actual API key)
    const weatherCity = document.getElementById('weatherCity');
    const weatherBtn = document.getElementById('weatherBtn');
    const weatherResult = document.getElementById('weatherResult');
    
    if (weatherBtn && weatherResult) {
        weatherBtn.addEventListener('click', function() {
            const city = weatherCity.value;
            
            if (!city) {
                weatherResult.innerHTML = 'Please enter a city name';
                return;
            }
            
            // In a real implementation, you would call the OpenWeather API here
            // This is just a mock response
            weatherResult.innerHTML = `
                <div class="alert alert-info">
                    <strong>${city}</strong>: Sunny, Temp: 72°F
                    <p class="mb-0">This is a mock response. With a real API key, you would get actual weather data.</p>
                </div>
            `;
        });
    }
    
    // Search form submission
    const searchForm = document.querySelector('.search-form');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const from = document.getElementById('from').value;
            const to = document.getElementById('to').value;
            
            if (!from || !to) {
                alert('Please enter both source and destination');
                return;
            }
            
            // In a real implementation, you would process the search here
            // For now, just redirect to search results page
            window.location.href = 'search.html';
        });
    }
    
    // Auth form validation
    const authForms = document.querySelectorAll('.auth-form');
    
    authForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const password = this.querySelector('input[type="password"]');
            const confirmPassword = this.querySelector('#confirmPassword');
            
            if (confirmPassword && password.value !== confirmPassword.value) {
                alert('Passwords do not match');
                return;
            }
            
            // In a real implementation, you would handle authentication here
            alert('Form submitted successfully! In a real implementation, this would process the login/signup.');
        });
    });
    
    // Initialize Bootstrap tabs
    const tabEls = document.querySelectorAll('button[data-bs-toggle="tab"]');
    tabEls.forEach(tabEl => {
        tabEl.addEventListener('click', function(event) {
            event.preventDefault();
            const tab = new bootstrap.Tab(this);
            tab.show();
        });
    });
});

// Functions for API integration (would be used with actual API keys)
function getWeather(city) {
    // This would make an actual API call to OpenWeather
    console.log(`Fetching weather for ${city}`);
    // return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY`)
    //     .then(response => response.json());
}

function searchFlights(params) {
    // This would make an actual API call to Skyscanner
    console.log('Searching flights with params:', params);
    // return fetch(`https://skyscanner-api-url?${params}`)
    //     .then(response => response.json());
}

function searchHotels(params) {
    // This would make an actual API call to Booking.com
    console.log('Searching hotels with params:', params);
    // return fetch(`https://booking-api-url?${params}`)
    //     .then(response => response.json());
}

// Example of how you might populate search results from an API
function populateFlightResults(flights) {
    const resultsContainer = document.querySelector('#flights .results-container');
    
    if (!resultsContainer) return;
    
    // Clear existing results
    resultsContainer.innerHTML = '';
    
    // Add each flight result
    flights.forEach(flight => {
        const flightEl = document.createElement('div');
        flightEl.className = 'result-card';
        flightEl.innerHTML = `
            <div class="result-header">
                <div class="airline">
                    <img src="${flight.airline.logo}" alt="${flight.airline.name}">
                    <span>${flight.airline.name}</span>
                </div>
                <div class="price">$${flight.price}</div>
            </div>
            <div class="result-body">
                <div class="flight-segment">
                    <div class="time">
                        <div class="departure">${flight.departureTime}</div>
                        <div class="duration">${flight.duration}</div>
                        <div class="arrival">${flight.arrivalTime}</div>
                    </div>
                    <div class="route">
                        <div class="airports">${flight.from} → ${flight.to}</div>
                        <div class="stops">${flight.stops}</div>
                    </div>
                </div>
            </div>
            <div class="result-footer">
                <button class="btn btn-outline-primary">Details</button>
                <button class="btn btn-primary">Select</button>
            </div>
        `;
        
        resultsContainer.appendChild(flightEl);
    });
}

// You would call this with real data from your API
// Example mock data:
const mockFlights = [
    {
        airline: {
            name: 'Delta Airlines',
            logo: 'https://logo.clearbit.com/delta.com'
        },
        price: 499,
        departureTime: '08:00 AM',
        arrivalTime: '11:30 AM',
        duration: '3h 30m',
        from: 'JFK',
        to: 'LAX',
        stops: 'Non-stop'
    },
    {
        airline: {
            name: 'United Airlines',
            logo: 'https://logo.clearbit.com/united.com'
        },
        price: 429,
        departureTime: '10:15 AM',
        arrivalTime: '02:45 PM',
        duration: '4h 30m',
        from: 'JFK',
        to: 'LAX',
        stops: '1 Stop (ORD)'
    }
];

// To use the mock data (in a real app, you'd use API data)
// populateFlightResults(mockFlights);