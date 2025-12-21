// Category Content Data
// ✏️ EDITABLE FILE - This file is managed by the dashboard
// Last updated: 2025-11-21T00:00:00.000Z
// Changes made here may be overwritten when syncing from the dashboard

import type { Category } from "./categories.schema"

// Sample categories - will be replaced when you sync from dashboard
export const categories: Category[] = [
  {
    id: "sample-1",
    name: "Business Strategy",
    slug: "business-strategy",
    showInHeader: true,
    showInFooter: true,
    subcategories: [
      { id: "sample-1a", name: "Strategic Planning", slug: "strategic-planning" },
      { id: "sample-1b", name: "Competitive Analysis", slug: "competitive-analysis" },
      { id: "sample-1c", name: "Market Research", slug: "market-research" }
    ]
  },
  {
    id: "sample-2",
    name: "Marketing",
    slug: "marketing",
    showInHeader: true,
    showInFooter: true,
    subcategories: [
      { id: "sample-2a", name: "Digital Marketing", slug: "digital-marketing" },
      { id: "sample-2b", name: "Content Marketing", slug: "content-marketing" },
      { id: "sample-2c", name: "Social Media Strategy", slug: "social-media-strategy" }
    ]
  },
  {
    id: "sample-3",
    name: "Operations",
    slug: "operations",
    showInHeader: true,
    showInFooter: true,
    subcategories: [
      { id: "sample-3a", name: "Process Optimization", slug: "process-optimization" },
      { id: "sample-3b", name: "Supply Chain", slug: "supply-chain" },
      { id: "sample-3c", name: "Quality Management", slug: "quality-management" }
    ]
  },
  {
    id: "sample-4",
    name: "Leadership",
    slug: "leadership",
    showInHeader: true,
    showInFooter: true,
    subcategories: [
      { id: "sample-4a", name: "Team Management", slug: "team-management" },
      { id: "sample-4b", name: "Executive Coaching", slug: "executive-coaching" },
      { id: "sample-4c", name: "Organizational Culture", slug: "organizational-culture" }
    ]
  }
]
