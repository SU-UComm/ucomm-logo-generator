# Stanford University Communications Logo Generator

A React application for generating Stanford University Communications logos in both vertical and horizontal layouts, following official Stanford brand guidelines.

## Features

- 🎓 Generate Stanford-compliant logos with official branding
- 📐 Two layout options: Vertical (stacked) and Horizontal orientations
- 🎨 Customizable department/unit names while maintaining brand consistency
- 🎯 Real-time preview of logo designs
- 💾 Export logos in multiple formats (PNG, SVG, JPG, EPS, ZIP)
- 📱 Responsive design for desktop and mobile
- ✅ Follows Stanford University visual identity standards

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [Yarn](https://yarnpkg.com/) package manager

## Installation

1. Clone the repository:

```bash
git clone https://github.com/SU-SWS/ucomm-logo-generator.git
cd ucomm-logo-generator
```

2. Install dependencies:

```bash
yarn install
```

3. Start the development server:

```bash
yarn start
```

4. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Available Scripts

- `yarn start` - Runs the app in development mode
- `yarn dev` - Runs the app in development mode with Node.js inspector attached
- `yarn build` - Builds the app for production
- `yarn preview` - Builds and serves the production build locally
- `yarn test` - Runs linting and type checking
- `yarn lint` - Runs linting and type checking
- `yarn analyze` - Builds the app with bundle analysis enabled

## Usage

1. **Choose Layout Style**: Select between multiple display options in either a vertical (stacked) or horizontal logo orientation
2. **Enter Department/Unit Name**: Add your Stanford department, school, or unit name
3. **Preview**: See real-time changes with official Stanford styling (preview shown at 6x actual size for better visibility)
4. **Export**: Download your logo in preferred format while maintaining brand compliance. The ZIP download includes all file types and black and white versions.

## Logo Types

### Vertical Layout (Stacked)

Perfect for:

- Business cards
- Letterheads
- Narrow digital spaces
- Mobile applications
- Square social media profiles

### Horizontal Layout

Ideal for:

- Website headers
- Email signatures
- Social media banners
- Presentation slides
- Wide format applications

## Brand Guidelines

This tool generates logos that comply with Stanford University's visual identity guidelines:

- Uses official Stanford fonts and typography
- Maintains proper spacing and proportions
- Follows approved color schemes
- Ensures consistent lockup arrangements

For complete brand guidelines, visit [Stanford's Identity Toolkit](https://identity.stanford.edu/).

## Technologies Used

- **React** - Frontend framework
- **Yarn** - Package management
- **HTML5 Canvas** - Logo rendering and export
- **CSS3** - Styling and responsive design
- **Stanford Web Components** - Official Stanford UI elements

## Development

### Project Structure

```
src/
├── components/     # React components
├── hooks/         # Custom React hooks
├── styles/        # CSS and styling files
└── zod/           # Zod validation schemas
app/
├── api/           # Next.js API routes
├── [logo]/        # Dynamic logo page route
├── layout.tsx     # Root layout
└── page.tsx       # Home page
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/logo-enhancement`)
3. Commit your changes (`git commit -m 'Add new logo feature'`)
4. Push to the branch (`git push origin feature/logo-enhancement`)
5. Open a Pull Request

Please ensure all contributions maintain Stanford brand compliance.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- For technical issues: [Open an issue](https://github.com/SU-SWS/ucomm-logo-generator/issues)
- For brand guideline questions: Contact Stanford University Communications
- For general Stanford web development: Visit [Stanford Web Services](https://uit.stanford.edu/service/web)

## Related Resources

- [Stanford Identity Toolkit](https://identity.stanford.edu/)
- [Stanford Web Components](https://github.com/SU-SWS/decanter)
- [Stanford Communications Guidelines](https://ucomm.stanford.edu/)

---

**Creating Stanford-compliant logos made simple! 🌲**
