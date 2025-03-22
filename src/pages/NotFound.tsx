
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="text-center space-y-6 max-w-md px-6">
        <div className="text-primary text-6xl font-bold">404</div>
        <h1 className="text-2xl font-medium">Page not found</h1>
        <p className="text-muted-foreground">
          We couldn't find the page you were looking for. Perhaps your note has been moved or deleted.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center justify-center px-6 py-2 border border-transparent
            text-sm font-medium rounded-md shadow-sm text-white bg-primary
            hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 
            focus-visible:ring-primary transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
