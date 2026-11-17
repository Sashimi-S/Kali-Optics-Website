const openBtn = document.getElementById('open-review-btn');
const modal = document.getElementById('review-modal');
const closeBtn = document.getElementById('close-modal-btn');
const reviewForm = document.getElementById('review-form');
const reviewsGrid = document.querySelector('.reviews-grid');
const stars = document.querySelectorAll('.star');

let currentRating = 0; // Keeps track of how many stars the user clicked

// 2. Open and Close the Popup Form (Modal)
openBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
});

closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    reviewForm.reset(); // Clears the typed text if they close it early
    resetStars();       // Clears the golden stars
});

// 3. Interactive Star Rating Logic
stars.forEach(star => {
    star.addEventListener('click', () => {
        // Reads the data-value of the clicked star (1 to 5)
        currentRating = parseInt(star.getAttribute('data-value'));
        
        // Loop through all stars and turn them gold if they are below or equal to the clicked number
        stars.forEach(s => {
            if (parseInt(s.getAttribute('data-value')) <= currentRating) {
                s.style.color = '#f39c12'; // Golden color
            } else {
                s.style.color = '#777777'; // Grey color
            }
        });
    });
});

// Reset stars back to zero
function resetStars() {
    currentRating = 0;
    stars.forEach(s => {
        s.style.color = '#777777'; 
    });
}

//Submit Form and creates the new Review
reviewForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Stops the page from refreshing on submit

    // Ensure the user actually clicked a star
    if (currentRating === 0) {
        alert("Please select a star rating!");
        return;
    }

    // Grab the text the user typed
    const name = document.getElementById('reviewer-name').value;
    const comment = document.getElementById('reviewer-comment').value;

    // Generate the correct amount of star symbols
    const starString = '★'.repeat(currentRating) + '☆'.repeat(5 - currentRating);

    // Create a brand new div for the review card
    const newReview = document.createElement('div');
    newReview.classList.add('review-card');

    // Add the HTML content inside the new card
    newReview.innerHTML = `
        <h3 class="reviewer-name">${name}</h3>
        <div class="review-stars">${starString}</div>
        <p class="review-text">${comment}</p>
        <button class="delete-review-btn">Delete</button>
    `;

    // Add the new review to the very top of the grid
    reviewsGrid.prepend(newReview);

    // "Review Once" Logic - Hide the main button so they can't review again
    openBtn.style.display = 'none';
    
    // Allows the user to delete their review
    const deleteBtn = newReview.querySelector('.delete-review-btn');
    deleteBtn.addEventListener('click', () => {
        newReview.remove(); // Removes the card from the page
        openBtn.style.display = 'inline-block'; // Brings the "Leave a Review" button back!
    });

    // Close popup form
    modal.classList.add('hidden');
    reviewForm.reset();
    resetStars();
});