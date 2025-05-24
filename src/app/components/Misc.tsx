"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { tenYears } from "@/lib/utils";

function DefaultButton({
  children,
  onClick,
  absolute,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  absolute?: boolean;
  disabled?: boolean;
}) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "p-0 rounded-none hover:text-gray-600 text-xs h-auto cursor-pointer font-mono hover:underline",
        absolute && "absolute top-2.5 right-3 underline"
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}

export function Snippet({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const [open, setOpened] = useState(false);

  return (
    <div className="relative w-full mb-4 shadow-xs ">
      <DefaultButton onClick={() => setOpened(!open)} absolute>
        {open ? "CLOSE" : "OPEN"}
      </DefaultButton>
      <pre
        className={cn(
          "bg-gray-50 prose-p:last-of-type:mb-0 w-full font-mono text-xs p-3 py-2.5 border border-gray-200 text-neutral-800 scroll-smooth overflow-auto dark:bg-black dark:border-neutral-800 dark:text-gray-400",
          !open && "cursor-pointer hover:underline"
        )}
        onClick={!open ? () => setOpened(!open) : undefined}
      >
        <div className="w-full text-wrap ">
          {open ? (
            <>
              {title}
              <div className="mt-2 text-md">{children}</div>
            </>
          ) : (
            title
          )}
        </div>
      </pre>
    </div>
  );
}

export const Misc: React.FC = () => {
  return (
    <div className="py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-[var(--foreground)]">
        misc.
      </h1>
      <div className="max-w-2xl">
        <Snippet title="HOW I STARTED">
          In 2023, I fell in love with startups. Not just the buzz, but the
          philosophy — speed, ownership, and relentless focus on user value. My
          north star has always been to create things that people want, and
          every project since 100xDevs has been another step toward that goal.
        </Snippet>

        <Snippet title="MY GOAL">
          creating a product so seamless you never notice it. something like a
          coffee cup, chair, street light, etc. something that provides value &
          is used so frequently it becomes a part of your life without
          questioning it.{" "}
          <a
            href="https://en.wikipedia.org/wiki/Dieter_Rams"
            className="text-blue-600 underline"
          >
            dieter rams
          </a>{" "}
          said &quot;the best design is invisible&quot;. i always think about
          that. probably something in tech/science.
        </Snippet>

        <Snippet title="MY MOTIVATIONS">
          i&apos;ve never really been driven by money. i read this on a fortune
          cookie from panda express a few years back. something like &quot;money
          is a means to an end, not the end itself&quot;. for now, i do it for
          the love of the game. i&apos;m always trying to be the best i can in
          everything i do. i&apos;ve been fortunate enough to never have to
          worry about food, money, housing, or education. so maybe this changes
          in the future. but i wasn&apos;t after fancy cars or nice watches like
          most people around my age. i think this mindset is becoming more
          common, but i&apos;d like to get to a point where i can live without
          having to worry about money. no mansion or private jet. i&apos;d just
          keep it simple.
        </Snippet>

        <Snippet
          title={`WHERE I SEE MYSELF IN ${tenYears().toLocaleString()} DAYS`}
        >
          in 10 years, running a company or in vc. i move around a lot, so not
          sure if i&apos;d get the most value sticking to 1 thing for many
          years. i enjoy creating &amp; selling. maybe not going to college, so
          can&apos;t say for sure where i end up. i&apos;ve been hustling my
          whole life. im sure i&apos;ll figure something out.
        </Snippet>
      </div>
    </div>
  );
};
