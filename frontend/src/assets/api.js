import urlBackend from './url';

const api = {
  // Generate PDF from HTML
  generatePdf: async (html) => {
    const response = await fetch(`${urlBackend}/generate-pdf`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ html }),
    });
    return response;
  },

  // Merge PDFs
  mergePdfs: async (coverBlob, files, fileName) => {
    const formData = new FormData();
    formData.append('cover', coverBlob, 'cover.pdf');
    files.forEach(file => {
      formData.append('files', file.file);
    });

    const response = await fetch(`${urlBackend}/merge-auto`, {
      method: 'POST',
      body: formData,
    });
    return response;
  }
};

export default api;