"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Upload, X, CheckCircle2, AlertCircle } from "lucide-react";

const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

interface ScreenshotUploaderProps {
  onFileSelect: (file: File | null) => void;
  error?: string;
}

export default function ScreenshotUploader({
  onFileSelect,
  error,
}: ScreenshotUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndProcessFile = useCallback(
    (file: File) => {
      setLocalError(null);

      if (!ALLOWED_TYPES.includes(file.type)) {
        setLocalError("Please upload a JPG, PNG, or WEBP image.");
        return;
      }

      if (file.size > MAX_SIZE_BYTES) {
        setLocalError("Image file size exceeds the 10MB limit.");
        return;
      }

      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onFileSelect(file);
    },
    [onFileSelect]
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      validateAndProcessFile(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      validateAndProcessFile(file);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setLocalError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onFileSelect(null);
  };

  const displayError = localError || error;

  return (
    <div className="w-full">
      <label className="block font-mono text-xs uppercase tracking-wider font-bold text-ink mb-1.5">
        Payment Transfer Screenshot <span className="text-terracotta">*</span>
      </label>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/jpg"
        onChange={handleFileInputChange}
        className="hidden"
        id="screenshot-upload-input"
        aria-label="Upload Payment Screenshot"
      />

      {!previewUrl ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          className={`relative border-2 border-dashed rounded-xs p-6 text-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? "border-terracotta bg-terracotta/10 scale-[1.01]"
              : displayError
              ? "border-terracotta bg-terracotta/5"
              : "border-ink/50 bg-parchment-light/60 hover:bg-parchment-light hover:border-ink hover:shadow-stamp"
          }`}
        >
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="w-12 h-12 rounded-full border-2 border-ink bg-parchment flex items-center justify-center text-ink shadow-stamp mb-1">
              <Upload className="w-6 h-6 text-terracotta" />
            </div>

            <p className="font-heading text-base md:text-lg text-ink font-bold">
              Tap or Drag & Drop Payment Screenshot
            </p>
            <p className="font-mono text-xs text-ink/70">
              Supports JPG, PNG, WEBP (Max 10MB)
            </p>
            <p className="font-mono text-[11px] text-egyptian-green font-semibold bg-egyptian-green/10 px-2 py-0.5 rounded border border-egyptian-green/30 mt-1">
              ✓ InstaPay or Vodafone Cash receipt
            </p>
          </div>
        </div>
      ) : (
        <div className="relative border-2 border-ink bg-parchment-light p-4 rounded-xs shadow-vintage flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded border-2 border-ink overflow-hidden flex-shrink-0 bg-ink/5 shadow-stamp">
            <Image
              src={previewUrl}
              alt="Payment Screenshot Preview"
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          <div className="flex-1 min-w-0 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-egyptian-green mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider">
                Screenshot Attached
              </span>
            </div>
            <p className="font-mono text-xs text-ink font-semibold truncate max-w-xs">
              {selectedFile?.name}
            </p>
            <p className="font-mono text-[11px] text-ink/60 mt-0.5">
              {(selectedFile ? selectedFile.size / (1024 * 1024) : 0).toFixed(2)} MB
            </p>

            <div className="mt-3 flex items-center justify-center sm:justify-start gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1 bg-parchment border border-ink text-xs font-mono font-bold text-ink hover:bg-ink hover:text-white transition-colors"
              >
                Change Image
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="px-3 py-1 bg-terracotta/10 border border-terracotta text-xs font-mono font-bold text-terracotta hover:bg-terracotta hover:text-white transition-colors flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" /> Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {displayError && (
        <div className="mt-2 flex items-center gap-1.5 text-terracotta font-mono text-xs font-semibold">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{displayError}</span>
        </div>
      )}
    </div>
  );
}
