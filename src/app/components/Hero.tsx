"use client";
import React, { useState, useRef, useEffect } from "react";

interface LinkWithTooltipProps {
  href?: string;
  text: string;
  description: React.ReactNode;
  imageUrl?: string;
}

// Component for linky words with hover descriptions
const LinkWithTooltip: React.FC<LinkWithTooltipProps> = ({
  href,
  text,
  description,
  imageUrl,
}) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const containerRef = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle mouse events for hover
  const showTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsTooltipVisible(true);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsTooltipVisible(false);
    }, 100);
  };

  // Handle clicks for mobile
  const handleClick = (e: React.MouseEvent) => {
    if (!href && window.innerWidth < 768) {
      e.preventDefault();
      setIsTooltipVisible(!isTooltipVisible);
    }
  };

  // Handle clicks outside to close tooltip on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setIsTooltipVisible(false);
      }
    };

    // Add event listener only when tooltip is visible
    if (isTooltipVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      // Clear any lingering timeouts when component unmounts
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isTooltipVisible]);

  return (
    <span ref={containerRef} className="relative inline-block">
      <a
        ref={linkRef}
        href={href}
        target={href ? "_blank" : undefined}
        className="text-[var(--muted-foreground)] text-[15px] decoration-[1px] underline underline-offset-3 decoration-[var(--muted-foreground)] cursor-pointer group inline-flex items-center"
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onClick={handleClick}
      >
        {text}
        {href && (
          <svg
            className="w-3 h-3 ml-0.5 inline-block"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        )}
      </a>

      {isTooltipVisible && (
        <div
          ref={tooltipRef}
          className="absolute z-10 left-0 top-8 w-64 p-3 shadow-lg bg-[var(--tooltip)] border border-[var(--tooltip-border)] rounded text-sm text-[var(--tooltip-foreground)]"
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
        >
          {imageUrl && (
            <div className="w-full h-40 overflow-hidden rounded mb-2">
              <img
                src={imageUrl}
                alt="tooltip illustration"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="space-y-1">{description}</div>
          <span className="absolute -top-2 left-3 w-4 h-4 bg-[var(--tooltip)] border-t border-l border-[var(--tooltip-border)] transform rotate-45"></span>
        </div>
      )}
    </span>
  );
};

interface SocialLinkProps {
  href: string;
  label: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, label }) => {
  return (
    <a
      href={href}
      className="text-[var(--link)] text-sm hover:underline flex items-center"
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
      <svg
        className="w-3 h-3 ml-0.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="7" y1="17" x2="17" y2="7"></line>
        <polyline points="7 7 17 7 17 17"></polyline>
      </svg>
    </a>
  );
};

interface ProjectLinkProps {
  href: string;
  name: string;
  description: string;
}

const ProjectLink: React.FC<ProjectLinkProps> = ({
  href,
  name,
  description,
}) => {
  return (
    <div className="mb-1">
      <a
        href={href}
        className="text-[var(--link)] hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {name}
      </a>
      <span className="text-xs text-[var(--muted-foreground)] ml-1">
        — {description}
      </span>
    </div>
  );
};

interface SongLinkProps {
  title: string;
  artist: string;
  href: string;
}

