"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Mail, 
  Share2, 
  Link as LinkIcon,
  Check
} from "lucide-react"

interface SocialShareButtonsProps {
  url: string
  title: string
  description?: string
}

export function SocialShareButtons({ url, title, description }: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const [showNativeShare, setShowNativeShare] = useState(false)

  // Encode parameters for URLs
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description || title)

  // Share URLs for each platform
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedDescription}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
  }

  // Open share popup window
  const openShareWindow = (url: string) => {
    const width = 600
    const height = 400
    const left = window.screen.width / 2 - width / 2
    const top = window.screen.height / 2 - height / 2
    
    window.open(
      url,
      "share",
      `width=${width},height=${height},left=${left},top=${top},toolbar=0,status=0`
    )
  }

  // Handle native Web Share API
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description || title,
          url,
        })
      } catch (error) {
        // User cancelled or error occurred
        console.log("Share cancelled")
      }
    }
  }

  // Copy link to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  // Check if Web Share API is available
  const hasNativeShare = typeof navigator !== "undefined" && navigator.share

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground mr-2">Share:</span>
      
      {/* Mobile: Show native share button if available */}
      {hasNativeShare && (
        <Button
          variant="outline"
          size="icon"
          onClick={handleNativeShare}
          aria-label="Share"
          className="md:hidden"
        >
          <Share2 className="size-4" />
        </Button>
      )}

      {/* Desktop: Show all individual platform buttons */}
      <div className="hidden md:flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => openShareWindow(shareUrls.facebook)}
          aria-label="Share on Facebook"
        >
          <Facebook className="size-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => openShareWindow(shareUrls.twitter)}
          aria-label="Share on Twitter"
        >
          <Twitter className="size-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => openShareWindow(shareUrls.linkedin)}
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="size-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => openShareWindow(shareUrls.reddit)}
          aria-label="Share on Reddit"
        >
          <svg
            className="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="12" r="1" />
            <circle cx="15" cy="12" r="1" />
            <path d="M19.5 12c0-1.657-1.343-3-3-3h-9c-1.657 0-3 1.343-3 3s1.343 3 3 3h9c1.657 0 3-1.343 3-3z" />
            <path d="M12 3v3" />
            <path d="M12 18v3" />
            <path d="M7 15c0 1.5 1 2.5 2.5 2.5S12 16.5 12 15" />
            <path d="M17 15c0 1.5-1 2.5-2.5 2.5S12 16.5 12 15" />
          </svg>
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => openShareWindow(shareUrls.pinterest)}
          aria-label="Share on Pinterest"
        >
          <svg
            className="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.971 1.172-4.971s-.299-.6-.299-1.486c0-1.39.806-2.428 1.81-2.428.852 0 1.264.64 1.264 1.408 0 .858-.546 2.14-.828 3.33-.236.995.5 1.807 1.48 1.807 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.177-4.068-2.845 0-4.515 2.135-4.515 4.34 0 .859.331 1.781.745 2.281a.3.3 0 01.069.288l-.278 1.133c-.044.183-.145.223-.335.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.965-.525-2.291-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446C17.523 22 22 17.523 22 12S17.523 2 12 2z" />
          </svg>
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => window.open(shareUrls.whatsapp, "_blank")}
          aria-label="Share on WhatsApp"
        >
          <svg
            className="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => window.location.href = shareUrls.email}
          aria-label="Share via Email"
        >
          <Mail className="size-4" />
        </Button>
      </div>

      {/* Copy Link Button (always visible) */}
      <Button
        variant="outline"
        size="icon"
        onClick={copyToClipboard}
        aria-label={copied ? "Link copied" : "Copy link"}
        className="relative"
      >
        {copied ? (
          <Check className="size-4 text-green-600" />
        ) : (
          <LinkIcon className="size-4" />
        )}
      </Button>

      {/* Mobile fallback: Show all buttons if no native share */}
      {!hasNativeShare && (
        <div className="flex md:hidden items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            size="icon"
            onClick={() => openShareWindow(shareUrls.facebook)}
            aria-label="Share on Facebook"
          >
            <Facebook className="size-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => openShareWindow(shareUrls.twitter)}
            aria-label="Share on Twitter"
          >
            <Twitter className="size-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => openShareWindow(shareUrls.linkedin)}
            aria-label="Share on LinkedIn"
          >
            <Linkedin className="size-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => window.location.href = shareUrls.email}
            aria-label="Share via Email"
          >
            <Mail className="size-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
