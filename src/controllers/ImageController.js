import multer from 'multer';
import Image from '../models/Image';
import multerConfig from '../config/multerConfig';


const upload = multer(multerConfig).single('image');

class FotoController {
  store(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json({
          error: [error],
        });
      }

      try {
        const { originalname, filename } = req.file;
        const { aluno_id } = req.body;
        const image = await Image.create({ originalname, filename, aluno_id });

        return res.status(201).json({image});
      } catch (e) {
        return res.status(400).json({
          errors: ['Aluno inexistente']
        })
    }
    });
  }
}

export default new FotoController();
