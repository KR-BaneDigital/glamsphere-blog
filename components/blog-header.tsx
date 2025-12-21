"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/config"
import { getHeaderCategories } from "@/lib/categories"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

export function BlogHeader() {
  const [email, setEmail] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [honeypot, setHoneypot] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    setError("")
    setLoading(true)
    
    try {
        const response = await fetch(`${siteConfig.brand.mainAppUrl}/api/email-submissions/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandId: siteConfig.brand.id,
          email,
          submissionUrl: window.location.href,
          sourceComponent: 'header_modal',
          pageType: window.location.pathname === '/' ? 'homepage' : 'blog',
          honeypot
        })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setSubmitted(true)
        setTimeout(() => {
          setIsOpen(false)
          setSubmitted(false)
          setEmail("")
        }, 3000)
      } else {
        setError(data.error || 'Submission failed')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            {siteConfig.brand.logoPath && (
              <Image src={siteConfig.brand.logoPath} alt="Logo" width={120} height={120} className="h-12 w-auto" />
            )}
            <span className="text-xl font-semibold text-foreground">{siteConfig.brand.name}</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
            {getHeaderCategories().map((category) => (
              category.subcategories && category.subcategories.length > 0 ? (
                <div key={category.id} className="relative group">
                  <button className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-muted-foreground transition-colors">
                    {category.name}
                    <ChevronDown className="h-3 w-3" />
                  </button>
                  <div className="absolute left-0 top-full mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="bg-card border border-border rounded-lg shadow-lg py-2">
                      <Link
                        href={`/category/${category.slug}`}
                        className="block px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors"
                      >
                        All {category.name}
                      </Link>
                      <div className="border-t border-border my-1" />
                      {category.subcategories.map((sub) => (
                        <Link
                          key={sub.id}
                          href={`/category/${sub.slug}`}
                          className="block px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
                >
                  {category.name}
                </Link>
              )
            ))}
            <Link
              href="/blog"
              className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
            >
              Blog
            </Link>
          </nav>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="default" size="sm" className="hidden md:inline-flex">
                Subscribe
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Subscribe to Our Newsletter</DialogTitle>
                <DialogDescription>
                  Get the latest articles and updates delivered directly to your inbox.
                </DialogDescription>
              </DialogHeader>
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    className="bg-background"
                  />
                  <input
                    type="text"
                    name="website_url"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: '-9999px',
                      width: '1px',
                      height: '1px',
                      overflow: 'hidden'
                    }}
                  />
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Subscribing...' : 'Subscribe'}
                  </Button>
                  {error && (
                    <p className="text-sm text-red-600">{error}</p>
                  )}
                </form>
              ) : (
                <div className="py-8 text-center">
                  <h3 className="text-lg font-semibold mb-2">Thank You!</h3>
                  <p className="text-sm text-muted-foreground">You've successfully subscribed to our newsletter.</p>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  )
}
