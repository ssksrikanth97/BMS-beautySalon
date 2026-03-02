## Notification Workflow

### User Notifications (Push Notifications via FCM)

1.  **Booking Confirmation:**
    - **Trigger:** Admin approves a booking.
    - **Recipient:** User who made the booking.
    - **Message:** "Your booking for [Service Name] on [Date] at [Time] is confirmed."

2.  **Booking Cancellation:**
    - **Trigger:** Admin cancels a booking.
    - **Recipient:** User who made the booking.
    - **Message:** "Your booking for [Service Name] on [Date] at [Time] has been cancelled."

3.  **Booking Rescheduled:**
    - **Trigger:** Admin reschedules a booking.
    - **Recipient:** User who made the booking.
    - **Message:** "Your booking has been rescheduled to [New Date] at [New Time]."

4.  **Booking Reminder:**
    - **Trigger:** Timed job running 24 hours and 1 hour before the booking.
    - **Recipient:** User who made the booking.
    - **Message:** "Reminder: You have a booking for [Service Name] tomorrow at [Time]."

### Admin Notifications (Email or In-App)

1.  **New Booking:**
    - **Trigger:** User creates a new booking.
    - **Recipient:** Salon Manager/Admin.
    - **Message:** "New booking from [User Name] for [Service Name] on [Date] at [Time]."

2.  **Booking Cancellation Request:**
    - **Trigger:** User requests to cancel a booking.
    - **Recipient:** Salon Manager/Admin.
    - **Message:** "[User Name] has requested to cancel their booking for [Service Name] on [Date] at [Time]."
