## User Flow Diagrams

### Mobile App (Customer)

1.  **Registration/Login:**
    - User opens the app -> Chooses to register or log in.
    - **Registration:** Enters name, email, phone, password -> Receives OTP -> Verifies OTP -> Profile created.
    - **Login:** Enters email/phone and password/OTP -> Accesses home screen.

2.  **Booking a Service:**
    - User is on the home screen -> Browses service categories -> Selects a service.
    - Views service details (price, duration, description) -> Clicks "Book Now".
    - Sees a calendar -> Selects a date -> Views available time slots.
    - Selects a time slot -> Confirms booking details -> Clicks "Confirm Booking".
    - Booking is created with 'pending' status -> Slot is temporarily blocked.

3.  **Managing Bookings:**
    - User goes to "My Bookings" -> Views upcoming and past bookings.
    - Selects an upcoming booking -> Has options to cancel or request reschedule.
    - **Cancel:** Confirms cancellation -> Booking status changes to 'cancelled'.
    - **Reschedule:** Proposes a new date/time -> Request sent to admin.

### Web Admin Panel (Salon Manager)

1.  **Login:**
    - Admin goes to the admin URL -> Enters email and password -> Accesses the dashboard.

2.  **Managing Slots:**
    - Admin navigates to "Manage Slots" -> Views a calendar.
    - Clicks on a date to add new slots (startTime, endTime, repeat options).
    - Clicks on a slot to disable/enable it.
    - Can mark an entire day as non-working.

3.  **Managing Bookings:**
    - Admin views all bookings on the dashboard or in the "Bookings" section.
    - Can filter by date, status, etc.
    - **Approve/Reject:** Clicks on a 'pending' booking -> Approves or rejects it.
    - **Edit/Reschedule:** Clicks on a confirmed booking -> Changes the service, date, or time.
    - **Manual Booking:** Clicks "Add Manual Booking" -> Selects user, service, date, and time.
