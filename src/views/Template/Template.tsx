"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { FiSearch, FiX, FiEye, FiArrowRight, FiCheck, FiLayers } from "react-icons/fi";
import BackButton from "../../components/BackButton/BackButton";
import { TEMPLATE_CATALOG, type TemplateItem } from "@/lib/template-config";

const CATEGORIES = [
  "All",
  "Engineering",
  "Business",
  "Science",
  "Humanities",
  "General",
] as const;

type CategoryType = (typeof CATEGORIES)[number];

export default function Template() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("All");
  const [previewItem, setPreviewItem] = useState<TemplateItem | null>(null);

  const filteredTemplates = useMemo(() => {
    return TEMPLATE_CATALOG.filter((template) => {
      const matchesCategory =
        selectedCategory === "All" || template.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        template.fullName.toLowerCase().includes(q) ||
        template.name.toLowerCase().includes(q) ||
        template.tag.toLowerCase().includes(q) ||
        template.description.toLowerCase().includes(q) ||
        template.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen pt-16 sm:pt-20 pb-16 sm:pb-24 bg-gradient-to-b from-slate-50 via-gray-50 to-white px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Navigation & Header */}
        <div className="mb-4 sm:mb-6 flex items-center justify-between">
          <BackButton />
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <FiLayers className="w-3.5 h-3.5" /> 9 Verified Templates
          </span>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-6 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Choose Your <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Cover Page</span>
          </h1>
          <p className="mt-2 max-w-2xl text-xs sm:text-sm md:text-base text-slate-600 mx-auto">
            University-standard templates tailored for department assignments, lab reports, and team projects.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-xs border border-slate-200/80 mb-6 sm:mb-8 space-y-3 sm:space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search department, rubric, or title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800 placeholder-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label="Clear search"
                >
                  <FiX className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Results count */}
            <div className="text-xs font-medium text-slate-500 self-end md:self-center">
              Showing <span className="font-semibold text-slate-800">{filteredTemplates.length}</span> of {TEMPLATE_CATALOG.length} templates
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2 border-t border-slate-100">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    isSelected
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Template Grid */}
        {filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="group relative bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-0.5"
              >
                {/* Card Header Tags */}
                <div className="p-2.5 sm:p-3 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
                    {template.category}
                  </span>
                  {template.popular ? (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                      ★ Popular
                    </span>
                  ) : (
                    <span className="text-[11px] font-medium text-slate-400">
                      Template #{template.id}
                    </span>
                  )}
                </div>

                {/* Preview Thumbnail Container */}
                <Link
                  href={`/template/${template.name}`}
                  className="relative bg-gradient-to-b from-slate-100/60 to-slate-50 p-2 sm:p-3 lg:p-4 h-36 sm:h-48 lg:h-56 flex items-center justify-center overflow-hidden block"
                >
                  <img
                    src={template.tempLogo}
                    alt={template.fullName}
                    className="max-h-full max-w-full object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Hover Quick View Button */}
                  <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setPreviewItem(template);
                      }}
                      className="px-3.5 py-1.5 bg-white/95 hover:bg-white text-slate-800 text-xs font-semibold rounded-lg shadow flex items-center gap-1.5 transition-transform hover:scale-105"
                    >
                      <FiEye className="w-3.5 h-3.5 text-blue-600" /> Quick View
                    </button>
                    <span
                      className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow flex items-center gap-1.5 transition-transform hover:scale-105"
                    >
                      Select <FiArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>

                {/* Card Content */}
                <div className="p-3 sm:p-4 lg:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 bg-blue-50 text-blue-600 rounded">
                        {template.tag}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors">
                      {template.fullName}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {template.description}
                    </p>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => setPreviewItem(template)}
                      className="text-xs text-slate-500 hover:text-slate-800 font-medium transition-colors"
                    >
                      Preview
                    </button>
                    <Link
                      href={`/template/${template.name}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 group-hover:text-blue-700 transition-colors"
                    >
                      Use Template <FiArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/80 p-8 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <FiSearch className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No templates found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              We couldn&apos;t find any templates matching &quot;{searchQuery}&quot;. Try searching for another department or reset your filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Quick View Modal */}
        {previewItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
              {/* Modal Header */}
              <div className="p-4 px-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {previewItem.fullName}
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">
                    {previewItem.category} • {previewItem.tag}
                  </span>
                </div>
                <button
                  onClick={() => setPreviewItem(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
                  aria-label="Close preview"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Image Body */}
              <div className="p-6 bg-slate-100/50 flex-1 overflow-auto flex items-center justify-center">
                <img
                  src={previewItem.tempLogo}
                  alt={previewItem.fullName}
                  className="max-h-[60vh] object-contain rounded-lg shadow-lg border border-slate-200"
                />
              </div>

              {/* Modal Footer */}
              <div className="p-4 px-6 border-t border-slate-100 bg-white flex items-center justify-between">
                <p className="text-xs text-slate-500 max-w-sm hidden sm:block">
                  {previewItem.description}
                </p>
                <div className="flex gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => setPreviewItem(null)}
                    className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                  <Link
                    href={`/template/${previewItem.name}`}
                    className="px-5 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow flex items-center gap-1.5 transition-colors"
                  >
                    Use This Template <FiArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