const SongLink: React.FC<SongLinkProps> = ({ title, artist, href }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="inline-flex items-center mr-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative mr-1">
        <img
          src="/cd.png"
          alt="CD icon"
          className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${
            isHovered ? "rotate-[360deg]" : ""
          }`}
        />
      </div>
      <a
        href={href}
        className="text-[var(--link)] text-sm hover:underline mr-1"
        target="_blank"
        rel="noopener noreferrer"
      >
        {title}
      </a>
      <span className="text-[var(--muted-foreground)] text-xs">by</span>
      <span className="font-medium text-xs ml-1">{artist}</span>
    </div>
  );
};

const Hero: React.FC = () => {
  return (
    <div className="py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-[var(--foreground)]">
        hi, i&apos;m aman
        <span className="animate-pulse text-blue-800">.</span>
      </h1>
      <div className="max-w-2xl">
        <p className="mb-4 text-base text-[var(--foreground)]">
          i build things on the internet.
        </p>

        <p className="mb-8 text-base text-[var(--foreground)]">
          <LinkWithTooltip
            text="frontend"
            description="React, Next.js, TailwindCSS, CSS, Shadcn UI, Framer Motion"
          />
          ,{" "}
          <LinkWithTooltip
            text="backend"
            description="Node.js, Express, MongoDB, PostgreSQL"
          />
          ,{" "}
          <LinkWithTooltip
            text="ai"
            description="LangChain, Hugging Face , OpenAI, Anthropic , Gemini"
          />
          ,{" "}
          <LinkWithTooltip
            text="database & ORM"
            description="MongoDB, PostgreSQL,MySql, Prisma, Mongoose , NeonDB , Supabase"
          />{" "}
          — whatever it takes.
        </p>

        {/* <p className="mb-4 text-base text-[var(--foreground)]">
          i once launched a{" "}
          <LinkWithTooltip
            href="https://retroui.io"
            text="UI library"
            description="A retro-inspired UI component library for React applications"
          />
          . <br />
          3k downloads in 2 days. felt good.
        </p> */}

        <p className="mb-4 text-base text-[var(--foreground)]">
          am a{" "}
          <LinkWithTooltip
            text="Full Stack Developer"
            description="for 3 years now, building scalable web based solutions for clients"
          />{" "}
          at{" "}
          <LinkWithTooltip
            text="Accenture"
            description="a global consulting and technology services company"
          />
          . contributed at{" "}
          <LinkWithTooltip
            href="https://app.100xdevs.com/"
            text="100xDevs"
            description="a cohort of 100xDevs led by Harkirat Singh"
          />
          . <br />
          Got shortlisted for{" "}
          <LinkWithTooltip
            href="https://outlier.ai/"
            text="OutlierAI"
            description="train AI models and
make them smarter, faster and more reliable"
          />
          vibe coding hackathon.
          <br />
          spoke at meetups. wrote docs. shot videos. shipped projects.{" "}
        </p>

        <p className="mb-4 text-base text-[var(--foreground)]">
          also vibed with devs at{" "}
          <LinkWithTooltip
            text="solana summit"
            description={
              <div className="space-y-2">
                <p>
                  Solana&apos;s biggest founders & developers summit in
                  Bangalore.
                </p>
                <div className="mt-2 pt-2 border-t border-[var(--tooltip-border)]">
                  <div className="font-medium mb-1">Projects:</div>
                  <ProjectLink
                    href="https://mint-token-one.vercel.app/"
                    name="orbitToken"
                    description="Next-gen solana wallet to manage your tokens"
                  />
                  <ProjectLink
                    href="https://sol-developer-tools.vercel.app/"
                    name="Solana CookBook"
                    description="online solana store"
                  />
                </div>
              </div>
            }
          />
          .
        </p>

        <div className="my-8">
          <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] mb-2">
            SPECIALIZE IN:
          </div>
          <p className="text-base text-[var(--foreground)]">
            complex dashboards, smooth microinteractions.
            <br />
            and designing websites that look like someone cared.
            <br />
            Also, I shitpost like a second job{" "}
            <a href="https://x.com/0xAmansol" className="underline">
              here
            </a>
            .
          </p>
        </div>

        <p className="mb-8 text-base text-[var(--foreground)]">
          off-screen, i play{" "}
          <LinkWithTooltip
            text="football"
            description="playing since high school in competitive leagues"
            imageUrl="/moments/football.jpeg"
          />{" "}
          and i lift{" "}
          <LinkWithTooltip
            text="weights"
            description="deadlift PR: 170kgs conventional"
            imageUrl="/moments/gym.jpeg"
          />
          .
        </p>

        <div className="mb-10">
          <div className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] mb-2">
            SONG RECOM:
          </div>
          <div className="flex flex-wrap">
            <SongLink
              title="white ferrari"
              artist="frank ocean"
              href="https://www.youtube.com/watch?v=Dlz_XHeUUis"
            />
            <SongLink
              title="9"
              artist="drake"
              href="https://www.youtube.com/watch?v=q50SwIodCwg"
            />
            <SongLink
              title="indie"
              artist="sorted playlist by me"
              href="https://open.spotify.com/playlist/63iOCWxKqeQYrQP3KYIZ95?si=9f2f33850a234584"
            />
          </div>
        </div>
      </div>
      <div className="flex gap-5 mt-8">
        <SocialLink href="https://x.com/0xAmansol" label="X" />
        <SocialLink href="https://github.com/0xAmansol" label="GitHub" />
        <SocialLink
          href="https://www.linkedin.com/in/amankalal/"
          label="LinkedIn"
        />
        <SocialLink href="https://notsoaman.hashnode.dev/" label="Blog" />
      </div>
    </div>
  );
};

export default Hero;
