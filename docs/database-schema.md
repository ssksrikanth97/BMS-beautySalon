## Database Schema

### Users

- `id` (Primary Key)
- `name` (String)
- `email` (String, unique)
- `phone` (String, unique)
- `password` (String, hashed)
- `role` (Enum: 'customer', 'admin', 'staff')
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)

### Services

- `id` (Primary Key)
- `name` (String)
- `description` (Text)
- `price` (Decimal)
- `duration` (Integer, in minutes)
- `image` (String, URL)
- `category` (String)
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)

### Bookings

- `id` (Primary Key)
- `userId` (Foreign Key to Users)
- `serviceId` (Foreign Key to Services)
- `slotId` (Foreign Key to Slots)
- `status` (Enum: 'confirmed', 'pending', 'cancelled')
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)

### Slots

- `id` (Primary Key)
- `startTime` (DateTime)
- `endTime` (DateTime)
- `isAvailable` (Boolean, default: true)
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)

### Admin Settings

- `id` (Primary Key)
- `settingName` (String, unique)
- `settingValue` (String)
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)
