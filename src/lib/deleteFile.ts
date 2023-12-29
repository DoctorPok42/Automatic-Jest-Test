const deleteFile = async (
    filePath: string
) => {
    try {
      const response = await fetch('/api/delete', {
        method: 'POST',
        body: JSON.stringify({
            filePath,
        }),
      });

      const { message } = await response.json();

      return message;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
}

export default deleteFile
