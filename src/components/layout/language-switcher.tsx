
// @/components/layout/language-switcher.tsx
"use client";

import * as React from "react";
import { Check, Languages } from "lucide-react";
import { useTranslations } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

// Simplified SVGs for flags
const USFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 20 15" className="h-4 w-5 rounded-sm">
    <rect width="20" height="15" fill="#fff"/>
    <rect width="20" height="3" fill="#b22234"/>
    <rect width="20" height="3" y="6" fill="#b22234"/>
    <rect width="20" height="3" y="12" fill="#b22234"/>
    <rect width="9" height="9" fill="#3c3b6e"/>
  </svg>
);

const BrazilFlag = () => (
 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 70 49" className="h-4 w-5 rounded-sm">
    <rect width="70" height="49" fill="#009739"/>
    <path d="M35 3.5L66.5 24.5L35 45.5L3.5 24.5L35 3.5Z" fill="#fedd00"/>
    <circle cx="35" cy="24.5" r="12.25" fill="#002776"/>
  </svg>
);

const SpainFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 20 15" className="h-4 w-5 rounded-sm">
    <rect width="20" height="15" fill="#c60b1e"/> {/* Red top and bottom stripe */}
    <rect width="20" height="7.5" y="3.75" fill="#ffc400"/> {/* Yellow middle stripe */}
  </svg>
);

// Define props type for LanguageSwitcher, extending Button's props
interface LanguageSwitcherProps extends React.ComponentPropsWithoutRef<typeof Button> {}

const LanguageSwitcher = React.forwardRef<HTMLButtonElement, LanguageSwitcherProps>(
  (props, ref) => {
    const { language, setLanguage, t } = useTranslations();

    const languages = [
      { code: "en" as const, label: t('header.english')[0], Flag: USFlag },
      { code: "pt-BR" as const, label: t('header.portugueseBrazil')[0], Flag: BrazilFlag },
      { code: "es" as const, label: t('header.spanish')[0], Flag: SpainFlag },
    ];

    const CurrentFlag = languages.find(lang => lang.code === language)?.Flag || Languages;
    const langShorthand = language.split('-')[0].toUpperCase();

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            ref={ref} // Forward the ref
            variant="outline"
            // Merge internal classes with props.className from TooltipTrigger
            className={cn("h-9 px-2.5 border-border/60 hover:border-border flex items-center gap-1.5", props.className)}
            {...props} // Spread other props (like event handlers from TooltipTrigger)
          >
            <CurrentFlag />
            <span className="text-xs font-medium">{langShorthand}</span>
            <span className="sr-only">{t('header.language')[0]}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{t('header.language')[0]}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={cn("flex items-center cursor-pointer", language === lang.code && "bg-accent/50")}
            >
              <lang.Flag />
              <span className="flex-grow ml-2">{lang.label}</span>
              {language === lang.code && <Check className="ml-2 h-4 w-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
);
LanguageSwitcher.displayName = "LanguageSwitcher";

export { LanguageSwitcher };
