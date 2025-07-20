# Vigovia Itinerary Builder

A modern, professional travel itinerary builder designed for travel agents, tour operators, and travel consultants. Create comprehensive travel plans with activities, transfers, flights, and generate beautiful PDF outputs for clients.

## 🌟 Features

### Core Functionality
- **Smart Itinerary Planning**: Create detailed day-by-day travel plans with activities, transfers, and accommodations
- **Real-time Scheduling**: Automatically organize travel timelines with optimal timing and logistics
- **Flight Integration**: Seamlessly manage flight details and connect them with travel itineraries
- **Group Travel Ready**: Plan for solo trips or groups with capacity management and shared activities
- **Global Destinations**: Create itineraries for any destination worldwide
- **Professional PDF Generation**: Generate beautiful, printable itineraries that impress clients

### User Experience
- **Auto-save Functionality**: Automatically saves work to localStorage to prevent data loss
- **Step-by-step Builder**: Intuitive 3-step process for creating itineraries
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Print-friendly Output**: Optimized PDF layouts for professional presentation

### Business Features
- **Customer Management**: Store customer details (name, email, phone)
- **Pricing Integration**: Automatic calculation of total trip costs
- **Professional Branding**: Branded outputs with company information
- **Terms & Conditions**: Built-in legal disclaimers and terms

## 🚀 Tech Stack

### Frontend
- **Next.js 15.2.4** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework

### UI Components
- **Radix UI** - Accessible, unstyled UI primitives
- **Lucide React** - Beautiful SVG icons
- **Shadcn/ui** - Pre-built accessible components
- **class-variance-authority** - Component variant management

### Form & Validation
- **React Hook Form** - Performant forms with easy validation
- **Zod** - TypeScript-first schema validation
- **@hookform/resolvers** - Form validation resolvers

### Additional Libraries
- **date-fns** - Modern JavaScript date utility library
- **next-themes** - Theme switching functionality
- **embla-carousel-react** - Touch-friendly carousel component
- **sonner** - Toast notifications
- **cmdk** - Command menu component

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vigovia-itinerary-builder
   ```

2. **Install dependencies**
   ```bash
   # Using pnpm (recommended)
   pnpm install

   # Or using npm
   npm install

   # Or using yarn
   yarn install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🏗️ Project Structure

```
vigovia-itinerary-builder/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   ├── create/            # Itinerary builder
│   │   └── page.tsx
│   └── preview/           # PDF preview & generation
│       ├── loading.tsx
│       └── page.tsx
├── components/            # Reusable components
│   ├── theme-provider.tsx
│   └── ui/               # UI components (shadcn/ui)
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and configurations
│   └── utils.ts
├── styles/               # Additional styles
├── package.json          # Dependencies and scripts
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## 🎯 Usage

### Creating an Itinerary

1. **Basic Information** (Step 1)
   - Enter customer details (name, email, phone)
   - Set destination
   - Select travel dates
   - System automatically calculates trip duration

2. **Day-by-Day Planning** (Step 2)
   - Add activities for each day with:
     - Activity name and description
     - Time and duration
     - Location and pricing
   - Add transfers between locations with:
     - Transport type (car, bus, flight, etc.)
     - Route details and timing
     - Capacity and pricing

3. **Flight Management** (Step 3)
   - Add departure and return flights
   - Include airline, flight number, and timing details
   - Set pricing for complete cost calculation

4. **Preview & Generate**
   - Review complete itinerary
   - Generate professional PDF
   - Print or save for client delivery

### Auto-save Feature

The application automatically saves your work to browser localStorage every second while you're working. This ensures you never lose your progress, even if you accidentally close the tab or browser.

## 🎨 Design System

The application uses a consistent design system with:

- **Primary Color**: #541C9C (Deep Purple)
- **Secondary Color**: #680099 (Royal Purple)
- **Accent Color**: #936FE0 (Light Purple)
- **Typography**: System fonts with careful hierarchy
- **Spacing**: Consistent 8px grid system
- **Components**: Fully accessible Radix UI primitives

## 📱 Responsive Design

The application is fully responsive and works across:
- **Desktop**: Full-featured experience with side-by-side layouts
- **Tablet**: Optimized touch interactions and collapsible sections
- **Mobile**: Mobile-first design with thumb-friendly navigation

## 🖨️ PDF Generation

The preview page is optimized for PDF generation with:
- Print-friendly CSS media queries
- Professional layout with company branding
- Automatic page breaks for better formatting
- Terms and conditions inclusion
- Total pricing display

## 🚀 Deployment

### Build for Production

```bash
pnpm build
# or
npm run build
# or
yarn build
```

### Start Production Server

```bash
pnpm start
# or
npm start
# or
yarn start
```

### Deploy to Vercel (Recommended)

1. Push your code to a Git repository
2. Connect your repository to [Vercel](https://vercel.com)
3. Vercel will automatically deploy your application

### Deploy to Other Platforms

The application can be deployed to any platform that supports Node.js applications:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify
- Google Cloud Platform

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory for any environment-specific configurations:

```env
# Add any environment variables here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Tailwind CSS

The application uses a custom Tailwind configuration with:
- Custom color palette
- Extended spacing scale
- Custom font families
- Animation utilities

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- **Email**: contact@vigovia.com
- **Phone**: +91-98xxx64641
- **Documentation**: Check the inline code comments and component documentation

## 🙏 Acknowledgments

- **Shadcn/ui** for the beautiful component library
- **Radix UI** for accessible primitives
- **Vercel** for the amazing Next.js framework
- **Tailwind CSS** for the utility-first CSS approach

---

**Built with ❤️ by Vigovia Travel Technologies (P) Ltd.**

Create beautiful travel itineraries that wow your clients and streamline your workflow.
