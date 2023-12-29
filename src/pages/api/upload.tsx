import multer from 'multer';

const upload = multer({ dest: 'public/file' });

export const config = {
  api: {
    bodyParser: false
  }
}

export default async function convertLink(req: any, res: any) {
    try {
        let filePath = '';

        setTimeout(() => {
            if (filePath.length < 1) {
                return res.status(500).json({ error: 'Something went wrong' });
            }
        }, 10000);

        await upload.single('file')(req, res, (err: any) => {
            if (err) {
                return res.status(500).json({ error: 'Something went wrong' });
            }

            const { path } = req.file;
            filePath = path;

            return res.status(200).json({ filePath });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}
