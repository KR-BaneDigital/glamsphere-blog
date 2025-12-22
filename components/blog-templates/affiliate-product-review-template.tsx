"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Star, 
  Check, 
  X, 
  ShoppingCart, 
  Award, 
  Heart, 
  Sparkles, 
  TrendingUp, 
  Shield, 
  Zap, 
  ExternalLink, 
  CheckCircle,
  Calendar
} from "lucide-react"
import type { BlogPost } from "@/lib/blog-data"
import { getRelatedPosts } from "@/lib/blog-data"
import type { AffiliateProductReviewData } from "@/lib/blog-types/affiliate-product-review.types"

interface AffiliateProductReviewTemplateProps {
  post: BlogPost
}

// Icon mapping helper
const iconMap: Record<string, any> = {
  Zap,
  Shield,
  Heart,
  Sparkles,
  TrendingUp,
  Award,
  CheckCircle
}

export function AffiliateProductReviewTemplate({ post }: AffiliateProductReviewTemplateProps) {
  const typeData = post.typeSpecificData as AffiliateProductReviewData
  const relatedPosts = getRelatedPosts(post.id)

  return (
    <>
      {/* Hero Section - Full V0 Design */}
      <section className="relative bg-gradient-to-br from-background via-accent/5 to-background py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Meta Info */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground mb-8">
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary hover:bg-primary/20 font-semibold px-4 py-1"
            >
              {post.category}
            </Badge>
            <span className="text-muted-foreground/50">•</span>
            <time dateTime={post.date} className="text-muted-foreground">
              {post.date}
            </time>
          </div>

          {/* Title */}
          <div className="text-center mb-12 max-w-4xl mx-auto space-y-6">
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance leading-[1.1]">
              {post.title}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              {post.excerpt}
            </p>
          </div>

          {/* Two Column Layout - Stats + Product Image */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Side - Stats */}
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                {typeData.stats.map((stat, index) => (
                  <div key={index} className="bg-card border-2 border-primary/20 rounded-2xl p-4 sm:p-6 text-center hover:border-primary/40 transition-colors shadow-lg">
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-2 truncate">{stat.value}</div>
                    <div className="text-xs sm:text-sm lg:text-base font-medium text-muted-foreground truncate">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Trust Badges */}
              {typeData.trustBadges && typeData.trustBadges.length > 0 && (
                <div className="bg-accent/30 rounded-xl p-6 space-y-3 border border-accent">
                  {typeData.trustBadges.map((badge, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="size-5 text-primary flex-shrink-0" />
                      <span className="text-sm font-medium" dangerouslySetInnerHTML={{ __html: badge }} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Side - Product Image + CTA */}
            <div className="space-y-6">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all opacity-50"></div>
                <a
                  href={typeData.affiliate.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer nofollow sponsored"
                  className="relative block"
                >
                  <img
                    src={typeData.affiliate.images?.[0] || post.image}
                    alt={typeData.affiliate.productTitle}
                    className="relative w-full rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow"
                  />
                </a>
              </div>

              <div className="space-y-4">
                <Button
                  size="lg"
                  className="w-full gap-3 bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-semibold py-6 shadow-lg hover:shadow-xl transition-all"
                  asChild
                >
                  <a href={typeData.affiliate.affiliateLink} target="_blank" rel="noopener noreferrer nofollow sponsored">
                    <ShoppingCart className="size-5" />
                    {typeData.ctaText || `Get It on Amazon - $${typeData.affiliate.price}`}
                  </a>
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  ✓ Free shipping • ✓ 30-day returns • ✓ Prime eligible
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* The Problem Section */}
        <section className="mb-20" id="review">
          <div className="space-y-8">
            <div className="text-center space-y-4 mb-12">
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
                {typeData.problemSection.title || 'The Hair Thinning Problem Nobody Talks About'}
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
            </div>

            <div className="prose prose-lg max-w-none space-y-6">
              <div className="bg-accent/20 border-l-4 border-primary rounded-r-xl p-4 sm:p-6 lg:p-8">
                <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-foreground m-0 pl-2 sm:pl-4" dangerouslySetInnerHTML={{ __html: typeData.problemSection.introText }} />
              </div>

              <p className="text-base sm:text-lg text-foreground/80 leading-relaxed" dangerouslySetInnerHTML={{ __html: typeData.problemSection.mainText }} />

              <p className="text-base sm:text-lg text-foreground/80 leading-relaxed" dangerouslySetInnerHTML={{ __html: typeData.problemSection.closingText }} />
            </div>
          </div>
        </section>

        {/* Clinical Results Image */}
        {typeData.affiliate.images?.[1] && (
          <div className="relative w-full mb-20">
            <a
              href={typeData.affiliate.affiliateLink}
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              className="block group"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={typeData.affiliate.images[1]}
                  alt="Clinical study results"
                  className="w-full group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </a>
          </div>
        )}

        {/* What Makes It Different */}
        <section className="mb-20">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold">
              What Makes {typeData.affiliate.productTitle} <span className="text-primary">Different?</span>
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {typeData.whatMakesDifferent.map((item, index) => {
              const IconComponent = iconMap[item.icon] || Sparkles
              return (
                <Card key={index} className="p-8 bg-card border-2 border-primary/10">
                  <div className="flex items-start gap-5">
                    <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="size-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-2xl mb-3">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: item.description }} />
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Mid-Article CTA */}
        {typeData.ctaSections?.find((cta: any) => cta.location === 'mid-content') ? (
          <div className="mb-20">
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 text-center">
              <h3 className="font-heading text-3xl lg:text-4xl font-bold mb-3">
                {typeData.ctaSections.find((cta: any) => cta.location === 'mid-content')!.headline}
              </h3>
              <p className="text-lg text-muted-foreground mb-5 max-w-xl mx-auto text-center">
                {typeData.ctaSections.find((cta: any) => cta.location === 'mid-content')!.description}
              </p>
              <Button
                size="lg"
                className="gap-3 bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-semibold py-6 px-10 shadow-lg"
                asChild
              >
                <a href={typeData.affiliate.affiliateLink} target="_blank" rel="noopener noreferrer nofollow sponsored">
                  <ShoppingCart className="size-5" />
                  {typeData.ctaSections.find((cta: any) => cta.location === 'mid-content')!.buttonText}
                </a>
              </Button>
            </Card>
          </div>
        ) : (
          <div className="mb-20">
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 text-center">
              <h3 className="font-heading text-3xl lg:text-4xl font-bold mb-3">Ready to See Results?</h3>
              <p className="text-lg text-muted-foreground mb-5 max-w-xl mx-auto text-center">
                Join thousands experiencing real transformation.
              </p>
              <Button
                size="lg"
                className="gap-3 bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-semibold py-6 px-10 shadow-lg"
                asChild
              >
                <a href={typeData.affiliate.affiliateLink} target="_blank" rel="noopener noreferrer nofollow sponsored">
                  <ShoppingCart className="size-5" />
                  Get It on Amazon - ${typeData.affiliate.price}
                </a>
              </Button>
            </Card>
          </div>
        )}

        {/* Key Ingredients Image */}
        {typeData.affiliate.images?.[2] && (
          <div className="relative w-full mb-20" id="ingredients">
            <a href={typeData.affiliate.affiliateLink} target="_blank" rel="noopener noreferrer nofollow sponsored">
              <img
                src={typeData.affiliate.images[2]}
                alt="Key ingredients breakdown"
                className="w-full rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow"
              />
            </a>
          </div>
        )}

        {/* Ingredients/Features Breakdown */}
        <section className="mb-20">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold">
              {typeData.ingredients[0]?.name?.toLowerCase().includes('ingredient') || typeData.ingredients[0]?.name?.toLowerCase().includes('formula') || typeData.ingredients[0]?.name?.toLowerCase().includes('acid') || typeData.ingredients[0]?.name?.toLowerCase().includes('vitamin')
                ? <>The Science: Key Ingredients That <span className="text-primary">Actually Work</span></>
                : <>Key Features That Make It <span className="text-primary">Stand Out</span></>
              }
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {typeData.ingredients.map((ingredient, index) => (
              <Card key={index} className="p-8 border-l-4 border-l-primary bg-card">
                <h3 className="font-bold text-2xl mb-4 flex items-center gap-3">
                  <Check className="size-6 text-primary" />
                  {ingredient.name}
                </h3>
                <p className="text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: ingredient.description }} />
              </Card>
            ))}
          </div>
        </section>

        {/* Mid CTA - Ingredients */}
        {typeData.ctaSections?.find((cta: any) => cta.location === 'ingredients') && (
          <div className="mb-20">
            <Card className="p-6 bg-accent/10 border border-accent">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Sparkles className="size-7 text-primary" />
                <h3 className="font-heading text-3xl font-bold">
                  {typeData.ctaSections.find((cta: any) => cta.location === 'ingredients')!.headline}
                </h3>
              </div>
              <p className="text-lg text-muted-foreground mb-5 max-w-xl mx-auto text-center">
                {typeData.ctaSections.find((cta: any) => cta.location === 'ingredients')!.description}
              </p>
              <div className="text-center">
                <Button
                  size="lg"
                  className="gap-3 bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-semibold py-6 px-10 shadow-lg"
                  asChild
                >
                  <a href={typeData.affiliate.affiliateLink} target="_blank" rel="noopener noreferrer nofollow sponsored">
                    <ExternalLink className="size-5" />
                    {typeData.ctaSections.find((cta: any) => cta.location === 'ingredients')!.buttonText}
                  </a>
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Benefits Image */}
        {typeData.affiliate.images?.[3] && (
          <div className="relative w-full mb-20" id="results">
            <a href={typeData.affiliate.affiliateLink} target="_blank" rel="noopener noreferrer nofollow sponsored">
              <img
                src={typeData.affiliate.images[3]}
                alt="Product benefits overview"
                className="w-full rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow"
              />
            </a>
          </div>
        )}

        {/* Our Testing Results */}
        <section className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-4 mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold flex items-center gap-3">
              <TrendingUp className="size-8 text-primary" />
              Our {typeData.testingDuration || '6-Month'} Testing Results
            </h2>
            <Button
              size="lg"
              className="gap-3 bg-primary text-primary-foreground hover:bg-primary/90 text-base font-semibold py-3 px-6 shadow-md"
              asChild
            >
              <a href={typeData.affiliate.affiliateLink} target="_blank" rel="noopener noreferrer nofollow sponsored">
                <ShoppingCart className="size-5" />
                Check Price on Amazon
              </a>
            </Button>
          </div>

          <div className="space-y-6 mb-12">
            {typeData.testingResults.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-semibold text-foreground">{item.category}</span>
                    <span className="text-sm text-muted-foreground ml-3">{item.result}</span>
                  </div>
                  <span className="text-lg font-bold text-primary">{item.score}/10</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${item.score * 10}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <Card className="p-8 bg-accent/10 border border-accent">
            <p className="text-lg text-foreground/90 leading-relaxed">
              <strong className="text-foreground">Testing Methodology:</strong> {typeData.methodologyNote}
            </p>
          </Card>
        </section>

        {/* Pros and Cons */}
        <section className="mb-20">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold">
              What We Love vs. What Could <span className="text-primary">Be Better</span>
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Pros */}
            <Card className="p-10 bg-card border-2 border-accent/20">
              <div className="flex items-center gap-4 mb-8">
                <div className="size-16 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="size-9 text-green-600" />
                </div>
                <h3 className="font-heading text-3xl font-bold">What We Love</h3>
              </div>
              <ul className="space-y-5">
                {typeData.pros.map((pro, index) => (
                  <li key={index} className="flex items-start gap-4 text-foreground/90">
                    <Check className="size-6 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-base leading-relaxed">{pro}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Cons */}
            <Card className="p-10 bg-card border-2 border-destructive/20">
              <div className="flex items-center gap-4 mb-8">
                <div className="size-16 rounded-full bg-destructive/10 flex items-center justify-center">
                  <X className="size-9 text-destructive" />
                </div>
                <h3 className="font-heading text-3xl font-bold">Room for Improvement</h3>
              </div>
              <ul className="space-y-5">
                {typeData.cons.map((con, index) => (
                  <li key={index} className="flex items-start gap-4 text-foreground/90">
                    <X className="size-6 text-destructive shrink-0 mt-0.5" />
                    <span className="text-base leading-relaxed">{con}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </section>

        {/* Mid CTA - Clinically Proven / Verdict */}
        {typeData.ctaSections?.find((cta: any) => cta.location === 'verdict') && (
          <div className="mb-20">
            <Card className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Award className="size-7 text-primary" />
                <h3 className="font-heading text-3xl font-bold">
                  {typeData.ctaSections.find((cta: any) => cta.location === 'verdict')!.headline}
                </h3>
              </div>
              <p className="text-lg text-muted-foreground mb-5 max-w-xl mx-auto text-center">
                {typeData.ctaSections.find((cta: any) => cta.location === 'verdict')!.description}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button
                  size="lg"
                  className="gap-3 bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-semibold py-6 px-10 shadow-lg"
                  asChild
                >
                  <a href={typeData.affiliate.affiliateLink} target="_blank" rel="noopener noreferrer nofollow sponsored">
                    <ShoppingCart className="size-5" />
                    {typeData.ctaSections.find((cta: any) => cta.location === 'verdict')!.buttonText}
                  </a>
                </Button>
              </div>
              <div className="mt-6 pt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm border-t border-primary/20">
                <div className="flex items-center gap-2">
                  <Star className="size-5 fill-primary text-primary" />
                  <span className="font-semibold">{typeData.reviewsSummary.averageRating}/5</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="size-5 text-primary" />
                  <span className="font-medium">Free Shipping Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="size-5 text-primary" />
                  <span className="font-medium">30-Day Money-Back Guarantee</span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Who Should Buy This */}
        <section className="mb-20">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold">
              Who Should Buy {typeData.affiliate.productTitle}?
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <Card className="p-8 bg-card border-2 border-green-100">
              <h3 className="font-bold text-3xl mb-6 flex items-center gap-3 text-accent-foreground">
                <div className="rounded-full bg-green-100 p-2">
                  <CheckCircle className="size-6 text-green-600" />
                </div>
                Perfect For:
              </h3>
              <ul className="space-y-4">
                {typeData.whoShouldBuy.perfectFor.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-foreground/90">
                    <Check className="size-5 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-8 bg-card border-2 border-red-100">
              <h3 className="font-bold text-3xl mb-6 flex items-center gap-3">
                <div className="rounded-full bg-red-100 p-2">
                  <X className="size-6 text-red-600" />
                </div>
                Not Ideal For:
              </h3>
              <ul className="space-y-4">
                {typeData.whoShouldBuy.notIdealFor.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-foreground/90">
                    <X className="size-5 text-red-600 shrink-0 mt-0.5" />
                    <span className="text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </section>

        {/* How to Use */}
        <section className="mb-20">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold">
              How to Use for <span className="text-primary">Best Results</span>
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid gap-6">
            {typeData.howToUse.map((item, index) => (
              <Card key={index} className="p-8 bg-card border-2 border-primary/10">
                <div className="flex items-start gap-5">
                  <div className="size-16 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-3xl flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="mt-10 p-8 bg-accent/10 border border-accent">
            <div className="flex items-start gap-4">
              <span className="text-5xl font-bold text-primary shrink-0 -rotate-12 leading-none">!</span>
              <p className="text-lg text-foreground/90 leading-relaxed">
                <strong>Pro Tip:</strong> {typeData.proTip}
              </p>
            </div>
          </Card>
        </section>

        {/* Real Customer Reviews */}
        <section className="mb-20">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold">
              What Real Customers Are <span className="text-primary">Saying</span>
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {typeData.customerReviews.map((review, index) => (
              <Card key={index} className="p-8 bg-card border-2 border-muted/20">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="font-bold text-xl">{review.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {review.verifiedPurchase ? 'Verified Purchase' : 'Customer'}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={`size-5 ${star <= review.stars ? 'fill-primary text-primary' : 'text-primary'}`} 
                      />
                    ))}
                  </div>
                </div>
                <p className="text-foreground/90 leading-relaxed text-lg">
                  &ldquo;{review.review}&rdquo;
                </p>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4 text-lg">
              Based on {typeData.reviewsSummary.totalReviews} verified Amazon reviews
            </p>
            <div className="flex items-center justify-center gap-3 text-3xl font-bold">
              <Star className="size-9 fill-primary text-primary" />
              <span>{typeData.reviewsSummary.averageRating} out of 5</span>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {typeData.faq.map((item, index) => (
              <Card key={index} className="p-8 bg-card border-2 border-muted/10">
                <h3 className="font-bold text-2xl mb-4 text-foreground">{item.question}</h3>
                <p className="text-muted-foreground leading-relaxed text-base">{item.answer}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Final Verdict */}
        <section className="mb-20">
          <Card className="p-12 bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/30">
            <div className="flex items-center gap-5 mb-8">
              <Award className="size-12 text-primary" />
              <h2 className="font-heading text-4xl lg:text-5xl font-bold">The Final Verdict</h2>
            </div>

            <div className="space-y-6 text-lg lg:text-xl leading-relaxed">
              <div dangerouslySetInnerHTML={{ __html: typeData.verdict.summary }} />
              
              <p className="text-xl lg:text-2xl font-semibold text-primary mt-8">
                {typeData.verdict.finalRecommendation}
              </p>
            </div>

            <div className="mt-12 pt-10 border-t border-primary/20">
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <div>
                  <div className="text-lg text-muted-foreground mb-2">Overall Rating</div>
                  <div className="text-5xl font-bold text-primary">{typeData.verdict.rating}/10</div>
                </div>
                {typeData.verdict.editorChoice && (
                  <Badge className="text-lg px-6 py-3 bg-primary text-primary-foreground shadow-lg">
                    Editor's Choice 2024
                  </Badge>
                )}
              </div>
            </div>
          </Card>
        </section>

        {/* Where to Buy CTA */}
        <section>
          <Card className="p-6 sm:p-8 lg:p-12 bg-gradient-to-br from-accent/20 to-accent/10 border-2 border-accent/40 text-center">
            {typeData.ctaSections?.find((cta: any) => cta.location === 'final') ? (
              <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
                <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold">
                  {typeData.ctaSections.find((cta: any) => cta.location === 'final')!.headline}
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed">
                  {typeData.ctaSections.find((cta: any) => cta.location === 'final')!.description}
                </p>

                <div className="pt-4 sm:pt-6">
                  <Button
                    size="lg"
                    className="gap-2 sm:gap-3 bg-primary text-primary-foreground hover:bg-primary/90 text-base sm:text-lg font-semibold py-5 sm:py-6 lg:py-7 px-8 sm:px-10 lg:px-12 shadow-xl transition-all w-full sm:w-auto"
                    asChild
                  >
                    <a href={typeData.affiliate.affiliateLink} target="_blank" rel="noopener noreferrer nofollow sponsored">
                      <ShoppingCart className="size-5 sm:size-6" />
                      <span className="truncate">{typeData.ctaSections.find((cta: any) => cta.location === 'final')!.buttonText}</span>
                    </a>
                  </Button>
                </div>

                <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-4 sm:gap-x-6 lg:gap-x-8 sm:gap-y-4 text-sm sm:text-base text-muted-foreground border-t border-primary/20">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="size-5 sm:size-6 text-primary flex-shrink-0" />
                    <span className="whitespace-nowrap">Free Shipping</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="size-5 sm:size-6 text-primary flex-shrink-0" />
                    <span className="whitespace-nowrap">30-Day Returns</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="size-5 sm:size-6 text-primary flex-shrink-0" />
                    <span className="whitespace-nowrap truncate max-w-[200px]">{typeData.reviewsSummary.totalReviews} Reviews</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
                <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold">Ready to Transform Your Results?</h2>
                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed">
                  Get {typeData.affiliate.productTitle} on Amazon with fast, free shipping.
                </p>

                <div className="pt-4 sm:pt-6">
                  <Button
                    size="lg"
                    className="gap-2 sm:gap-3 bg-primary text-primary-foreground hover:bg-primary/90 text-base sm:text-lg font-semibold py-5 sm:py-6 lg:py-7 px-8 sm:px-10 lg:px-12 shadow-xl transition-all w-full sm:w-auto"
                    asChild
                  >
                    <a href={typeData.affiliate.affiliateLink} target="_blank" rel="noopener noreferrer nofollow sponsored">
                      <ShoppingCart className="size-5 sm:size-6" />
                      <span className="truncate">Buy Now on Amazon - ${typeData.affiliate.price}</span>
                    </a>
                  </Button>
                </div>

                <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-4 sm:gap-x-6 lg:gap-x-8 sm:gap-y-4 text-sm sm:text-base text-muted-foreground border-t border-primary/20">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="size-5 sm:size-6 text-primary flex-shrink-0" />
                    <span className="whitespace-nowrap">Free Shipping</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="size-5 sm:size-6 text-primary flex-shrink-0" />
                    <span className="whitespace-nowrap">30-Day Returns</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="size-5 sm:size-6 text-primary flex-shrink-0" />
                    <span className="whitespace-nowrap truncate max-w-[200px]">{typeData.reviewsSummary.totalReviews} Reviews</span>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </section>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 border-t border-border pt-6 mt-12">
          <span className="text-sm font-medium text-foreground">Tags:</span>
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Author Bio Section */}
      <section className="border-t border-border bg-muted py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">About the Author</h2>
          <div className="flex items-start gap-6">
            <img
              src={post.author.image || "/placeholder.svg"}
              alt={post.author.name}
              className="size-24 rounded-full object-cover flex-shrink-0"
            />
            <div>
              <h3 className="text-xl font-bold mb-2">{post.author.name}</h3>
              <p className="text-muted-foreground mb-3">{post.author.role}</p>
              <p className="text-sm leading-relaxed text-foreground/80">{post.author.bio}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Affiliate Disclosure */}
      <section className="border-t border-border bg-muted/50 py-6">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-sm text-muted-foreground leading-relaxed">
            <p className="mb-4">
              <strong>Disclosure:</strong> {typeData.disclosure}
            </p>
            <p>
              All opinions expressed are our own based on 6 months of independent testing. We maintain editorial
              independence and only recommend products we genuinely believe in. Results may vary by individual.
            </p>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-border bg-background py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-3xl font-bold text-foreground">Related Articles</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`} className="group">
                  <Card className="overflow-hidden transition-shadow hover:shadow-lg h-full flex flex-col">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={relatedPost.image || "/placeholder.svg"}
                        alt={relatedPost.title}
                        className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="flex flex-col flex-1 p-5">
                      <Badge variant="secondary" className="mb-3 w-fit">
                        {relatedPost.category}
                      </Badge>
                      <h3 className="mb-3 text-lg font-semibold leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="mb-4 text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
                        {relatedPost.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                        Read Article <ExternalLink className="size-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
