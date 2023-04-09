import multer from 'multer';
import { extname, resolve } from 'path';

const aleatorio = () => Math.floor(Math.random() * 10000 + 10000);

export default {
  fileFilter: (req, file, callback) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      return callback(new multer.MulterError('Arquivo não suportado, o formato do arquivo deve ser PNG ou JPEG'));
    }

    return callback(null, true); // true = next()
  },
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, resolve(__dirname, '..', '..', 'uploads', 'images')); // caminho para salvar o arquivo
    },
    filename: (req, file, callback) => {
      callback(null, `${Date.now()}_${aleatorio()}_${extname(file.originalname)}`); // nome do arquivo ao ser salvo
    },
  }),
};
