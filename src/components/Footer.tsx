import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-400 text-raisin-black font-cinzel py-6 px-4">
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm">&copy; {new Date().getFullYear()} Andrew Boisvert. All rights reserved.</p>
        <p className="text-sm">Built with Spotify data provided by Randy Connolly for COMP 4513, Mount Royal University.</p>
        <div className="flex gap-6">
          <a
            href="https://github.com/abois526/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm hover:underline"
          >
            <FaGithub className="h-4 w-4" />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/andrewboisvert/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm hover:underline"
          >
            <FaLinkedin className="h-4 w-4" />
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
