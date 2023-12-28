const uploadFile = async (
    file: File
) => {
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const { filePath } = await response.json();

      return filePath;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
}

export default uploadFile
