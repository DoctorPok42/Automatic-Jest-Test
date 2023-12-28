const deleteFile = async (
    filePath: string
) => {
    try {
      console.log(filePath)
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
