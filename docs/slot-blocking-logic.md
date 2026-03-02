## Slot Blocking Logic

1.  **Initial State:** All created slots are initially marked as `isAvailable = true`.

2.  **User Selects a Slot:**
    - When a user selects a time slot and proceeds to the booking confirmation screen, the selected `Slot` is **not** yet blocked. We can add a temporary, short-lived lock in a cache (like Redis) to prevent immediate double-booking while the user confirms.

3.  **User Confirms Booking:**
    - The user clicks the final "Confirm Booking" button.
    - The system creates a `Booking` record with a `status` of 'pending'.
    - At this point, the `Slot` associated with the booking should be marked as `isAvailable = false` in the database.
    - This ensures that no one else can book the same slot.

4.  **Admin Approves Booking:**
    - The admin sees the 'pending' booking.
    - The admin approves the booking.
    - The `Booking` `status` is changed to 'confirmed'. The `Slot` remains `isAvailable = false`.

5.  **Admin Rejects Booking / User Cancels Booking:**
    - If the admin rejects the 'pending' booking or the user cancels their 'confirmed' booking:
    - The `Booking` `status` is changed to 'cancelled'.
    - The corresponding `Slot` has its `isAvailable` status set back to `true`, making it available for others to book.

6.  **Handling Overlapping Services:**
    - When a booking is made for a service with a specific `duration`, the system needs to block out the entire time range.
    - For example, if a user books a 90-minute service at 10:00 AM, the system should block the time from 10:00 AM to 11:30 AM.
    - This can be handled by creating multiple smaller slot increments (e.g., 30 minutes) and the booking will consume the number of slots that equate to the service duration. Or, when a time is selected for a booking, the query for available slots should check for overlaps with existing bookings.

7.  **Concurrency Control:**
    - To prevent race conditions where two users try to book the same slot at the exact same time, a database transaction should be used when creating a booking. The transaction should:
        1.  Check if the slot is available.
        2.  If it is, create the `Booking` record.
        3.  Update the `Slot` to be unavailable.
        4.  Commit the transaction.
    - If the slot becomes unavailable between steps 1 and 3, the transaction will fail, preventing a double booking.
