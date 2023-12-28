const getUnitTests = async (
    filePath: string
) => {
    const response = await fetch('/api/translate', {
        method: 'POST',
        body: JSON.stringify({
            filePath,
        }),
    })

    const { testResult, numberOfTests } = await response.json()

    return {
        testResult,
        numberOfTests,
    }
}

export default getUnitTests
