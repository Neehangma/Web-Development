# BusBuddy Backend - PostgreSQL with Sequelize

This is the backend API for BusBuddy bus booking system built with Node.js, Express, PostgreSQL, and Sequelize ORM.

## Features

- **Database**: PostgreSQL with Sequelize ORM
- **Authentication**: JWT-based authentication
- **API Testing**: Ready for Postman testing
- **Database Management**: Compatible with pgAdmin
- **Security**: Helmet, CORS, Rate limiting
- **Validation**: Express-validator for input validation
- **Logging**: Morgan for HTTP request logging

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- pgAdmin (optional, for database management)
- Postman (optional, for API testing)

## Installation

1. **Clone and navigate to backend directory**
   ```bash
   cd backend/@latest
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup PostgreSQL Database**
   - Install PostgreSQL on your system
   - Create a database named `busbuddy`
   - Note down your PostgreSQL credentials

4. **Environment Configuration**
   ```bash
   cp .env.sample .env
   ```
   
   Update the `.env` file with your PostgreSQL credentials:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=busbuddy
   DB_USER=your_postgres_username
   DB_PASSWORD=your_postgres_password
   DB_DIALECT=postgres
   
   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key_here
   
   # Other configurations...
   ```

5. **Run Database Migrations**
   ```bash
   npx sequelize-cli db:migrate
   ```

6. **Seed Database with Sample Data**
   ```bash
   npx sequelize-cli db:seed:all
   ```

7. **Start the Server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## Database Schema

The application uses the following main tables:

### Users Table
- `id` (UUID, Primary Key)
- `firstName`, `lastName` (String)
- `email` (String, Unique)
- `phone` (String, Unique)
- `password` (String, Hashed)
- `dateOfBirth` (Date)
- `gender` (Enum: Male, Female, Other)
- `userType` (Enum: passenger, admin, operator)
- `address` (JSONB)
- `preferences` (JSONB)
- `isVerified`, `isActive` (Boolean)
- `timestamps` (createdAt, updatedAt)

### Routes Table
- `id` (UUID, Primary Key)
- `routeName` (String)
- `origin`, `destination` (String)
- `distance` (Decimal)
- `estimatedDuration` (Integer, minutes)
- `basePrice` (Decimal)
- `stops` (JSONB Array)
- `status` (Enum: active, inactive, suspended)
- `timestamps`

### Buses Table
- `id` (UUID, Primary Key)
- `busNumber` (String, Unique)
- `busName` (String)
- `busType` (Enum: AC, Non-AC, Deluxe, Semi-Deluxe, Sleeper)
- `totalSeats`, `availableSeats` (Integer)
- `operatorId` (UUID, Foreign Key → Users)
- `routeId` (UUID, Foreign Key → Routes)
- `pricePerSeat` (Decimal)
- `amenities` (Array)
- `specifications` (JSONB)
- `timestamps`

### Bookings Table
- `id` (UUID, Primary Key)
- `bookingId` (String, Unique)
- `userId` (UUID, Foreign Key → Users)
- `busId` (UUID, Foreign Key → Buses)
- `routeId` (UUID, Foreign Key → Routes)
- `travelDate` (Date)
- `seatNumbers` (Array)
- `passengerDetails` (JSONB)
- `pricing` (JSONB)
- `payment` (JSONB)
- `status` (Enum: pending, confirmed, cancelled, completed)
- `timestamps`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (Protected)
- `PUT /api/auth/profile` - Update user profile (Protected)
- `POST /api/auth/logout` - User logout (Protected)

### Routes Management
- `GET /api/routes` - Get all routes
- `GET /api/routes/:id` - Get route by ID
- `POST /api/routes` - Create new route (Admin only)
- `PUT /api/routes/:id` - Update route (Admin only)
- `DELETE /api/routes/:id` - Delete route (Admin only)
- `GET /api/routes/popular` - Get popular routes

### Bus Management
- `GET /api/buses` - Get all buses
- `GET /api/buses/:id` - Get bus by ID
- `POST /api/buses` - Create new bus (Admin/Operator only)
- `PUT /api/buses/:id` - Update bus (Admin/Operator only)
- `DELETE /api/buses/:id` - Delete bus (Admin only)
- `GET /api/buses/search` - Search buses
- `GET /api/buses/route/:routeId` - Get buses by route

### Booking Management
- `GET /api/bookings` - Get all bookings (Admin only)
- `GET /api/bookings/user` - Get user bookings (Protected)
- `GET /api/bookings/:id` - Get booking by ID (Protected)
- `POST /api/bookings` - Create new booking (Protected)
- `PUT /api/bookings/:id` - Update booking (Protected)
- `DELETE /api/bookings/:id/cancel` - Cancel booking (Protected)

