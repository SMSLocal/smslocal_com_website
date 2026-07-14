import { Phone } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "./SocialIcons";

export default function TopBar() {
  return (
    <div className="hidden border-b border-border bg-white sm:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-sm text-foreground">
        <p>
          Create a Trial Account and Enjoy Free SMS —{" "}
          <a href="#signup" className="font-semibold text-primary hover:underline">
            Sign Up Now!
          </a>
        </p>
        <div className="flex items-center gap-5">
          <a href="tel:+15595495149" className="flex items-center gap-2 hover:text-primary">
            <Phone className="h-4 w-4" />
            +1 559 549 5149
          </a>
          <div className="flex items-center gap-3 text-muted-foreground">
            <a href="#" aria-label="Facebook" className="hover:text-primary">
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-primary">
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a href="#" aria-label="YouTube" className="hover:text-primary">
              <YoutubeIcon className="h-4 w-4" />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-primary">
              <LinkedinIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
