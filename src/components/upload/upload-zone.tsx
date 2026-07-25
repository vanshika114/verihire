'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { AnimatePresence, motion } from 'framer-motion';
import { FileText, Image as ImageIcon, UploadCloud } from 'lucide-react';
import { cn } from '@/lib/cn';

interface UploadZoneProps {
  acceptedTypes?: string[];
  onFileSelect?: (file: File | null) => void;
}

const ACCEPTED_TYPES = {
  'application/pdf': ['.pdf'],
  'image/png': ['.png'],
  'image/jpeg': ['.jpeg', '.jpg'],
};

export function UploadZone({ acceptedTypes = ['pdf', 'png', 'jpg', 'jpeg'], onFileSelect }: UploadZoneProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const chosenFile = acceptedFiles[0] ?? null;
      setFile(chosenFile);
      setIsUploading(true);
      setTimeout(() => setIsUploading(false), 900);
      onFileSelect?.(chosenFile);
      setIsDragging(false);
    },
    [onFileSelect],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    multiple: false,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    onDropAccepted: () => setIsDragging(false),
    onDropRejected: () => setIsDragging(false),
  });

  const active = isDragActive || isDragging;

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          'group relative cursor-pointer overflow-hidden rounded-[28px] border border-dashed border-slate-300/70 bg-gradient-to-br from-white via-cyan-50/40 to-slate-50 p-6 shadow-[0_20px_80px_-40px_rgba(15,23,42,0.35)] transition-all duration-300 dark:border-white/10 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950',
          active && 'border-cyan-400 bg-cyan-50/70 shadow-[0_0_0_1px_rgba(34,211,238,0.2),0_20px_80px_-30px_rgba(34,211,238,0.4)] dark:bg-cyan-950/20',
        )}
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="relative"
        >
          <input {...getInputProps()} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.16),_transparent_45%)] opacity-0 transition duration-300 group-hover:opacity-100" />
          <div className="relative flex flex-col items-center justify-center gap-4 text-center">
            <div className="rounded-2xl border border-cyan-200/70 bg-cyan-100/70 p-3 text-cyan-700 shadow-sm dark:border-cyan-400/30 dark:bg-cyan-500/10 dark:text-cyan-300">
              <UploadCloud className="h-8 w-8" />
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">Drop your offer file here</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                PDF, PNG, or JPEG up to a few MB. We&apos;ll scan and analyze it instantly.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-3 py-2 text-xs font-medium uppercase tracking-[0.24em] text-slate-600 shadow-sm dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-300">
              <FileText className="h-4 w-4" />
              {acceptedTypes.join(' • ').toUpperCase()}
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {file ? (
          <motion.div
            key={file.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3 shadow-sm dark:border-white/10 dark:bg-slate-900/80"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-slate-100 p-2 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                {file.type.startsWith('image') ? <ImageIcon className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{file.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Ready for analysis</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: isUploading ? '100%' : '100%' }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-500"
                />
              </div>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{isUploading ? 'Uploading' : 'Uploaded'}</span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl border border-dashed border-slate-200/80 bg-slate-50/70 px-4 py-4 text-sm text-slate-500 dark:border-white/10 dark:bg-slate-900/50 dark:text-slate-400"
          >
            Supported formats: PDF, PNG, JPEG, JPG.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