### System
- `GET /health` - Health check
- `GET /api` - API documentation

## Testing with Postman

1. **Import Collection**: Create a new Postman collection for BusBuddy API

2. **Environment Variables**: Set up environment variables in Postman:
   ```
   base_url: http://localhost:5000
   token: (will be set after login)
   ```

3. **Authentication Flow**:
   - Register a new user: `POST {{base_url}}/api/auth/register`
   - Login: `POST {{base_url}}/api/auth/login`
   - Copy the token from login response
   - Set Authorization header: `Bearer {{token}}`

4. **Sample Requests**:

   **Register User**:
   ```json
   POST /api/auth/register
   {
     "firstName": "John",
     "lastName": "Doe",
     "email": "john@example.com",
     "phone": "+1234567890",
     "password": "password123",
     "dateOfBirth": "1990-01-01",
     "gender": "Male"
   }
   ```

   **Login**:
   ```json
   POST /api/auth/login
   {
     "email": "john@example.com",
     "password": "password123"
   }
   ```

   **Get Routes**:
   ```
   GET /api/routes
   ```

   **Create Booking**:
   ```json
   POST /api/bookings
   Headers: Authorization: Bearer YOUR_TOKEN
   {
     "busId": "550e8400-e29b-41d4-a716-446655440201",
     "routeId": "550e8400-e29b-41d4-a716-446655440101",
     "travelDate": "2024-12-15",
     "seatNumbers": ["A1", "A2"],
     "passengerDetails": [
       {
         "name": "John Doe",
         "age": 30,
         "gender": "Male"
       }
     ],
     "contactDetails": {
       "phone": "+1234567890",
       "email": "john@example.com"
     }
   }
   ```

## Using pgAdmin

1. **Connect to Database**:
   - Host: localhost
   - Port: 5432
   - Database: busbuddy
   - Username: your_postgres_username
   - Password: your_postgres_password

2. **View Tables**: Navigate to `Databases > busbuddy > Schemas > public > Tables`

3. **Query Data**: Use the Query Tool to run SQL queries:
   ```sql
   -- View all users
   SELECT * FROM users;
   
   -- View all routes with bus count
   SELECT r.*, COUNT(b.id) as bus_count 
   FROM routes r 
   LEFT JOIN buses b ON r.id = b."routeId" 
   GROUP BY r.id;
   
   -- View bookings with user and route details
   SELECT 
     b."bookingId",
     u."firstName" || ' ' || u."lastName" as passenger_name,
     r."origin" || ' → ' || r."destination" as route,
     b."travelDate",
     b.status
   FROM bookings b
   JOIN users u ON b."userId" = u.id
   JOIN routes r ON b."routeId" = r.id
   ORDER BY b."createdAt" DESC;
   ```

## Database Commands

```bash
# Create database
npx sequelize-cli db:create

# Run migrations
npx sequelize-cli db:migrate

# Undo last migration
npx sequelize-cli db:migrate:undo

# Run seeders
npx sequelize-cli db:seed:all

# Undo all seeders
npx sequelize-cli db:seed:undo:all

# Reset database (drop, create, migrate, seed)
npm run db:reset
```

## Sample Data

The seeder creates:

**Users**:
- Admin: admin@busbuddy.com / password123
- Operator: operator@busbuddy.com / password123
- Passenger: john.doe@example.com / password123

**Routes**:
- Kathmandu → Pokhara (200km, 6 hours, ₹800)
- Kathmandu → Chitwan (150km, 5 hours, ₹600)
- Pokhara → Chitwan (120km, 4 hours, ₹500)

**Buses**:
- NP-01-001: Himalayan Express (AC, 40 seats)
- NP-02-002: Safari Cruiser (Deluxe, 35 seats)
- NP-03-003: Valley Connect (Semi-Deluxe, 45 seats)

## Development

```bash
# Start development server with auto-reload
npm run dev

# Run tests
npm test

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

## Production Deployment

1. Set `NODE_ENV=production`
2. Update database credentials in `.env`
3. Run migrations: `npx sequelize-cli db:migrate`
4. Start server: `npm start`

## Troubleshooting

**Database Connection Issues**:
- Ensure PostgreSQL is running
- Check database credentials in `.env`
- Verify database exists: `psql -U postgres -l`

**Migration Errors**:
- Check if database exists
- Ensure proper permissions
- Run migrations one by one if needed

**Seeder Issues**:
- Run migrations first
- Check for existing data conflicts
- Clear database if needed: `npm run db:reset`

## Support

For issues and questions:
1. Check the logs for detailed error messages
2. Verify database connection and credentials
3. Ensure all dependencies are installed
4. Check API endpoints with Postman
5. Use pgAdmin to verify database structure and data