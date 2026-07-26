'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Globe2, Mail, Sparkles } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UploadZone } from './upload-zone';
import { UrlInput } from './url-input';
import { EmailInput } from './email-input';
import { Button } from '@/components/ui/button';

const tabs = [
  { id: 'pdf', label: 'Upload PDF', icon: FileText },
  { id: 'screenshot', label: 'Upload Screenshot', icon: FileText },
  { id: 'url', label: 'Paste Job URL', icon: Globe2 },
  { id: 'email', label: 'Paste Email', icon: Mail },
];

export function UploadStepper() {
  const [activeTab, setActiveTab] = useState('pdf');
  const [urlValue, setUrlValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsAnalyzing(true);

      let response;

      if (activeTab === 'pdf') {
        if (!selectedFile) {
          alert('Please upload a PDF first.');
          return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        response = await fetch('http://localhost:3000/api/analyze/pdf', {
          method: 'POST',
          body: formData,
        });
      }

      if (activeTab === 'screenshot') {
        if (!selectedFile) {
          alert('Please upload an image first.');
          return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        response = await fetch('http://localhost:5000/api/analyze/image', {
          method: 'POST',
          body: formData,
        });
      }

      if (activeTab === 'url') {
        if (!urlValue.trim()) {
          alert('Please enter a URL.');
          return;
        }

        response = await fetch('http://localhost:5000/api/analyze/url', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            url: urlValue,
          }),
        });
      }

      if (activeTab === 'email') {
        if (!emailValue.trim()) {
          alert('Please paste the email.');
          return;
        }

        response = await fetch('http://localhost:5000/api/analyze/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: emailValue,
          }),
        });
      }

      if (!response) return;

      const data = await response.json();

      console.log(JSON.stringify(data, null, 2));

      alert('Analysis completed! Check the console for the response.');
    } catch (err) {
      console.error(err);
      alert('Failed to analyze.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 gap-2 rounded-[24px] border border-slate-200/80 bg-white/80 p-2 shadow-sm dark:border-white/10 dark:bg-slate-900/70 md:grid-cols-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="rounded-[18px] px-3 py-3 text-sm font-semibold data-[state=active]:bg-slate-950 data-[state=active]:text-white dark:data-[state=active]:bg-cyan-500 dark:data-[state=active]:text-slate-950"
              >
                <div className="flex items-center justify-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </div>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent value="pdf" className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <UploadZone onFileSelect={setSelectedFile} />
          </motion.div>
        </TabsContent>

        <TabsContent value="screenshot" className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <UploadZone onFileSelect={setSelectedFile} />
          </motion.div>
        </TabsContent>

        <TabsContent value="url" className="mt-6">
          <UrlInput value={urlValue} onChange={setUrlValue} />
        </TabsContent>

        <TabsContent value="email" className="mt-6">
          <EmailInput value={emailValue} onChange={setEmailValue} />
        </TabsContent>
      </Tabs>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col gap-3 rounded-[28px] border border-slate-200/80 bg-white/80 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-white/10 dark:bg-slate-900/70"
      >
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-cyan-100/80 p-2 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-300">
            <Sparkles className="h-5 w-5" />
          </div>

          <div>
            <p className="font-semibold text-slate-900 dark:text-white">
              Ready for a deep analysis
            </p>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              We review the offer details, company signals, and red flags.
            </p>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={isAnalyzing}
          className="min-w-[180px]"
        >
          {isAnalyzing ? 'Analyzing…' : 'Analyze Offer'}
        </Button>
      </motion.div>
    </div>
  );
}