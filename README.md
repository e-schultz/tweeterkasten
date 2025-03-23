
# Notum - Twitter-style Zettelkasten

![Notum Banner](https://lovable.dev/opengraph-image-p98pqg.png)

## Project Description

Notum is a lightweight note-taking application inspired by the concept of using Twitter as a Zettelkasten system. It allows users to create short-form notes (similar to tweets) that can be interconnected through tags and references. The application embraces the Zettelkasten method's principles of atomic notes and meaningful connections while providing a familiar, social media-inspired interface.

## Installation Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/notum.git
cd notum
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:8080` to view the application.

## Usage Instructions

### Creating Notes
1. Enter your note in the text area at the top of the page (limited to 280 characters).
2. Use hashtags (#) to create or link to tags (e.g., #idea, #concept).
3. Click the "Create Note" button to save your note.

### Viewing Notes
- **Timeline View:** Shows all notes in chronological order (newest first).
- **Graph View:** Visualizes the connections between notes and tags.
- **Search View:** Allows you to search for notes by content or tags.

### Managing Notes
- Click the edit icon to modify a note.
- Click the trash icon to delete a note.
- Click the link icon to view related notes.

### Using Tags
- Create new tags by clicking the "+" button in the Tags section of the sidebar.
- Add tags to notes by using the # symbol followed by the tag name.

![Notum App Screenshot](public/placeholder.svg)

## Features

- **Short-form Notes:** Create concise notes with a 280-character limit, similar to tweets.
- **Tag System:** Organize and connect notes using hashtags.
- **Multiple Views:**
  - Timeline View for chronological browsing
  - Graph View for visualizing connections
  - Search View for finding specific notes
- **Note Management:** Create, edit, and delete notes.
- **Related Notes:** View notes that are connected to each other.
- **Responsive Design:** Works on desktop and mobile devices.

## Technologies Used

- **React:** Frontend JavaScript library
- **TypeScript:** Static type-checking
- **Vite:** Build tool and development server
- **Tailwind CSS:** Utility-first CSS framework
- **shadcn/ui:** Component library based on Radix UI
- **@xyflow/react:** React Flow library for graph visualization
- **Lucide Icons:** SVG icon library
- **date-fns:** Date utility library

## Project Structure

```
src/
├── components/         # React components
│   ├── ui/             # UI components from shadcn
│   ├── NoteCard.tsx    # Note display component
│   ├── NoteEditor.tsx  # Component for creating notes
│   ├── GraphView.tsx   # Graph visualization view
│   ├── TimelineView.tsx # Chronological view of notes
│   ├── SearchView.tsx  # Search interface
│   └── Sidebar.tsx     # Application sidebar
├── hooks/              # Custom React hooks
├── lib/                # Utilities and shared code
│   ├── context.tsx     # Notes context provider
│   ├── types.ts        # TypeScript type definitions
│   └── data.ts         # Sample data and helpers
├── pages/              # Application pages
└── App.tsx             # Main application component
```

## Contributing

We welcome contributions to Notum! Here's how you can help:

### Bug Reports and Feature Requests

- Use the Issues tab to report bugs or request features.
- Clearly describe the issue or feature, including steps to reproduce for bugs.

### Code Contributions

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m "Add some feature"`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Submit a pull request.

### Code Style

- Follow the existing code style.
- Use TypeScript for type safety.
- Write clear, concise comments.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Original Prompt

The following is the original prompt that initiated the creation of this application:

```
Develop a note-taking application inspired by the concept of using Twitter as a Zettelkasten system. The application should allow users to create short-form notes (similar to tweets) that can be interconnected through tags, mentions, or other linking mechanisms. Implement features such as a timeline view to display notes chronologically, a graph view to visualize the connections between notes, and a search function to quickly find notes by keywords or tags. The application should also support basic text formatting and organization of notes into categories or folders. Consider the user interface and user experience to ensure ease of use and efficient knowledge management.
```

## Troubleshooting

### Common Issues

1. **Graph View Not Rendering:**
   - Make sure you have a modern browser that supports the required features.
   - Check console for errors related to @xyflow/react.

2. **Search Not Working:**
   - Ensure you're typing the correct tag format (#tagname).
   - Try searching by content instead of tags.

3. **Notes Not Saving:**
   - Currently, notes are stored in memory and will be lost on page refresh. This is a limitation of the current implementation without a backend.

### Debug Mode

For developers, you can enable console logging by adding the following to your `.env` file:
```
VITE_DEBUG=true
```

## Future Improvements

- **Backend Integration:** Add a database to persistently store notes and user data.
- **Authentication:** Add user accounts and authentication.
- **Rich Text Editor:** Enhance the note editor with more formatting options.
- **Export/Import:** Allow exporting and importing notes in various formats.
- **Collaboration:** Enable sharing and collaborative editing of notes.
- **Mobile App:** Develop a native mobile application.
- **Offline Support:** Implement offline capabilities using service workers.
- **AI Integration:** Add AI-powered suggestions for connecting notes and generating insights.
- **Custom Themes:** Allow users to customize the appearance of the application.

---

Created with ❤️ using [Lovable](https://lovable.dev)

