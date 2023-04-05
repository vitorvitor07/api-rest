import multer from 'multer';

import multerConfig from '../config/multerConfig';

const upload = multer(multerConfig).single('image');

class FotoController {
  async store(req, res) {
    return upload(req, res, (error) => {
      if (error) {
        return res.status(400).json({
          error: [error.code],
        });
      }

      return res.json(req.file);
    });
  }
}

export default new FotoController();
