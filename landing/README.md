
# Create AI Solutions Overview

This is a code bundle for Create AI Solutions Overview. The original project is available at https://www.figma.com/design/tF29HdftfV57DvnOmkr1NZ/Create-AI-Solutions-Overview.

## Running the code

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.

## Calendly Integration

The "Book a no-pressure AI discussion" button is integrated with Calendly. To configure your Calendly URL:

1. Create a `.env` file in the root directory
2. Add your Calendly event URL:
   ```
   VITE_CALENDLY_URL=https://calendly.com/your-username/ai-discussion
   ```
3. Replace `your-username` and `ai-discussion` with your actual Calendly username and event name

If the environment variable is not set, the default URL will be used (you should update it in `src/lib/utils/calendly.ts`).
  