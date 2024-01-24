# Bangazon Hip Hop Pizza & Wangs - Full Stack Project

# Overview
A point of sale application designed as a mock up request for a restaurant client needing to update and streamline the order taking and processing capacity of their business model to enhance revenue and profits.

# Entity Relationship Diagram
[ERD](https://dbdiagram.io/d/Bangazon-HHPandW-6594c436ac844320ae21eaed)

# Process Flow
[Wireframes](https://www.figma.com/file/2M4352Jkh7hRCVAqSv7ek9/Bangazon---Hip-Hop-Pizza-%26-Wangs?type=whiteboard&node-id=0-1&t=WfSsGiIgjwbFTRj5-0)

# Project Board
[View Project Board](https://github.com/users/DavidBPoole/projects/3/views/1)

# User Description
- a user of this application is a restaurant admin, cashier, server or order tracking system

# Features
1. **User Authentication**: Secure login for staff using Firebase Auth to ensure authorized access to the POS system.
2. **Home Screen Display**: A welcoming interface post-login, offering options to view and create orders, and check revenue.
3. **Comprehensive Order Management**:
   - **View All Orders**: Access to a detailed list of all orders.
   - **Order Details and Associated Items**: Ability to view specific details and items for each order.
   - **Create and Update Orders**: Functionality to add new orders and modify existing ones, including customer details and order type.
   - **Delete Orders and Order Items**: Options to remove orders or specific items from the system.
4. **Order Item Management**:
   - **Add Order Items**: Capability to include new items to orders. While adding items to an order, menu items will be displayed for selection. However, there will be no functionality for creating, editing, or deleting menu items available to the cashier.
   - **Update and Delete Order Items**: Update details like name and price of order items, and remove specific items from an order.
5. **Closing and Revenue Tracking**:
   - **Close Order with Restrictions**: Feature to finalize orders with payment type and tip amount, changing order status from "Open" to "Closed".
   - **Revenue Node Addition**: Automatic creation of a revenue node upon order closure, capturing essential financial details.
   - **View Total Revenue**: Ability to view the cumulative revenue generated.

# Contributors
[David Poole](https://github.com/DavidBPoole)

# Back-End Code
[View Back-End Repository](https://github.com/DavidBPoole/bangazon-hip-hop-pizza-and-wangs-server)

# Tech Stacks
Python/Django
ReactJS
NextJS
JS6
CSS3
HTML5
Firebase
Bootstrap
Figma

# React/Next.js Django Auth Template Setup

## Topics
- [Get Started](#getting-started)
- [Starting the Project](#starting-the-project)
___
## Getting Started
### Use Template
#### 1. To get started, click the GREEN "Use this Template" button at the top of the repo
<img width="915" alt="Screen Shot 2022-07-06 at 12 54 01 PM" src="https://user-images.githubusercontent.com/29741570/177612998-4aac9237-5a1e-4f13-8ae0-468587521564.png">

#### 2. Make sure YOUR github account is selected in the dropdown and name your project
<img width="763" alt="Screen Shot 2022-07-06 at 12 54 48 PM" src="https://user-images.githubusercontent.com/29741570/177613126-dd38f678-7553-4f27-8a4a-75680f14d71e.png">

#### 3. Clone your new repo to your local machine
#### 4. Go to the **NEXT** section

## Starting the Project
1. Create a Firebase project and set up authentication. Use [these videos](https://vimeo.com/showcase/codetracker-firebase) as a refresher if needed.
1. Create a `.env` file at the root of the project
1. Copy/Paste the contents of the `.env.sample` file to your newly created `.env` file.
1. Copy over all of your Firebase values into the `.env` file.
1. Open the `package.json` file and change the `name` property to the name of your application, and `author` to  your name.
1. From your command line, be in the root directory and run `npm install` OR `npm i` for short.
1. Next, run `npm run prepare`. This command sets up husky to track eslint errors on commit that will make your deploy fail on Netlify.
1. To start your application, run `npm run dev`. THIS IS THE COMMAND YOU WILL USE TO RUN YOUR DEVELOPMENT SERVER FROM NOW ON.
1. Open [http://localhost:3000](http://localhost:3000) with your browser.

### If you see this, you are set to go!
<img width="450" alt="Screen Shot 2022-07-06 at 1 07 27 PM" src="https://user-images.githubusercontent.com/29741570/177615077-9b6a75bc-0260-4d29-bb88-bd95a3140687.png">


You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

**NOTES:** 
- If you see the following error, you did not follow all the setup steps correctly and failed to add your Firebase creds. Go back and do that NOW.

<img width="1043" alt="Screen Shot 2022-07-06 at 11 18 45 AM" src="https://user-images.githubusercontent.com/29741570/177612501-c2628f18-4bbd-4de9-aae6-27ffba1172d6.png">
        
## Learn More about Next.js
To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
