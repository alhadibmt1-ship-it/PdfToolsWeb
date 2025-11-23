# PDF Master Tools - Design Guidelines

## Design Approach
**Selected Approach:** Clean Modern Utility Design (inspired by Dropbox, Google Drive, and modern SaaS tools)
**Rationale:** This is a utility-focused application where efficiency, clarity, and trust are paramount. Users need to quickly find tools, upload files, and complete tasks without friction.

## Typography System

**Primary Font:** Inter (via Google Fonts CDN)
**Secondary Font:** System UI fallback

**Hierarchy:**
- H1 (Page Titles): 2.5rem (40px), font-weight 700, leading tight
- H2 (Section Titles): 2rem (32px), font-weight 600, leading snug
- H3 (Tool Card Titles): 1.25rem (20px), font-weight 600
- Body Text: 1rem (16px), font-weight 400, leading relaxed
- Small Text (descriptions): 0.875rem (14px), font-weight 400
- Button Text: 0.9375rem (15px), font-weight 500

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16, 20
- Micro spacing (between related items): p-2, gap-2
- Standard spacing (cards, sections): p-6, p-8, gap-6
- Macro spacing (page sections): py-12, py-16, py-20

**Container Widths:**
- Homepage content: max-w-7xl mx-auto px-6
- Tool pages: max-w-4xl mx-auto px-6
- Upload zones: max-w-2xl

**Grid System:**
- Tool cards grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6
- Two-column layouts (tool page): grid-cols-1 lg:grid-cols-2 gap-8

## Component Library

### Header
- Fixed top navigation with subtle backdrop blur
- Logo left, navigation center, CTA right
- Height: h-16, with py-4 padding
- Navigation items: gap-8, hover underline animation

### Homepage Hero
- Centered content, py-16 md:py-20
- Headline + subtitle + visual indicator (animated upload icon)
- No background image - clean gradient or solid treatment

### Tool Cards (Homepage Grid)
- Rounded corners: rounded-xl
- Padding: p-6
- Hover effect: translate-y-1 transition, enhanced shadow
- Icon container: w-14 h-14 rounded-lg mb-4
- Title + 2-line description
- "Use Tool" link with arrow icon

### File Upload Zone
- Large drop area: min-h-64 rounded-2xl border-2 border-dashed
- Centered icon (upload cloud) + text: "Drag & drop or click to upload"
- Supported formats shown below: text-sm
- Hover state: enhanced border, slight scale

### Processing State
- Progress bar: h-2 rounded-full with animated fill
- Percentage display above bar
- Processing message below: "Processing your PDF..."

### Success/Error Notifications
- Toast-style: fixed top-4 right-4
- Rounded: rounded-lg, padding p-4
- Icon + message + close button
- Auto-dismiss after 4 seconds

### Action Buttons
- Primary (Download, Process): px-8 py-3 rounded-lg font-medium
- Secondary (Cancel, Back): px-6 py-2.5 rounded-md
- Icon buttons: w-10 h-10 rounded-full

### Tool Page Layout
- Breadcrumb navigation at top: text-sm, gap-2
- Tool title + description: mb-8
- Two-column on desktop: upload zone left, options/settings right
- Download section appears after processing: mt-8

### Footer
- Three-column layout on desktop, stacked on mobile
- Column 1: Branding + tagline
- Column 2: Quick links to all 11 tools (grid-cols-2 gap-2)
- Column 3: Social links
- Bottom bar: copyright centered, py-6

## Page-Specific Layouts

### Individual Tool Pages (All 11 Tools)
- Consistent structure across all tool pages
- Upper section: Tool name, description, and instructions
- Main section: Upload area with clear "Choose File" or drag-drop zone
- Options panel (when applicable): checkboxes, radio buttons, range sliders
- Action button prominently placed: "Merge PDFs", "Compress", "Convert", etc.
- Results area: appears after processing with download button

### Settings Panels (for tools with options)
- Compress: Radio buttons for quality (Low/Medium/High)
- Split: Page range inputs with validation
- Rotate: Rotation angle selector (90°/180°/270°)
- Password Protect: Password input with strength indicator
- Delete Pages: Page selection checkboxes with preview numbers

## Interactions & Animations

**Use Sparingly:**
- Subtle scale on card hover: hover:scale-102
- Smooth transitions: transition-all duration-200
- Upload zone pulse on drag-over
- Progress bar fill animation
- Success checkmark animation (single bounce)

**No animations for:**
- Page transitions
- Scroll effects
- Background movements

## Responsive Behavior

**Mobile (base):**
- Single column layouts
- Full-width upload zones
- Stacked tool cards
- Simplified header with hamburger menu

**Tablet (md: 768px):**
- 2-column tool grid
- Side-by-side options panels

**Desktop (lg: 1024px+):**
- 3-4 column tool grid
- Two-column tool page layouts
- Expanded header navigation

## Accessibility
- All interactive elements: min-height 44px (touch target size)
- Focus rings visible on all inputs/buttons
- Clear labels for all form inputs
- ARIA labels for icon-only buttons
- High contrast text for readability

## Images
**No hero images required** - this is a utility-first application. Use icons instead:
- Tool card icons: Simple, line-style icons for each tool type (merge, split, compress, convert, lock, unlock, rotate, delete, extract, word)
- Upload zone icon: Cloud with upward arrow
- Success/error icons: Checkmark circle, X circle

All icons from **Heroicons** via CDN for consistency.