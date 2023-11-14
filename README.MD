# InnSight AI

Welcome to InnSight AI, your all-in-one solution for managing and optimizing your hotel business. InnSight AI is a powerful and intuitive application designed specifically for hotel employees, offering a range of features and tools to streamline your operations, enhance guest experiences, and boost your revenue.

### Overview
This repository contains the source code and documentation for a comprehensive hotel management application designed for use by hotel employees. The application provides a range of features to streamline hotel operations and enhance the guest experience.

### [Live Demo](https://innsight-ai.vercel.app/)
   Credentials to login:
      Email address = admin@admin.com
      Password = Admin123!

### Features
1. **User Management**
   - Hotel employees must log in to access the application.
   - New users can only be registered within the application to ensure that only authorized hotel employees have accounts.
   - Users can upload an avatar, change their name, and update their password.

2. **Cabin Management**
   - A table view displays all cabins, showing cabin photos, names, capacity, price, and current discounts.
   - Users can update or delete existing cabins and create new cabins, including the ability to upload cabin photos.

3. **Booking Management**
   - A table view provides information on all bookings, including arrival and departure dates, status, paid amount, and cabin and guest data.
   - Booking status can be "unconfirmed," "checked in," or "checked out," with filter options for easy access.
   - Additional booking data includes the number of guests, number of nights, guest observations, and the option to book breakfast (with breakfast price).

4. **Booking Operations**
   - Users can delete bookings and manage check-ins and check-outs.
   - On check-in, employees can accept payments outside the app and then confirm payment receipt within the app.
   - Guests can add breakfast for their entire stay during check-in if not already booked.

5. **Guest Data**
   - Guest data includes full name, email, national ID, nationality, and a country flag for easy identification.

6. **Dashboard**
   - The initial app screen serves as a dashboard with the following features:
     - List of guests checking in and out on the current day with the ability to perform related tasks.
     - Statistics on recent bookings, sales, check-ins, and occupancy rates.
     - Charts displaying daily hotel sales (total and extras such as breakfast) and stay duration statistics.

7. **Application Settings**
   - Users can define application-wide settings, including breakfast price, minimum and maximum nights per booking, and maximum guests per booking.
   - Customizable theme options for a personalized user experience.

8. **AI Assistants**
   - InnSight AI chat assistant to provide support and insights to users.

### Installation

1. Install the repository
    ```
        git clone https://github.com/sovereignofficial/innsight.ai.git
    ```
2. Install dependencies
    ```
        npm install 
        pnpm install
        yarn | yarn install
        bun install
    ```
3. Create a .env file at the root folder of the app and then define your Supabase and OpenAI keys like this
    ```
      VITE_SUPABASE_AI_USER_UID ='your-ai-user-id'
      VITE_SUPABASE_AI_AVATAR='your-ai-user-avatar-url'


      VITE_OPENAI_KEY='your-openai-api-key'
      VITE_SUPABASE_KEY='your-supabase-key'
      VITE_SUPABASE_SERVICE_KEY='your-supabase-service-key'
      VITE_SECRET_KEY='any-secret-key-you-defined'

      VITE_AMAZON_ACCESS_KEY_ID='your-iam-user-access-key'
      VITE_AMAZON_SECRET_ACCESS_KEY='your-iam-user-secret-access-key'
      VITE_AMAZON_REGION='your-iam-region'
    ```
4. Start the app 
 ```
    npm run dev
    pnpm run dev
    yarn dev
    bun run dev
 ```

### License
This project is licensed under the [MIT License](LICENSE).

### Support and Contributions

This app developed by solo dev and there might be some bugs happened.I would like to get informed if you discover some lapse. For questions, issues, or contributions, please open a GitHub issue or contact me [egemenvkdvn35@gmail.com](egemenvkdvn35@gmail.com).

