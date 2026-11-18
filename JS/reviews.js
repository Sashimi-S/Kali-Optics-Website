const BIN_ID = '6afdc1eeffd5d16053cbbbf5';
const API_KEY = '$2a$10$uFzTET.OEFVO3mbhnCBRB.bobw0u5KWkZdP0Ty4ifu3XdYACa/YfG';
const BIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;


const openBtn = document.getElementById('open-review-btn');
const modal = document.getElementById('review-modal');
const closeBtn = document.getElementById('close-modal-btn');
const reviewForm = document.getElementById('review-form');
const submitBtn = document.querySelector('.submit-review-btn');
const reviewsGrid = document.querySelector('.reviews-grid');
const statusText = document.getElementById('reviews-status');
const stars = document.querySelectorAll('.star');

let allReviews = []; // Stores the list of reviews from JSONBin
let currentRating = 0; // Stores how many stars the user clicked

// Key used in localStorage to remember if this user already posted a review
const USER_REVIEW_KEY = 'kaliOpticsUserReviewId';

// Open and Close Modal Logic
openBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
});

closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    reviewForm.reset();
    resetStars();
});

// Interactive Star Rating Logic
stars.forEach((star) => {
    star.addEventListener('click', () => {
        currentRating = parseInt(star.getAttribute('data-value'));

        stars.forEach((s) => {
            if (parseInt(s.getAttribute('data-value')) <= currentRating) {
                s.style.color = '#f39c12'; // Gold star
            } else {
                s.style.color = '#777777'; // Grey star
            }
        });
    });
});

function resetStars() {
    currentRating = 0;
    stars.forEach((s) => {
        s.style.color = '#777777';
    });
}

// Fetch Reviews from JSONBin when the page loads 
async function loadReviews() {
    statusText.style.display = 'block';
    statusText.style.color = '#eeeeee';
    statusText.textContent = 'Loading reviews...';

    try {
        const response = await fetch(`${BIN_URL}/latest`, {
            method: 'GET',
            headers: {
                'X-Master-Key': API_KEY
            }
        });

        // Read response from JSONBin 
        const data = await response.json();

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${data.message || 'Request failed'}`);
        }

        allReviews = data.record;

        statusText.style.display = 'none';
        renderReviews();
    } catch (error) {
        console.error('Error loading reviews:', error);
        statusText.style.color = '#ff0003';
        statusText.textContent = `Could not load reviews: ${error.message}`;
    }
}

// Displays all reviews on the page
function renderReviews() {
    reviewsGrid.innerHTML = ''; // Clears the grid before redrawing

    // Checks localStorage to see if user has already posted a review
    const userReviewId = localStorage.getItem(USER_REVIEW_KEY);
    const userHasReviewed = allReviews.some((review) => review.id === userReviewId);

    // Hides button if review is already on page
    openBtn.style.display = userHasReviewed ? 'none' : 'inline-block';

    // Loop through every review and create its card
    allReviews.forEach((review) => {
        const starString = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);

        const card = document.createElement('div');
        card.classList.add('review-card');

        // Only show the Delete button on the review created by the user
        const isUsersOwnReview = review.id === userReviewId;

        card.innerHTML = `
            <h3 class="reviewer-name">${review.name}</h3>
            <div class="review-stars">${starString}</div>
            <p class="review-text">${review.comment}</p>
            ${isUsersOwnReview ? '<button class="delete-review-btn">Delete</button>' : ''}
        `;

        // If this is the user's review, attach the delete button listener
        if (isUsersOwnReview) {
            const deleteBtn = card.querySelector('.delete-review-btn');
            deleteBtn.addEventListener('click', () => deleteUserReview(review.id));
        }

        reviewsGrid.appendChild(card);
    });
}

// Save Updated Reviews Array to JSONBin 
async function saveReviewsToCloud(updatedReviews) {
    const response = await fetch(BIN_URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': API_KEY
        },
        body: JSON.stringify(updatedReviews)
    });

    if (!response.ok) {
        throw new Error('Failed to save review');
    }
}

// Submitting a New Review
reviewForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (currentRating === 0) {
        alert('Please select a star rating!');
        return;
    }

    const name = document.getElementById('reviewer-name').value.trim();
    const comment = document.getElementById('reviewer-comment').value.trim();

    // Create a new review object with a unique ID
    const newReview = {
        id: 'rev-' + Date.now(),
        name: name,
        rating: currentRating,
        comment: comment
    };

    submitBtn.disabled = true;
    submitBtn.textContent = 'Posting...';

    try {
        // Add new review to the end of the array 
        const updatedList = [...allReviews, newReview];

        // Save to JSONBin
        await saveReviewsToCloud(updatedList);

        // Save this review's ID in localStorage so the user can only review once
        localStorage.setItem(USER_REVIEW_KEY, newReview.id);

        // Update screen
        allReviews = updatedList;
        renderReviews();

        // Close and reset modal
        modal.classList.add('hidden');
        reviewForm.reset();
        resetStars();
    } catch (error) {
        console.error('Error posting review:', error);
        alert('Could not post your review. Please check your connection.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Post Review';
    }
});

// Deleting Reviews
async function deleteUserReview(reviewId) {
    statusText.style.display = 'block';
    statusText.style.color = '#eeeeee';
    statusText.textContent = 'Deleting your review...';

    try {
        // Filter out deleted review
        const updatedList = allReviews.filter((review) => review.id !== reviewId);

        // Update JSONBin
        await saveReviewsToCloud(updatedList);

        // Remove the lock from localStorage so user can review again if they want
        localStorage.removeItem(USER_REVIEW_KEY);

        // Update screen
        allReviews = updatedList;
        statusText.style.display = 'none';
        renderReviews();
    } catch (error) {
        console.error('Error deleting review:', error);
        statusText.style.color = '#ff0003';
        statusText.textContent = 'Could not delete review. Please try again.';
    }
}
// Loading reviews when page opens
loadReviews();