# AI Voice Agent

Universal AI voice agent library for React applications. Easily integrate voice AI capabilities into any application by simply changing the system prompt.

## Structure

```
ai-voice-agent/
├── src/
│   ├── lib/          # Library code (core, hooks, utils, types)
│   └── app/          # Demo application
├── dist/             # Built library (after npm run build)
├── index.html        # Demo app entry point
└── vite.config.ts    # Vite config for demo app
```

## Installation

```bash
npm install
```

## Development

### Run Demo Application

```bash
npm run dev
```

This starts the demo application on `http://localhost:3000` showing how to use the library.

### Build Library

```bash
npm run build:lib
```

This compiles the library to `dist/` directory.

## Usage in Your Project

### Option 1: Copy Library to Your Project

1. Copy `src/lib/` folder to your project
2. Configure path alias in your bundler:

**vite.config.ts:**
```ts
resolve: {
  alias: {
    'ai-voice-agent': path.resolve(__dirname, './src/lib'),
  }
}
```

**tsconfig.json:**
```json
{
  "compilerOptions": {
    "paths": {
      "ai-voice-agent": ["./src/lib"]
    }
  }
}
```

### Option 2: Use as NPM Package (after publishing)

```bash
npm install ai-voice-agent
```

## Quick Start

### Using React Hook

```tsx
import { useVoiceAgent } from 'ai-voice-agent';

function MyApp() {
  const { status, messages, isAssistantTalking, start, stop } = useVoiceAgent({
    apiKey: 'your-api-key',
    systemInstruction: 'You are a helpful assistant.',
    voiceName: 'Kore',
  });

  return (
    <div>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      {/* Your UI */}
    </div>
  );
}
```

### Using Core Class

```tsx
import { VoiceAgent } from 'ai-voice-agent';

const agent = new VoiceAgent(
  {
    apiKey: 'your-api-key',
    systemInstruction: 'You are a helpful assistant.',
  },
  {
    onMessage: (message) => console.log(message),
    onStatusChange: (status) => console.log(status),
  }
);

await agent.start();
```

## Configuration

### VoiceAgentConfig

- `apiKey` (required): Google GenAI API key
- `systemInstruction` (required): System prompt for the AI
- `model`: Model name (default: `gemini-2.5-flash-native-audio-preview-12-2025`)
- `voiceName`: Voice name (default: `Kore`)
- `inputSampleRate`: Input audio sample rate (default: `16000`)
- `outputSampleRate`: Output audio sample rate (default: `24000`)

## Creating Different Bot Personalities

The beauty of this library is that you can create completely different bots by just changing the system prompt:

```tsx
// Fitness coach bot
const fitnessBot = useVoiceAgent({
  apiKey: 'your-key',
  systemInstruction: 'You are a fitness coach...',
  voiceName: 'Kore',
});

// Customer service bot
const supportBot = useVoiceAgent({
  apiKey: 'your-key',
  systemInstruction: 'You are a customer service agent...',
  voiceName: 'Aoede',
});

// Medical assistant bot
const medicalBot = useVoiceAgent({
  apiKey: 'your-key',
  systemInstruction: 'You are a medical assistant...',
  voiceName: 'Charon',
});
```

All use the same code - just change the prompt!

## Environment Variables

Create a `.env` file in the root directory:

```
GEMINI_API_KEY=your-api-key-here
```

## License

MIT
