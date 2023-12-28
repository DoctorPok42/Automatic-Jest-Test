import fs from 'fs'
import { Configuration, OpenAIApi } from 'openai'
import { NextApiRequest, NextApiResponse } from 'next';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY as string,
})

const openai = new OpenAIApi(configuration)

export default async function translate(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { filePath } = JSON.parse(req.body)

        const transcription = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a senior developer at a software company.\
                        You are tasked with writing unit tests for a new feature.\
                        Write unit tests for this feature.\
                        The file should start like this:\
                        import React from 'react';\
                        import { render } from '@testing-library/react';\
                        import '@testing-library/jest-dom/extend-expect';\
                        If it's possible write test for each function.\
                        If it's not possible just write a test for the main function.\
                        You can use any library you want.\
                        All your tests should pass.\
                        All your tests should start by test not it.\
                        You can use describe to group your tests (optional)."
                },
                {
                    role: "user",
                    content: fs.readFileSync(filePath, 'utf8')
                }
            ]
        });

        const testResult = transcription.data.choices[0].message?.content

        let numberOfTests = testResult && testResult?.split("test('").length - 1

        if (numberOfTests === 0) {
            numberOfTests = testResult && testResult?.split("it('").length - 1
        }

        if (!testResult) {
            return res.status(500).json({ error: 'Something went wrong' });
        }

        return res.status(200).json({ testResult, numberOfTests });

    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong' });
    }
}
