import React from 'react';
import fs from 'fs';
import path from 'path';
import { Markdown } from '@/components/markdown';

async function page() {
  const readmePath = path.join(process.cwd(), 'README.md');
  const readmeContent = await fs.promises.readFile(readmePath, 'utf8');

  return (
    <main className="mt-14 p-6 space-y-8 max-w-3xl mx-auto">
      <Markdown>{readmeContent}</Markdown>
    </main>
  );
}

export default page;
