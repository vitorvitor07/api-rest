"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _Image = require('../models/Image'); var _Image2 = _interopRequireDefault(_Image);
var _multerConfig = require('../config/multerConfig'); var _multerConfig2 = _interopRequireDefault(_multerConfig);


const upload = _multer2.default.call(void 0, _multerConfig2.default).single('image');

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
        const image = await _Image2.default.create({ originalname, filename, aluno_id });

        return res.status(201).json({image});
      } catch (e) {
        return res.status(400).json({
          errors: ['Aluno inexistente']
        })
    }
    });
  }
}

exports. default = new FotoController();
