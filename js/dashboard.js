document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const addEventBtn = document.getElementById('addEventBtn');
    const eventModal = document.getElementById('eventModal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const eventForm = document.getElementById('eventForm');
    const eventsContainer = document.getElementById('eventsContainer');
    const eventDateInput = document.getElementById('eventDate');

    // Sample events data
    const sampleEvents = [
        {
            title: "Tech Conference 2023",
            date: "2023-10-15",
            time: "09:00",
            location: "Convention Center",
            description: "Annual technology conference featuring the latest innovations and keynote speakers from industry leaders.",
            guests: ["Elon Musk", "Satya Nadella"],
            image: "images/event1.jpg"
        },
        {
            title: "Music Festival",
            date: "2023-10-22",
            time: "12:00",
            location: "Central Park",
            description: "Weekend music festival featuring top artists from around the world across multiple stages.",
            guests: ["Billie Eilish", "The Weeknd"],
            image: "images/event2.jpg"
        }
    ];

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    eventDateInput.min = today;

    // Load sample events
    function loadEvents() {
        eventsContainer.innerHTML = '';
        sampleEvents.forEach(event => {
            createEventCard(event);
        });
    }

    // Create event card
    function createEventCard(event) {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        
        const guestsText = event.guests && event.guests.length > 0 ? 
            `<div class="event-guests"><i class="fas fa-user-friends"></i> Featured Guests: ${event.guests.join(', ')}</div>` : '';
        
        const dateObj = new Date(event.date);
        const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();
        
        eventCard.innerHTML = `
            <div class="event-image" style="background-image: url('${event.image}')">
                <span class="event-date">${formattedDate}</span>
            </div>
            <div class="event-details">
                <h3 class="event-title">${event.title}</h3>
                <div class="event-meta">
                    <span><i class="fas fa-clock"></i> ${event.time}</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${event.location}</span>
                </div>
                <p class="event-description">${event.description}</p>
                ${guestsText}
                <div class="event-actions">
                    <button class="btn-edit"><i class="fas fa-edit"></i> Edit</button>
                    <button class="btn-delete"><i class="fas fa-trash"></i> Delete</button>
                </div>
            </div>
        `;
        
        eventsContainer.appendChild(eventCard);
    }

    // Open modal when Add Event button is clicked
    addEventBtn.addEventListener('click', function() {
        eventModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close modal when X or Cancel is clicked
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            eventModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close modal when clicking outside the modal content
    eventModal.addEventListener('click', function(e) {
        if (e.target === eventModal) {
            eventModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Handle form submission
    eventForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate required fields
        const requiredFields = ['eventTitle', 'eventDate', 'eventTime', 'eventLocation', 'eventDescription'];
        let isValid = true;
        
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field.value.trim()) {
                field.style.borderColor = 'var(--danger)';
                isValid = false;
            } else {
                field.style.borderColor = '#ddd';
            }
        });
        
        if (!isValid) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        // Create new event object
        const newEvent = {
            title: document.getElementById('eventTitle').value.trim(),
            date: document.getElementById('eventDate').value,
            time: document.getElementById('eventTime').value,
            location: document.getElementById('eventLocation').value.trim(),
            description: document.getElementById('eventDescription').value.trim(),
            guests: document.getElementById('eventGuests').value.split(',').map(g => g.trim()).filter(g => g),
            image: document.getElementById('eventImage').value.trim() || 'images/event-default.jpg'
        };
        
        // Add to sample events (in a real app, you would save to a database)
        sampleEvents.push(newEvent);
        
        // Create and add the new event card
        createEventCard(newEvent);
        
        // Close the modal
        eventModal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset the form
        eventForm.reset();
        
        // Show success message
        showNotification('Event created successfully!', 'success');
    });

    // Show notification
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Initial load
    loadEvents();
});