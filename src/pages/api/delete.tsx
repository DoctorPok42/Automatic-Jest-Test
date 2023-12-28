import fs from 'fs';

export default async function convertLink(req: any, res: any) {
    try {
        const { filePath } = JSON.parse(req.body);

        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Something went wrong' });
            }
        });

        return res.status(200).json({ message: 'File deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}
